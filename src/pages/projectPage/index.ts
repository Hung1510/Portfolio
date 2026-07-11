import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEDICATED DETAIL-PAGE REGISTRY (code-split)
//
// Map a project `slug` (from the projects array in ProjectsSection.tsx) to its
// own custom detail-page component.
//
// • A slug listed here  -> renders its dedicated component.
// • A slug NOT listed    -> falls back to the generic <ProjectBlog />, built
//                           from that slug's entry in ProjectBlogs.ts.
//
// Each page is lazy()-loaded, so Vite emits it as its own chunk and the
// homepage no longer ships the code for six project pages nobody has opened.
//
// ⚠️ Whatever renders these MUST be wrapped in <Suspense fallback={…}>, or
//    React will throw. See ProjectPage.tsx.
//
// To add a dedicated page later: add one loader line to `loaders` below.
// No changes to App.tsx are needed.
// ─────────────────────────────────────────────────────────────────────────────

type Loader = () => Promise<{ default: ComponentType }>;

// The single source of truth. Kept separate from `detailPages` so the same
// loader can be reused for prefetching without touching React internals.
const loaders: Record<string, Loader> = {
  "smart-learning-advisor": () => import("./SmartAdvisorDetail"),
  "tethys": () => import("./TethysDetail"),
  "quiz-platform": () => import("./QuizPlatformDetail"),
  "code-navigator": () => import("./CodeNavigatorDetail"),
  "somnium-weaver": () => import("./SomniumWeaverDetail"),
  "shorekeeper-startup": () => import("./ShorekeeperStartupDetail"),
};

export const detailPages: Record<string, LazyExoticComponent<ComponentType>> =
  Object.fromEntries(
    Object.entries(loaders).map(([slug, load]) => [slug, lazy(load)]),
  );

/** True if this slug has a dedicated page (vs. the generic ProjectBlog fallback). */
export function hasDetailPage(slug: string): boolean {
  return slug in loaders;
}

const prefetched = new Set<string>();

/**
 * Warm a page's chunk before the user clicks, e.g. on card hover:
 *
 *   <a onMouseEnter={() => prefetchDetailPage(project.slug)} … />
 *
 * Fires the import at most once per slug, and stays silent on failure - a
 * failed prefetch is not an error, the real navigation will just load it.
 */
export function prefetchDetailPage(slug: string): void {
  if (prefetched.has(slug)) return;
  const load = loaders[slug];
  if (!load) return;
  prefetched.add(slug);
  void load().catch(() => prefetched.delete(slug));
}