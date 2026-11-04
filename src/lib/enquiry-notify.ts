// Tells the office a new lead has arrived. Web3Forms only accepts browser submissions on
// its free plan, so this runs after the API has already stored the enquiry — a mail failure
// never loses the lead (docs/03_PHASE_3_ENQUIRY_BACKEND_DATABASE.md, "Email notification").

export type OfficeNotifyData = {
  fullName: string;
  phone: string;
  email?: string;
  preferredDestination: string;
  studyLevel: string;
  sourcePage?: string;
  referrer?: string;
};

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export async function notifyOfficeByEmail(data: OfficeNotifyData, leadNumber?: string) {
  if (!WEB3FORMS_ACCESS_KEY) return;

  const form = new FormData();
  form.append("access_key", WEB3FORMS_ACCESS_KEY);
  form.append("subject", `New study enquiry — ${data.fullName} (${data.preferredDestination})`);
  form.append("from_name", "Reasons Education website");
  if (data.email) form.append("email", data.email);
  if (leadNumber) form.append("Reference", leadNumber);
  form.append("Name", data.fullName);
  form.append("Phone", data.phone);
  form.append("Destination", data.preferredDestination);
  form.append("Study level", data.studyLevel);
  if (data.sourcePage) form.append("Source page", data.sourcePage);
  if (data.referrer) form.append("Referrer", data.referrer);

  // A hung provider must not keep the student waiting on the thank-you page.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
  } catch {
    // Deliberately ignored: the lead is already saved.
  } finally {
    clearTimeout(timer);
  }
}
