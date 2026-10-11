import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
  PREFERRED_DESTINATIONS,
  EnquiryStep1,
} from "@/lib/validations/enquiry";
import { User, Phone, Globe } from "lucide-react";

interface PersonalStudyStepProps {
  register: UseFormRegister<EnquiryStep1>;
  errors: FieldErrors<EnquiryStep1>;
}

const OptionSelect = <T extends string>({
  id,
  label,
  options,
  registerId,
  register,
  errors,
  icon: Icon,
  placeholder = "Select an option",
}: {
  id: string;
  label: string;
  options: readonly T[];
  registerId: keyof EnquiryStep1;
  register: UseFormRegister<EnquiryStep1>;
  errors: FieldErrors<EnquiryStep1>;
  icon: React.ElementType;
  placeholder?: string;
}) => {
  const err = errors[registerId];
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
      >
        <Icon size={14} className="text-muted" />
        {label}
        <span className="text-crimson">*</span>
      </label>
      <select
        id={id}
        {...register(registerId)}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-error` : undefined}
        className={`w-full bg-brand-light-bg border ${
          err ? "border-crimson" : "border-brand-border"
        } rounded-xl px-5 h-12 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base appearance-none pr-10 bg-no-repeat bg-[right_1rem_center]`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23087EA4' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        }}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {err && (
        <p id={`${id}-error`} className="text-crimson text-sm mt-1 ml-1 font-medium">
          {err.message as string}
        </p>
      )}
    </div>
  );
};

const PersonalStudyStep = ({ register, errors }: PersonalStudyStepProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
        >
          <User size={14} className="text-muted" />
          Full name <span className="text-crimson">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register("fullName")}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`w-full bg-brand-light-bg border ${
            errors.fullName ? "border-crimson" : "border-brand-border"
          } rounded-xl px-5 h-12 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base`}
          placeholder="Ram Bahadur Shrestha"
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-crimson text-sm mt-1 ml-1 font-medium">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
        >
          <Phone size={14} className="text-muted" />
          Mobile number <span className="text-crimson">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          {...register("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`w-full bg-brand-light-bg border ${
            errors.phone ? "border-crimson" : "border-brand-border"
          } rounded-xl px-5 h-12 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base`}
          placeholder="98XXXXXXXX"
        />
        {errors.phone && (
          <p id="phone-error" className="text-crimson text-sm mt-1 ml-1 font-medium">
            {errors.phone.message}
          </p>
        )}
      </div>

      <OptionSelect
        id="preferredDestination"
        label="Preferred Destination"
        options={PREFERRED_DESTINATIONS}
        registerId="preferredDestination"
        register={register}
        errors={errors}
        icon={Globe}
        placeholder="Where would you like to study?"
      />
    </div>
  );
};

export default PersonalStudyStep;
