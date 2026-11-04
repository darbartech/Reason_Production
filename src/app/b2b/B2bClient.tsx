"use client";

import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Loader2, MessageSquare, Send, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";

const b2bFormSchema = z.object({
  contactPerson: z.string().min(2, "Contact person is required"),
  organization: z.string().min(2, "Organisation name is required"),
  email: z.string().email("Please enter a valid email"),
  partnerType: z.string().min(1, "Please select a partner type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type B2BFormData = z.infer<typeof b2bFormSchema>;

const steps = [
  "Send us a short message.",
  "We review your profile.",
  "We agree terms in writing.",
  "We start with a small number of files.",
];

const expectations = [
  "Every file checked by two team members before it is submitted.",
  "Written updates at each stage.",
  "One named contact.",
];

export default function B2bClient() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<B2BFormData>({
    resolver: zodResolver(b2bFormSchema),
  });

  const onSubmit = async (data: B2BFormData) => {
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        toast.error("This form is temporarily unavailable. Please call or WhatsApp us instead.");
        return;
      }
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("contactPerson", data.contactPerson);
      formData.append("organization", data.organization);
      formData.append("email", data.email);
      formData.append("partnerType", data.partnerType);
      formData.append("message", data.message);
      formData.append("subject", "New partner enquiry");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you. We'll reply by email.");
        reset();
      } else {
        toast.error(result.message || "Something went wrong. Please try again later.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-white">
      <PageHero
        title="Partner with Reasons Education"
        intro="We work with institutions and local counsellors who want accurate, well-documented student files."
        image={{
          name: "b2b-meeting",
          alt: "Two people shaking hands after a meeting",
        }}
        ctaLabel="Talk to our team"
      />

      <section className="section-padding" aria-labelledby="audiences-heading">
        <div className="container-custom">
          <h2 id="audiences-heading" className="sr-only">
            Who we work with
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="card p-6 sm:p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
                <Building2 size={22} className="text-crimson" aria-hidden="true" />
              </div>
              <h2 className="text-primary">For institutions</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                We help you meet students who fit your courses. We pre-check each application against your entry
                requirements and report on every stage.
              </p>
            </article>

            <article className="card p-6 sm:p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
                <Users size={22} className="text-crimson" aria-hidden="true" />
              </div>
              <h2 className="text-primary">For local counsellors</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                Use our document checklists and quality checks for your own students. We agree the model and any
                fees in writing before we start.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="how-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="How it works" id="how-heading" title="Four steps, in writing." />
            <ol className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span aria-hidden="true" className="font-heading text-crimson">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-primary">What partners can expect</h2>
            <ul className="mt-4 space-y-3">
              {expectations.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-ink">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="form-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Get in touch"
              id="form-heading"
              title="Tell us about your organisation."
              intro="Send a short message. We review every enquiry and reply by email."
            />
            <div className="mt-8 space-y-3">
              <p className="flex items-center gap-3 text-sm text-ink">
                <MessageSquare size={16} className="text-crimson" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="font-semibold text-accent hover:underline">
                  {company.email}
                </a>
              </p>
              <p className="text-sm text-muted">
                {company.address.street}, {company.address.city}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="organization" className="mb-1.5 block text-sm font-medium text-primary">
                    Organisation
                  </label>
                  <input
                    id="organization"
                    {...register("organization")}
                    type="text"
                    autoComplete="organization"
                    className={`h-12 w-full rounded-lg border px-4 text-base text-primary focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.organization ? "border-red-500" : "border-line"
                    }`}
                  />
                  {errors.organization && <p className="mt-1 text-xs text-red-600">{errors.organization.message}</p>}
                </div>
                <div>
                  <label htmlFor="contactPerson" className="mb-1.5 block text-sm font-medium text-primary">
                    Contact person
                  </label>
                  <input
                    id="contactPerson"
                    {...register("contactPerson")}
                    type="text"
                    autoComplete="name"
                    className={`h-12 w-full rounded-lg border px-4 text-base text-primary focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.contactPerson ? "border-red-500" : "border-line"
                    }`}
                  />
                  {errors.contactPerson && <p className="mt-1 text-xs text-red-600">{errors.contactPerson.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="b2b-email" className="mb-1.5 block text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    id="b2b-email"
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className={`h-12 w-full rounded-lg border px-4 text-base text-primary focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.email ? "border-red-500" : "border-line"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="partnerType" className="mb-1.5 block text-sm font-medium text-primary">
                    Type
                  </label>
                  <select
                    id="partnerType"
                    {...register("partnerType")}
                    className={`h-12 w-full rounded-lg border bg-white px-4 text-base text-primary focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.partnerType ? "border-red-500" : "border-line"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Institution">Institution</option>
                    <option value="Local counsellor">Local counsellor</option>
                  </select>
                  {errors.partnerType && <p className="mt-1 text-xs text-red-600">{errors.partnerType.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="b2b-message" className="mb-1.5 block text-sm font-medium text-primary">
                  Message
                </label>
                <textarea
                  id="b2b-message"
                  {...register("message")}
                  rows={5}
                  className={`w-full rounded-lg border px-4 py-3 text-base text-primary focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.message ? "border-red-500" : "border-line"
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-sm text-muted">
              For student enquiries,{" "}
              <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                book a free session <ArrowRight size={14} aria-hidden="true" />
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
