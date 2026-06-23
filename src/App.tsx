import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { ProjectBlog } from "./pages/ProjectBlog";
import { projects } from "./components/ProjectsSection";
import { detailPages } from "./pages/projectPage";
// import { ThemeToggle } from "./components/ThemeToggle";


function App() {
  return (
    <>
      <Toaster />
      {/* <ThemeToggle /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />

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
                    CustomPage ? <CustomPage /> : <ProjectBlog slug={project.slug} />
                  }
                />
              );
            })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
