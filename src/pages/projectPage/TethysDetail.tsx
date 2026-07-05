import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import {
  Boxes,
  Camera,
  Cpu,
  Crosshair,
  Database,
  Dna,
  FileJson,
  Gamepad2,
  Gauge,
  GitBranch,
  Globe,
  LayoutGrid,
  Monitor,
  Package,
  Rocket,
  ScanText,
  Search,
  Server,
  Settings,
  Target,
  Terminal,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons actually used on this page are imported, so the whole
// lucide-react library isn't pulled into the bundle. Dynamic lookups
// (Icons[name]) below resolve against this map.
const Icons: Record<string, LucideIcon> = {
  Boxes,
  Camera,
  Cpu,
  Crosshair,
  Database,
  Dna,
  FileJson,
  Gamepad2,
  Gauge,
  GitBranch,
  Globe,
  LayoutGrid,
  Monitor,
  Package,
  Rocket,
  ScanText,
  Search,
  Server,
  Settings,
  Target,
  Terminal,
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

// ── Feature type — either a screenshot (img) or a terminal snippet (code) ──────
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
  img?: string;
  code?: string;
};

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Dna",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Bộ tối ưu build", en: "Build Optimizer" }),
    subtitle: lang({
      vi: "Thuật toán di truyền + giải vét cạn",
      en: "Genetic algorithm + exhaustive solver",
    }),
    features: [
      lang({
        vi: "Thuật toán di truyền: chọn lọc giải đấu, lai ghép, đột biến, elitism, bước repair giữ build hợp lệ",
        en: "Genetic algorithm: tournament selection, crossover, mutation, elitism, and a repair step that keeps builds valid",
      }),
      lang({
        vi: "Giải vét cạn trả về nghiệm tối ưu tuyệt đối cho kho nhỏ",
        en: "Exhaustive solver returns the provable optimum for small inventories",
      }),
      lang({
        vi: "Vét cạn được dùng làm 'oracle' để kiểm thử GA trong test suite",
        en: "The exhaustive solver is the oracle the GA is tested against",
      }),
      lang({
        vi: "Chấm điểm qua trait Evaluator — mô hình roll-value, có thể thay bằng công thức sát thương",
        en: "Scoring behind an Evaluator trait — weighted roll-value model, swappable for a damage formula",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Genetic Algorithm", "Exhaustive", "Evaluator trait"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    code: `$ tethys optimize inv.json --profile dps

Recommended build (genetic solver)
  score:       13.690
  evaluations: 30000
  [4] SunSinkingEclipse  CritDmg 44.0%
  [3] SunSinkingEclipse  Fusion  30.0%
  [3] SunSinkingEclipse  AtkPct  30.0%
  [1] SunSinkingEclipse  AtkPct  18.0%
  [1] MoltenRiftEmbers   AtkPct  18.0%`,
  },
  {
    num: "02",
    icon: "ScanText",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Quét màn hình & OCR", en: "Screen Scan & OCR" }),
    subtitle: lang({
      vi: "Đọc echo trực tiếp từ màn hình, không nhập tay",
      en: "Read echoes off the screen — no manual entry",
    }),
    features: [
      lang({
        vi: "Chụp cửa sổ game bằng xcap (theo tiêu đề cửa sổ)",
        en: "Grabs the game window via xcap (by window title)",
      }),
      lang({
        vi: "Backend OCR Tesseract, bật qua feature flag",
        en: "Tesseract OCR backend, enabled behind a feature flag",
      }),
      lang({
        vi: "Parser chuyển văn bản OCR → chỉ số có kiểu (thuần, đã test)",
        en: "OCR-text → typed-stats parser (pure, fully tested)",
      }),
      lang({
        vi: "Nhập/xuất kho echo bằng JSON",
        en: "Inventory import/export as plain JSON",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["xcap", "Tesseract", "OCR parser"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `# real screen capture
$ cargo build -p tethys-scanner \\
    --features capture

# tesseract OCR backend
$ cargo build -p tethys-scanner \\
    --features tesseract`,
  },
  {
    num: "03",
    icon: "Crosshair",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Dò vùng chụp", en: "Capture-region Detection" }),
    subtitle: lang({
      vi: "Khớp khung 16:9 + lớp phủ hiệu chỉnh",
      en: "16:9 content-fit + calibration overlay",
    }),
    features: [
      lang({
        vi: "Chụp cửa sổ game theo tiêu đề — không phụ thuộc vị trí cửa sổ",
        en: "Captures the game window by title — position-independent",
      }),
      lang({
        vi: "Tính khung nội dung 16:9, bỏ qua viền letterbox/pillarbox",
        en: "Computes the 16:9 content rect, skipping letterbox/pillarbox bars",
      }),
      lang({
        vi: "Đặt các vùng UI theo tỉ lệ — chạy được trên ultrawide & 16:10",
        en: "Places UI regions as fractions — works on ultrawide & 16:10",
      }),
      lang({
        vi: "Lớp phủ hiệu chỉnh vẽ hộp màu: tên / cost / main / substat",
        en: "Calibration overlay draws colored boxes: name / cost / main / substats",
      }),
      lang({
        vi: "Toàn bộ hình học là hàm thuần, unit-test qua nhiều tỉ lệ màn hình",
        en: "All geometry is pure and unit-tested across screen shapes",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["16:9 fit", "Calibration", "Unit-tested"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    img: "/Tethys/calibrate.png",
  },
  {
    num: "04",
    icon: "LayoutGrid",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Quét lưới kho", en: "Inventory Grid Scan" }),
    subtitle: lang({
      vi: "Chia ô toàn lưới, OCR mọi ô trong một lượt",
      en: "Tile the whole grid, OCR every cell in one pass",
    }),
    features: [
      lang({
        vi: "GridLayout chia vùng lưới thành ô theo hàng (row-major)",
        en: "GridLayout tiles the grid into per-cell rects (row-major)",
      }),
      lang({
        vi: "scan_grid_tiles cắt & OCR từng ô trong một lượt",
        en: "scan_grid_tiles crops and OCRs every tile in one pass",
      }),
      lang({
        vi: "Kế thừa xử lý letterbox/pillarbox từ khung nội dung",
        en: "Inherits the letterbox/pillarbox handling for free",
      }),
      lang({
        vi: "Chỉ đọc màn hình — không bao giờ click hay tự động hoá game",
        en: "Screen-read only — never clicks or automates the game",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["GridLayout", "Batch OCR", "Read-only"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `# overlay the inventory grid cells
$ tethys calibrate cal.png --grid

# magenta   = grid cells
# color box = detail-panel fields`,
  },
  {
    num: "05",
    icon: "Terminal",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "CLI & công cụ", en: "CLI & Tooling" }),
    subtitle: lang({
      vi: "Chạy được ngay hôm nay, GUI đã dựng khung",
      en: "Runnable today, GUI scaffolded",
    }),
    features: [
      lang({
        vi: "Các lệnh optimize / sample / calibrate",
        en: "optimize / sample / calibrate subcommands",
      }),
      lang({
        vi: "Cờ --profile, --set, --method để tuỳ chỉnh lời giải",
        en: "--profile, --set, --method flags to tune the solve",
      }),
      lang({
        vi: "GUI desktop egui sau feature flag gui (đang dựng khung)",
        en: "egui desktop GUI behind the gui feature (scaffold)",
      }),
      lang({
        vi: "Trang landing SEO trong docs/ (JSON-LD, OG, sitemap)",
        en: "SEO landing page in docs/ (JSON-LD, OG, sitemap)",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["CLI", "egui", "SEO"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    code: `$ tethys optimize inv.json \\
    --set SunSinkingEclipse
$ tethys optimize inv.json \\
    --method exhaustive
$ tethys sample     # print JSON schema
$ tethys gui        # egui desktop (feature)`,
  },
];

const TECH = [
  { icon: "Zap", name: "Rust (stable)", role: "Language" },
  { icon: "Boxes", name: "Cargo Workspace", role: "3-crate split" },
  { icon: "Dna", name: "Genetic Algorithm", role: "Optimizer" },
  { icon: "Cpu", name: "Exhaustive Solver", role: "Provable optimum" },
  { icon: "Camera", name: "xcap", role: "Window capture" },
  { icon: "ScanText", name: "Tesseract", role: "OCR backend" },
  { icon: "Search", name: "OCR Parser", role: "Text → stats" },
  { icon: "FileJson", name: "serde / JSON", role: "Inventory format" },
  { icon: "Monitor", name: "egui", role: "Desktop GUI" },
  { icon: "GitBranch", name: "GitHub Actions", role: "CI" },
  { icon: "Globe", name: "GitHub Pages", role: "Landing / docs" },
  { icon: "Rocket", name: "Vercel", role: "Live demo site" },
];

const ARCH = [
  {
    icon: "Cpu",
    title: "tethys-core",
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "Domain model, scoring (Evaluator), and the optimizer (GA + exhaustive). No I/O, no platform code — fully unit-tested on any OS.",
  },
  {
    icon: "ScanText",
    title: "tethys-scanner",
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "Capture-region detection (pure, tested), screen capture (xcap), and OCR (Tesseract). Window grab + OCR backends sit behind feature flags.",
  },
  {
    icon: "Terminal",
    title: "tethys-app",
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "The CLI (optimize / sample / calibrate) and the feature-gated egui desktop GUI that tie the workspace together.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Dna",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Lõi tối ưu & mô hình", en: "Optimizer & Core Engine" }),
    items: [
      lang({
        vi: "Thiết kế mô hình miền và trait Evaluator để chấm điểm build",
        en: "Designed the domain model and the Evaluator trait for scoring builds",
      }),
      lang({
        vi: "Viết thuật toán di truyền (optimize_ga) làm giải chung",
        en: "Wrote the genetic algorithm (optimize_ga) as the general solver",
      }),
      lang({
        vi: "Viết giải vét cạn và dùng nó làm oracle kiểm thử GA",
        en: "Wrote the exhaustive solver and used it as the oracle for testing the GA",
      }),
    ],
  },
  {
    icon: "Camera",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Bộ quét & OCR", en: "Scanner & OCR" }),
    items: [
      lang({
        vi: "Xây hình học vùng chụp theo tỉ lệ nội dung (khớp 16:9)",
        en: "Built content-relative capture geometry (16:9 content-fit)",
      }),
      lang({
        vi: "Kết nối chụp cửa sổ xcap và OCR Tesseract sau feature flag",
        en: "Wired xcap window capture and Tesseract OCR behind feature flags",
      }),
      lang({
        vi: "Viết parser OCR → chỉ số và bộ chia ô lưới batch-scan",
        en: "Wrote the OCR → stats parser and the grid-tiling batch scan",
      }),
    ],
  },
  {
    icon: "Terminal",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "CLI, GUI & công cụ", en: "CLI, GUI & Tooling" }),
    items: [
      lang({
        vi: "Xây CLI với các lệnh optimize / sample / calibrate",
        en: "Built the CLI with optimize / sample / calibrate subcommands",
      }),
      lang({
        vi: "Làm công cụ hiệu chỉnh vẽ lớp phủ vùng chụp",
        en: "Made the calibration tool that draws the capture-region overlay",
      }),
      lang({
        vi: "Dựng khung GUI egui và nhập/xuất kho echo bằng JSON",
        en: "Scaffolded the egui GUI and JSON inventory import/export",
      }),
    ],
  },
  {
    icon: "Globe",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Landing, SEO & CI", en: "Landing, SEO & CI" }),
    items: [
      lang({
        vi: "Viết landing trong docs/ với dữ liệu cấu trúc JSON-LD & thẻ OG",
        en: "Wrote the docs/ landing page with JSON-LD structured data & OG tags",
      }),
      lang({
        vi: "Chuẩn bị sitemap.xml, robots.txt và bộ icon PWA/favicon",
        en: "Prepared sitemap.xml, robots.txt, and the PWA/favicon icon set",
      }),
      lang({
        vi: "Thiết lập CI GitHub Actions và triển khai bản demo",
        en: "Set up GitHub Actions CI and deployed the demo",
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

// ── Terminal snippet (used when a feature has no screenshot) ───────────────────
function CodeTerminal({ code }: { code: string }) {
  return (
    <div className="h-full flex flex-col bg-[#0b1120] border-r border-white/5">
      {/* Fake terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] font-mono text-slate-500">
          tethys — zsh
        </span>
      </div>
      <pre className="flex-1 overflow-x-auto px-4 py-4 text-[12px] leading-relaxed font-mono text-slate-300 whitespace-pre">
        {code}
      </pre>
    </div>
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
        {/* Visual: screenshot OR terminal snippet */}
        <div
          className={`border-b md:border-b-0 md:border-r overflow-hidden ${
            isLight ? "border-slate-100" : "border-white/5"
          }`}
        >
          {page.img ? (
            <img
              src={page.img}
              alt={page.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
              style={{ maxHeight: "260px" }}
            />
          ) : (
            <CodeTerminal code={page.code ?? ""} />
          )}
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
function TethysDetail() {
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
        <title>Tethys | Gia Hung Pham</title>
        <meta
          name="description"
          content="Tethys - a fast, native Rust echo build optimizer for Wuthering Waves that scans echoes off the screen with OCR and computes the best build with a genetic algorithm, built by Gia Hung Pham."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/tethys"
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
              Rust · Native · Wuthering Waves
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}
            >
              Tethys <span className="text-sky-500">Echo Optimizer</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Công cụ tối ưu build echo native, nhanh, cho Wuthering Waves. Quét echo trực tiếp từ màn hình bằng OCR và trả về build tối ưu về mặt toán học chỉ trong một giây.",
                en: "A fast, native echo build optimizer for Wuthering Waves. Scan your echoes off the screen with OCR and get the mathematically best build in a second.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "Rust", l: lang({ vi: "Ngôn ngữ", en: "Language" }) },
                { n: "3", l: lang({ vi: "Crate", en: "Crates" }) },
                { n: "GA", l: lang({ vi: "Bộ tối ưu", en: "Optimizer" }) },
                { n: "OCR", l: lang({ vi: "Quét màn hình", en: "Screen scan" }) },
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

            {/* ── Quick start ── */}
            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-s ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Bắt đầu nhanh", en: "Quick start" })}
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`$ cargo run --release -p tethys-app -- \\
    optimize sample_inventory.json --profile dps`}
              </pre>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://tethys-gray.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {Rocket && <Rocket />}{" "}
                {lang({ vi: "Xem trang", en: "Live Site" })}
              </a>
              <a
                href="https://github.com/Hung1510/Tethys"
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
              vi: "Là dự án cá nhân, tôi tự làm mọi tầng — từ thuật toán tối ưu, chụp màn hình & OCR, đến CLI và trang landing SEO.",
              en: "As a solo project, I owned every layer — from the optimizer's algorithms to screen capture, OCR, the CLI, and the SEO landing page.",
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
                vi: "Nhà phát triển độc lập",
                en: "Solo Developer",
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
            vi: "Tethys được ghép từ vài phần tập trung: một lõi tối ưu đã test kỹ, một bộ quét màn hình, và một CLI gắn kết tất cả lại.",
            en: "Tethys is built from a handful of focused pieces: a tested optimizer core, a screen scanner, and a CLI that ties it all together.",
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
              vi: "100% Rust trong một Cargo workspace ba crate, tách phần logic thuần khỏi phần phụ thuộc nền tảng để đảm bảo dễ test và dễ mở rộng.",
              en: "100% Rust in a three-crate Cargo workspace, separating pure logic from platform-specific code to keep it testable and extensible.",
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
            pre={lang({ vi: "Kiến trúc", en: "Workspace" })}
            accent={lang({ vi: "workspace", en: "Architecture" })}
            desc={lang({
              vi: "Workspace chia làm ba crate để phần logic thú vị luôn test được: core (thuần) → scanner (nền tảng, feature-gated) → app (CLI/GUI).",
              en: "The workspace is split into three crates so the interesting logic stays testable: core (pure) → scanner (platform, feature-gated) → app (CLI/GUI).",
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
                    className={`font-bold text-base mb-2 font-mono ${layer.titleColor}`}
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

export default TethysDetail;
