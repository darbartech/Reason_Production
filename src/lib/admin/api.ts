export type Role = "ADMIN" | "COUNSELOR";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export type Stage =
  | "NEW"
  | "CONTACTED"
  | "COUNSELLING"
  | "DOCUMENTATION"
  | "APPLICATION"
  | "OFFER_RECEIVED"
  | "VISA_PROCESSING"
  | "VISA_APPROVED"
  | "VISA_REFUSED"
  | "CLOSED"
  | "LOST";

export interface DashboardStats {
  newLeads: number;
  followUpsDue: number;
  total: number;
  thisMonth: number;
  dueToday: number;
  overdue: number;
  upcomingNext7: number;
  noFollowup: number;
}

export interface Enquiry {
  id: string;
  leadNumber: string;
  fullName: string;
  phone: string;
  email: string | null;
  country: string;
  intake: string;
  studyLevel: string;
  course: string | null;
  budget: string;
  educationLevel: string;
  resultType: string;
  result: string | null;
  englishTest: string;
  englishScore: string | null;
  contactMethod: string;
  contactTime: string;
  message: string | null;
  sourcePage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  status: string;
  stage: Stage | string | null;
  priority: string;
  assignedTo: string | null;
  assignedToName: string | null;
  nextFollowUpAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: "RECEIVED" | "STATUS_CHANGED" | "STAGE_CHANGED" | "PRIORITY_CHANGED" | "ASSIGNED" | "FOLLOW_UP_SET" | "NOTE_ADDED";
  actorName: string | null;
  detail: { from?: string | null; to?: string | null };
  createdAt: string;
}

export interface EnquiryDetailData {
  enquiry: Enquiry;
  notes: Note[];
  timeline: TimelineEvent[];
}

export interface Counselor {
  id: string;
  name: string;
  role: Role;
}

export interface Meta {
  statuses: string[];
  stages: Stage[] | string[];
  priorities: string[];
  countries: string[];
  intakes: string[];
  counselors: Counselor[];
  allCounselors: Counselor[];
}

export interface LabelCount {
  label: string;
  value: number;
}

export interface FunnelStage {
  key: string;
  label: string;
  value: number;
}

export interface Analytics {
  byCountry: LabelCount[];
  byStatus: LabelCount[];
  byIntake: LabelCount[];
  bySource: LabelCount[];
  byCampaign: LabelCount[];
  monthly: LabelCount[];
  funnel: FunnelStage[];
  dueNow: Enquiry[];
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
let csrfToken: string | null = null;

export function setCsrfToken(token: string | null) {
  csrfToken = token;
}

export function clearCsrfToken() {
  csrfToken = null;
}

export function goToLogin() {
  if (typeof window !== "undefined") window.location.replace("/admin/login");
}

export async function api<T>(
  path: string,
  init: { method?: string; body?: unknown; redirectOn401?: boolean } = {}
): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();

  const headers: Record<string, string> = {};

  if (init.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    if (!csrfToken) {
      throw new ApiError(
        "Security token is missing. Please refresh the page and sign in again.",
        403
      );
    }

    headers["x-csrf-token"] = csrfToken;
  }

  let res: Response;

  try {
    res = await fetch(`/api/admin${path}`, {
      method,
      credentials: "same-origin",
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Could not reach the server. Check your connection and try again.",
      0
    );
  }

  let data: { message?: string } & Record<string, unknown> = {};

  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }

  if (res.status === 401 && init.redirectOn401 !== false) {
    clearCsrfToken();
    goToLogin();

    throw new ApiError(
      "Your session has expired. Please sign in again.",
      401
    );
  }

  if (!res.ok) {
    throw new ApiError(
      data.message || "Something went wrong. Please try again.",
      res.status
    );
  }

  return data as T;
}