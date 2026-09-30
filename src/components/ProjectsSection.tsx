import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Github, FileText, Sparkles } from "lucide-react";
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

// Projects pulled out of the grid and spotlighted on their own, each with its
// own case-study page. Rendered in order, image side alternating.
export type FlagshipStat = {
  n: string;
  l: string;
  /**
   * Optional live value: read `key` from the flagship's liveStatsUrl JSON and
   * show max(floor, live), rounded down ("2.6K+", "500+"). `floor` is the last
   * known number, so the card never shows less than that, even offline.
   */
  live?: { key: string; floor: number };
};

export type FlagshipProject = {
  title: string;
  titlePre: string;
  titleAccent: string;
  description: string;
  image: string;
  /** "contain" shows the whole image (letterboxed) instead of cropping it. */
  imageFit?: "cover" | "contain";
  tags: string[];
  stats: FlagshipStat[];
  /** JSON fetched in the browser to refresh stats marked `live`. */
  liveStatsUrl?: string;
  /** Wide (~1.91:1) image for link previews; defaults to `image`. */
  ogImage?: string;
  demoUrl: string;
  demoLabel: string;
  githubUrl: string;
  slug: string;
  // Extra resource links shown after the demo/GitHub links (e.g. a mirror
  // on another mod site). Optional - most flagships won't need it.
  extraLinks?: { label: string; url: string }[];
};

export const flagshipProjects: FlagshipProject[] = [
  {
    title: "eco-faker",
    titlePre: "eco",
    titleAccent: "-faker",
    description: lang({
      vi: "Thư viện/CLI TypeScript (đã publish lên npm) sinh dữ liệu giả cho e-commerce nhất quán về quan hệ: 18 bảng đều xuất phát từ cùng một state machine, nên dataset đọc như lịch sử của một cửa hàng thật. Kèm mock API với bộ chuyển MSW/tRPC/GraphQL, MCP server, fuzz ngữ nghĩa, mô phỏng gian lận và event sourcing.",
      en: "A TypeScript library/CLI, published on npm, that generates relationally-consistent fake e-commerce data: 18 tables all derive from one state machine, so the dataset reads like a real store's history. Ships a mock API with MSW/tRPC/GraphQL adapters, an MCP server, semantic fuzzing, fraud simulation, and event sourcing.",
    }),
    image: "/projects/ecoFaker.png",
    ogImage: "/projects/ecoFaker-og.png",
    imageFit: "contain",
    tags: ["TypeScript", "npm", "MCP Server", "State Machine"],
    stats: [
      { n: "npm", l: lang({ vi: "Đã publish", en: "Published" }) },
      { n: "18", l: lang({ vi: "Bảng dữ liệu", en: "Tables" }) },
      { n: "299", l: lang({ vi: "Bài test", en: "Tests" }) },
      { n: "Seeded", l: lang({ vi: "Tất định", en: "Deterministic" }) },
    ],
    demoUrl: "https://www.npmjs.com/package/eco-faker",
    demoLabel: "npm",
    githubUrl: "https://github.com/Hung1510/Eco-Faker",
    slug: "eco-faker",
  },
  {
    title: "Super Earth Armory Forge",
    titlePre: "Super Earth Armory ",
    titleAccent: "Forge",
    description: lang({
      vi: "Mod chỉnh passive giáp cho Helldivers 2, sửa dữ liệu của game ngay trong bộ nhớ khi đang chơi: ghép bất kỳ passive nào trong 31 passive lên bộ giáp và chỉnh mọi giá trị qua terminal F7 viết bằng Lua (LuaJIT), hỗ trợ chuột, bàn phím và tay cầm, kèm loadout đổi nhanh bằng F9, tìm kiếm và undo. Generator Python và web builder cho ra build giống hệt từng byte; 460+ kiểm thử chạy mod thật trên một game giả lập trong CI. Hai phiên bản từ một codebase: bản đầy đủ trên AyakaMods và bản Lite được Nexus Mods duyệt. Phát triển từ Passive Picker v3 của mostlycloudy.",
      en: "A Helldivers 2 armor passive editor that patches the game's data in memory while it runs: stack any of the 31 armor passives onto your armor and set every value through an F7 terminal written in Lua (LuaJIT), with mouse, keyboard and controller support, F9 loadout swapping, search, and undo. A Python generator and a web builder produce byte-identical builds; 460+ checks run the real mod against a fake game in CI. Two editions from one codebase: the full mod on AyakaMods and a Nexus-approved Lite edition. Grew out of mostlycloudy's Passive Picker v3.",
    }),
    image: "/projects/armoryForge/panel-preview.png",
    imageFit: "contain",
    tags: ["Lua / LuaJIT", "Python", "JavaScript", "Game Modding"],
    stats: [
      { n: "31/31", l: lang({ vi: "Passive giáp", en: "Armor passives" }) },
      { n: "460+", l: lang({ vi: "Kiểm thử tự động", en: "Automated checks" }) },
      {
        n: "4.5K+",
        l: lang({ vi: "Lượt xem", en: "Views" }),
        live: { key: "views", floor: 4593 },
      },
      {
        n: "900+",
        l: lang({ vi: "Lượt tải", en: "Downloads" }),
        live: { key: "downloads", floor: 939 },
      },
    ],
    // Written every 3h by the mod repo's local updater (tools/update_badges_local.ps1).
    liveStatsUrl:
      "https://gist.githubusercontent.com/Hung1510/996afff3a389ecbb7e77691ec94cab6a/raw/ayakamods.json",
    ogImage: "/projects/armoryForge/feature.png",
    demoUrl: "https://hung1510.github.io/Super-Earth-Armory-Forge/",
    demoLabel: "Web builder",
    githubUrl: "https://github.com/Hung1510/Super-Earth-Armory-Forge",
    slug: "super-earth-armory-forge",
    extraLinks: [
      {
        label: lang({ vi: "AyakaMods", en: "AyakaMods" }),
        url: "https://ayakamods.com/mods/super-earth-armory-forge.4359/",
      },
      {
        label: lang({ vi: "Nexus Mods (Lite)", en: "Nexus Mods (Lite)" }),
        url: "https://www.nexusmods.com/helldivers2/mods/16789",
      },
    ],
  },
];

