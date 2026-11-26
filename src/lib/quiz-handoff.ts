const KEY = "reasons.eligibility.v1";

export type QuizHandoff = {
  studyLevel?: string;
  preferredDestination?: string;
  fieldOfInterest?: string;
  englishStatus?: "taken" | "booked" | "not-yet";
  budget?: string;
};

export function saveQuizHandoff(data: QuizHandoff) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable: the contact form simply starts empty */
  }
}

export function takeQuizHandoff(): QuizHandoff | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    return value as QuizHandoff;
  } catch {
    return null;
  }
}
