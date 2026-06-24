import { useEffect, useRef, useState } from "react";
import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Hash, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "./ProjectsSection";
import { lang } from "@/helper/lang";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sections = [
  { id: "hero", label: { en: "Home", vi: "Trang chủ" } },
  { id: "about", label: { en: "About", vi: "Giới thiệu" } },
  { id: "experience", label: { en: "Experience", vi: "Kinh nghiệm" } },
  { id: "skills", label: { en: "Skills", vi: "Kỹ năng" } },
  { id: "projects", label: { en: "Projects", vi: "Dự án" } },
  { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
];

type FlatItem =
  | { kind: "section"; id: string }
  | { kind: "project"; slug: string };

export const SearchModal = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [open]);

  const q = query.trim().toLowerCase();

  const sectionResults = sections.filter(
    (s) => !q || lang(s.label).toLowerCase().includes(q)
  );
  const projectResults = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  const flat: FlatItem[] = [
    ...sectionResults.map((s) => ({ kind: "section" as const, id: s.id })),
    ...projectResults.map((p) => ({ kind: "project" as const, slug: p.slug })),
  ];

  const safeActive = Math.min(activeIndex, Math.max(0, flat.length - 1));

  const go = (item?: FlatItem) => {
    if (!item) return;
    onClose();
    if (item.kind === "project") {
      navigate(`/projects/${item.slug}`);
      return;
    }
    const scroll = () =>
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 90);
    } else {
      scroll();
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[safeActive]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh] bg-background/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={lang({ en: "Search", vi: "Tìm kiếm" })}
    >
      <div
        className="w-full max-w-xl bg-card border border-border rounded-xl shadow-lg overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={lang({
              en: "Search projects, sections...",
              vi: "Tìm dự án, mục...",
            })}
            aria-label={lang({ en: "Search", vi: "Tìm kiếm" })}
            className="flex-1 bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {flat.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              {lang({ en: "No results found.", vi: "Không có kết quả." })}
            </p>
          )}

          {sectionResults.length > 0 && (
            <div className="px-2">
              <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                {lang({ en: "Pages", vi: "Trang" })}
              </p>
              {sectionResults.map((s, i) => (
                <Row
                  key={"s-" + s.id}
                  active={i === safeActive}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => go(flat[i])}
                  icon={<Hash size={16} />}
                  label={lang(s.label)}
                />
              ))}
            </div>
          )}

          {projectResults.length > 0 && (
            <div className="px-2 mt-1">
              <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                {lang({ en: "Projects", vi: "Dự án" })}
              </p>
              {projectResults.map((p, i) => {
                const idx = sectionResults.length + i;
                return (
                  <Row
                    key={"p-" + p.slug}
                    active={idx === safeActive}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => go(flat[idx])}
                    icon={<FileText size={16} />}
                    label={p.title}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CornerDownLeft size={12} />
            {lang({ en: "to select", vi: "để chọn" })}
          </span>
          <span>↑ ↓ {lang({ en: "to navigate", vi: "để di chuyển" })}</span>
        </div>
      </div>
    </div>
  );
};

type RowProps = {
  active: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

const Row = ({ active, onMouseEnter, onClick, icon, label }: RowProps) => (
  <button
    type="button"
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-left transition-colors",
      active ? "bg-primary/15 text-foreground" : "text-foreground/80 hover:bg-secondary"
    )}
  >
    <span className="text-muted-foreground">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);