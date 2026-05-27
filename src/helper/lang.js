export const lang = ({ vi, en }) => {
  const current = localStorage.getItem("language") || "en";
  return current === "vi" ? vi : en;
};