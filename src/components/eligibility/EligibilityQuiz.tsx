"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Photo from "@/components/Photo";
import { countries, countryPhotoSlug } from "@/content/countries";
import {
  BUDGETS,
  PREFERRED_DESTINATIONS,
  STUDY_LEVELS,
} from "@/lib/validations/enquiry";
import { saveQuizHandoff } from "@/lib/quiz-handoff";

const FIELDS = [
  "Business & management",
  "IT & computing",
  "Engineering",
  "Health & sciences",
  "Humanities & social sciences",
  "Design & creative arts",
  "Hospitality & tourism",
  "Not sure yet",
] as const;

const ENGLISH_OPTIONS = [
  "I have a test result",
  "I'm booked to take the test",
  "I haven't taken a test yet",
] as const;

type QuestionKey = "studyLevel" | "destination" | "field" | "english" | "budget";

type Answers = Partial<Record<QuestionKey, string>>;

const questions: {
  key: QuestionKey;
  title: string;
  hint?: string;
  options: readonly string[];
}[] = [
  {
    key: "studyLevel",
    title: "What level are you planning to study?",
    options: STUDY_LEVELS,
  },
  {
    key: "destination",
    title: "Which country are you considering?",
    hint: "It's fine to be undecided. Choose “Not sure yet”.",
    options: PREFERRED_DESTINATIONS,
  },
  {
    key: "field",
    title: "Which field interests you most?",
    options: FIELDS,
  },
  {
    key: "english",
    title: "Where are you with your English test?",
    hint: "IELTS, PTE, TOEFL or Duolingo.",
    options: ENGLISH_OPTIONS,
  },
  {
    key: "budget",
    title: "What budget band are you working with?",
    hint: "A rough range is enough for a first conversation.",
    options: BUDGETS,
  },
];

const COUNTRY_SLUGS: Record<string, string> = {
  USA: "usa",
  Canada: "canada",
  "United Kingdom": "uk",
  Australia: "australia",
  "New Zealand": "new-zealand",
  Germany: "germany",
  Europe: "europe",
  Japan: "japan",
};

const englishToStatus = (value?: string) => {
  if (value === ENGLISH_OPTIONS[0]) return "taken" as const;
  if (value === ENGLISH_OPTIONS[1]) return "booked" as const;
  if (value === ENGLISH_OPTIONS[2]) return "not-yet" as const;
  return undefined;
};

export default function EligibilityQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasFocusedOnce = useRef(false);
  const question = questions[step];
  const progress = done ? 100 : Math.round(((step + 1) / questions.length) * 100);

  useEffect(() => {
    if (!hasFocusedOnce.current) {
      hasFocusedOnce.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step, done]);

  const choose = (key: QuestionKey, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const next = () => {
    if (!answers[question.key]) {
      setError("Choose one option to continue.");
      return;
    }
    if (step === questions.length - 1) {
      setDone(true);
      return;
    }
    setStep((current) => current + 1);
  };

  const back = () => {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  };

  const reset = () => {
    setAnswers({});
    setError("");
    setStep(0);
    setDone(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    saveQuizHandoff({
      studyLevel: answers.studyLevel,
      preferredDestination: answers.destination,
      fieldOfInterest: answers.field,
      englishStatus: englishToStatus(answers.english),
      budget: answers.budget,
    });
    router.push("/contact#enquiry");
  };

  const selectedSlug = answers.destination ? COUNTRY_SLUGS[answers.destination] : undefined;
  const guides = selectedSlug
    ? [
        ...countries.filter((country) => country.slug === selectedSlug),
        ...countries.filter((country) => country.slug !== selectedSlug),
      ].slice(0, 3)
    : countries.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm text-muted">
          <span>{done ? "Your next step" : `Question ${step + 1} of ${questions.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-primary-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Eligibility check progress"
        >
          <div
            className="h-full bg-crimson transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {done ? (
        <div className="card p-6 sm:p-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-balance focus:outline-none">
            Start with these guides
          </h2>
          <p className="lead mt-4">
            This is a starting point, not an eligibility decision. Institutions and governments set the real
            requirements.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4 text-sm">
            {[
              ["Level", answers.studyLevel],
              ["Country", answers.destination],
              ["Field", answers.field],
              ["English test", answers.english],
              ["Budget", answers.budget],
            ].map(([label, value]) =>
              value ? (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="font-semibold text-primary">{value}</dd>
                </div>
              ) : null
            )}
          </dl>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {guides.map((country) => (
              <li key={country.slug}>
                <Link
                  href={`/countries/${country.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  <Photo
                    name={`dest-${countryPhotoSlug(country.slug)}`}
                    alt=""
                    widths={[640]}
                    sizes="(min-width: 640px) 30vw, 100vw"
                    ratio="aspect-[16/10]"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base group-hover:text-accent">{country.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                      {country.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Read the {country.name} guide
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" className="btn-primary btn-lg w-full sm:w-auto">
              Book a free session
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn-ghost min-h-11 w-full sm:w-auto"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Retake the quiz
            </button>
          </form>

          <p className="mt-4 text-sm text-muted">
            Your answers stay on your device unless you book.
          </p>
        </div>
      ) : (
        <div className="card p-6 sm:p-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-balance focus:outline-none">
            {question.title}
          </h2>
          {question.hint && <p className="mt-2 text-sm text-muted">{question.hint}</p>}

          <fieldset className="mt-6">
            <legend className="sr-only">{question.title}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[question.key] === option;
                return (
                  <label
                    key={option}
                    className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      selected
                        ? "border-accent bg-accent/5"
                        : "border-line bg-white hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.key}
                      value={option}
                      checked={selected}
                      onChange={() => choose(question.key, option)}
                      className="h-4 w-4 shrink-0 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    />
                    <span className="text-[0.9375rem] font-medium text-primary">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div aria-live="polite">
            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-crimson">
                {error}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
            {step > 0 ? (
              <button type="button" onClick={back} className="btn-secondary min-h-11">
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
            ) : (
              <span />
            )}
            <button type="button" onClick={next} className="btn-primary">
              {step === questions.length - 1 ? "See my next step" : "Continue"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
