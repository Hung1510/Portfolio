import type { ComponentType } from "react";
import SmartAdvisorDetail from "./SmartAdvisorDetail";
import TethysDetail from "./TethysDetail";
import QuizPlatformDetail from "./QuizPlatformDetail";

// ─────────────────────────────────────────────────────────────────────────────
// DEDICATED DETAIL-PAGE REGISTRY
//
// Map a project `slug` (from the projects array in ProjectsSection.tsx) to its
// own custom detail-page component.
//
// • A slug listed here  -> renders its dedicated component.
// • A slug NOT listed    -> falls back to the generic <ProjectBlog />, built
//                           from that slug's entry in ProjectBlogs.ts.
//
// To add a dedicated page later: create the component in this folder, import it
// above, and add one line here. No changes to App.tsx are needed.
// ─────────────────────────────────────────────────────────────────────────────
export const detailPages: Record<string, ComponentType> = {
  "smart-learning-advisor": SmartAdvisorDetail,
  "tethys": TethysDetail,
  "quiz-platform": QuizPlatformDetail,
};