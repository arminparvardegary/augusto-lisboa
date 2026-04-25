import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "ochre";

const toneMap: Record<Tone, string> = {
  light: "bg-cream text-espresso border-y border-espresso/15",
  dark: "bg-espresso text-cream border-y border-cream/15",
  ochre: "bg-ochre text-ink border-y border-ink/15",
};

export default function MarqueeBand({
  items,
  tone = "light",
}: {
  items: string[];
  tone?: Tone;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={cn("overflow-hidden py-6 md:py-8", toneMap[tone])}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="heading-display text-4xl md:text-6xl px-8 md:px-14 whitespace-nowrap"
          >
            {item}
            <span className="script-accent text-ochre ml-8 md:ml-14 select-none">
              &
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
