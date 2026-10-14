"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Loader2, Send } from "lucide-react";
import {
  EnquiryFormData,
  EnquiryStep1,
  EnquiryStep2,
  enquiryStep1Schema,
  enquirySchema,
} from "@/lib/validations/enquiry";
import PersonalStudyStep from "./PersonalStudyStep";
import AcademicProfileStep from "./AcademicProfileStep";
import EnquirySuccess from "./EnquirySuccess";

interface EnquiryFormProps {
  sourcePage?: string;
  prefill?: Partial<EnquiryFormData>;
}

type Step = 1 | 2 | "success";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    }
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const UTM_KEYS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
] as const;

const captureUtm = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const meta: Partial<EnquiryFormData> = {
    sourcePage: window.location.pathname,
    referrer: document.referrer || undefined,
  };
  UTM_KEYS.forEach(([q, k]) => {
    const v = params.get(q);
    if (v) (meta as Record<string, string>)[k] = v;
  });
  return meta;
};

const EnquiryForm = ({ sourcePage: propSource, prefill }: EnquiryFormProps) => {
  const [step, setStep] = useState<Step>(1);
  const [meta, setMeta] = useState<Partial<EnquiryFormData>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {},
  });

  useEffect(() => {
    const merged = { ...captureUtm() };
    if (propSource) merged.sourcePage = propSource;
    setMeta(merged);
    (Object.keys(merged) as (keyof EnquiryFormData)[]).forEach((key) => {
      const value = merged[key];
      if (typeof value === "string" && value) setValue(key, value);
    });
    // setValue is stable across renders; re-running on propSource only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propSource]);

  useEffect(() => {
    if (!prefill) return;
    (Object.keys(prefill) as (keyof EnquiryFormData)[]).forEach((key) => {
      const value = prefill[key];
      if (typeof value === "string" && value) setValue(key, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || step !== 2 || !turnstileReady) return;
    const el = turnstileRef.current;
    if (!el || !window.turnstile) return;
    el.replaceChildren();
    window.turnstile.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      "error-callback": () => setTurnstileToken(""),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, [step, turnstileReady]);

  const focusFirstError = () => {
    requestAnimationFrame(() => {
      const first = Object.keys(errors)[0];
      if (first) document.getElementById(first)?.focus();
    });
  };

  const handleContinue = async () => {
    setSubmitAttempted(true);
    const step1Fields = ["fullName", "phone", "preferredDestination"] as const;
    // shouldFocus lets react-hook-form focus the first invalid field itself,
    // using the errors it just produced rather than the previous render's.
    const isValid = await trigger(step1Fields, { shouldFocus: true });
    if (!isValid) return;
    setSubmitAttempted(false);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    // RHF keeps step-2 errors mounted after Back, which would render a stale
    // summary over step 1; validation re-runs on Continue regardless.
    clearErrors();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: EnquiryFormData) => {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      toast.error("Please complete the security check, then submit again.");
      return;
    }

    try {
      const payload: Record<string, unknown> = {
        ...data,
        sourcePage: data.sourcePage ?? meta.sourcePage,
        referrer: data.referrer ?? meta.referrer,
        submittedAt: new Date().toISOString(),
      };
      if (turnstileToken) payload.cfTurnstileResponse = turnstileToken;

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result: { success?: boolean; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        // non-JSON response (e.g. server unreachable behind a proxy)
      }

      if (response.ok && result.success) {
        setStep("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const onInvalid = () => {
    setSubmitAttempted(true);
    toast.error("Please check the highlighted fields and try again.");
    focusFirstError();
  };

  // Enter inside a text field must never submit or reload the page — it
  // advances focus to the next visible field instead.
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT") return;
    e.preventDefault();
    const fields = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>(
        'input:not([type="hidden"]), select, textarea'
      )
    ).filter((el) => !el.hidden && !el.closest('[aria-hidden="true"]'));
    const i = fields.indexOf(target);
    if (i === -1) return;
    if (i < fields.length - 1) {
      fields[i + 1].focus();
    } else if (step === 1) {
      handleContinue();
    }
  };

  const handleReset = () => {
    reset();
    setTurnstileToken("");
    setSubmitAttempted(false);
    setStep(1);
  };

  const errorEntries = Object.entries(errors).filter(([key]) => key !== "website");
  const hasErrors = errorEntries.length > 0;
  const showErrorSummary = submitAttempted && hasErrors;

  const stepLabel = step === 1 ? "Personal" : step === 2 ? "Academic" : "";

  return (
    <div className="relative">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}

      <div id="enquiry-step-status" role="status" aria-live="polite" className="sr-only">
        {typeof step === "number" ? `Step ${step} of 2. ${stepLabel} details.` : ""}
      </div>

      {step === "success" ? (
        <EnquirySuccess onReset={handleReset} />
      ) : (
        <>
          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-ink tracking-wide">
              Step {step} of 2 · {step === 1 ? "Personal details" : "Academic profile"}
              </div>
            </div>
            <div
              className="h-1 w-full rounded-full bg-brand-light-bg overflow-hidden mb-5"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={2}
              aria-label="Enquiry form progress"
            >
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
            <h3 className="text-primary">
              {step === 1 ? "Let's Start Your Study Assessment" : "Your Academic Profile"}
            </h3>
            <p className="text-sm md:text-base text-brand-text-muted mt-2 leading-relaxed">
              {step === 1
                ? "Tell us a bit about yourself — it will only take a moment."
                : "Help us match you with the right courses and universities."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0], onInvalid)}
            onKeyDown={handleFormKeyDown}
            className="space-y-5"
            noValidate
          >
            {showErrorSummary && (
              <div
                role="alert"
                tabIndex={-1}
                className="p-4 rounded-xl border border-crimson/30 bg-crimson-50 text-crimson space-y-3"
              >
                <p className="font-bold text-sm">
                  Please fix the following {errorEntries.length > 1 ? "errors" : "error"}:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm">
                  {errorEntries.map(([key, val]) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        className="underline hover:text-crimson-dark focus:outline-none focus:ring-2 focus:ring-crimson rounded"
                      >
                        {(val as { message?: string })?.message || key}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Honeypot: moved off-screen rather than display:none, which many bots skip. */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {step === 1 && (
              <PersonalStudyStep
                register={register as unknown as UseFormRegister<EnquiryStep1>}
                errors={errors as unknown as FieldErrors<EnquiryStep1>}
              />
            )}
            {step === 2 && (
              <>
                <AcademicProfileStep
                  register={register as unknown as UseFormRegister<EnquiryStep2>}
                  errors={errors as unknown as FieldErrors<EnquiryStep2>}
                  englishTest={(getValues("englishTest") || "") as string}
                  watchEnglishTest={() => (watch("englishTest") || "") as string}
                  watchResultType={() => (watch("resultType") || "") as string}
                />
                {TURNSTILE_SITE_KEY && (
                  <div ref={turnstileRef} className="flex justify-center pt-2" />
                )}
              </>
            )}

            {/* Keys are load-bearing: React reuses DOM nodes by index, and
                without keys the Continue node becomes the type=submit button
                on step 2 — Chromium's deferred click activation can then
                submit the form. Different keys force a remount instead. */}
            <div
              className={`flex gap-4 pt-4 ${step === 1 ? "justify-end" : "justify-between"}`}
            >
              {step === 2 && (
                <button
                  key="back"
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="btn-outline inline-flex items-center gap-2 px-6"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
              )}

              {step === 1 ? (
                <button
                  key="continue"
                  type="button"
                  onClick={handleContinue}
                  className="btn-primary inline-flex items-center gap-2 px-8"
                >
                  Continue to profile
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  key="submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-2 px-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Profile
                      <Send size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EnquiryForm;
