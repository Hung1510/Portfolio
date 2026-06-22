import { ArrowRight, ExternalLink, Github, FileText } from "lucide-react";
import { lang } from "../helper/lang";

const projects = [
  {
    id: 1,
    title: "EIU/CIT Smart Learning Advisor",
    description: lang({
      vi: "Ứng dụng web tích hợp AI giúp theo dõi GPA, trực quan hóa lộ trình học và cung cấp thông tin môn học cho sinh viên EIU.",
      en: "An AI-powered web application for tracking GPA, visualizing learning paths, and providing course insights for EIU students.",
    }),
    image: "/projects/smartadvisor.png",
    tags: ["Express.js", "Node.js", "EJS", "Bootstrap"],
    demoUrl: "https://smart-learning-jvakdob3j-datlys-projects.vercel.app/login",
    githubUrl: "https://github.com/Ly-Dat/SmartLearning",
    detailUrl: "/projects/smart-learning-advisor",
  },
  {
    id: 2,
    title: "Quiz & Interview Practice Platform",
    description: lang({
      vi: "Nền tảng luyện tập phỏng vấn và học IT full-stack sử dụng React và NestJS, hỗ trợ tạo quiz động, chấm điểm real-time và tích hợp AI tạo câu hỏi.",
      en: "A full-stack quiz platform using React and NestJS for interview practice and IT learning, featuring dynamic quiz creation, real-time scoring, and AI-powered question generation.",
    }),
    image: "/projects/quizApp.png",
    tags: ["React", "NestJS", "MongoDB", "REST API"],
    demoUrl: "https://interview-quizz-software.vercel.app/",
    githubUrl: "https://github.com/Hung1510/Capstone_Project_Quizz",
    detailUrl: "#", // no detail page yet — icon stays hidden until a real one exists
  },
  {
    id: 3,
    title: "Expense Tracker",
    description: lang({
      vi: "Ứng dụng theo dõi chi tiêu cá nhân và quản lý ngân sách, cho phép người dùng ghi nhận, phân loại và theo dõi các khoản chi tiêu một cách hiệu quả.",
      en: "An application for tracking personal expenses and managing budgets, enabling users to record, categorize, and monitor their spending effectively.",
    }),
    image: "/projects/expensetracker.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://expense-tracker-lemon-omega.vercel.app/",
    githubUrl: "https://github.com/LeTrietHuan-Student/Project-CSW-303.git",
    detailUrl: "#", // no detail page yet — icon stays hidden until a real one exists
  },
  {
    id: 4,
    title: "Galaxy Universe Discord Bot",
    description: lang({
      vi: "Bot Discord đa hệ thống cho cộng đồng người Việt ~350 thành viên, gồm 10 hệ thống (Economy, Games, Moderation, Ticket, Level) với giao diện chủ đề vũ trụ và phản hồi tiếng Việt.",
      en: "A multi-system Discord bot for a ~350-member Vietnamese community with 10 systems (Economy, Games, Moderation, Ticket, Level), a cosmic space theme, and Vietnamese-language responses.",
    }),
    // 📌 IMAGE: drop your screenshot in public/projects/ then set the path here (e.g. "/projects/discordBot.png")
    image: "/projects/discordBot.png",
    tags: ["TypeScript", "discord.js", "SQLite", "Railway"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/Galaxy_discordBot",
    detailUrl: "#",
  },
  {
    id: 5,
    title: "Multi-task Detection of Regional Discrimination on Vietnamese Social Media",
    description: lang({
      vi: "Hệ thống ML đa nhiệm phát hiện phân biệt vùng miền trong văn bản mạng xã hội tiếng Việt, bền vững trước biến thể Telex/làm nhiễu, triển khai dưới dạng REST API (FastAPI) phục vụ kiểm duyệt nội dung theo Nghị định 147/2024.",
      en: "A multi-task ML system for detecting regional discrimination in Vietnamese social media text, robust to Telex/obfuscated variants, deployed as a FastAPI REST API for content moderation aligned with Decree 147/2024.",
    }),
    // 📌 IMAGE: drop your screenshot in public/projects/ then set the path here (e.g. "/projects/regionResearch.png")
    image: "/projects/regionResearch.png",
    tags: ["Python", "Machine Learning", "NLP", "FastAPI"],
    demoUrl: "#",
    githubUrl: "#",
    detailUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          {lang({ vi: "Dự án", en: "Featured" })}{" "}
          <span className="text-primary">
            {" "}
            {lang({ vi: "nổi bật", en: "Projects" })}{" "}
          </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {lang({
            vi: "Đây là một số dự án gần đây của tôi, nơi tôi vừa học vừa phát triển thông qua phương pháp học qua dự án. Mỗi dự án là một cơ hội để thử nghiệm, khám phá và vượt qua những thử thách mới.",
            en: "Here are some of my recent projects, where I learn and build through a project-based approach. Each project is an opportunity to experiment, explore, and overcome new challenges.",
          })}
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
                    {project.detailUrl && project.detailUrl !== "#" && (
                      <a
                        href={project.detailUrl}
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        <FileText size={20} />
                      </a>
                    )}
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
            {lang({ vi: "Xem GitHub của tôi", en: "Check My GitHub" })}{" "}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};