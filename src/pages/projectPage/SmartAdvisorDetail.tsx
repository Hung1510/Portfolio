import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import {
  AppWindow,
  BarChart3,
  Bot,
  Gauge,
  KeyRound,
  LineChart,
  Database,
  FileOutput,
  FileText,
  LockOpen,
  Map,
  Monitor,
  Network,
  Palette,
  Printer,
  Radio,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons actually used on this page are imported, so the whole
// lucide-react library isn't pulled into the bundle. Dynamic lookups
// (Icons[name]) below resolve against this map.
const Icons: Record<string, LucideIcon> = {
  AppWindow,
  BarChart3,
  Bot,
  ChartLine: LineChart,
  Database,
  FileOutput,
  FileText,
  Gauge,
  KeyRound,
  LockOpen,
  Map,
  Monitor,
  Network,
  Palette,
  Printer,
  Radio,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  Zap,
};
import { lang } from "@/helper/lang";

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

// ── Tags có 2 variant riêng light/dark ───────────────────────────────────────
const PAGES = [
  {
    num: "01",
    icon: "ShieldCheck",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Trang đăng nhập", en: "Login Page" }),
    subtitle: lang({
      vi: "Đăng nhập Google hoặc tài khoản sinh viên EIU",
      en: "Google sign-in or EIU student login",
    }),
    features: [
      lang({
        vi: "Đăng nhập bằng Google (OAuth) hoặc tài khoản sinh viên EIU",
        en: "Google OAuth or EIU student login",
      }),
      lang({
        vi: "Xác thực bằng JWT và cookie bảo mật",
        en: "JWT authentication with secure cookies",
      }),
      lang({
        vi: "Bảo vệ route với middleware xác thực",
        en: "Route protection using authentication middleware",
      }),
      lang({
        vi: "Giới hạn số lần đăng nhập bằng Redis",
        en: "Login rate-limiting via Redis",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Google OAuth", "JWT", "Redis"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    img: "/SmartAdvisor/login.png",
  },
  {
    num: "02",
    icon: "AppWindow",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Dashboard", en: "Dashboard" }),
    subtitle: lang({
      vi: "Tổng quan GPA và thông tin sinh viên",
      en: "Overview of GPA and student information",
    }),
    features: [
      lang({
        vi: "Hiển thị GPA trung bình theo hệ 4.0",
        en: "Display GPA on 4.0 scale",
      }),
      lang({
        vi: "Thống kê tổng số môn & môn đã hoàn thành",
        en: "Total courses & completed courses stats",
      }),
      lang({
        vi: "Thông tin sinh viên: ID, email, chuyên ngành",
        en: "Student info: ID, email, major",
      }),
      lang({
        vi: "Hành động nhanh: điểm, lộ trình, tư vấn",
        en: "Quick actions: scores, roadmap, advisor",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["EJS Template", "MongoDB", "REST API"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    img: "/SmartAdvisor/dashboard.png",
  },
  {
    num: "03",
    icon: "ChartLine",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Xem điểm", en: "Scores" }),
    subtitle: lang({
      vi: "Bảng điểm chi tiết theo kỳ học",
      en: "Detailed transcript by semester",
    }),
    features: [
      lang({
        vi: "Hiển thị mã môn học và điểm số hệ 4.0",
        en: "Display course codes and GPA scores",
      }),
      lang({
        vi: "Phân loại màu sắc A / B / C / D / F",
        en: "Color-coded grading system",
      }),
      lang({ vi: "Hiển thị môn học theo kỳ", en: "Courses by semester" }),
      lang({ vi: "Xuất PDF bảng điểm", en: "Export transcript to PDF" }),
    ],
    dotColor: "bg-green-500",
    tags: ["EJS", "MongoDB Aggregate", "Bootstrap Table"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    img: "/SmartAdvisor/scores.png",
  },
  {
    num: "04",
    icon: "Map",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Lộ trình học", en: "Learning Roadmap" }),
    subtitle: lang({
      vi: "Flowchart · Đề xuất môn · Xuất PDF · Chat AI",
      en: "Flowchart · Course suggestion · PDF · AI Chat",
    }),
    features: [
      lang({
        vi: "Flowchart động với mũi tên tiên quyết",
        en: "Dynamic prerequisite flowchart",
      }),
      lang({
        vi: "Màu sắc phân biệt trạng thái môn học",
        en: "Color-coded course status",
      }),
      lang({ vi: "Đề xuất môn học kỳ tiếp theo", en: "Course recommendation" }),
      lang({ vi: "Xuất lộ trình ra PDF", en: "Export roadmap to PDF" }),
      lang({ vi: "Chat AI ngay trong trang", en: "Integrated AI chat" }),
    ],
    dotColor: "bg-sky-500",
    tags: ["D3.js / SVG", "Browser Print", "AI API"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    img: "/SmartAdvisor/roadmap.png",
  },
  {
    num: "05",
    icon: "Bot",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Tư vấn AI", en: "AI Advisor" }),
    subtitle: lang({
      vi: "Tư vấn học tập thông minh",
      en: "Smart academic advising",
    }),
    features: [
      lang({ vi: "Tích hợp LLM qua OpenRouter", en: "LLM integration via OpenRouter" }),
      lang({
        vi: "Nhận diện GPA & lộ trình",
        en: "Context-aware GPA & roadmap",
      }),
      lang({
        vi: "Hỗ trợ tiếng Việt & Anh",
        en: "Vietnamese & English support",
      }),
      lang({
        vi: "Streaming response real-time (SSE)",
        en: "Real-time streaming response (SSE)",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["OpenRouter", "SSE Streaming", "Node.js"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    img: "/SmartAdvisor/ai.png",
  },
];

const TECH = [
  { icon: "Zap", name: "Node.js", role: "Runtime" },
  { icon: "Server", name: "Express.js", role: "Framework" },
  { icon: "FileText", name: "EJS", role: "Template Engine" },
  { icon: "ShieldCheck", name: "Google OAuth", role: "Auth (Passport)" },
  { icon: "KeyRound", name: "JWT", role: "Sessions" },
  { icon: "Bot", name: "OpenRouter", role: "AI (LLM)" },
  { icon: "Database", name: "MongoDB", role: "Database" },
  { icon: "Gauge", name: "Upstash Redis", role: "Cache & Rate-limit" },
  { icon: "Network", name: "Python API", role: "Live EIU Data" },
  { icon: "BarChart3", name: "D3.js", role: "Flowchart" },
  { icon: "Palette", name: "Bootstrap", role: "UI Framework" },
  { icon: "Printer", name: "Browser Print", role: "Export PDF" },
];

const ARCH = [
  {
    icon: "Monitor",
    title: "Frontend",
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "EJS Templates · Bootstrap · D3.js / SVG · Responsive UI",
  },
  {
    icon: "Settings",
    title: "Backend",
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "Express.js · Node.js · Passport (Google OAuth) · JWT · OpenRouter (SSE streaming) · Redis rate-limiting",
  },
  {
    icon: "Database",
    title: "Database",
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "MongoDB · Upstash Redis (cache) · Python API for live EIU transcript data",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Palette",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Thiết kế UI/UX", en: "UI/UX Design" }),
    items: [
      lang({
        vi: "Thiết kế giao diện responsive với Bootstrap",
        en: "Designed responsive user interfaces using Bootstrap",
      }),
      lang({
        vi: "Thiết kế flowchart động với D3.js / SVG cho trang lộ trình",
        en: "Built dynamic flowcharts using D3.js / SVG for the roadmap page",
      }),
      lang({
        vi: "Xây dựng layout EJS template cho trang lộ trình và chat advisor",
        en: "Developed EJS templates for roadmap and advisor chat pages",
      }),
      lang({
        vi: "Phát triển giao diện chat AI với streaming response theo real-time",
        en: "Developed AI chat UI with real-time streaming responses",
      }),
    ],
  },
  {
    icon: "Server",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Phát triển Backend", en: "Backend Development" }),
    items: [
      lang({
        vi: "Xây dựng REST API với Express.js theo mô hình MVC",
        en: "Built REST APIs with Express.js following MVC architecture",
      }),
      lang({
        vi: "Thiết kế schema MongoDB cho hệ thống flowchart (nodes & paths)",
        en: "Designed MongoDB schema for flowchart system (nodes & paths)",
      }),
      lang({
        vi: "Tích hợp MongoDB Atlas + Mongoose để quản lý dữ liệu",
        en: "Integrated MongoDB Atlas and Mongoose for data management",
      }),
    ],
  },
  {
    icon: "Bot",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({
      vi: "Tích hợp AI & Real-time",
      en: "AI & Real-time Integration",
    }),
    items: [
      lang({
        vi: "Tìm model AI API (openai/gpt-oss-20b:free) với streaming response",
        en: "Researched AI models (openai/gpt-oss-20b:free) with streaming response",
      }),
      lang({
        vi: "Tham gia xây dựng câu prompt cho AI nhận diện GPA & lộ trình cá nhân",
        en: "Contributed to prompt design for GPA and personalized roadmap understanding",
      }),
      lang({
        vi: "Xây dựng chat nhắn tin giữa sinh viên và cố vấn (lưu trên MongoDB)",
        en: "Built student-advisor chat messaging (stored in MongoDB)",
      }),
    ],
  },
  {
    icon: "FileOutput",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({
      vi: "Xuất PDF & Triển khai",
      en: "PDF Export & Deployment",
    }),
    items: [
      lang({
        vi: "Xuất lộ trình học ra file PDF với Browser Print",
        en: "Exported learning roadmap to PDF using browser print",
      }),
      lang({
        vi: "Deploy ứng dụng lên Vercel",
        en: "Deployed the application on Vercel",
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

// ── Page Card ─────────────────────────────────────────────────────────────────
function PageCard({ page, isLight }) {
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
          <img
            src={page.img}
            alt={page.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
            style={{ maxHeight: "260px" }}
          />
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

          {/* Tags — dùng tagLight / tagDark riêng */}
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
function SmartAdvisorDetail() {
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
        <title>Smart Learning Advisor | Gia Hung Pham</title>
        <meta
          name="description"
          content="Smart Learning Advisor - an AI-powered academic advisor with GPA tracking and course recommendations, built by Gia Hung Pham."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/smart-learning-advisor"
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
              EIU · CIT · SWE 2023
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}
            >
              EIU/CIT{" "}
              <span className="text-sky-500">Smart Learning Advisor</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Nền tảng tư vấn học tập tích hợp AI giúp sinh viên theo dõi GPA, trực quan hóa lộ trình và nhận tư vấn cá nhân hóa.",
                en: "An AI-powered platform that helps students track GPA, visualize learning paths, and receive personalized guidance.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "6", l: lang({ vi: "Trang", en: "Pages" }) },
                { n: "31", l: lang({ vi: "Môn học", en: "Courses" }) },
                { n: "AI", l: lang({ vi: "Tư vấn", en: "AI Advisor" }) },
                { n: "PDF", l: lang({ vi: "Xuất file", en: "PDF Export" }) },
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

            {/* ── User pass ── */}
            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-s ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                Demo Account
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-bold">ID:</span>{" "}
                  <span className="font-mono">233188e4eda1</span>
                </div>
                <div>
                  <span className="font-bold">Password:</span>{" "}
                  <span className="font-mono">9006</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://smart-learning-advisor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {Rocket && <Rocket />}{" "}
                {lang({ vi: "Xem demo", en: "Live Demo" })}
              </a>
              <a
                href="https://github.com/Hung1510/smart-learning-advisor"
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
              vi: "Đảm nhận toàn bộ vòng đời phát triển sản phẩm — từ thiết kế giao diện đến triển khai backend và tích hợp AI.",
              en: "Responsible for the full product development lifecycle — from UI design to backend implementation and AI integration.",
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
                vi: "Lập trình viên Fullstack",
                en: "Fullstack Developer",
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

        {/* ── Pages ── */}
        <Pill
          label={lang({ vi: "Các trang", en: "Pages" })}
          isLight={isLight}
        />
        <SectionTitle
          pre={lang({ vi: "Mô tả từng", en: "Explore" })}
          accent={lang({ vi: "trang", en: "page" })}
          desc={lang({
            vi: "Hệ thống gồm 6 trang chính, mỗi trang giải quyết một nhu cầu cụ thể trong hành trình học tập của sinh viên.",
            en: "The system consists of 6 main pages, each addressing a specific need in the student learning journey.",
          })}
          isLight={isLight}
        />
        {PAGES.map((page) => (
          <PageCard key={page.num} page={page} isLight={isLight} />
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
              vi: "Xây dựng trên nền tảng Node.js với kiến trúc MVC, tích hợp AI và database NoSQL để đảm bảo hiệu suất và khả năng mở rộng.",
              en: "Built on Node.js with an MVC architecture, integrating AI and NoSQL databases to ensure performance and scalability.",
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
              vi: "Mô hình MVC 3 tầng rõ ràng: Client → Server → Database với AI layer tích hợp ở tầng dịch vụ.",
              en: "A clear 3-tier MVC architecture: Client → Server → Database, with an AI layer integrated at the service level.",
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

export default SmartAdvisorDetail;