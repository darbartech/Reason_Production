"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import {
  EnquiryFormData,
  PREFERRED_DESTINATIONS,
  STUDY_LEVELS,
  enquirySchema,
} from "@/lib/validations/enquiry";
import PersonalStudyStep from "./PersonalStudyStep";
import { takeHandoff } from "@/lib/callback-handoff";
import { takeQuizHandoff } from "@/lib/quiz-handoff";
import { notifyOfficeByEmail } from "@/lib/enquiry-notify";

interface EnquiryFormProps {
  sourcePage?: string;
}

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

const EnquiryForm = ({ sourcePage: propSource }: EnquiryFormProps) => {
  const [meta, setMeta] = useState<Partial<EnquiryFormData>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
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
    const handoff = takeHandoff();
    if (handoff) {
      setValue("fullName", handoff.fullName);
      setValue("phone", handoff.phone);
      setValue("preferredDestination", handoff.preferredDestination as EnquiryFormData["preferredDestination"]);
    }
    const quiz = takeQuizHandoff();
    if (quiz) {
      if (
        quiz.preferredDestination &&
        (PREFERRED_DESTINATIONS as readonly string[]).includes(quiz.preferredDestination)
      ) {
        setValue(
          "preferredDestination",
          quiz.preferredDestination as EnquiryFormData["preferredDestination"]
        );
      }
      if (quiz.studyLevel && (STUDY_LEVELS as readonly string[]).includes(quiz.studyLevel)) {
        setValue("studyLevel", quiz.studyLevel as EnquiryFormData["studyLevel"]);
      }
    }
    // setValue is stable across renders; re-running on propSource only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propSource]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileReady) return;
    const el = turnstileRef.current;
    if (!el || !window.turnstile) return;
    el.replaceChildren();
    window.turnstile.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      "error-callback": () => setTurnstileToken(""),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, [turnstileReady]);

  const focusFirstError = () => {
    requestAnimationFrame(() => {
      const first = Object.keys(errors)[0];
      if (first) document.getElementById(first)?.focus();
    });
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

      let result: { success?: boolean; message?: string; leadNumber?: string } = {};
      try {
        result = await response.json();
      } catch {
        // non-JSON response (e.g. server unreachable behind a proxy)
      }

      if (response.ok && result.success) {
        await notifyOfficeByEmail(data, result.leadNumber);
        // The thank-you page carries the lead number so the student can quote it.
        const reference = result.leadNumber ? `?ref=${encodeURIComponent(result.leadNumber)}` : "";
        window.location.assign(`/thank-you${reference}`);
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

  const errorEntries = Object.entries(errors).filter(([key]) => key !== "website");
  const showErrorSummary = submitAttempted && errorEntries.length > 0;

  return (
    <div className="relative">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}

      <div className="mb-6">
        <h3 className="text-primary">Tell us about you</h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-5"
        noValidate
      >
        {showErrorSummary && (
          <div
            role="alert"
            tabIndex={-1}
            className="p-4 rounded-xl border border-red-300 bg-red-50 text-red-800 space-y-3"
          >
            <p className="font-bold text-sm">
              Please fix the following {errorEntries.length > 1 ? "errors" : "error"}:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              {errorEntries.map(([key, val]) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="underline hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
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

        <PersonalStudyStep register={register} errors={errors} />

        {TURNSTILE_SITE_KEY && (
          <div ref={turnstileRef} className="flex justify-center pt-2" />
        )}

        <div className="flex justify-end pt-4">
          <button
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
                Submit
                <Send size={18} />
              </>
            )}
          </button>
        </div>
        <p className="pt-1 text-center text-xs text-muted">
          Free first session · No obligation · We never share your details.
        </p>
      </form>
    </div>
  );
};

export default EnquiryForm;
