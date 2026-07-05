import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Home } from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { projects } from "./components/ProjectsSection";
import { detailPages } from "./pages/projectPage";

// Detail pages are loaded on demand, so they don't weigh down the landing page.
const ProjectBlog = lazy(() =>
  import("./pages/ProjectBlog").then((m) => ({ default: m.ProjectBlog }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);
const BlogPost = lazy(() =>
  import("./pages/BlogPost").then((m) => ({ default: m.BlogPost }))
);

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route index element={<Home />} />

            {/* Dev-log / blog posts, rendered by slug from BlogPosts.ts */}
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Project detail routes are generated from the projects array.
                A project with a slug listed in detailPages gets its dedicated
                page; every other slugged project gets the generic ProjectBlog. */}
            {projects
              .filter((project) => project.slug)
              .map((project) => {
                const CustomPage = detailPages[project.slug];
                return (
                  <Route
                    key={project.slug}
                    path={`/projects/${project.slug}`}
                    element={
                      CustomPage ? (
                        <CustomPage />
                      ) : (
                        <ProjectBlog slug={project.slug} />
                      )
                    }
                  />
                );
              })}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;