import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import SmartAdvisorDetail from "./pages/projectPage/SmartAdvisorDetail";
import { ProjectBlog } from "./pages/ProjectBlog";
// import { ThemeToggle } from "./components/ThemeToggle";


function App() {
  return (
    <>
      <Toaster />
      {/* <ThemeToggle /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {/* Smart Learning keeps its dedicated detail page */}
          <Route path="/projects/smart-learning-advisor" element={<SmartAdvisorDetail />} />
          {/* All other projects use the generic blog page, keyed by numeric id */}
          <Route path="/projects/:id" element={<ProjectBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;