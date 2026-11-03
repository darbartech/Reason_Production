"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PREFERRED_DESTINATIONS } from "@/lib/validations/enquiry";
import { saveHandoff } from "@/lib/callback-handoff";

type Props = {
  defaultDestination?: (typeof PREFERRED_DESTINATIONS)[number];
  compact?: boolean;
};

export default function CallbackCard({ defaultDestination, compact }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDestination, setPreferredDestination] = useState(
    defaultDestination ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = "Please enter your name.";
    }
    if (!phone.trim() || phone.trim().length < 7) {
      next.phone = "Please enter a phone number we can call.";
    }
    if (!preferredDestination) {
      next.preferredDestination = 'Please choose a country, or "Not sure yet".';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    saveHandoff({ fullName, phone, preferredDestination });
    router.push("/contact#enquiry");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`card shadow-lift ${compact ? "p-5" : "p-6 sm:p-8"} bg-white`}
    >
      <div className="mb-5">
        <h2 className="font-sans text-[1.125rem] font-semibold leading-snug text-primary">
          Book a free session
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Name, phone and country. That&apos;s all we need.
        </p>
      </div>

      <div className={`space-y-4 ${compact ? "space-y-3" : "space-y-4"}`}>
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
            className="w-full h-12 px-4 text-[1rem] rounded-lg border border-line bg-white text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
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
            className="w-full h-12 px-4 text-[1rem] rounded-lg border border-line bg-white text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
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
            className="w-full h-12 px-4 text-[1rem] rounded-lg border border-line bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
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
      </div>

      <button type="submit" className="btn-primary btn-lg w-full mt-6">
        Book my session
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        Free first session. We confirm by call or WhatsApp.
      </p>
    </form>
  );
}
