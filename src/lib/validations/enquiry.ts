import { z } from "zod";

export const PREFERRED_DESTINATIONS = [
  "United Kingdom",
  "USA",
  "Canada",
  "Australia",
  "New Zealand",
  "Germany",
  "Japan",
  "Europe",
  "Not sure yet",
] as const;

export const STUDY_LEVELS = [
  "Diploma",
  "Bachelor",
  "Master",
  "PhD",
  "Not sure",
] as const;

// Not part of the enquiry form: the eligibility quiz still offers a budget range
// and hands it back to the form, so the list lives on here.
export const BUDGETS = [
  "Under NPR 15 lakh",
  "NPR 15–25 lakh",
  "NPR 25–40 lakh",
  "NPR 40+ lakh",
  "Need guidance",
] as const;

const nepalPhoneRegex = /^(\+?977[-\s]?)?9[78][0-9]{8}$|^(01[-\s]?)?[45][0-9]{6,7}$/;

// The public form deliberately stays short — name, contact, destination and level.
// Everything else a counsellor needs is gathered on the first call.
export const enquirySchema = z.object({
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
  studyLevel: z.enum(STUDY_LEVELS, {
    message: "Please select your study level",
  }),
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

export type EnquiryFormData = z.infer<typeof enquirySchema>;
