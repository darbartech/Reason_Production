import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
  HIGHEST_EDUCATION,
  RESULT_TYPES,
  ENGLISH_TESTS,
  STUDY_LEVELS,
  BUDGETS,
  CONTACT_PREFERENCES,
  CONTACT_TIMES,
  EnquiryStep2,
} from "@/lib/validations/enquiry";
import {
  GraduationCap,
  Award,
  Languages,
  BookOpen,
  GraduationCap as CourseIcon,
  Wallet,
  PhoneCall,
  Clock,
} from "lucide-react";

interface AcademicProfileStepProps {
  register: UseFormRegister<EnquiryStep2>;
  errors: FieldErrors<EnquiryStep2>;
  englishTest: string;
  watchEnglishTest: () => string;
  watchResultType: () => string;
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
  required = true,
}: {
  id: string;
  label: string;
  options: readonly T[];
  registerId: keyof EnquiryStep2;
  register: UseFormRegister<EnquiryStep2>;
  errors: FieldErrors<EnquiryStep2>;
  icon: React.ElementType;
  placeholder?: string;
  required?: boolean;
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
        {required && <span className="text-crimson">*</span>}
      </label>
      <select
        id={id}
        {...register(registerId)}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-error` : undefined}
        className={`w-full bg-brand-light-bg border ${
          err ? "border-red-500" : "border-brand-border"
        } rounded-xl px-5 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base appearance-none pr-10 bg-no-repeat bg-[right_1rem_center]`}
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
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1 ml-1 font-medium">
          {err.message as string}
        </p>
      )}
    </div>
  );
};

const AcademicProfileStep = ({
  register,
  errors,
  watchEnglishTest,
  watchResultType,
}: AcademicProfileStepProps) => {
  const currentEnglishTest = watchEnglishTest();
  const currentResultType = watchResultType();
  const needsScore =
    currentEnglishTest === "IELTS" ||
    currentEnglishTest === "PTE" ||
    currentEnglishTest === "TOEFL" ||
    currentEnglishTest === "Duolingo";
  const needsResult = currentResultType !== "" && currentResultType !== "Not sure";

  const scorePlaceholder =
    currentEnglishTest === "IELTS"
      ? "e.g. 6.5"
      : currentEnglishTest === "PTE"
      ? "e.g. 58"
      : currentEnglishTest === "TOEFL"
      ? "e.g. 79"
      : currentEnglishTest === "Duolingo"
      ? "e.g. 105"
      : "Score";

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <OptionSelect
          id="highestEducation"
          label="Highest education"
          options={HIGHEST_EDUCATION}
          registerId="highestEducation"
          register={register}
          errors={errors}
          icon={GraduationCap}
          placeholder="Your highest qualification"
        />

        <OptionSelect
          id="studyLevel"
          label="Preferred study level"
          options={STUDY_LEVELS}
          registerId="studyLevel"
          register={register}
          errors={errors}
          icon={BookOpen}
          placeholder="Level you want to study"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <OptionSelect
          id="resultType"
          label="Result type"
          options={RESULT_TYPES}
          registerId="resultType"
          register={register}
          errors={errors}
          icon={Award}
          placeholder="Grading system"
        />

        {needsResult ? (
          <div className="space-y-2">
            <label
              htmlFor="resultValue"
              className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
            >
              <Award size={14} className="text-muted" />
              {currentResultType} value <span className="text-crimson">*</span>
            </label>
            <input
              id="resultValue"
              type="text"
              inputMode="decimal"
              {...register("resultValue")}
              aria-invalid={!!errors.resultValue}
              aria-describedby={errors.resultValue ? "resultValue-error" : undefined}
              className={`w-full bg-brand-light-bg border ${
                errors.resultValue ? "border-red-500" : "border-brand-border"
              } rounded-xl px-5 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base`}
              placeholder="e.g. 3.5, 75%, First Div."
            />
            {errors.resultValue && (
              <p id="resultValue-error" className="text-red-600 text-xs mt-1 ml-1 font-medium">
                {errors.resultValue.message as string}
              </p>
            )}
          </div>
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <OptionSelect
          id="englishTest"
          label="English proficiency"
          options={ENGLISH_TESTS}
          registerId="englishTest"
          register={register}
          errors={errors}
          icon={Languages}
          placeholder="English test taken"
        />

        {needsScore ? (
          <div className="space-y-2">
            <label
              htmlFor="englishScore"
              className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
            >
              <Languages size={14} className="text-muted" />
              {currentEnglishTest} score <span className="text-crimson">*</span>
            </label>
            <input
              id="englishScore"
              type="text"
              inputMode="decimal"
              {...register("englishScore")}
              aria-invalid={!!errors.englishScore}
              aria-describedby={errors.englishScore ? "englishScore-error" : undefined}
              className={`w-full bg-brand-light-bg border ${
                errors.englishScore ? "border-red-500" : "border-brand-border"
              } rounded-xl px-5 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base`}
              placeholder={scorePlaceholder}
            />
            {errors.englishScore && (
              <p id="englishScore-error" className="text-red-600 text-xs mt-1 ml-1 font-medium">
                {errors.englishScore.message as string}
              </p>
            )}
          </div>
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="preferredCourse"
          className="text-sm font-medium text-ink ml-1 flex items-center gap-2"
        >
          <CourseIcon size={14} className="text-muted" />
          Preferred course or subject{" "}
          <span className="text-muted">(optional)</span>
        </label>
        <input
          id="preferredCourse"
          type="text"
          {...register("preferredCourse")}
          aria-invalid={!!errors.preferredCourse}
          aria-describedby={errors.preferredCourse ? "preferredCourse-error" : undefined}
          className={`w-full bg-brand-light-bg border ${
            errors.preferredCourse ? "border-red-500" : "border-brand-border"
          } rounded-xl px-5 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-colors outline-none font-medium text-base`}
          placeholder="e.g. IT, Nursing, Business, Engineering"
          maxLength={200}
        />
        {errors.preferredCourse && (
          <p id="preferredCourse-error" className="text-red-600 text-xs mt-1 ml-1 font-medium">
            {errors.preferredCourse.message as string}
          </p>
        )}
      </div>

      <OptionSelect
        id="budget"
        label="Budget range"
        options={BUDGETS}
        registerId="budget"
        register={register}
        errors={errors}
        icon={Wallet}
        placeholder="Your tuition budget"
      />

      <div className="grid md:grid-cols-2 gap-5">
        <OptionSelect
          id="contactPreference"
          label="Contact preference"
          options={CONTACT_PREFERENCES}
          registerId="contactPreference"
          register={register}
          errors={errors}
          icon={PhoneCall}
          placeholder="How should we reach you?"
        />

        <OptionSelect
          id="bestContactTime"
          label="Best contact time"
          options={CONTACT_TIMES}
          registerId="bestContactTime"
          register={register}
          errors={errors}
          icon={Clock}
          placeholder="When is the best time?"
        />
      </div>
    </div>
  );
};

export default AcademicProfileStep;
