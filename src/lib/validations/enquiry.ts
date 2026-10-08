import { z } from "zod";

export const PREFERRED_DESTINATIONS = [
  "Australia",
  "Canada",
  "United Kingdom",
  "USA",
  "New Zealand",
  "Japan",
  "Europe",
  "Not sure / Need guidance",
] as const;

export const PREFERRED_INTAKES = [
  "Next available intake",
  "2027 February",
  "2027 May",
  "2027 September",
  "Not sure",
] as const;

export const HIGHEST_EDUCATION = [
  "SEE",
  "+2",
  "Bachelor",
  "Master",
  "Other",
] as const;

export const RESULT_TYPES = [
  "GPA",
  "Percentage",
  "Division",
  "Not sure",
] as const;

export const ENGLISH_TESTS = [
  "IELTS",
  "PTE",
  "TOEFL",
  "Duolingo",
  "Not taken yet",
  "Not sure",
] as const;

export const STUDY_LEVELS = [
  "Diploma",
  "Bachelor",
  "Master",
  "PhD",
  "Not sure",
] as const;

export const BUDGETS = [
  "Under NPR 15 lakh",
  "NPR 15–25 lakh",
  "NPR 25–40 lakh",
  "NPR 40+ lakh",
  "Need guidance",
] as const;

export const CONTACT_PREFERENCES = [
  "Phone call",
  "WhatsApp",
  "Office visit",
  "Online meeting",
] as const;

export const CONTACT_TIMES = [
  "Morning",
  "Afternoon",
  "Evening",
  "Any time",
] as const;

const nepalPhoneRegex = /^(\+?977[-\s]?)?9[78][0-9]{8}$|^(01[-\s]?)?[45][0-9]{6,7}$/;

const step1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(
      nepalPhoneRegex,
      "Please enter a valid Nepali mobile or landline number"
    ),
  email: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || z.string().email().safeParse(v).success,
      "Please enter a valid email address"
    ),
  preferredDestination: z.enum(PREFERRED_DESTINATIONS, {
    message: "Please select a preferred destination",
  }),
  preferredIntake: z.enum(PREFERRED_INTAKES, {
    message: "Please select a preferred intake",
  }),
});

const step2Schema = z
  .object({
    highestEducation: z.enum(HIGHEST_EDUCATION, {
      message: "Please select your highest education",
    }),
    resultType: z.enum(RESULT_TYPES, {
      message: "Please select a result type",
    }),
    resultValue: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (v) => {
          if (!v) return true;
          return v.length <= 50;
        },
        "Result is too long"
      ),
    englishTest: z.enum(ENGLISH_TESTS, {
      message: "Please select an English test option",
    }),
    englishScore: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (v) => {
          if (!v) return true;
          return v.length <= 20;
        },
        "Score is too long"
      ),
    studyLevel: z.enum(STUDY_LEVELS, {
      message: "Please select your preferred study level",
    }),
    preferredCourse: z
      .string()
      .max(200, "Course/subject is too long")
      .optional()
      .or(z.literal("")),
    budget: z.enum(BUDGETS, {
      message: "Please select a budget range",
    }),
    contactPreference: z.enum(CONTACT_PREFERENCES, {
      message: "Please select a contact preference",
    }),
    bestContactTime: z.enum(CONTACT_TIMES, {
      message: "Please select the best time to contact you",
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.resultType !== "Not sure" &&
      data.resultType !== undefined &&
      data.resultValue !== undefined &&
      data.resultValue !== null
    ) {
      const trimmed = data.resultValue.trim();
      if (trimmed.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["resultValue"],
          message: `Please enter your ${data.resultType.toLowerCase()} result, or choose "Not sure" as the result type`,
        });
      }
    }
    const scoredTests = ["IELTS", "PTE", "TOEFL", "Duolingo"] as const;
    if (scoredTests.includes(data.englishTest as (typeof scoredTests)[number])) {
      const trimmed = (data.englishScore ?? "").trim();
      if (trimmed.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["englishScore"],
          message: `Please enter your ${data.englishTest} score, or choose "Not taken yet" / "Not sure" instead`,
        });
      }
    }
  });

export const enquirySchema = step1Schema.merge(step2Schema).extend({
  sourcePage: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  submittedAt: z.string().optional(),
  // Honeypot (bots fill it, humans never see it)
  website: z.string().optional(),
});

export type EnquiryStep1 = z.infer<typeof step1Schema>;
export type EnquiryStep2 = z.infer<typeof step2Schema>;
export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const enquiryStep1Schema = step1Schema;
export const enquiryStep2Schema = step2Schema;
