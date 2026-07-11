import { ArrowRight, ExternalLink, Github, FileText } from "lucide-react";
import { lang } from "../helper/lang";
import { prefetchDetailPage } from "../pages/projectPage";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  slug: string;
};

export const projects: Project[] = [
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
    slug: "quiz-platform",
  },
  {
    id: 1,
    title: "EIU/CIT Smart Learning Advisor",
    description: lang({
      vi: "Ứng dụng SPA React (Vite) trên nền Express JSON API cho sinh viên EIU: đăng nhập Google tải bảng điểm thật, theo dõi GPA, dựng lộ trình môn học bằng D3 và nhận tư vấn AI cá nhân hóa dạng streaming (GitHub Models, SSE).",
      en: "A React (Vite) SPA on an Express JSON API for EIU students: Google sign-in pulls live transcript data, tracks GPA, maps the course roadmap with D3, and streams personalized AI advice (GitHub Models, SSE).",
    }),
    image: "/projects/smartadvisor.png",
    tags: ["React", "Express API", "Google OAuth", "GitHub Models"],
    demoUrl: "https://smart-learning-advisor.vercel.app/",
    githubUrl: "https://github.com/Hung1510/smart-learning-advisor",
    slug: "smart-learning-advisor",
  },
  {
    id: 9,
    title: "Tethys",
    description: lang({
      vi: "Trình tối ưu và quét echo native cho Wuthering Waves viết bằng Rust: chụp màn hình + OCR đọc echo trực tiếp từ game, rồi dùng giải thuật di truyền tính ra build tốt nhất về mặt toán học.",
      en: "A native Rust echo optimizer and scanner for Wuthering Waves: screen-capture + OCR read echoes straight from the game, then a genetic algorithm computes the mathematically best build.",
    }),
    image: "/projects/tethys.png",
    tags: ["Rust", "Genetic Algorithm", "OCR", "Screen Capture"],
    demoUrl: "https://tethys-gray.vercel.app",
    githubUrl: "https://github.com/Hung1510/Tethys",
    slug: "tethys",
  },
  {
    id: 11,
    title: "Code Navigator",
    description: lang({
      vi: "Công cụ hỏi đáp codebase chạy cục bộ: kết hợp embedding ngữ nghĩa với tìm kiếm từ khóa BM25 (RRF + cross-encoder re-rank), chia nhỏ mã bằng tree-sitter cho 9 ngôn ngữ và dựng call graph, trả lời kèm trích dẫn file:dòng. Có CLI và app desktop Tauri, không cần cloud.",
      en: "A local, ask-your-codebase tool: it fuses semantic embeddings with BM25 keyword search (RRF + cross-encoder re-rank), chunks code with tree-sitter across 9 languages, and builds a call graph, answering with file:line citations. Ships a CLI and a Tauri desktop app, no cloud.",
    }),
    // 📌 IMAGE: drop a screenshot in public/projects/ then set the path here
    image: "/projects/codeNavigator.png",
    tags: ["Python", "RAG", "tree-sitter", "Tauri"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/Code-Navigator",
    slug: "code-navigator",
  },
  {
    id: 8,
    title: "Somnium Weaver",
    description: lang({
      vi: "Lớp phủ desktop Windows sống động (WPF / .NET 8 + SkiaSharp) biến tải CPU, RAM và mạng thành các hạt sáng trôi nổi; chế độ phản ứng âm thanh WASAPI tùy chọn dùng FFT để phát hiện beat và bung hiệu ứng đàn bướm. Trong suốt, xuyên chuột, chạy hoàn toàn cục bộ.",
      en: "A living Windows desktop overlay (WPF / .NET 8 + SkiaSharp) that weaves CPU, RAM, and network load into drifting particles; an opt-in WASAPI audio-reactive mode uses an FFT to detect beats and fire butterfly bursts. Transparent, click-through, and fully local.",
    }),
    // 📌 IMAGE: drop a screenshot in public/projects/ then set the path here
    image: "/projects/somniumWeaver.png",
    tags: ["C#", "WPF / .NET 8", "SkiaSharp", "Windows"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/Somnium-Weaver",
    slug: "somnium-weaver",
  },
  {
    id: 6,
    title: "Shorekeeper Startup Voice",
    description: lang({
      vi: "Trình phát không cửa sổ trên Windows phát một câu thoại game khi đăng nhập, kèm pipeline reverse-engineering (Bash + vgmstream + ffmpeg) trích xuất và chuẩn hóa âm lượng các đoạn giọng nói từ kho Square Enix SAB, Wwise, FMOD và CRI ADX2.",
      en: "A no-window Windows player that plays a game voice line at login, plus a reverse-engineering pipeline (Bash + vgmstream + ffmpeg) that extracts and loudness-normalizes clips from Square Enix SAB, Wwise, FMOD, and CRI ADX2 audio banks.",
    }),
    // 📌 IMAGE: drop a screenshot in public/projects/ then set the path here
    image: "/projects/shorekeeperStartup.png",
    tags: ["C++", "Bash", "vgmstream", "ffmpeg"],
    demoUrl: "#",
    githubUrl: "https://github.com/Hung1510/window-startup-greeting",
    slug: "shorekeeper-startup",
  },
  {
    id: 10,
    title: "WARNO Deck Randomizer",
    description: lang({
      vi: "Web app full-stack (React 18 + Vite, Express API, TypeScript) roll ngẫu nhiên một battlegroup WARNO và dựng deck theo phong cách 'fun' hoặc 'meta'; mỗi lần roll có seed nên tái tạo và chia sẻ được qua link, phủ 56 battlegroup của 14 quốc gia.",
      en: "A full-stack web app (React 18 + Vite, Express API, TypeScript) that rolls a random WARNO battlegroup and builds a 'fun' or 'meta' deck; every roll is seeded, so it's reproducible and shareable by link, across 56 battlegroups and 14 nations.",
    }),
    image: "/projects/warnoRandomizer.png",
    tags: ["React 18", "TypeScript", "Express API", "Seeded RNG"],
    demoUrl: "https://warno-deck-randomizer.vercel.app",
    githubUrl: "https://github.com/Hung1510/Warno-Deck-Randomizer",
    slug: "warno-deck-randomizer",
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
    slug: "expense-tracker",
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
    slug: "discord-bot",
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
    slug: "region-research",
  },
  {
    id: 7,
    title: "Rainmeter Waifu Desktop",
    description: lang({
      vi: "Bộ widget Rainmeter nhẹ mang phong cách 'ricing' của Linux lên Windows - hình nhân vật, thời tiết trực tiếp không cần API key (Open-Meteo), đồng hồ, lịch tháng và nhiệt độ CPU.",
      en: "A suite of lightweight Rainmeter widgets that bring a clean Linux-style 'ricing' look to Windows - a character cutout, keyless live weather (Open-Meteo), a clock, a month calendar, and CPU temp.",
    }),
    // 📌 IMAGE: drop a screenshot in public/projects/ then set the path here
    image: "/projects/rainmeterWaifu.png",
    tags: ["Rainmeter", "Lua", "Open-Meteo", "Windows"],
    demoUrl: "https://hung1510.github.io/rainmeter-waifu-desktop/",
    githubUrl: "https://github.com/Hung1510/rainmeter-waifu-desktop",
    slug: "rainmeter-waifu-desktop",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <p className="font-mono text-xs md:text-sm text-primary tracking-[0.25em] mb-3 text-center">
          {lang({ en: "04 / PROJECTS", vi: "04 / DỰ ÁN" })}
        </p>
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
                  loading="lazy"
                  decoding="async"
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
                    {project.slug && (
                      <a
                        href={`/projects/${project.slug}`}
                        onMouseEnter={() => prefetchDetailPage(project.slug)}
                        onFocus={() => prefetchDetailPage(project.slug)}
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