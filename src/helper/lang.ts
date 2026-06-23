type LangStrings = { vi: string; en: string };

export const lang = ({ vi, en }: LangStrings): string => {
  const current = localStorage.getItem("language") || "en";
  return current === "vi" ? vi : en;
};
