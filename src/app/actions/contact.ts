"use server";

import { contactSchema, ContactFormData } from "@/lib/validations/contact";

export async function submitContact(data: ContactFormData) {
  // Simulate a delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validate the data again server-side
  const validation = contactSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
    };
  }

  // Here you would normally send an email or save to a database
  // Example: await sendEmail(data);
  console.log("Contact form submission received:", validation.data);

  return {
    success: true,
    message: "Thank you for reaching out! We'll get back to you soon.",
  };
}
