"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PREFERRED_DESTINATIONS } from "@/lib/validations/enquiry";

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
      next.fullName = "Please enter your full name";
    }
    if (!phone.trim() || phone.trim().length < 7) {
      next.phone = "Please enter a valid phone number";
    }
    if (!preferredDestination) {
      next.preferredDestination = "Please select a preferred destination";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({
      fullName,
      phone,
      preferredDestination,
    });
    router.push(`/contact?${params.toString()}#enquiry`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`card shadow-lift ${compact ? "p-5" : "p-6 sm:p-8"} bg-white`}
    >
      <div className="mb-5">
        <h3 className="text-primary">Book a free counselling session</h3>
        <p className="mt-1.5 text-sm text-muted">
          Three fields. We'll reply within one working day.
        </p>
      </div>

      <div className={`space-y-4 ${compact ? "space-y-3" : "space-y-4"}`}>
        <div>
          <label
            htmlFor="cb-fullname"
            className="block mb-1.5 text-[0.875rem] font-medium text-primary"
          >
            Your full name
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
            Phone number
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
            Preferred destination
          </label>
          <select
            id="cb-destination"
            value={preferredDestination}
            onChange={(e) => setPreferredDestination(e.target.value)}
            aria-invalid={!!errors.preferredDestination}
            aria-describedby={errors.preferredDestination ? "cb-dest-err" : undefined}
            className="w-full h-12 px-4 text-[1rem] rounded-lg border border-line bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          >
            <option value="">Select a destination</option>
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
        No charge for the first session. We'll confirm by call or WhatsApp.
      </p>
    </form>
  );
}
