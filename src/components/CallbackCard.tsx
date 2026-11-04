"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { PREFERRED_DESTINATIONS, STUDY_LEVELS } from "@/lib/validations/enquiry";
import { notifyOfficeByEmail } from "@/lib/enquiry-notify";
import { whatsappLink } from "@/lib/company";

type Props = {
  defaultDestination?: (typeof PREFERRED_DESTINATIONS)[number];
  compact?: boolean;
};

const PHONE_RE = /^(\+?977[-\s]?)?9[78][0-9]{8}$|^(01[-\s]?)?[45][0-9]{6,7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CallbackCard({ defaultDestination, compact }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDestination, setPreferredDestination] = useState(
    defaultDestination ?? ""
  );
  const [studyLevel, setStudyLevel] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ leadNumber?: string; phone: string } | null>(null);

  useEffect(() => {
    if (!success) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSuccess(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [success]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = "Please enter your name.";
    }
    if (!PHONE_RE.test(phone.replace(/[-\s]/g, ""))) {
      next.phone = "Please enter a phone number we can call.";
    }
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!preferredDestination) {
      next.preferredDestination = 'Please choose a country, or "Not sure yet".';
    }
    if (!studyLevel) {
      next.studyLevel = "Please choose your study level.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          preferredDestination,
          studyLevel,
          sourcePage: window.location.pathname,
          referrer: document.referrer || undefined,
          submittedAt: new Date().toISOString(),
        }),
      });

      let result: { success?: boolean; message?: string; leadNumber?: string } = {};
      try {
        result = await response.json();
      } catch {
        // non-JSON response (e.g. server unreachable behind a proxy)
      }

      if (response.ok && result.success) {
        const submittedPhone = phone;
        await notifyOfficeByEmail(
          {
            fullName,
            phone,
            email,
            preferredDestination,
            studyLevel,
            sourcePage: window.location.pathname,
            referrer: document.referrer || undefined,
          },
          result.leadNumber
        );
        setFullName("");
        setPhone("");
        setEmail("");
        setPreferredDestination(defaultDestination ?? "");
        setStudyLevel("");
        setErrors({});
        setSuccess({ leadNumber: result.leadNumber, phone: submittedPhone });
      } else {
        setErrors({ form: result.message || "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ form: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 text-[1rem] rounded-lg border border-line bg-white text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors";

  return (
    <>
    <form
      onSubmit={onSubmit}
      className={`card shadow-lift ${compact ? "p-5" : "p-6 sm:p-8"} bg-white`}
      noValidate
    >
      <div className="mb-5">
        <h2 className="font-sans text-[1.125rem] font-semibold leading-snug text-primary">
          Book a free session
        </h2>
      </div>

      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div>
          <label
            htmlFor="cb-fullname"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Full name
          </label>
          <input
            id="cb-fullname"
            type="text"
            autoComplete="name"
            inputMode="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "cb-fullname-err" : undefined}
            className={inputClass}
            placeholder="e.g. Aryan Karki"
          />
          {errors.fullName && (
            <p id="cb-fullname-err" className="mt-1.5 text-xs text-crimson">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cb-phone"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Phone (98XXXXXXXX)
          </label>
          <input
            id="cb-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cb-phone-err" : undefined}
            className={inputClass}
            placeholder="98XXXXXXXX or 01-4XXXXXX"
          />
          {errors.phone && (
            <p id="cb-phone-err" className="mt-1.5 text-xs text-crimson">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cb-email"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="cb-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cb-email-err" : undefined}
            className={inputClass}
            placeholder="you@email.com"
          />
          {errors.email && (
            <p id="cb-email-err" className="mt-1.5 text-xs text-crimson">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cb-destination"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Where would you like to study?
          </label>
          <select
            id="cb-destination"
            value={preferredDestination}
            onChange={(e) => setPreferredDestination(e.target.value)}
            aria-invalid={!!errors.preferredDestination}
            aria-describedby={errors.preferredDestination ? "cb-dest-err" : undefined}
            className={inputClass}
          >
            <option value="">Select a country</option>
            {PREFERRED_DESTINATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.preferredDestination && (
            <p id="cb-dest-err" className="mt-1.5 text-xs text-crimson">
              {errors.preferredDestination}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cb-level"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Study level
          </label>
          <select
            id="cb-level"
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            aria-invalid={!!errors.studyLevel}
            aria-describedby={errors.studyLevel ? "cb-level-err" : undefined}
            className={inputClass}
          >
            <option value="">Select a level</option>
            {STUDY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.studyLevel && (
            <p id="cb-level-err" className="mt-1.5 text-xs text-crimson">
              {errors.studyLevel}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary btn-lg w-full mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          <>
            Book my session
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>

      {errors.form && (
        <p role="alert" className="mt-3 text-center text-xs text-crimson">
          {errors.form}
        </p>
      )}

      <p className="mt-3 text-center text-xs text-muted">
        Free first session. We confirm by call or WhatsApp.
      </p>
    </form>

    {success && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cb-thanks-title"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/60 p-4"
        onClick={() => setSuccess(null)}
      >
        <div
          className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lift sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 size={36} className="text-accent" aria-hidden="true" />
          </div>

          <h2 id="cb-thanks-title" className="font-sans text-lg font-semibold text-primary">
            Your Study Profile Has Been Received
          </h2>

          <p className="mt-2 text-sm text-muted">
            Our counselor will review your information and contact you on{" "}
            <span className="font-medium text-primary">{success.phone}</span> to discuss
            suitable study options.
          </p>

          {success.leadNumber && (
            <p className="mt-3 text-xs text-muted">
              Your reference number is{" "}
              <span className="font-semibold text-primary">{success.leadNumber}</span>. Quote it
              if you call or message us.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Talk on WhatsApp
            </a>
            <button
              type="button"
              autoFocus
              onClick={() => setSuccess(null)}
              className="btn-outline w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
