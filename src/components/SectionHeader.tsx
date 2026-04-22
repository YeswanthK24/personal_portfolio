type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <p className="section-kicker mb-4">{eyebrow}</p>
      <h2 className="display-font text-4xl font-semibold tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="muted-copy mt-5 text-base leading-7 md:text-lg">{description}</p>
    </div>
  );
}
