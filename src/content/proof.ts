export type ProofItem = {
  id: string;
  claim: string;
  source: string;
  verified: boolean;
};

export const proof: ProofItem[] = [];

export const verified = proof.filter((p) => p.verified);
