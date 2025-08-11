import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(false);

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

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outline-hidden"
      )}
    >
      {isLightMode ? (
        <Moon className="h-6 w-6 text-blue-900" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-300" />
      )}
    </button>
  );
};
