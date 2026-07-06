import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import {
  Bot,
  CheckCircle2,
  Database,
  FileText,
  KeyRound,
  LayoutDashboard,
  Monitor,
  Network,
  Palette,
  Rocket,
  Route,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons actually used on this page are imported, so the whole
// lucide-react library isn't pulled into the bundle. Dynamic lookups
// (Icons[name]) below resolve against this map.
const Icons: Record<string, LucideIcon> = {
  Bot,
  CheckCircle2,
  Database,
  FileText,
  KeyRound,
  LayoutDashboard,
  Monitor,
  Network,
  Palette,
  Rocket,
  Route,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
  Video,
  Zap,
};
import { lang } from "@/helper/lang";

// ── Live links ────────────────────────────────────────────────────────────────
const LIVE_URL = "https://interview-quizz-software.vercel.app";
const REPO_URL = "#"; // TODO: replace with the Quiz Platform repository URL

// ── Theme hook ────────────────────────────────────────────────────────────────
function useTheme() {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light"),
  );
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isLight;
}

// ── Feature type ──────────────────────────────────────────────────────────────
type Feature = {
  num: string;
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  features: string[];
  dotColor: string;
  tags: string[];
  tagDark: string;
  tagLight: string;
  img: string;
};

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "ShieldCheck",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Xác thực & tài khoản", en: "Authentication & Accounts" }),
    subtitle: lang({
      vi: "Đăng ký, đăng nhập và phiên bảo mật",
      en: "Sign up, log in, and secure sessions",
    }),
    features: [
      lang({
        vi: "Đăng ký với họ tên, email, username, mật khẩu + kiểm tra phía client",
        en: "Register with full name, email, username, password + client-side validation",
      }),
      lang({
        vi: "Đăng nhập cấp JWT lưu cho quản lý phiên",
        en: "Login issues a JWT stored for session management",
      }),
      lang({
        vi: "Đặt lại mật khẩu qua token gửi email",
        en: "Password reset via an emailed token",
      }),
      lang({
        vi: "Trang hồ sơ xem & cập nhật tên/email (PUT API)",
        en: "Profile page to view and update name/email (PUT API)",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["JWT", "Spring Security", "Validation"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    img: "/QuizPlatform/auth.png",
  },
  {
    num: "02",
    icon: "LayoutDashboard",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Bảng điều khiển quiz", en: "Quiz Dashboard" }),
    subtitle: lang({
      vi: "Duyệt quiz theo chủ đề & độ khó",
      en: "Browse quizzes by category & difficulty",
    }),
    features: [
      lang({
        vi: "Quiz sắp xếp theo danh mục và độ khó",
        en: "Quizzes organized by category and difficulty",
      }),
      lang({
        vi: "Tìm kiếm và lọc để tìm quiz nhanh",
        en: "Search and filter to find quizzes fast",
      }),
      lang({
        vi: "Thẻ quiz hiển thị số câu hỏi và thời gian giới hạn",
        en: "Quiz cards show question count and time limit",
      }),
      lang({
        vi: "Điểm truy cập trung tâm tới mọi tính năng người dùng",
        en: "A central entry point to all user features",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["React", "Search & Filter", "Responsive"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    img: "/QuizPlatform/dashboard.png",
  },
  {
    num: "03",
    icon: "Timer",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Làm bài quiz", en: "Taking a Quiz" }),
    subtitle: lang({
      vi: "Có giờ, mỗi lần một câu hỏi",
      en: "Timed, one question at a time",
    }),
    features: [
      lang({
        vi: "Hiển thị từng câu hỏi với điều hướng qua lại",
        en: "One question at a time with answer navigation",
      }),
      lang({
        vi: "Đồng hồ đếm ngược áp thời gian giới hạn đã cấu hình",
        en: "Countdown timer enforces the configured time limit",
      }),
      lang({
        vi: "Lưu tạm câu trả lời cho tới khi nộp bài",
        en: "Answers saved temporarily until submission",
      }),
      lang({
        vi: "Tự động nộp và chấm điểm khi hết giờ",
        en: "Auto-submits and grades when the timer expires",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["Countdown Timer", "Auto-submit", "Timed"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    img: "/QuizPlatform/quiz.png",
  },
  {
    num: "04",
    icon: "Trophy",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Kết quả & xem đáp án", en: "Results & Answer Review" }),
    subtitle: lang({
      vi: "Chấm điểm tức thì kèm giải thích",
      en: "Instant scoring with explanations",
    }),
    features: [
      lang({
        vi: "Tóm tắt điểm số với số câu đúng/sai",
        en: "Score summary with correct/incorrect counts",
      }),
      lang({
        vi: "Xem lại mỗi câu hỏi kèm đáp án đúng + giải thích",
        en: "Review every question with the correct answer + explanation",
      }),
      lang({
        vi: "Lịch sử quiz với đạt/không đạt cho từng lần làm",
        en: "Quiz history with pass/fail per attempt",
      }),
      lang({
        vi: "Củng cố kiến thức sau mỗi lần luyện tập",
        en: "Reinforces learning after each practice session",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["Instant Scoring", "Explanations", "History"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    img: "/QuizPlatform/result.png",
  },
  {
    num: "05",
    icon: "Sparkles",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Tạo quiz bằng AI", en: "AI Quiz Generation" }),
    subtitle: lang({
      vi: "Chủ đề → quiz tự sinh",
      en: "Topic → auto-generated quiz",
    }),
    features: [
      lang({
        vi: "Nhập chủ đề (Java, Spring Boot, SQL, React…) và số câu hỏi",
        en: "Enter a topic (Java, Spring Boot, SQL, React…) and question count",
      }),
      lang({
        vi: "Câu hỏi sinh ra qua GitHub Models (LLM)",
        en: "Questions generated via GitHub Models (LLM)",
      }),
      lang({
        vi: "Làm quiz AI với đáp án + giải thích tức thì",
        en: "Take AI quizzes with instant answer + explanation",
      }),
      lang({
        vi: "Nhanh chóng tạo bộ luyện tập tuỳ biến",
        en: "Quickly create customized practice sets",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["GitHub Models", "LLM", "On-demand"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    img: "/QuizPlatform/ai-quiz.png",
  },
  {
    num: "06",
    icon: "Bot",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "Trợ lý chatbot AI", en: "AI Chatbot Advisor" }),
    subtitle: lang({
      vi: "Hỏi đáp và gợi ý quiz",
      en: "Ask questions, get quiz suggestions",
    }),
    features: [
      lang({
        vi: "Chatbot trả lời câu hỏi về các chủ đề quiz",
        en: "Chatbot answers questions about quiz topics",
      }),
      lang({
        vi: "Gợi ý quiz phù hợp từ ngân hàng câu hỏi",
        en: "Recommends relevant quizzes from the bank",
      }),
      lang({
        vi: "Phản hồi tức thì ngay trên dashboard",
        en: "Instant responses inline on the dashboard",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["AI Advisor", "Recommendations", "GitHub Models"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    img: "/QuizPlatform/chatbot.png",
  },
  {
    num: "07",
    icon: "Video",
    iconBg: "bg-rose-900/30",
    title: lang({ vi: "Phòng phỏng vấn", en: "Interview Meeting Room" }),
    subtitle: lang({
      vi: "Phỏng vấn thử 1-1 thời gian thực",
      en: "Real-time 1-on-1 mock interviews",
    }),
    features: [
      lang({
        vi: "Tạo hoặc tham gia phòng riêng (tối đa hai người)",
        en: "Create or join private rooms (up to two participants)",
      }),
      lang({
        vi: "Video, âm thanh và chia sẻ màn hình thời gian thực",
        en: "Real-time video, audio, and screen sharing",
      }),
      lang({
        vi: "Chat trong phòng suốt phiên phỏng vấn",
        en: "In-room chat during the session",
      }),
      lang({
        vi: "Sử dụng Metered video/voice API",
        en: "Powered by the Metered video/voice API",
      }),
    ],
    dotColor: "bg-rose-500",
    tags: ["Metered", "WebRTC", "Screen Share"],
    tagDark: "bg-rose-900/40 text-rose-300 border border-rose-700/40",
    tagLight: "bg-rose-100 text-rose-700 border border-rose-200",
    img: "/QuizPlatform/meeting.png",
  },
  {
    num: "08",
    icon: "Route",
    iconBg: "bg-emerald-900/30",
    title: lang({ vi: "Lộ trình DSA", en: "DSA Roadmap" }),
    subtitle: lang({
      vi: "Hành trình học trực quan",
      en: "A visual learning journey",
    }),
    features: [
      lang({
        vi: "Lộ trình trực quan, có cấu trúc cho các chủ đề cốt lõi",
        en: "Structured, visual roadmap of essential topics",
      }),
      lang({
        vi: "Theo dõi tiến độ học tập trên lộ trình",
        en: "Tracks study progress across the path",
      }),
      lang({
        vi: "Hướng dẫn người học biết nên học gì tiếp theo",
        en: "Guides learners on what to study next",
      }),
    ],
    dotColor: "bg-emerald-500",
    tags: ["Roadmap", "Progress Tracking", "Visual"],
    tagDark: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/40",
    tagLight: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    img: "/QuizPlatform/roadmap.png",
  },
  {
    num: "09",
    icon: "Settings",
    iconBg: "bg-indigo-900/30",
    title: lang({ vi: "Bảng quản trị", en: "Admin Console" }),
    subtitle: lang({
      vi: "CRUD đầy đủ + phân quyền theo vai trò",
      en: "Full CRUD + role-based access",
    }),
    features: [
      lang({
        vi: "Quản lý quiz, câu hỏi, danh mục từ một bảng điều khiển",
        en: "Manage quizzes, questions, and categories from one console",
      }),
      lang({
        vi: "Quản lý người dùng: thêm, sửa, khoá, xoá tài khoản",
        en: "User management: add, edit, ban, delete accounts",
      }),
      lang({
        vi: "Bảng quản lý phản hồi và kết quả",
        en: "Feedback and result management dashboards",
      }),
      lang({
        vi: "Phân quyền theo vai trò (RBAC) qua Spring Security",
        en: "Role-Based Access Control via Spring Security",
      }),
      lang({
        vi: "Swagger/OpenAPI UI để test mọi endpoint",
        en: "Swagger/OpenAPI UI to test every endpoint",
      }),
    ],
    dotColor: "bg-indigo-500",
    tags: ["RBAC", "CRUD", "Swagger"],
    tagDark: "bg-indigo-900/40 text-indigo-300 border border-indigo-700/40",
    tagLight: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    img: "/QuizPlatform/admin.png",
  },
];

const TECH = [
  { icon: "Monitor", name: "React", role: "Frontend SPA" },
  { icon: "Palette", name: "Bootstrap 5", role: "UI Framework" },
  { icon: "Server", name: "Spring Boot", role: "Backend (Java)" },
  { icon: "Network", name: "REST API", role: "HTTPS Endpoints" },
  { icon: "ShieldCheck", name: "Spring Security", role: "JWT / RBAC" },
  { icon: "KeyRound", name: "JWT", role: "Auth tokens" },
  { icon: "Database", name: "MongoDB Atlas", role: "Cloud database" },
  { icon: "Database", name: "Spring Data", role: "MongoDB layer" },
  { icon: "Bot", name: "GitHub Models", role: "AI (LLM)" },
  { icon: "Video", name: "Metered API", role: "Video / voice" },
  { icon: "FileText", name: "Swagger", role: "OpenAPI docs" },
  { icon: "Rocket", name: "Vercel", role: "Frontend hosting" },
];

const ARCH = [
  {
    icon: "Monitor",
    title: lang({ vi: "Tầng giao diện", en: "Presentation Layer" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "React web client · Bootstrap 5 · sends HTTPS REST calls to the backend · Swagger UI for API testing.",
  },
  {
    icon: "Settings",
    title: lang({ vi: "Tầng ứng dụng", en: "Application Layer" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "Spring Boot modules (Auth, Users, Questions, Quizzes, Results, Feedback) as Controllers → Services → Repositories, with JWT + Spring Security RBAC.",
  },
  {
    icon: "Database",
    title: lang({ vi: "Tầng dữ liệu", en: "Data Layer" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "MongoDB Atlas (cloud) via Spring Data MongoDB — Users, Roles, Questions, Quizzes, Attempts, Feedback, and Audit collections.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Monitor",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Frontend (React)", en: "Frontend (React)" }),
    items: [
      lang({
        vi: "Xây giao diện phía người dùng và quản trị viên",
        en: "Built both the user-facing and admin interfaces",
      }),
      lang({
        vi: "Luồng làm quiz có giờ, dashboard, và xem lại kết quả",
        en: "Timed quiz-taking flow, dashboards, and result review",
      }),
      lang({
        vi: "Thiết kế responsive dùng trên desktop và mobile",
        en: "Responsive design for desktop and mobile",
      }),
    ],
  },
  {
    icon: "Server",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Backend & API", en: "Backend & APIs" }),
    items: [
      lang({
        vi: "Xây REST API Spring Boot (Controllers → Services → Repositories)",
        en: "Built the Spring Boot REST API (Controllers → Services → Repositories)",
      }),
      lang({
        vi: "Xác thực JWT và phân quyền RBAC bằng Spring Security",
        en: "JWT authentication and RBAC via Spring Security",
      }),
      lang({
        vi: "Mô hình hoá dữ liệu MongoDB và tài liệu API bằng Swagger",
        en: "MongoDB data modeling and Swagger API documentation",
      }),
    ],
  },
  {
    icon: "Sparkles",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Tích hợp AI", en: "AI Integration" }),
    items: [
      lang({
        vi: "Bộ tạo quiz bằng AI (chủ đề → câu hỏi qua GitHub Models)",
        en: "AI quiz generator (topic → questions via GitHub Models)",
      }),
      lang({
        vi: "Chatbot advisor gợi ý quiz phù hợp",
        en: "Chatbot advisor that recommends quizzes",
      }),
    ],
  },
  {
    icon: "CheckCircle2",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Thời gian thực & QA", en: "Real-time & QA" }),
    items: [
      lang({
        vi: "Phòng phỏng vấn thời gian thực (Metered) và lộ trình DSA",
        en: "Real-time interview rooms (Metered) and the DSA roadmap",
      }),
      lang({
        vi: "Kiểm thử tích hợp các luồng chính và sửa lỗi trước bàn giao",
        en: "Integration-tested core flows and fixed bugs before delivery",
      }),
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function Pill({ label, isLight }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[11px] tracking-widest uppercase border mb-3 font-semibold ${
        isLight
          ? "bg-blue-50 border-blue-200 text-blue-600"
          : "bg-blue-900/30 border-blue-400/25 text-sky-400"
      }`}
    >
      {label}
    </span>
  );
}

function SectionTitle({ pre, accent, desc, isLight }) {
  return (
    <>
      <h2
        className={`text-3xl font-black mb-2 ${isLight ? "text-slate-800" : "text-white"}`}
      >
        {pre} <span className="text-sky-500">{accent}</span>
      </h2>
      <p
        className={`text-sm leading-relaxed mb-10 max-w-xl mx-auto text-center ${
          isLight ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {desc}
      </p>
    </>
  );
}

// ── Screenshot (graceful fallback while the image file isn't added yet) ────────
function Screenshot({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center bg-slate-900/30 px-4">
        <span className="text-[11px] font-mono text-slate-500 text-center">
          {src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className="w-full h-full object-cover object-top"
      style={{ maxHeight: "260px" }}
    />
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ page, isLight }: { page: Feature; isLight: boolean }) {
  const IconComponent = Icons[page.icon];

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-300 mb-14 ${
        isLight
          ? "border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-blue-300"
          : "border-white/10 bg-white/[0.03] hover:border-blue-400/30 hover:shadow-[0_0_40px_rgba(21,101,192,0.12)]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-4 px-7 py-5 border-b ${
          isLight
            ? "border-slate-100 bg-slate-50"
            : "border-white/5 bg-white/[0.02]"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${page.iconBg}`}
        >
          {IconComponent && <IconComponent />}
        </div>
        <div>
          <h3
            className={`font-bold text-base ${isLight ? "text-slate-800" : "text-white"}`}
          >
            {page.title}
          </h3>
          <p
            className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}
          >
            {page.subtitle}
          </p>
        </div>
        <span
          className={`ml-auto font-black text-5xl select-none ${
            isLight ? "text-slate-200" : "text-white/5"
          }`}
        >
          {page.num}
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Screenshot */}
        <div
          className={`border-b md:border-b-0 md:border-r overflow-hidden ${
            isLight ? "border-slate-100" : "border-white/5"
          }`}
        >
          <Screenshot src={page.img} alt={page.title} />
        </div>

        {/* Info */}
        <div className="p-7">
          <ul className="flex flex-col gap-3 mb-5">
            {page.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${page.dotColor}`}
                />
                {f}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {page.tags.map((t) => (
              <span
                key={t}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  isLight ? page.tagLight : page.tagDark
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function QuizPlatformDetail() {
  const isLight = useTheme();
  const Rocket = Icons["Rocket"];
  const Zap = Icons["Zap"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>IT Interview Practice Platform | Gia Hung Pham</title>
        <meta
          name="description"
          content="A full-stack IT interview preparation & practice platform with topic-based quizzes, AI quiz generation, an AI chatbot advisor, and real-time 1-on-1 interview rooms, built with Spring Boot, MongoDB, and React."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/quiz-platform"
        />
      </Helmet>
      {isLight ? <SkyBackground /> : <StarBackground />}
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-[100px] pb-20">
        {/* ── Hero ── */}
        <div
          className={`rounded-2xl overflow-hidden border mb-16 ${
            isLight
              ? "border-slate-200 bg-white shadow-lg"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <div className="p-8">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs mb-4 border font-semibold ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-blue-900/30 border-blue-400/30 text-blue-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              EIU · SWE Capstone · 2026
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}
            >
              IT Interview{" "}
              <span className="text-sky-500">Practice Platform</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Nền tảng quiz và phỏng vấn thử full-stack giúp sinh viên chuẩn bị phỏng vấn kỹ thuật — quiz theo chủ đề với chấm điểm tức thì, câu hỏi sinh bằng AI, trợ lý chatbot, và phòng phỏng vấn 1-1 thời gian thực.",
                en: "A full-stack quiz and mock-interview platform that helps students prepare for technical interviews — topic-based quizzes with instant scoring, AI-generated questions, a chatbot advisor, and real-time 1-on-1 interview rooms.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "9", l: lang({ vi: "Tính năng", en: "Features" }) },
                { n: "9", l: lang({ vi: "Collection DB", en: "DB Collections" }) },
                { n: "AI", l: lang({ vi: "Quiz + Chat", en: "Quiz + Chat" }) },
                { n: "1:1", l: lang({ vi: "Phỏng vấn thử", en: "Mock Interviews" }) },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-black text-sky-500">{s.n}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      isLight ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Project context ── */}
            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-sm ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Bối cảnh dự án", en: "Project Context" })}
              </div>
              <div className="flex flex-col gap-1 text-xs leading-relaxed">
                <div>
                  {lang({
                    vi: "Đồ án tốt nghiệp — Khoa Kỹ thuật Phần mềm, Trường ĐH Quốc tế Miền Đông (EIU)",
                    en: "Capstone project — Department of Software Engineering, Eastern International University (EIU)",
                  })}
                </div>
                <div>
                  {lang({
                    vi: "Nhóm 4 người · Full-stack (Spring Boot · MongoDB · React)",
                    en: "Team of 4 · Full-stack (Spring Boot · MongoDB · React)",
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {Rocket && <Rocket />}{" "}
                {lang({ vi: "Xem demo", en: "Live Demo" })}
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 border ${
                  isLight
                    ? "border-slate-300 text-slate-700 hover:border-sky-400 hover:text-sky-600"
                    : "border-white/20 text-white hover:border-sky-400 hover:text-sky-400"
                }`}
              >
                {Zap && <Zap />} GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ── My Role ── */}
        <div className="mb-12">
          <Pill label={lang({ vi: "Vai trò", en: "Role" })} isLight={isLight} />

          <SectionTitle
            pre={lang({ vi: "Vai trò của", en: "My" })}
            accent={lang({ vi: "bản thân", en: "Role" })}
            desc={lang({
              vi: "Đồ án nhóm 4 người tại EIU, nơi tôi làm xuyên suốt cả stack — xây frontend React, backend & API Spring Boot, các tính năng AI, và phòng phỏng vấn thời gian thực.",
              en: "A 4-person capstone at EIU where I worked across the full stack — building the React frontend, the Spring Boot backend and APIs, the AI features, and the real-time interview rooms.",
            })}
            isLight={isLight}
          />

          {/* Role badge */}
          <div className="flex justify-center mb-8">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-900/30 border-blue-400/30 text-blue-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {lang({
                vi: "Lập trình viên Fullstack · Nhóm 4",
                en: "Fullstack Developer · Team of 4",
              })}
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className={`absolute left-5 top-2 bottom-2 w-px ${
                isLight ? "bg-slate-200" : "bg-white/10"
              }`}
            />

            {MY_ROLE_STEPS.map((step, i) => {
              const IconComponent = Icons[step.icon];
              return (
                <div key={i} className="relative pl-14 mb-8 last:mb-0">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ring-4 ${
                      isLight ? step.ringLight : step.ringDark
                    } ${
                      isLight
                        ? "bg-white border border-slate-200 shadow-sm"
                        : "bg-[#0f172a] border border-white/10"
                    }`}
                  >
                    <span className={`text-base ${step.color}`}>
                      {IconComponent && <IconComponent size={18} />}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-xl border p-5 transition-all duration-200 ${
                      isLight
                        ? "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200"
                        : "bg-white/[0.03] border-white/10 hover:border-blue-400/30"
                    }`}
                  >
                    <h4 className={`font-bold text-sm mb-3 ${step.color}`}>
                      {step.title}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-2 text-sm leading-relaxed ${
                            isLight ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${step.dot}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Features ── */}
        <Pill
          label={lang({ vi: "Tính năng", en: "Features" })}
          isLight={isLight}
        />
        <SectionTitle
          pre={lang({ vi: "Các", en: "Core" })}
          accent={lang({ vi: "tính năng", en: "features" })}
          desc={lang({
            vi: "Nền tảng phục vụ cả người dùng lẫn quản trị viên: luyện quiz, tạo quiz bằng AI, chatbot, phòng phỏng vấn thời gian thực, và một bảng quản trị đầy đủ.",
            en: "The platform serves both users and admins: quiz practice, AI quiz generation, a chatbot, real-time interview rooms, and a full admin console.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard key={page.num} page={page} isLight={isLight} />
        ))}

        {/* ── Tech Stack ── */}
        <div className="mb-10">
          <Pill
            label={lang({ vi: "Công nghệ", en: "Tech Stack" })}
            isLight={isLight}
          />

          <SectionTitle
            pre={lang({ vi: "Công nghệ", en: "Technologies" })}
            accent={lang({ vi: "sử dụng", en: "Used" })}
            desc={lang({
              vi: "Kiến trúc ba tầng: client React gọi REST API Spring Boot được bảo vệ bằng JWT và Spring Security, lưu trữ trên MongoDB Atlas.",
              en: "A three-tier stack: a React client calling a Spring Boot REST API secured with JWT and Spring Security, backed by MongoDB Atlas.",
            })}
            isLight={isLight}
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {TECH.map((t) => {
              const IconComponent = Icons[t.icon];

              return (
                <div
                  key={t.name}
                  className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center border transition-all duration-200 hover:-translate-y-1 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md"
                      : "bg-white/[0.03] border-white/10 hover:border-blue-400/40"
                  }`}
                >
                  <span className="text-2xl">
                    {IconComponent && <IconComponent />}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      isLight ? "text-slate-700" : "text-white"
                    }`}
                  >
                    {t.name}
                  </span>

                  <span
                    className={`text-[10px] ${
                      isLight ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    {t.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Architecture ── */}
        <div className="mb-4">
          <Pill
            label={lang({ vi: "Kiến trúc", en: "Architecture" })}
            isLight={isLight}
          />

          <SectionTitle
            pre={lang({ vi: "Kiến trúc", en: "System" })}
            accent={lang({ vi: "hệ thống", en: "Architecture" })}
            desc={lang({
              vi: "Mô hình client–server ba tầng: Client → Backend → Data. Frontend gọi REST API Spring Boot qua HTTPS; backend áp JWT và RBAC trước khi đọc/ghi MongoDB Atlas.",
              en: "A three-tier client–server model: Client → Backend → Data. The React frontend calls the Spring Boot REST API over HTTPS; the backend enforces JWT auth and RBAC before reading/writing MongoDB Atlas.",
            })}
            isLight={isLight}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARCH.map((layer) => {
              const IconComponent = Icons[layer.icon];

              return (
                <div
                  key={layer.title}
                  className={`border rounded-2xl p-6 text-center ${
                    isLight ? layer.light : layer.dark
                  }`}
                >
                  <div className="text-3xl mb-3 flex justify-center">
                    {IconComponent && <IconComponent size={28} />}
                  </div>

                  <h4
                    className={`font-bold text-base mb-2 ${layer.titleColor}`}
                  >
                    {layer.title}
                  </h4>

                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {layer.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPlatformDetail;