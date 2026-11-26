export const pricing = {
  ielts: { price: "Rs. 8,000", weeks: 6 },
  pte: { price: "Rs. 10,000", weeks: 4 },
} as const;

export const ieltsLabel = `IELTS — ${pricing.ielts.price} for ${pricing.ielts.weeks} weeks`;
export const pteLabel = `PTE — ${pricing.pte.price} for ${pricing.pte.weeks} weeks`;
