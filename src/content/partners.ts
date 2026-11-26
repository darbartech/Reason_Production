export type Partner = {
  name: string;
  country?: string;
  url?: string;
  /** Must match a verified id in src/content/proof.ts before the partner renders. */
  proofId: string;
};

// Owner-supplied only. Add an institution after the written agreement exists and
// a matching verified entry has been added to proof.ts.
export const partners: Partner[] = [];
