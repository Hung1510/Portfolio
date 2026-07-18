import { Helmet } from "react-helmet-async";
import {
  type Feature,
  useTheme,
  Pill,
  SectionTitle,
  FeatureCard,
} from "./_shared";
import { Navbar } from "../../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import {
  Boxes,
  Braces,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Database,
  FileJson,
  GitBranch,
  Layers,
  Network,
  Package,
  Rocket,
  Server,
  ShieldAlert,
  Shuffle,
  Sparkles,
  Store,
  Waypoints,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons this page uses, so the rest of lucide-react stays out of the bundle.
const Icons: Record<string, LucideIcon> = {
  Boxes,
  Braces,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Database,
  FileJson,
  GitBranch,
  Layers,
  Network,
  Package,
  Rocket,
  Server,
  ShieldAlert,
  Shuffle,
  Sparkles,
  Store,
  Waypoints,
  Workflow,
  Zap,
};
import { lang } from "@/helper/lang";

const NPM_URL = "https://www.npmjs.com/package/eco-faker";
const REPO_URL = "https://github.com/Hung1510/Eco-Faker";

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Workflow",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Một state machine, không phải JSON rời rạc", en: "One State Machine, Not Loose JSON" }),
    subtitle: lang({
      vi: "Dữ liệu đọc như lịch sử của một cửa hàng thật",
      en: "Data that reads like a real store's history",
    }),
    features: [
      lang({
        vi: "Users → Carts → (AbandonedCheckouts | Orders → Shipments → ReturnRequests)",
        en: "Users -> Carts -> (AbandonedCheckouts | Orders -> Shipments -> ReturnRequests)",
      }),
      lang({
        vi: "Mọi record đều xuất phát từ cùng một máy trạng thái nên liên kết chặt với nhau",
        en: "Every record derives from the same machine, so they're all relationally linked",
      }),
      lang({
        vi: "Một cart không bao giờ vừa thành Order vừa thành AbandonedCheckout",
        en: "A cart never produces both an Order and an AbandonedCheckout",
      }),
      lang({
        vi: "Return chỉ tồn tại khi mọi Shipment của Order đã Delivered",
        en: "A return only exists once every Shipment of an Order has Delivered",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Relational integrity", "Cart lifecycle", "Invariants"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    code: `active ──▶ converted ──▶ Order
   │              processing → shipped → delivered
   ▼                                        │
abandoned                          returnRate roll
   │                                        │
   ▼                                        ▼
AbandonedCheckout                    ReturnRequest?`,
  },
  {
    num: "02",
    icon: "CheckCircle2",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Chính xác đến từng con số", en: "Financially Exact" }),
    subtitle: lang({
      vi: "Bất biến được test bảo vệ, không trôi số thực",
      en: "Test-enforced invariants, no float drift",
    }),
    features: [
      lang({
        vi: "subtotal + tax + shipping === total, làm tròn độc lập, không trôi số thực",
        en: "subtotal + tax + shipping === total, rounded independently, no floating-point drift",
      }),
      lang({
        vi: "Tiền tệ định dạng theo locale (totalFormatted), có ngưỡng free-shipping",
        en: "Locale-aware formatted currency (totalFormatted), plus a free-shipping threshold",
      }),
      lang({
        vi: "Timeline tracking tăng dần nghiêm ngặt và theo đúng thứ tự trạng thái",
        en: "Tracking timelines strictly increase and follow a valid stage order",
      }),
      lang({
        vi: "Cả edge case: thiếu địa chỉ, đơn nhiều kiện, đơn chưa có scan nào",
        en: "Edge cases too: missing address, multi-package orders, not-yet-scanned shipments",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["Money-exact", "Locale currency", "Valid timelines"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    code: `// Label Created → Picked Up → In Transit
//   → [Delayed] → Out for Delivery → Delivered
subtotal + tax + shipping === total  // always
totalFormatted: "$1,240.50"          // locale-aware`,
  },
  {
    num: "03",
    icon: "CalendarClock",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Tất định + time-travel", en: "Deterministic + Time-Travel" }),
    subtitle: lang({
      vi: "Cùng seed + thời điểm → dataset y hệt từng byte",
      en: "Same seed + reference time -> byte-identical dataset",
    }),
    features: [
      lang({
        vi: "Mọi quyết định xác suất đi qua một PRNG có seed (mulberry32)",
        en: "Every probabilistic decision runs through one seeded PRNG (mulberry32)",
      }),
      lang({
        vi: "Snapshot chỉ lưu công thức (seed, config, referenceNow), không lưu cả dataset",
        en: "A snapshot stores just the recipe (seed, config, referenceNow), not the whole dataset",
      }),
      lang({
        vi: "replay dựng lại y hệt từng byte, nên bug trở thành fixture một dòng",
        en: "replay rebuilds it byte-for-byte, so a bug becomes a one-line fixture",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["mulberry32", "Snapshot / replay", "Reproducible"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `$ my-eco-gen generate --seed 42 \\
    --snapshot ./bug-42.snapshot.json
# ...days later...
$ my-eco-gen replay --input ./bug-42.snapshot.json
$ diff run1.json replay.json   # byte-identical`,
  },
  {
    num: "04",
    icon: "Server",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Mock REST API + chaos mode", en: "Mock REST API + Chaos Mode" }),
    subtitle: lang({
      vi: '"json-server cho e-commerce"',
      en: '"json-server for e-commerce"',
    }),
    features: [
      lang({
        vi: "serve dựng một API phân trang, lọc, sắp xếp trên dataset đã sinh",
        en: "serve spins up a paginated, filterable, sortable API over a generated dataset",
      }),
      lang({
        vi: "Chaos mode tiêm 429/500 và latency spike để test cả đường lỗi",
        en: "Chaos mode injects 429/500 and latency spikes to test the unhappy path",
      }),
      lang({
        vi: "Giả lập API-key auth, spec OpenAPI, export Postman, và feed WebSocket trực tiếp",
        en: "API-key auth simulation, an OpenAPI spec, Postman export, and a live WebSocket feed",
      }),
      lang({
        vi: "REST, /openapi.json và feed live đều dùng chung một bảng route nên không lệch nhau",
        en: "REST, /openapi.json and the live feed share one route table so they never drift",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["json-server style", "Chaos mode", "OpenAPI + Postman", "WebSocket"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    code: `$ my-eco-gen serve --users 300 \\
    --scenario black-friday --chaos --live

GET /api/orders?status=delivered&page=2&sort=total
GET /openapi.json      ws://localhost:4000/live`,
  },
  {
    num: "05",
    icon: "Database",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Nhận diện & ánh xạ schema", en: "Schema Introspection & Mapping" }),
    subtitle: lang({
      vi: "Trỏ vào schema của bạn, nó tự khớp cột",
      en: "Point it at your schema, it maps its columns onto yours",
    }),
    features: [
      lang({
        vi: "Đọc schema Prisma, Drizzle hoặc SQLAlchemy (tự nhận theo đuôi file)",
        en: "Reads Prisma, Drizzle, or SQLAlchemy schemas (auto-detected by extension)",
      }),
      lang({
        vi: "Fuzzy matcher trùng token ánh xạ cột chuẩn sang cột thật, kèm điểm tin cậy",
        en: "A token-overlap fuzzy matcher maps canonical columns to yours, with confidence scores",
      }),
      lang({
        vi: "Xuất mapping.json cho người sửa tay, rồi sinh SQL/CSV đúng tên bảng của bạn",
        en: "Emits a human-editable mapping.json, then generates SQL/CSV targeting your real names",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["Prisma", "Drizzle", "SQLAlchemy", "Fuzzy mapping"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `$ my-eco-gen init --schema ./prisma/schema.prisma
  users -> User:   6/7 columns confidently mapped
  orders -> Order: 12/12 columns mapped

$ my-eco-gen generate --mapping ./mapping.json \\
    --format sql --output ./seed.sql`,
  },
  {
    num: "06",
    icon: "ShieldAlert",
    iconBg: "bg-rose-900/30",
    title: lang({ vi: "Kịch bản + tiêm bất thường", en: "Scenarios + Anomaly Injection" }),
    subtitle: lang({
      vi: "Không chỉ sinh happy path",
      en: "Not just the happy path",
    }),
    features: [
      lang({
        vi: "Preset business: black-friday, post-holiday-returns, flash-sale, supply-chain-crisis...",
        en: "Business presets: black-friday, post-holiday-returns, flash-sale, supply-chain-crisis...",
      }),
      lang({
        vi: "Tiêm edge case hiếm, giá trị cao: cart bot, phụ phí ship vùng xa, review mâu thuẫn",
        en: "Injects rare, high-value edge cases: bot carts, remote-shipping surcharges, contradictory reviews",
      }),
      lang({
        vi: "Bản ghi bất thường được gắn cờ (record.anomaly), không giấu, để stress-test hệ thống dưới",
        en: "Anomalous records are tagged (record.anomaly), not hidden, to stress-test downstream systems",
      }),
    ],
    dotColor: "bg-rose-500",
    tags: ["Scenario presets", "Tagged anomalies", "Fraud-test data"],
    tagDark: "bg-rose-900/40 text-rose-300 border border-rose-700/40",
    tagLight: "bg-rose-100 text-rose-700 border border-rose-200",
    code: `$ my-eco-gen generate --scenario black-friday \\
    --bot-cart-rate 0.05 --remote-shipping-rate 0.1

# a negative-reason return with csatScore: 5
# -> tagged, so naive sentiment models get caught`,
  },
  {
    num: "07",
    icon: "Zap",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "Streaming, đa cửa hàng & playground", en: "Streaming, Multi-store & Playground" }),
    subtitle: lang({
      vi: "Từ pipe NDJSON tới dashboard trong trình duyệt",
      en: "From NDJSON pipes to an in-browser dashboard",
    }),
    features: [
      lang({
        vi: "--stream xuất từng dòng NDJSON ngay khi sinh, bộ nhớ phẳng bất kể quy mô",
        en: "--stream emits NDJSON line by line as records are produced, flat memory at any scale",
      }),
      lang({
        vi: "--stores N sinh N cửa hàng seed riêng, độc lập nhưng tái tạo được cả cụm",
        en: "--stores N generates N independently-seeded stores, reproducible as a whole",
      }),
      lang({
        vi: "Playground Express + Chart.js: slider trực tiếp, phân khúc RFM, so sánh kịch bản",
        en: "An Express + Chart.js playground: live sliders, RFM segmentation, scenario comparison",
      }),
      lang({
        vi: "Cùng generator gói bằng esbuild chạy full client-side, deploy thẳng lên GitHub Pages",
        en: "The same generator, esbuild-bundled to run fully client-side, deployable to GitHub Pages",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["NDJSON stream", "Multi-store", "RFM playground", "Static demo"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `$ my-eco-gen generate --users 100000 --stream \\
    | kafka-console-producer --topic eco-events

$ my-eco-gen generate --stores 5 --users 200`,
  },
];

const TECH = [
  { icon: "Braces", name: "TypeScript", role: "Library + CLI" },
  { icon: "Package", name: "npm", role: "Published package" },
  { icon: "Shuffle", name: "mulberry32", role: "Seeded PRNG" },
  { icon: "CheckCircle2", name: "ajv", role: "Config validation" },
  { icon: "Server", name: "Express", role: "Mock API + playground" },
  { icon: "Waypoints", name: "ws", role: "Live event feed" },
  { icon: "FileJson", name: "OpenAPI + Postman", role: "API contracts" },
  { icon: "Sparkles", name: "esbuild", role: "Browser bundle" },
  { icon: "Cloud", name: "Docker + Postgres", role: "One-command seed" },
  { icon: "CheckCircle2", name: "Vitest", role: "64 tests" },
  { icon: "GitBranch", name: "GitHub Actions", role: "3-job CI" },
  { icon: "Database", name: "JSON / SQL / CSV", role: "Output formats" },
];

const ARCH = [
  {
    icon: "Layers",
    title: lang({ vi: "Lõi sinh dữ liệu", en: "Generation Core" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "A seeded PRNG feeds per-domain modules (user, cart, order, tracking, return, anomaly). generator.ts orchestrates the full pipeline; generateRecords() is the streaming variant that never holds the full dataset in memory.",
  },
  {
    icon: "Network",
    title: lang({ vi: "Giao diện & xuất", en: "Interfaces & Output" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "One core, many surfaces: a CLI (generate / serve / webhook / diff / replay / init), JSON/SQL/CSV serializers, a mock REST API with OpenAPI + Postman, and introspection parsers that map onto Prisma/Drizzle/SQLAlchemy schemas.",
  },
  {
    icon: "Rocket",
    title: lang({ vi: "Chạy được ở mọi nơi", en: "Runs Everywhere" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "A browser-safe entrypoint (no node:fs) lets esbuild bundle the whole pipeline for a zero-server static demo; Docker Compose seeds a real Postgres in one command; a 3-job CI matrix guards it all.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Workflow",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Mô hình miền e-commerce", en: "E-commerce Domain Model" }),
    items: [
      lang({
        vi: "Thiết kế state machine của cart và các bất biến quan hệ giữa các entity",
        en: "Designed the cart state machine and the relational invariants between entities",
      }),
      lang({
        vi: "Đảm bảo chính xác tài chính và timeline tracking hợp lệ, có test bảo vệ",
        en: "Enforced financial exactness and valid tracking timelines, guarded by tests",
      }),
    ],
  },
  {
    icon: "Shuffle",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Tất định & kịch bản", en: "Determinism & Scenarios" }),
    items: [
      lang({
        vi: "Đưa mọi quyết định qua một PRNG có seed để tái tạo và snapshot/replay",
        en: "Routed every decision through one seeded PRNG for reproducibility and snapshot/replay",
      }),
      lang({
        vi: "Xây preset kịch bản business và bộ tiêm bất thường có gắn cờ",
        en: "Built business-scenario presets and a tagged anomaly-injection system",
      }),
    ],
  },
  {
    icon: "Server",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Bề mặt công cụ", en: "Tooling Surfaces" }),
    items: [
      lang({
        vi: "Mock REST API (chaos, auth, OpenAPI, Postman, WebSocket) từ một bảng route",
        en: "A mock REST API (chaos, auth, OpenAPI, Postman, WebSocket) from one route table",
      }),
      lang({
        vi: "Introspection Prisma/Drizzle/SQLAlchemy và các format xuất JSON/SQL/CSV",
        en: "Prisma/Drizzle/SQLAlchemy introspection and JSON/SQL/CSV output formats",
      }),
    ],
  },
  {
    icon: "Package",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Đóng gói & phân phối", en: "Packaging & Delivery" }),
    items: [
      lang({
        vi: "Publish lên npm với prepublish chạy build + test, kèm demo static trên GitHub Pages",
        en: "Published to npm with a build+test prepublish gate, plus a static GitHub Pages demo",
      }),
      lang({
        vi: "Bundle browser bằng esbuild, seed Postgres bằng Docker, và CI 3 job",
        en: "An esbuild browser bundle, a Docker Postgres seed, and a 3-job CI matrix",
      }),
    ],
  },
];

function EcoFakerDetail() {
  const isLight = useTheme();
  const RocketIcon = Icons["Rocket"];
  const ZapIcon = Icons["Zap"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>eco-faker | Gia Hung Pham</title>
        <meta
          name="description"
          content="eco-faker - a published TypeScript library/CLI that generates relationally-consistent fake e-commerce data from one state machine, with a mock REST API, chaos mode, business scenarios, schema introspection, and seeded reproducibility."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/eco-faker"
        />
      </Helmet>
      {isLight ? <SkyBackground /> : <StarBackground />}
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-[100px] pb-20">
        {/* Hero */}
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
              TypeScript · Published on npm · Open source
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${
                isLight ? "text-slate-800" : "text-white"
              }`}
            >
              eco<span className="text-sky-500">-faker</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Bộ sinh dữ liệu giả cho e-commerce nhất quán về quan hệ và có trạng thái. Không phải một đống JSON ngẫu nhiên: mọi Cart, Order, Shipment và ReturnRequest đều bắt nguồn từ cùng một state machine, nên dataset đọc như lịch sử của một cửa hàng thật thay vì các fixture rời rạc.",
                en: "A stateful, relationally-consistent fake-data generator for e-commerce. Not a pile of random JSON: every Cart, Order, Shipment, and ReturnRequest derives from the same state machine, so the dataset reads like a real store's history instead of unrelated fixtures.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "npm", l: lang({ vi: "Đã publish", en: "Published" }) },
                { n: "64", l: lang({ vi: "Bài test", en: "Tests" }) },
                { n: "3", l: lang({ vi: "Format xuất", en: "Output formats" }) },
                { n: "Seeded", l: lang({ vi: "Tất định", en: "Deterministic" }) },
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

            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Thử trong 30 giây", en: "Try it in 30 seconds" })}
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`$ npm install -g eco-faker
$ my-eco-gen generate --scenario black-friday \\
    --users 100 --format sql --output ./seed.sql`}
              </pre>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {RocketIcon && <RocketIcon />} {lang({ vi: "Xem trên npm", en: "View on npm" })}
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
                {ZapIcon && <ZapIcon />} GitHub
              </a>
            </div>
          </div>
        </div>

        {/* My Role */}
        <div className="mb-12">
          <Pill label={lang({ vi: "Vai trò", en: "Role" })} isLight={isLight} />
          <SectionTitle
            pre={lang({ vi: "Vai trò của", en: "My" })}
            accent={lang({ vi: "bản thân", en: "Role" })}
            desc={lang({
              vi: "Dự án cá nhân: từ mô hình miền e-commerce và tính tất định, tới các bề mặt công cụ, rồi đóng gói publish lên npm.",
              en: "A solo project: from the e-commerce domain model and determinism, to the tooling surfaces, to packaging and publishing on npm.",
            })}
            isLight={isLight}
          />

          <div className="flex justify-center mb-8">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-900/30 border-blue-400/30 text-blue-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {lang({ vi: "Nhà phát triển độc lập", en: "Solo Developer" })}
            </span>
          </div>

          <div className="relative">
            <div
              className={`absolute left-5 top-2 bottom-2 w-px ${
                isLight ? "bg-slate-200" : "bg-white/10"
              }`}
            />
            {MY_ROLE_STEPS.map((step, i) => {
              const IconComponent = Icons[step.icon];
              return (
                <div key={i} className="relative pl-14 mb-8 last:mb-0">
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

        {/* Features */}
        <Pill label={lang({ vi: "Tính năng", en: "Features" })} isLight={isLight} />
        <SectionTitle
          pre={lang({ vi: "Các", en: "Core" })}
          accent={lang({ vi: "tính năng", en: "features" })}
          desc={lang({
            vi: "Điểm khác biệt không phải là sinh nhanh, mà là tính nhất quán: một state machine sinh ra dữ liệu tôn trọng cùng những ràng buộc mà một cửa hàng thật phải tuân theo.",
            en: "The differentiator isn't speed, it's consistency: one state machine produces data that respects the same constraints a real store has to.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard
            key={page.num}
            page={page}
            isLight={isLight}
            icons={Icons}
            terminalLabel="my-eco-gen — bash"
          />
        ))}

        {/* Tech Stack */}
        <div className="mb-10">
          <Pill
            label={lang({ vi: "Công nghệ", en: "Tech Stack" })}
            isLight={isLight}
          />
          <SectionTitle
            pre={lang({ vi: "Công nghệ", en: "Technologies" })}
            accent={lang({ vi: "sử dụng", en: "Used" })}
            desc={lang({
              vi: "TypeScript từ đầu đến cuối, một lõi sinh dữ liệu duy nhất được tái sử dụng qua CLI, mock API, playground và một bundle chạy trong trình duyệt.",
              en: "TypeScript end to end, with one generation core reused across the CLI, the mock API, the playground, and a browser bundle.",
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

        {/* Architecture */}
        <div className="mb-4">
          <Pill
            label={lang({ vi: "Kiến trúc", en: "Architecture" })}
            isLight={isLight}
          />
          <SectionTitle
            pre={lang({ vi: "Kiến trúc", en: "System" })}
            accent={lang({ vi: "hệ thống", en: "Architecture" })}
            desc={lang({
              vi: "Một lõi sinh dữ liệu, nhiều bề mặt: cùng generate() chạy sau CLI, mock API, playground và một bundle client-side.",
              en: "One generation core, many surfaces: the same generate() runs behind the CLI, the mock API, the playground, and a client-side bundle.",
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
                  <h4 className={`font-bold text-base mb-2 ${layer.titleColor}`}>
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

export default EcoFakerDetail;