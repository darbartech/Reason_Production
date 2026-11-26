export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  /** Base name for the Photo component, e.g. "team-rudesh" from src-photos/team/. */
  photo?: string;
  specialisations?: string[];
  languages?: string[];
  qualifications?: string[];
};

// Photos are generated placeholders from src-photos/team/. Replace them with
// real staff photos using the same base names; the card renders only what is present.
// Specialisations, languages and qualifications stay blank until the owner confirms them.
export const team: TeamMember[] = [
  { slug: "rudesh-khadgi", name: "Rudesh Khadgi", role: "Chief Executive Officer", photo: "team-rudesh" },
  { slug: "roji-barnawa", name: "Roji Barnawa", role: "Head of Operations", photo: "team-roji" },
  { slug: "rajesh-poudel", name: "Rajesh Poudel", role: "Senior Visa Officer", photo: "team-rajesh" },
  { slug: "anita-shrestha", name: "Anita Shrestha", role: "Lead IELTS Trainer", photo: "team-anita" },
  { slug: "suman-thapa", name: "Suman Thapa", role: "Content Writer", photo: "team-suman" },
];