/** "2.6K+" / "500+" / "42": rounded down so the claim is always true. */
const roundDown = (n: number) =>
  n >= 1000
    ? `${Math.floor(n / 100) / 10}K+`
    : n >= 100
      ? `${Math.floor(n / 100) * 100}+`
      : `${n}`;

function useLiveStats(url?: string) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => json && setData(json))
      .catch(() => {}); // offline / blocked: keep the static numbers
    return () => ctrl.abort();
  }, [url]);
  return data;
}

function FlagshipStats({ project }: { project: FlagshipProject }) {
  const live = useLiveStats(project.liveStatsUrl);
  return (
    <>
      {project.stats.map((s) => {
        let n = s.n;
        if (s.live) {
          const v = live?.[s.live.key];
          n = roundDown(Math.max(s.live.floor, typeof v === "number" ? v : 0));
        }
        return (
          <div key={s.l}>
            <div className="text-xl font-black text-sky-500">{n}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        );
      })}
    </>
  );
}

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

        {/* Flagship spotlights - pulled out of the grid, each gets a bigger showcase */}
        <div className="mb-14 flex flex-col gap-10">
        {flagshipProjects.map((flagshipProject, i) => (
        <div
          key={flagshipProject.slug}
          className="rounded-2xl overflow-hidden border border-sky-500/20 bg-card shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className={`h-56 lg:h-full overflow-hidden ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <img
                src={flagshipProject.image}
                alt={flagshipProject.title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${
                  flagshipProject.imageFit === "contain"
                    ? "object-contain bg-[#0b0f16]"
                    : "object-cover"
                }`}
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 w-fit rounded-full px-3 py-1 text-xs font-semibold mb-4 border border-sky-500/30 bg-sky-500/10 text-sky-500">
                <Sparkles size={14} />
                {lang({ vi: "DỰ ÁN CHỦ LỰC", en: "FLAGSHIP PROJECT" })}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {flagshipProject.titlePre}
                <span className="text-sky-500">
                  {flagshipProject.titleAccent}
                </span>
              </h3>

              <p className="text-muted-foreground text-sm mb-6">
                {flagshipProject.description}
              </p>

              <div className="flex gap-6 mb-6 flex-wrap">
                <FlagshipStats project={flagshipProject} />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {flagshipProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`/projects/${flagshipProject.slug}`}
                  onMouseEnter={() => prefetchDetailPage(flagshipProject.slug)}
                  onFocus={() => prefetchDetailPage(flagshipProject.slug)}
                  className="cosmic-button w-fit flex items-center gap-2 !bg-sky-500 hover:!shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                >
                  {lang({ vi: "Xem chi tiết", en: "Read the case study" })}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={flagshipProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-sky-500 transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  {flagshipProject.demoLabel}
                </a>
                <a
                  href={flagshipProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-sky-500 transition-colors duration-300"
                >
                  <Github size={16} />
                  {lang({ vi: "Mã nguồn", en: "Source" })}
                </a>
                {flagshipProject.extraLinks?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-sky-500 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        ))}
        </div>

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