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
    detailUrl: "/projects/quiz-platform",
  },
  {
    id: 3,
    title: "Ceramic Website",
    description: lang({
      vi: "Website bán đồ gốm thủ công, cho phép khách hàng khám phá và mua sắm các sản phẩm trang trí với giá cả hợp lý.",
      en: "An online platform for handcrafted ceramics, allowing customers to explore and purchase stylish and affordable pottery and home décor.",
    }),
    image: "/projects/TCTCeramic.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://web-ceramic-wunm.vercel.app/",
    githubUrl: "https://github.com/Ly-Dat/web_ceramic",
    detailUrl: "/projects/ceramic",
  },
  {
    id: 4,
    title: "Expense Tracker",
    description: lang({
      vi: "Ứng dụng theo dõi chi tiêu cá nhân và quản lý ngân sách, cho phép người dùng ghi nhận, phân loại và theo dõi các khoản chi tiêu một cách hiệu quả.",
      en: "An application for tracking personal expenses and managing budgets, enabling users to record, categorize, and monitor their spending effectively.",
    }),
    image: "/projects/expensetracker.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://expense-tracker-lemon-omega.vercel.app/",
    githubUrl: "https://github.com/LeTrietHuan-Student/Project-CSW-303.git",
    detailUrl: "/projects/expense-tracker",
  },
  {
    id: 5,
    title: "Employee Shift Scheduling System",
    description: lang({
      vi: "Hệ thống quản lý ca làm việc cho phép nhân viên đăng ký và theo dõi lịch làm việc hàng tuần, xử lý dữ liệu từ Excel và hỗ trợ xuất PDF.",
      en: "A web-based shift scheduling system that allows employees to register and manage weekly shifts, process Excel data, track schedules in real time, and export reports as PDF.",
    }),
    image: "/projects/shift-scheduler.png",
    tags: ["React", "Excel Data Processing", "Scheduling System", "PDF Export"],
    demoUrl: "https://warehouse-shift.vercel.app",
    githubUrl: "https://github.com/Ly-Dat/WarehouseShift",
    detailUrl: "/projects/shift-scheduler",
  },
  {
    id: 6,
    title: "Product Price Management Website",
    description: lang({
      vi: "Ứng dụng web React giúp quản lý giá sản phẩm, đọc dữ liệu từ Excel, tự động tính toán tổng tiền, xuất hóa đơn PDF và tạo mã QR thanh toán.",
      en: "A React-based web application for managing product prices, fetching data from Excel files, calculating totals automatically, generating PDF invoices, and providing QR code payments.",
    }),
    image: "/projects/ceramicHouse.png",
    tags: ["React", "Excel Data Fetching", "PDF Export", "QR Payment"],
    demoUrl: "https://tan-chi-tai-ceramics.vercel.app/bill",
    githubUrl: "https://github.com/Ly-Dat/TanChiTai_Ceramics",
    detailUrl: "/projects/price-management",
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
                    <a
                      href={project.detailUrl}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <FileText size={20} />
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
            {lang({ vi: "Xem GitHub của tôi", en: "Check My GitHub" })}{" "}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
