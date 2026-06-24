import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import { lang } from "@/helper/lang";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// Live local time for Biên Hòa (ICT, UTC+7)
const LocalTime = () => {
  const [now, setNow] = useState("");
  useEffect(() => {
    const update = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="hidden lg:flex items-center font-mono text-xs text-muted-foreground tracking-wide whitespace-nowrap">
      BIÊN HÒA · {now} ICT
    </span>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd/Ctrl + K toggles the search palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border",
        isScrolled ? "py-3 shadow-xs" : "py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href={`/#hero`}
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> Gia Hưng </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center space-x-6">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={`/${item.href}`}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LocalTime />

            <button
              onClick={() => setSearchOpen(true)}
              aria-label={lang({ en: "Search", vi: "Tìm kiếm" })}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <Search size={16} />
              <kbd className="text-xs">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>

            <a
              href="/#contact"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {lang({ en: "Get in touch", vi: "Liên hệ" })} →
            </a>

            <ThemeToggle />
          </div>
        </div>

        {/* mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-foreground"
            aria-label={lang({ en: "Search", vi: "Tìm kiếm" })}
          >
            <Search size={20} />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col items-center space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={`/${item.href}`}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-1 px-5 py-2 rounded-md bg-primary text-primary-foreground text-base font-medium"
            >
              {lang({ en: "Get in touch", vi: "Liên hệ" })} →
            </a>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};