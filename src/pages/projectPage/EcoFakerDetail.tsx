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
  BarChart3,
  Bot,
  Boxes,
  Braces,
  Bug,
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
  Warehouse,
  Waypoints,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons this page uses, so the rest of lucide-react stays out of the bundle.
const Icons: Record<string, LucideIcon> = {
  BarChart3,
  Bot,
  Boxes,
  Braces,
  Bug,
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
  Warehouse,
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
    title: lang({
      vi: "Một state machine, 18 bảng",
      en: "One State Machine, 18 Tables",
    }),
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
        vi: "Một cart không bao giờ vừa thành Order vừa thành AbandonedCheckout",
        en: "A cart never produces both an Order and an AbandonedCheckout",
      }),
      lang({
        vi: "Return chỉ tồn tại khi mọi Shipment của Order đã Delivered",
        en: "A return only exists once every Shipment of an Order has Delivered",
      }),
      lang({
        vi: "subtotal + tax + shipping === total, làm tròn độc lập, không trôi số thực",
        en: "subtotal + tax + shipping === total, rounded independently, no float drift",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Relational integrity", "Financially exact", "18 tables"],
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
    icon: "Package",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Catalog sản phẩm dùng chung", en: "A Real Shared Catalog" }),
    subtitle: lang({
      vi: "Cùng một sản phẩm thực sự tái xuất hiện qua nhiều đơn",
      en: "The same product genuinely recurs across orders",
    }),
    features: [
      lang({
        vi: "Cây danh mục 2 tầng, brands, suppliers, products kèm variants (sku, priceDelta, stockLevel)",
        en: "A 2-level category tree, brands, suppliers, and products with variants (sku, priceDelta, stockLevel)",
      }),
      lang({
        vi: "Mọi LineItem.productId đều resolve về một product thật, không phải sản phẩm bịa riêng từng dòng",
        en: "Every LineItem.productId resolves to a real product, not one invented per line",
      }),
      lang({
        vi: "basePrice lấy theo dải giá của từng subcategory, nên laptop và đồ chơi không chung khung giá",
        en: "basePrice comes from a per-subcategory band, so laptops and puzzles don't share a price range",
      }),
      lang({
        vi: "Tên hoàn toàn tổng quát, cố ý không dùng thương hiệu có thật",
        en: "Names are deliberately generic, with no real trademarked brands",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["Categories / brands / suppliers", "Variants", "Real FKs"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `$ my-eco-gen generate --users 300 --catalog-size 200
catalog: 33 categories, 13 brands,
         6 suppliers, 200 products

$ my-eco-gen lint --input ./eco-data.json
# confirms every line item's productId is real`,
  },
  {
    num: "03",
    icon: "Sparkles",
    iconBg: "bg-purple-900/30",
    title: lang({
      vi: "Dữ liệu gợi ý & mô phỏng kho",
      en: "Recommendation Data & Inventory",
    }),
    subtitle: lang({
      vi: "Có gốc rễ trong dataset, không phải ngẫu nhiên độc lập",
      en: "Grounded in the dataset, not independently random",
    }),
    features: [
      lang({
        vi: "Mỗi sản phẩm đã mua đều được xem 1-4 lần trước đó, kèm search query khớp thật",
        en: "Every purchased product was viewed 1-4 times beforehand, with a real matching search query",
      }),
      lang({
        vi: "Rating chỉ có trên đơn đã Delivered và luôn sau mốc giao hàng thật",
        en: "Ratings only exist on delivered orders, always after the real delivery event",
      }),
      lang({
        vi: "ReplenishmentOrder.expectedDeliveryAt = orderedAt + đúng supplier.leadTimeDays của catalog",
        en: "ReplenishmentOrder.expectedDeliveryAt = orderedAt + the catalog's own supplier.leadTimeDays",
      }),
      lang({
        vi: "Sản phẩm đang tồn kho thấp có xác suất cao hơn hẳn từng có stockout gần đây",
        en: "Products low on stock right now are measurably likelier to have a recent stockout history",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["Decoupled RNG streams", "Grounded", "8 extra tables"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `productViews: 7339   searchQueries: 2836
wishlistItems: 345   productRatings: 414
inventory: 12 warehouses, 63 replenishments,
           37 stockouts, 8 transfers

# each on its own seeded, decoupled RNG stream`,
  },
  {
    num: "04",
    icon: "Network",
    iconBg: "bg-orange-900/30",
    title: lang({
      vi: "Bốn cách tiêu thụ, một lõi",
      en: "Four Ways to Consume, One Core",
    }),
    subtitle: lang({
      vi: "serve, MSW, tRPC và GraphQL không thể lệch nhau",
      en: "serve, MSW, tRPC and GraphQL can't drift apart",
    }),
    features: [
      lang({
        vi: "serve dựng mock REST API phân trang/lọc/sắp xếp, kèm chaos mode, API-key auth và WebSocket live",
        en: "serve spins up a paginated/filterable/sortable mock REST API, with chaos mode, API-key auth and a live WebSocket",
      }),
      lang({
        vi: "eco-faker/msw biến dataset thành handler cho setupServer/setupWorker",
        en: "eco-faker/msw turns a dataset into handlers for setupServer/setupWorker",
      }),
      lang({
        vi: "eco-faker/trpc thành router có kiểu; eco-faker/graphql thành schema thực thi được",
        en: "eco-faker/trpc becomes a typed router; eco-faker/graphql an executable schema",
      }),
      lang({
        vi: "Cả bốn dùng chung một implementation filter/sort/paginate, cùng OpenAPI và Postman sinh từ một bảng route",
        en: "All four share one filter/sort/paginate implementation, with OpenAPI and Postman from the same route table",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["REST", "MSW", "tRPC", "GraphQL"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    code: `$ my-eco-gen serve --users 300 --chaos --live --graphql

import { toMswHandlers } from "eco-faker/msw";
setupServer(...toMswHandlers(dataset));
// same routes, same query semantics, one impl`,
  },
  {
    num: "05",
    icon: "Bot",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "MCP server cho agent", en: "An MCP Server for Agents" }),
    subtitle: lang({
      vi: "Gọi trực tiếp từ Claude Code hoặc Claude Desktop",
      en: "Callable straight from Claude Code or Claude Desktop",
    }),
    features: [
      lang({
        vi: "my-eco-gen mcp chạy qua stdio, expose 9 tool cho bất kỳ MCP client nào",
        en: "my-eco-gen mcp runs over stdio, exposing nine tools to any MCP client",
      }),
      lang({
        vi: "generate / query / fuzz / fraud / analytics / events / lint / visualize / scenarios",
        en: "generate / query / fuzz / fraud / analytics / events / lint / visualize / scenarios",
      }),
      lang({
        vi: "Dataset giữ phía server và tham chiếu bằng datasetId qua từng lần gọi",
        en: "Datasets stay server-side and are referenced by datasetId across calls",
      }),
      lang({
        vi: "Agent sinh một lần rồi truy vấn nhiều lần, dataset không phải đi qua context window",
        en: "An agent generates once then queries repeatedly, without the dataset crossing its context window",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["MCP over stdio", "9 tools", "Server-side datasets"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `generate_dataset({ scenario: "black-friday" })
  -> { datasetId: "518068db-...", counts: {...} }
fuzz_dataset({ datasetId, intensity: "extreme" })
  -> { datasetId: "9c2a-...", mutationCount: 24 }
lint_dataset({ datasetId: "9c2a-..." })
  -> { errorCount: 8, issues: [...] }`,
  },
  {
    num: "06",
    icon: "Bug",
    iconBg: "bg-rose-900/30",
    title: lang({
      vi: "Fuzz ngữ nghĩa + cổng chất lượng",
      en: "Semantic Fuzzing + a Quality Gate",
    }),
    subtitle: lang({
      vi: "Hợp lệ với schema, nhưng bất khả thi về logic",
      en: "Schema-valid, but logically impossible",
    }),
    features: [
      lang({
        vi: "address_mismatch: mã bưu chính của đơn này ghép city/state của đơn khác",
        en: "address_mismatch: one order's postal code paired with another's city/state",
      }),
      lang({
        vi: "price_inversion, time_paradox, inventory_oversell: mỗi loại nhắm một lớp bug thật",
        en: "price_inversion, time_paradox, inventory_oversell: each targets a real class of bug",
      }),
      lang({
        vi: "lint kiểm tra toàn vẹn tham chiếu, trùng lặp, nhất quán tài chính và thời gian, exit 1 khi lỗi",
        en: "lint checks referential integrity, uniqueness, and financial/temporal consistency, exiting 1 on errors",
      }),
      lang({
        vi: "Có thể dry-run SQL thật trong BEGIN/ROLLBACK trên Postgres thật, không commit gì",
        en: "It can dry-run real SQL inside BEGIN/ROLLBACK against a real Postgres, committing nothing",
      }),
    ],
    dotColor: "bg-rose-500",
    tags: ["4 mutation types", "CI gate", "Postgres dry run"],
    tagDark: "bg-rose-900/40 text-rose-300 border border-rose-700/40",
    tagLight: "bg-rose-100 text-rose-700 border border-rose-200",
    code: `$ my-eco-gen fuzz --intensity extreme \\
    --output ./fuzzed.json
$ my-eco-gen lint --input ./fuzzed.json
# reports the exact paradoxes fuzz just introduced

$ my-eco-gen lint --sql ./seed.sql --db-url ...`,
  },
  {
    num: "07",
    icon: "ShieldAlert",
    iconBg: "bg-red-900/30",
    title: lang({ vi: "Mô phỏng gian lận", en: "Fraud Simulation" }),
    subtitle: lang({
      vi: "Nhãn có thể kiểm chứng bằng query, không phải gán bừa",
      en: "Labels you can verify with a query, not just asserted",
    }),
    features: [
      lang({
        vi: "Sáu loại gian lận, mỗi loại có riskScore 0-100 và các signal làm bằng chứng",
        en: "Six fraud types, each with a riskScore (0-100) and evidence signals",
      }),
      lang({
        vi: "account_farming thực sự ghi đè địa chỉ của N tài khoản khác cho trùng khớp",
        en: "account_farming really does overwrite N other accounts' addresses to match",
      }),
      lang({
        vi: "refund_abuse và friendly_chargeback chỉ gán cho đơn đã có ReturnRequest thật",
        en: "refund_abuse and friendly_chargeback only attach to orders that really have a linked return",
      }),
      lang({
        vi: "reseller_behavior đẩy quantity lên mức bất thường nhưng vẫn tính lại total đúng, nên vẫn sạch lint",
        en: "reseller_behavior bumps quantity implausibly but recomputes totals correctly, so it stays lint-clean",
      }),
    ],
    dotColor: "bg-red-500",
    tags: ["6 fraud types", "Structurally grounded", "ML training data"],
    tagDark: "bg-red-900/40 text-red-300 border border-red-700/40",
    tagLight: "bg-red-100 text-red-700 border border-red-200",
    code: `$ my-eco-gen generate --users 500 --fraud-rate 0.03

"fraud": {
  "fraudType": "account_farming",
  "riskScore": 69,
  "signals": ["shared_address_with_3_other_accounts",
              "new_account"]
}`,
  },
  {
    num: "08",
    icon: "BarChart3",
    iconBg: "bg-emerald-900/30",
    title: lang({
      vi: "Analytics, event sourcing & benchmark",
      en: "Analytics, Event Sourcing & Benchmarks",
    }),
    subtitle: lang({
      vi: "Từ dataset sang BI, event stream và search engine",
      en: "From dataset to BI, event streams, and search engines",
    }),
    features: [
      lang({
        vi: "dashboard tính doanh thu theo ngày, phễu chuyển đổi, cohort giữ chân, LTV và CAC",
        en: "dashboard computes daily revenue, a conversion funnel, retention cohorts, LTV and CAC",
      }),
      lang({
        vi: "Thuần tổng hợp tất định, không dùng RNG, xuất ra CSV / SQL / JSON",
        en: "A pure deterministic aggregation with no RNG, exported as CSV / SQL / JSON",
      }),
      lang({
        vi: "events dựng stream 25 loại sự kiện qua cả 18 bảng, mỗi event có aggregateId/aggregateType",
        en: "events builds a 25-type stream across all 18 tables, each carrying aggregateId/aggregateType",
      }),
      lang({
        vi: "benchmark-export sinh NDJSON Bulk API + mapping cho Elasticsearch, và DDL MergeTree cho ClickHouse",
        en: "benchmark-export emits Bulk API NDJSON + mappings for Elasticsearch, and MergeTree DDL for ClickHouse",
      }),
    ],
    dotColor: "bg-emerald-500",
    tags: ["Funnel / cohorts / LTV", "Event sourcing", "ES + ClickHouse"],
    tagDark: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/40",
    tagLight: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    code: `$ my-eco-gen dashboard --input ./eco-data.json \\
    --format csv --output ./dashboard/
$ my-eco-gen events --input ./eco-data.json \\
    --output ./events.ndjson       # 13239 events
$ my-eco-gen benchmark-export --target elasticsearch`,
  },
  {
    num: "09",
    icon: "CalendarClock",
    iconBg: "bg-indigo-900/30",
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
        vi: "replay dựng lại y hệt, nên một bug thành fixture một dòng thay vì dump nhiều megabyte",
        en: "replay rebuilds it exactly, so a bug becomes a one-line fixture instead of a multi-MB dump",
      }),
      lang({
        vi: "visualize kết xuất hành trình một khách thành HTML D3 tự chứa, mở được offline",
        en: "visualize renders one customer's journey as a self-contained D3 HTML file that opens offline",
      }),
    ],
    dotColor: "bg-indigo-500",
    tags: ["mulberry32", "Snapshot / replay", "Offline D3 timeline"],
    tagDark: "bg-indigo-900/40 text-indigo-300 border border-indigo-700/40",
    tagLight: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    code: `$ my-eco-gen generate --seed 42 \\
    --snapshot ./bug-42.snapshot.json
$ my-eco-gen replay --input ./bug-42.snapshot.json
$ diff run1.json replay.json   # byte-identical

$ my-eco-gen visualize --output ./journey.html`,
  },
];

const TECH = [
  { icon: "Braces", name: "TypeScript", role: "Library + CLI" },
  { icon: "Package", name: "npm", role: "Published package" },
  { icon: "Bot", name: "MCP SDK", role: "9 agent tools" },
  { icon: "Shuffle", name: "mulberry32", role: "Seeded PRNG" },
  { icon: "Server", name: "Express", role: "Mock API + playground" },
  { icon: "Network", name: "MSW / tRPC / GraphQL", role: "Adapters" },
  { icon: "Waypoints", name: "ws", role: "Live event feed" },
  { icon: "FileJson", name: "OpenAPI + Postman", role: "API contracts" },
  { icon: "Database", name: "Elasticsearch", role: "Bulk NDJSON" },
  { icon: "Layers", name: "ClickHouse", role: "MergeTree DDL" },
  { icon: "BarChart3", name: "D3", role: "Journey timeline" },
  { icon: "Cloud", name: "Docker + Postgres", role: "One-command seed" },
  { icon: "CheckCircle2", name: "Vitest", role: "299 tests" },
  { icon: "GitBranch", name: "GitHub Actions", role: "3-job CI" },
  { icon: "Sparkles", name: "esbuild", role: "Browser bundle" },
];

const ARCH = [
  {
    icon: "Layers",
    title: lang({ vi: "Lõi sinh dữ liệu", en: "Generation Core" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "A seeded PRNG feeds per-domain modules (catalog, user, cart, order, tracking, return, anomaly). Recommendation data and inventory each run as a post-pass on their own decoupled RNG stream, so toggling one changes nothing about the others.",
  },
  {
    icon: "Network",
    title: lang({ vi: "Giao diện & bộ chuyển", en: "Interfaces & Adapters" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "One filter/sort/paginate implementation is shared by the REST server, the MSW handlers, the tRPC router, and the GraphQL schema; OpenAPI and Postman are generated from the same route table, so none of them can drift apart.",
  },
  {
    icon: "Rocket",
    title: lang({ vi: "Xuất & tiêu thụ", en: "Export & Consumption" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "A generic row extractor drives JSON/SQL/CSV, Elasticsearch bulk, and ClickHouse DDL from one place, while an MCP server, a browser bundle, and a Docker Postgres seed cover agents, the web, and real databases.",
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
        vi: "Thiết kế state machine của cart và các bất biến quan hệ trên 18 bảng",
        en: "Designed the cart state machine and the relational invariants across 18 tables",
      }),
      lang({
        vi: "Xây catalog dùng chung, dữ liệu gợi ý và mô phỏng kho có gốc rễ thật trong dataset",
        en: "Built the shared catalog, recommendation data, and inventory simulation, all grounded in the dataset",
      }),
    ],
  },
  {
    icon: "Shuffle",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Tất định & kiến trúc RNG", en: "Determinism & RNG Architecture" }),
    items: [
      lang({
        vi: "Tách RNG theo từng module để bật/tắt tính năng không làm đổi output của phần khác",
        en: "Decoupled RNG streams per module so toggling a feature changes nothing elsewhere",
      }),
      lang({
        vi: "Snapshot/replay tái tạo từng byte, cộng preset kịch bản và tiêm bất thường có gắn cờ",
        en: "Byte-exact snapshot/replay, plus scenario presets and tagged anomaly injection",
      }),
    ],
  },
  {
    icon: "Network",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Bề mặt tích hợp", en: "Integration Surfaces" }),
    items: [
      lang({
        vi: "Mock REST API cộng ba bộ chuyển MSW/tRPC/GraphQL dùng chung một lõi truy vấn",
        en: "A mock REST API plus MSW/tRPC/GraphQL adapters over one shared query core",
      }),
      lang({
        vi: "MCP server 9 tool, và introspection Prisma/Drizzle/SQLAlchemy/OpenAPI",
        en: "A nine-tool MCP server, and Prisma/Drizzle/SQLAlchemy/OpenAPI introspection",
      }),
    ],
  },
  {
    icon: "CheckCircle2",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Chất lượng & phân phối", en: "Quality & Delivery" }),
    items: [
      lang({
        vi: "299 test vitest, fuzz ngữ nghĩa và lint làm cổng chất lượng, CI 3 job",
        en: "299 vitest tests, semantic fuzzing and lint as a quality gate, a 3-job CI matrix",
      }),
      lang({
        vi: "Publish lên npm với cổng build+test, demo static GitHub Pages và seed Postgres bằng Docker",
        en: "Published to npm behind a build+test gate, a static GitHub Pages demo, and a Docker Postgres seed",
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
          content="eco-faker - a published TypeScript library/CLI that generates relationally-consistent fake e-commerce data across 18 tables from one state machine, with a mock REST API, MSW/tRPC/GraphQL adapters, an MCP server, semantic fuzzing, fraud simulation, analytics, and event sourcing."
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
                vi: "Bộ sinh dữ liệu giả cho e-commerce nhất quán về quan hệ và có trạng thái. Không phải một đống JSON ngẫu nhiên: mọi Cart, Order, Shipment và ReturnRequest đều bắt nguồn từ cùng một state machine trên 18 bảng, nên dataset đọc như lịch sử của một cửa hàng thật. Kèm mock API với bộ chuyển MSW/tRPC/GraphQL, MCP server, fuzz ngữ nghĩa, mô phỏng gian lận và event sourcing.",
                en: "A stateful, relationally-consistent fake-data generator for e-commerce. Not a pile of random JSON: every Cart, Order, Shipment, and ReturnRequest derives from the same state machine across 18 tables, so the dataset reads like a real store's history. Ships a mock API with MSW/tRPC/GraphQL adapters, an MCP server, semantic fuzzing, fraud simulation, and event sourcing.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "npm", l: lang({ vi: "Đã publish", en: "Published" }) },
                { n: "18", l: lang({ vi: "Bảng dữ liệu", en: "Tables" }) },
                { n: "299", l: lang({ vi: "Bài test", en: "Tests" }) },
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
                {RocketIcon && <RocketIcon />}{" "}
                {lang({ vi: "Xem trên npm", en: "View on npm" })}
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
              vi: "Dự án cá nhân: từ mô hình miền e-commerce và kiến trúc RNG, tới các bề mặt tích hợp, rồi đóng gói publish lên npm.",
              en: "A solo project: from the e-commerce domain model and RNG architecture, to the integration surfaces, to packaging and publishing on npm.",
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
              vi: "TypeScript từ đầu đến cuối, một lõi sinh dữ liệu duy nhất được tái sử dụng qua CLI, mock API, ba bộ chuyển, MCP server và một bundle chạy trong trình duyệt.",
              en: "TypeScript end to end, with one generation core reused across the CLI, the mock API, three adapters, an MCP server, and a browser bundle.",
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
              vi: "Một lõi sinh dữ liệu, nhiều bề mặt: cùng generate() chạy sau CLI, mock API, ba bộ chuyển, MCP server và một bundle client-side.",
              en: "One generation core, many surfaces: the same generate() runs behind the CLI, the mock API, three adapters, an MCP server, and a client-side bundle.",
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