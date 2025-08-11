import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Sales Analysis Project",
    description: "A data analysis & visualization of regional sales in the US state in 2017 and 2018 data to identify key drivers of revenue and profit across products, channels, customers, and geographic regions.",
    image: "/projects/saleanalytic.png",
    tags: ["Python", "Power BI", "Excel"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/SaleAnalysis_project.git",
  },
  {
    id: 2,
    title: "Movie Correlation Analysis",
    description:
      "An analysis to identify factors correlating with movie gross revenue, focusing on all related variables, including data cleaning, handling missing values and create data visualization",
    image: "/projects/moviecorrelation.png",
    tags: ["Python", "Power BI", "Excel"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/DataAnalysis_projects.git",
  },
  {
    id: 3,
    title: "EIU/CIT Smart Learning Advisor",
    description:
      "An AI integrated website application used to monitor EIU student GPA, Visualize the curriculum to illustrate compulsory courses, prerequisites, and key subjects, along with course information and reviews,in accordance with the training program.",
    image: "/projects/smartadvisor.png",
    tags: ["Express.js", "Node.js", "EJS ","Bootstrap"],
    demoUrl: "https://smartadvisor.eiu.com.vn/",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Expense Tracker",
    description:
      "A application for tracking personal expenses and managing budgets. It enables users to track, classify, and record their expenditure, giving them useful information.",
    image: "/projects/expensetracker.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/LeTrietHuan-Student/Project-CSW-303.git",
  },
  {
    id: 5,
    title: "Layoffs Data Analysis & EDA",
    description:
      "A comprehensive analysis of layoffs data, focusing on trends, patterns, and key factors contributing to workforce reductions.",
    image: "/projects/layoffs.png",
    tags: ["MySQL", "Excel", "PowerBI"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/SQL_DataCleaning_EDA.git",
  },
  {
    id: 6,
    title: "Tree Sale Dashboard",
    description:
      "Develop an interactive dashboard to analyze plant sales data, focusing on revenue trends, product performance, and key correlations between sales factors.",
    image: "/projects/plantsale.png",
    tags: ["Power BI", "Excel"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/PlantSale_PowerBI_project.git",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects, where I both learn and code at the same time using the project learning method.
          Each one was an opportunity to learn, experiment and a challenge for me to overcome.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={tag + idx}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Hung1510"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
