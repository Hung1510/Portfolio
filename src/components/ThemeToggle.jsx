import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [langMode, setLangMode] = useState("en");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
      document.documentElement.classList.add("light");
    } else {
      setIsLightMode(false);
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    const storedLang = localStorage.getItem("language") || "en";
    setLangMode(storedLang);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLightMode(true);
    }
  };

  const toggleLang = () => {
    const newLang = langMode === "en" ? "vi" : "en";
    localStorage.setItem("language", newLang);
    setLangMode(newLang);
    window.location.reload();
  };

  const Buttons = ({ className }) => (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={toggleLang}
        className={cn(
          "p-2 text-lg font-semibold transition-colors",

          // Light mode
          isLightMode
            ? "text-gray-800 hover:text-blue-600"
            : "text-gray-300 hover:text-yellow-400",

          // Highlight active language
          langMode === "en" ? "opacity-80" : "opacity-80",
        )}
      >
        {langMode === "en" ? "VI" : "EN"}
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full focus:outline-hidden"
      >
        {isLightMode ? (
          <Moon className="h-6 w-6 text-blue-900" />
        ) : (
          <Sun className="h-6 w-6 text-yellow-300" />
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <Buttons className="md:hidden" />

      {/* Desktop */}
      <Buttons className="hidden md:flex fixed top-5 right-5 z-50" />
    </>
  );
};
