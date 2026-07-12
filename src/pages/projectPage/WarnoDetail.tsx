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
  Atom,
  Braces,
  Cloud,
  Database,
  Dices,
  Flame,
  GitBranch,
  Globe,
  Link2,
  Lock,
  Monitor,
  Network,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Swords,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Only the icons this page uses, so the rest of lucide-react stays out of the bundle.
const Icons: Record<string, LucideIcon> = {
  Atom,
  Braces,
  Cloud,
  Database,
  Dices,
  Flame,
  GitBranch,
  Globe,
  Link2,
  Lock,
  Monitor,
  Network,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Swords,
  Target,
  Wrench,
  Zap,
};
import { lang } from "@/helper/lang";

const LIVE_URL = "https://warno-deck-randomizer.vercel.app";
const REPO_URL = "https://github.com/Hung1510/Warno-Deck-Randomizer";

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Dices",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Hai kiểu roll: Fun và Meta", en: "Two Rolls: Fun and Meta" }),
    subtitle: lang({
      vi: "Chọn không khí của trận đấu",
      en: "Pick the vibe of the match",
    }),
    features: [
      lang({
        vi: "Fun mix: trải rộng hỗn loạn, thiên về napalm, rocket, spam và unit gimmick",
        en: "Fun mix: a wide, chaotic spread biased toward napalm, rockets, spam and gimmick units",
      }),
      lang({
        vi: "Meta mix: chốt recon, tank và AA trước, rồi xếp các card mạnh nhất",
        en: "Meta mix: secures recon, tanks and AA first, then stacks the strongest cards",
      }),
      lang({
        vi: "Mỗi unit mang điểm meta và fun (1-10) cùng tag (atgm, heavy, cluster...)",
        en: "Every unit carries a meta score and a fun score (1-10) plus tags (atgm, heavy, cluster...)",
      }),
      lang({
        vi: "Sư đoàn tăng mà không có tăng, kèm rạp xiếc trực thăng? Hoàn toàn có thể.",
        en: "A tank division with zero tanks and a helicopter circus? Absolutely.",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Weighted RNG", "meta / fun scores", "Tag bias"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    code: `POST /api/randomize
{
  "mode": "meta",           // "fun" | "meta"
  "divisionId": "sov-79gtd",
  "seed": "demo"
}

# -> theme "Iron Wall", 30 cards, 49/65 AP`,
  },
  {
    num: "02",
    icon: "Target",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Luật deck thật của game", en: "The Game's Real Deck Rules" }),
    subtitle: lang({
      vi: "Ngân sách activation point và giới hạn card",
      en: "Activation-point budgets and card limits",
    }),
    features: [
      lang({
        vi: "Mỗi battlegroup có ngân sách AP và giới hạn card riêng cho từng category",
        en: "Each battlegroup has an activation-point budget and its own per-category card limits",
      }),
      lang({
        vi: "Card thứ N trong một category tốn AP tăng dần, đúng như deck builder thật",
        en: "The Nth card in a category costs progressively more AP, just like the real deck builder",
      }),
      lang({
        vi: "Giới hạn lấy từ wiki WARNO theo thứ tự LOG/INF/ART/TNK/REC/AA/HEL/AIR",
        en: "Limits come from the WARNO wiki in LOG/INF/ART/TNK/REC/AA/HEL/AIR order",
      }),
      lang({
        vi: "Nên deck sinh ra là deck hợp lệ, không phải danh sách unit ngẫu nhiên",
        en: "So a generated deck is a legal deck, not just a random pile of units",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["AP budget", "Slot-cost curve", "Category limits"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `// availability.ts - the Nth card costs more
lim(LOG, INF, ART, TNK, REC, AA, HEL, AIR)

mk('us-3id', '3rd Infantry Division (Mech.)',
   'USA', 'NATO', 'Mechanized', 'NORTHAG', 7,
   lim(6, 10, 6, 8, 6, 6, 5, 7), '...')`,
  },
  {
    num: "03",
    icon: "Link2",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Roll tái tạo và chia sẻ được", en: "Reproducible, Shareable Rolls" }),
    subtitle: lang({
      vi: "Seed cho link, deck code cho card",
      en: "A seed for the link, a deck code for the cards",
    }),
    features: [
      lang({
        vi: "RNG có seed (mulberry32): cùng seed + mode luôn ra cùng một deck",
        en: "A seeded RNG (mulberry32): the same seed + mode always yields the same deck",
      }),
      lang({
        vi: "Link chia sẻ mã hoá seed, mode, divisionId và coalition vào URL",
        en: "The share link encodes seed, mode, divisionId and coalition in the URL",
      }),
      lang({
        vi: "Deck code (base64url) mang chính các card, không chỉ seed",
        en: "A deck code (base64url) carries the actual cards, not just the seed",
      }),
      lang({
        vi: "Nên deck vẫn load lại đúng y nguyên kể cả khi dataset đổi về sau",
        en: "So a deck re-loads exactly even if the dataset changes later",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["mulberry32", "Share link", "base64url deck code"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    code: `# same seed + mode => same deck, always
GET /api/randomize?mode=meta&seed=demo

# a deck code survives dataset changes
GET /api/decode?code=<base64url>`,
  },
  {
    num: "04",
    icon: "Globe",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "56 battlegroup, 14 quốc gia", en: "56 Battlegroups, 14 Nations" }),
    subtitle: lang({
      vi: "Đủ các pack, kèm donor pool cho nước nhỏ",
      en: "Every pack, plus donor pools for minor nations",
    }),
    features: [
      lang({
        vi: "Vanilla (18), NORTHAG (10), SOUTHAG (10), LANDJUT (8), Tropical Storm (2), Nemesis #1-4",
        en: "Vanilla (18), NORTHAG (10), SOUTHAG (10), LANDJUT (8), Tropical Storm (2), Nemesis #1-4",
      }),
      lang({
        vi: "Lọc theo pack, quốc gia hoặc coalition (NATO / PACT) ngay trên UI",
        en: "Filter by pack, nation, or coalition (NATO / PACT) right in the UI",
      }),
      lang({
        vi: "Nước nhỏ dùng pool unit đặc trưng + donor pool cùng phe (NATO minor → đồ Tây Đức, Pact minor → đồ Liên Xô)",
        en: "Minor nations use a signature pool plus a same-coalition donor pool (NATO minors -> West German gear, Pact minors -> Soviet gear)",
      }),
      lang({
        vi: "Nên deck của họ vẫn được lấp đầy một cách hợp lý",
        en: "So their decks still fill out plausibly",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["6 DLC packs", "NATO / PACT", "Donor pools"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `GET /api/divisions
GET /api/divisions/:id   # + its fieldable unit pool
GET /api/meta            # categories, nations,
                         # coalitions, dlcs (filters)`,
  },
  {
    num: "05",
    icon: "Server",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "API REST có kiểu chặt chẽ", en: "A Strictly-typed REST API" }),
    subtitle: lang({
      vi: "Express + TypeScript, không cần database",
      en: "Express + TypeScript, no database needed",
    }),
    features: [
      lang({
        vi: "Backend Express (TS, ESM, chạy thẳng bằng tsx) tách rõ data / logic",
        en: "An Express backend (TS, ESM, run directly via tsx) with a clean data / logic split",
      }),
      lang({
        vi: "Dữ liệu chỉ là module TS thuần, nên thêm division hay unit là sửa một mảng",
        en: "Data is plain TS modules, so adding a division or unit means editing one array",
      }),
      lang({
        vi: "Cùng một Express app chạy local và làm serverless function trên Vercel",
        en: "The same Express app runs locally and as a serverless function on Vercel",
      }),
      lang({
        vi: "Frontend React 18 + Vite gọi API qua client có kiểu",
        en: "A React 18 + Vite frontend calls it through a typed API client",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["Express", "TypeScript strict", "No DB", "Vercel functions"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    code: `GET  /api/health
GET  /api/meta
GET  /api/divisions
GET  /api/divisions/:id
POST /api/randomize      # GET too, for sharing
GET  /api/decode?code=...`,
  },
  {
    num: "06",
    icon: "Wrench",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "Công cụ dữ liệu", en: "Data Tooling" }),
    subtitle: lang({
      vi: "Thay roster mẫu bằng dữ liệu thật, không đụng code",
      en: "Swap the sample roster for real data, no code changes",
    }),
    features: [
      lang({
        vi: "Thả custom-units.json vào là nó tự merge lúc khởi động",
        en: "Drop in a custom-units.json and it merges automatically at startup",
      }),
      lang({
        vi: "import-units.mjs chuyển một bản export WaRYes/WARNO sang schema của app",
        en: "import-units.mjs converts a WaRYes/WARNO export into the app's schema",
      }),
      lang({
        vi: "scrape-fandom.mjs đọc wiki Fandom (CC-BY-SA) qua API MediaWiki, mỗi lần một request",
        en: "scrape-fandom.mjs reads the Fandom wiki (CC-BY-SA) via the MediaWiki API, one polite request at a time",
      }),
      lang({
        vi: "Có --selftest chạy offline để kiểm tra parser trước khi chạy thật",
        en: "A --selftest flag checks the parser offline before a full run",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["MediaWiki API", "CC-BY-SA", "Self-testing parser"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `$ node scripts/scrape-fandom.mjs --selftest
$ node scripts/scrape-fandom.mjs --limit 25
$ npm run scrape:fandom     # full run

$ npm run import:units      # WaRYes export`,
  },
  {
    num: "07",
    icon: "Shield",
    iconBg: "bg-rose-900/30",
    title: lang({ vi: "Siết bảo mật cho public", en: "Hardened for the Public Web" }),
    subtitle: lang({
      vi: "Đây là app mở, nên nó được phòng thủ đúng mức",
      en: "It's an open app, so it's defended like one",
    }),
    features: [
      lang({
        vi: "Header bảo mật qua helmet, kèm CSP khớp cho static site trong vercel.json",
        en: "Security headers via helmet, plus a matching CSP for the static site in vercel.json",
      }),
      lang({
        vi: "Rate limit 120 request/phút/IP, có trust proxy để lấy đúng IP sau Vercel",
        en: "Rate limiting at 120 requests/minute/IP, with trust proxy set so client IPs are correct behind Vercel",
      }),
      lang({
        vi: "Giới hạn body JSON 64kb; không secret nào trong repo",
        en: "A 64kb JSON body limit; no secrets in the repo",
      }),
      lang({
        vi: "CI typecheck + build mỗi lần push/PR, kèm SECURITY.md",
        en: "CI typechecks and builds on every push/PR, plus a SECURITY.md disclosure policy",
      }),
    ],
    dotColor: "bg-rose-500",
    tags: ["helmet", "Rate limiting", "CSP", "CI"],
    tagDark: "bg-rose-900/40 text-rose-300 border border-rose-700/40",
    tagLight: "bg-rose-100 text-rose-700 border border-rose-200",
    code: `// hardening at a glance
helmet()                     // security headers
rateLimit({ max: 120 })      // per minute, per IP
express.json({ limit: '64kb' })
app.set('trust proxy', 1)    // correct IPs on Vercel`,
  },
];

const TECH = [
  { icon: "Braces", name: "TypeScript", role: "Strict, end to end" },
  { icon: "Monitor", name: "React 18", role: "Frontend SPA" },
  { icon: "Zap", name: "Vite", role: "Build / dev server" },
  { icon: "Server", name: "Express", role: "REST API" },
  { icon: "Atom", name: "Node.js 18+", role: "Runtime" },
  { icon: "Sparkles", name: "tsx", role: "Run TS directly" },
  { icon: "Dices", name: "mulberry32", role: "Seeded RNG" },
  { icon: "Database", name: "Plain TS data", role: "No database" },
  { icon: "Cloud", name: "Vercel", role: "Static + functions" },
  { icon: "Lock", name: "helmet", role: "Security headers" },
  { icon: "Shield", name: "express-rate-limit", role: "120 req/min/IP" },
  { icon: "GitBranch", name: "GitHub Actions", role: "Typecheck + build" },
];

const ARCH = [
  {
    icon: "Database",
    title: lang({ vi: "Dữ liệu", en: "Data" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "divisions.ts holds the 56 battlegroups with their real category limits and a power rating; units.ts holds the unit pool per nation, each with meta/fun scores and tags. Plain TS modules - no DB, no migrations.",
  },
  {
    icon: "Swords",
    title: lang({ vi: "Logic", en: "Logic" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "availability.ts decides what a division can field and what each slot costs; randomizer.ts does the seeded fun/meta generation; deckcode.ts encodes and decodes the portable deck code.",
  },
  {
    icon: "Rocket",
    title: lang({ vi: "Phân phối", en: "Delivery" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "One Express app serves the API locally and re-exports as a Vercel serverless function; the React 18 + Vite frontend builds to static files and calls /api on the same domain.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Globe",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Mô hình hoá domain", en: "Domain Modeling" }),
    items: [
      lang({
        vi: "Số hoá 56 battlegroup của 14 quốc gia kèm giới hạn card thật từ wiki",
        en: "Encoded 56 battlegroups across 14 nations with their real card limits from the wiki",
      }),
      lang({
        vi: "Thiết kế donor pool để nước nhỏ vẫn dựng được deck hợp lý",
        en: "Designed donor pools so minor nations still build plausible decks",
      }),
    ],
  },
  {
    icon: "Dices",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Thiết kế randomizer", en: "Randomizer Design" }),
    items: [
      lang({
        vi: "Chấm điểm meta/fun cho unit và viết bộ chọn có trọng số cho hai mode",
        en: "Scored units on meta/fun and wrote the weighted selector behind both modes",
      }),
      lang({
        vi: "Dựng đường cong chi phí slot theo activation point cho đúng luật game",
        en: "Built the activation-point slot-cost curve so decks obey the game's rules",
      }),
    ],
  },
  {
    icon: "Link2",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "API & chia sẻ", en: "API & Sharing" }),
    items: [
      lang({
        vi: "API Express có kiểu, chạy được cả local lẫn serverless Vercel",
        en: "A typed Express API that runs both locally and as a Vercel serverless function",
      }),
      lang({
        vi: "RNG có seed, link chia sẻ, và deck code base64url bền với thay đổi dataset",
        en: "Seeded RNG, share links, and a base64url deck code that survives dataset changes",
      }),
    ],
  },
  {
    icon: "Shield",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Siết chặt & công cụ", en: "Hardening & Tooling" }),
    items: [
      lang({
        vi: "helmet, rate limit, CSP, giới hạn body, và CI typecheck + build",
        en: "helmet, rate limiting, CSP, body limits, and CI typecheck + build",
      }),
      lang({
        vi: "Scraper wiki Fandom (CC-BY-SA) và importer WaRYes để thay dữ liệu thật",
        en: "A Fandom wiki scraper (CC-BY-SA) and a WaRYes importer to swap in real data",
      }),
    ],
  },
];

function WarnoDetail() {
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
        <title>WARNO Deck Randomizer | Gia Hung Pham</title>
        <meta
          name="description"
          content="A full-stack WARNO battlegroup randomizer (React 18 + Vite, Express, TypeScript): rolls a random division and builds a fun or meta deck within the game's real activation-point and card limits. Seeded, shareable, and reproducible via deck codes."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/warno-deck-randomizer"
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
              TypeScript · Full-stack · Open source
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${
                isLight ? "text-slate-800" : "text-white"
              }`}
            >
              WARNO <span className="text-sky-500">Deck Randomizer</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Roll ngẫu nhiên một battlegroup WARNO rồi lấp đầy nó bằng một deck ngẫu nhiên - chọn Fun mix hỗn loạn hoặc Meta mix sắc bén. Deck sinh ra tôn trọng ngân sách activation point và giới hạn card thật của sư đoàn, có seed nên tái tạo được, và kèm deck code để chia sẻ chính xác từng lá.",
                en: "Roll a random WARNO battlegroup and fill it with a randomized deck - pick a chaotic Fun mix or a sharp Meta mix. Generated decks respect each division's real activation-point budget and card limits, every roll is seeded so it's reproducible, and a deck code shares the exact list.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "56", l: lang({ vi: "Battlegroup", en: "Battlegroups" }) },
                { n: "14", l: lang({ vi: "Quốc gia", en: "Nations" }) },
                { n: "2", l: lang({ vi: "Kiểu roll", en: "Roll modes" }) },
                { n: "Seeded", l: lang({ vi: "Tái tạo được", en: "Reproducible" }) },
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

            {/* Fun vs Meta, at a glance */}
            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-sm ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Chọn kiểu roll", en: "Pick your roll" })}
              </div>
              <div className="flex flex-col gap-1 text-xs leading-relaxed font-mono">
                <div>Fun mix   -&gt; napalm, rockets, spam, gimmicks</div>
                <div>Meta mix  -&gt; recon + tanks + AA first, then power</div>
                <div>seed      -&gt; same roll, every time</div>
                <div>deck code -&gt; the exact cards, shareable</div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {RocketIcon && <RocketIcon />}{" "}
                {lang({ vi: "Roll thử", en: "Roll a deck" })}
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
              vi: "Dự án cá nhân: từ mô hình hoá luật deck của game, thiết kế thuật toán roll, tới API, chia sẻ deck và siết bảo mật.",
              en: "A solo project: from modeling the game's deck rules, to designing the roll algorithm, to the API, deck sharing, and hardening.",
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
            vi: "Một randomizer chỉ vui khi nó vẫn tôn trọng luật chơi - phần lớn công sức nằm ở việc mã hoá đúng ràng buộc deck của WARNO.",
            en: "A randomizer is only fun if it still respects the rules - most of the work went into encoding WARNO's real deck constraints.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard
            key={page.num}
            page={page}
            isLight={isLight}
            icons={Icons}
            terminalLabel="warno — bash"
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
              vi: "TypeScript strict xuyên suốt cả hai đầu, dữ liệu là module TS thuần nên không cần database, và cùng một app Express chạy được cả local lẫn serverless.",
              en: "Strict TypeScript on both ends, data as plain TS modules so no database is needed, and one Express app that runs both locally and serverless.",
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
              vi: "Dữ liệu → Logic → Phân phối: bảng dữ liệu thuần nuôi các module randomizer, rồi một app Express duy nhất phục vụ cả local lẫn Vercel.",
              en: "Data -> Logic -> Delivery: plain data tables feed the randomizer modules, and a single Express app serves both local and Vercel.",
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

          {/* Fan-made disclaimer, mirroring the repo's own note */}
          <p
            className={`text-[11px] leading-relaxed mt-6 text-center max-w-2xl mx-auto ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {lang({
              vi: "Dự án fan-made, không chính thức. WARNO © Eugen Systems. Tên sư đoàn và giới hạn card lấy từ WARNO wiki (CC-BY-SA); roster unit là một mẫu tiêu biểu được tuyển chọn, không phải toàn bộ dữ liệu game.",
              en: "Fan-made and unofficial. WARNO © Eugen Systems. Division names and card limits come from the WARNO wiki (CC-BY-SA); the unit roster is a curated, representative sample, not the full game database.",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WarnoDetail;