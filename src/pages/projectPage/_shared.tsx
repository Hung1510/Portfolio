import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PROJECT-PAGE PRIMITIVES
//
// Every dedicated detail page (Tethys, Quiz Platform, Code Navigator, Somnium
// Weaver, Shorekeeper, Smart Advisor) used to carry its own copy of these.
// They now live here once, so changing the look of a card or the theming logic
// is a one-file edit instead of a six-file one.
//
// Each page still declares its own `Icons` map so only the lucide icons that
// page actually uses get bundled; the map is passed into <FeatureCard icons=…>.
// ─────────────────────────────────────────────────────────────────────────────

export type Feature = {
  num: string;
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  features: string[];
  dotColor: string;
  tags: string[];
  tagDark: string;
  tagLight: string;
  /** Screenshot path. Provide either `img` or `code`. */
  img?: string;
  /** Terminal snippet. Used when `img` is absent. */
  code?: string;
};

/** Tracks the `light` class on <html>, which is how the site toggles theme. */
export function useTheme() {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isLight;
}

export function Pill({
  label,
  isLight,
}: {
  label: string;
  isLight: boolean;
}) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[11px] tracking-widest uppercase border mb-3 font-semibold ${
        isLight
          ? "bg-blue-50 border-blue-200 text-blue-600"
          : "bg-blue-900/30 border-blue-400/25 text-sky-400"
      }`}
    >
      {label}
    </span>
  );
}

export function SectionTitle({
  pre,
  accent,
  desc,
  isLight,
}: {
  pre: string;
  accent: string;
  desc: string;
  isLight: boolean;
}) {
  return (
    <>
      <h2
        className={`text-3xl font-black mb-2 ${
          isLight ? "text-slate-800" : "text-white"
        }`}
      >
        {pre} <span className="text-sky-500">{accent}</span>
      </h2>
      <p
        className={`text-sm leading-relaxed mb-10 max-w-xl mx-auto text-center ${
          isLight ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {desc}
      </p>
    </>
  );
}

/** Screenshot with a graceful fallback: shows the expected path if the file is missing. */
export function Screenshot({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center bg-slate-900/30 px-4">
        <span className="text-[11px] font-mono text-slate-500 text-center">
          {src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className="w-full h-full object-cover object-top"
      style={{ maxHeight: "260px" }}
    />
  );
}

export function CodeTerminal({
  code,
  label = "zsh",
}: {
  code: string;
  label?: string;
}) {
  return (
    <div className="h-full flex flex-col bg-[#0b1120] border-r border-white/5">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] font-mono text-slate-500">{label}</span>
      </div>
      <pre className="flex-1 overflow-x-auto px-4 py-4 text-[12px] leading-relaxed font-mono text-slate-300 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

export function FeatureCard({
  page,
  isLight,
  icons,
  terminalLabel,
}: {
  page: Feature;
  isLight: boolean;
  icons: Record<string, LucideIcon>;
  terminalLabel?: string;
}) {
  const IconComponent = icons[page.icon];

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-300 mb-14 ${
        isLight
          ? "border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-blue-300"
          : "border-white/10 bg-white/[0.03] hover:border-blue-400/30 hover:shadow-[0_0_40px_rgba(21,101,192,0.12)]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-4 px-7 py-5 border-b ${
          isLight
            ? "border-slate-100 bg-slate-50"
            : "border-white/5 bg-white/[0.02]"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${page.iconBg}`}
        >
          {IconComponent && <IconComponent />}
        </div>
        <div>
          <h3
            className={`font-bold text-base ${
              isLight ? "text-slate-800" : "text-white"
            }`}
          >
            {page.title}
          </h3>
          <p
            className={`text-xs mt-0.5 ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {page.subtitle}
          </p>
        </div>
        <span
          className={`ml-auto font-black text-5xl select-none ${
            isLight ? "text-slate-200" : "text-white/5"
          }`}
        >
          {page.num}
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Visual: screenshot OR terminal snippet */}
        <div
          className={`border-b md:border-b-0 md:border-r overflow-hidden ${
            isLight ? "border-slate-100" : "border-white/5"
          }`}
        >
          {page.img ? (
            <Screenshot src={page.img} alt={page.title} />
          ) : (
            <CodeTerminal code={page.code ?? ""} label={terminalLabel} />
          )}
        </div>

        {/* Info */}
        <div className="p-7">
          <ul className="flex flex-col gap-3 mb-5">
            {page.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${page.dotColor}`}
                />
                {f}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {page.tags.map((t) => (
              <span
                key={t}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  isLight ? page.tagLight : page.tagDark
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}