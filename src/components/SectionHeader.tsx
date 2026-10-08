import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export default function SectionHeader({
  eyebrow, title, intro, align = "left", as: Tag = "h2", id,
}: Props) {
  const center = align === "center";
  return (
    <header className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <Tag id={id} className="text-balance">{title}</Tag>
      {intro && <p className={`lead mt-4 ${center ? "mx-auto" : ""}`}>{intro}</p>}
    </header>
  );
}
