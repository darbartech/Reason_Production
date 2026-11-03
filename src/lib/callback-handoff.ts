const KEY = "reasons.callback.v1";

export type CallbackHandoff = {
  fullName: string;
  phone: string;
  preferredDestination: string;
};

export function saveHandoff(data: CallbackHandoff) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable: the user simply retypes */
  }
}

export function takeHandoff(): CallbackHandoff | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    const v = JSON.parse(raw);
    if (typeof v?.fullName !== "string") return null;
    return v;
  } catch {
    return null;
  }
}
