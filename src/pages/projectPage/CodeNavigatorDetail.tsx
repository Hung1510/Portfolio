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
  Blocks,
  Boxes,
  Braces,
  CheckCircle2,
  Cpu,
  Database,
  Filter,
  Gauge,
  GitBranch,
  Layers,
  Monitor,
  Network,
  RefreshCw,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const Icons: Record<string, LucideIcon> = {
  BarChart3,
  Blocks,
  Boxes,
  Braces,
  CheckCircle2,
  Cpu,
  Database,
  Filter,
  Gauge,
  GitBranch,
  Layers,
  Monitor,
  Network,
  RefreshCw,
  Search,
  Sparkles,
  Terminal,
  Zap,
};
import { lang } from "@/helper/lang";

const REPO_URL = "https://github.com/Hung1510/Code-Navigator";

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Layers",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Truy hồi lai (hybrid)", en: "Hybrid Retrieval" }),
    subtitle: lang({
      vi: "Ngữ nghĩa + từ khóa, hợp nhất và re-rank",
      en: "Semantic + keyword, fused and re-ranked",
    }),
    features: [
      lang({
        vi: "Embedding ngữ nghĩa và tìm từ khóa BM25 chạy song song",
        en: "Semantic embeddings and BM25 keyword search run in parallel",
      }),
      lang({
        vi: "Hai kết quả được hợp nhất bằng Reciprocal Rank Fusion (RRF)",
        en: "The two are merged with Reciprocal Rank Fusion (RRF)",
      }),
      lang({
        vi: "Cross-encoder re-rank top ~30 ứng viên, đọc query + chunk cùng nhau",
        en: "A cross-encoder re-ranks the top ~30 by reading query + chunk together",
      }),
      lang({
        vi: "Chọn chế độ: vector, lexical, hoặc hybrid",
        en: "Pick a mode: vector, lexical, or hybrid",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["Vector", "BM25", "RRF", "Cross-encoder"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    code: `$ codenav search repo/ "jwt refresh"
# default: hybrid (vector + BM25, RRF-fused)

$ codenav search repo/ "issue_jwt" --mode lexical
$ codenav search repo/ "auth flow"  --mode vector`,
  },
  {
    num: "02",
    icon: "Blocks",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Chia chunk theo cấu trúc", en: "Structure-aware Chunking" }),
    subtitle: lang({
      vi: "tree-sitter, không phải cắt theo dòng",
      en: "tree-sitter, not line windows",
    }),
    features: [
      lang({
        vi: "Parse cây cú pháp thật: hàm giữ nguyên khối (kèm decorator/export)",
        en: "Parses real syntax trees: callables kept whole (decorators/export included)",
      }),
      lang({
        vi: "Container tách thành header + mỗi method một chunk có tên đủ điều kiện",
        en: "Containers split into a header + one chunk per method with a qualified name",
      }),
      lang({
        vi: "9 ngôn ngữ (Python, JS, TS/TSX, Rust, Java, C#, C++, Go), fallback regex",
        en: "9 languages (Python, JS, TS/TSX, Rust, Java, C#, C++, Go), regex fallback",
      }),
      lang({
        vi: "Đây là nơi giành được ~80% chất lượng truy hồi",
        en: "This is where ~80% of retrieval quality is won",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["tree-sitter", "9 grammars", "Qualified chunks"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `# tree-sitter emits real code units
class SessionManager:      -> header chunk
    def invalidate(self):  -> SessionManager.invalidate
    def refresh(self):     -> SessionManager.refresh

# no grammar? -> dependency-free regex fallback`,
  },
  {
    num: "03",
    icon: "Network",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Trí tuệ mã (call graph)", en: "Code Intelligence" }),
    subtitle: lang({
      vi: "defs / callers / callees, và ask theo đồ thị",
      en: "defs / callers / callees, and graph-aware ask",
    }),
    features: [
      lang({
        vi: "Trích định nghĩa và call site từ cùng cây tree-sitter",
        en: "Extracts definitions and call sites from the same tree-sitter parse",
      }),
      lang({
        vi: "Cùng file resolve chính xác; khác file resolve theo tên, báo mọi ứng viên",
        en: "Same-file resolves exactly; cross-file by name, reporting all candidates",
      }),
      lang({
        vi: "ask theo đồ thị kéo thêm code mà kết quả thực sự gọi tới",
        en: "Graph-aware ask pulls in the code your matches actually call",
      }),
      lang({
        vi: "Không cần embedding hay API key cho các truy vấn cấu trúc",
        en: "No embeddings or API key needed for structural queries",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["Call graph", "defs/callers/callees", "Graph-aware ask"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    code: `$ codenav defs    repo/ AuthService.login
$ codenav callers repo/ issue_jwt
$ codenav callees repo/ AuthService.login
# add --json to any`,
  },
  {
    num: "04",
    icon: "RefreshCw",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Index tăng dần", en: "Incremental Indexing" }),
    subtitle: lang({
      vi: "Chỉ re-embed những gì đã đổi",
      en: "Re-embed only what changed",
    }),
    features: [
      lang({
        vi: "Hash mỗi file và so với manifest {path: hash} của lần chạy trước",
        en: "Hashes each file and compares against the last run's {path: hash} manifest",
      }),
      lang({
        vi: "Chỉ file mới/đổi/xóa được chunk và embed lại, nên re-index gần như tức thì",
        en: "Only new/changed/deleted files are re-chunked and embedded, so re-index is near-instant",
      }),
      lang({
        vi: "Đổi model embedding sẽ tự động rebuild toàn bộ",
        en: "Switching embedding models triggers a full rebuild automatically",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["Hash manifest", "Near-instant", "Local"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `$ codenav index repo/          # only changed files
$ codenav index repo/ --full   # rebuild everything

# index lives in <repo>/.codenavigator/`,
  },
  {
    num: "05",
    icon: "BarChart3",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Bộ đo chất lượng (eval)", en: "Eval Harness" }),
    subtitle: lang({
      vi: "Biến 'hybrid có giúp không' thành con số",
      en: "Turns 'does hybrid help' into numbers",
    }),
    features: [
      lang({
        vi: "recall@1, recall@k và MRR cho từng chế độ (vector/lexical/hybrid/+rerank)",
        en: "recall@1, recall@k and MRR per mode (vector/lexical/hybrid/+rerank)",
      }),
      lang({
        vi: "Benchmark tự động biến tên hàm thành query, không cần gán nhãn",
        en: "An auto benchmark turns function names into queries, no labeling needed",
      }),
      lang({
        vi: "--scaffold tạo bộ curated; --fail-under làm cổng chặn CI",
        en: "--scaffold seeds a curated set; --fail-under acts as a CI gate",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["recall@k / MRR", "Curated sets", "CI gate"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    code: `$ codenav eval repo/ --rerank
# recall@1, recall@k, MRR per mode

$ codenav eval repo/ --check-mode hybrid \\
    --fail-under "recall@10=0.6,mrr=0.35"`,
  },
  {
    num: "06",
    icon: "Terminal",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "CLI + app desktop", en: "CLI + Desktop App" }),
    subtitle: lang({
      vi: "Một engine, hai giao diện",
      en: "One engine, two front ends",
    }),
    features: [
      lang({
        vi: "CLI codenav để truy vấn nhanh và scripting",
        en: "The codenav CLI for quick queries and scripting",
      }),
      lang({
        vi: "App desktop Tauri 2 (backend Rust chạy CLI với --json)",
        en: "A Tauri 2 desktop app (Rust backend runs the CLI with --json)",
      }),
      lang({
        vi: "Câu trả lời do Claude sinh nhưng luôn trích dẫn file:dòng thật",
        en: "Answers come from Claude but always cite real file:line locations",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["codenav CLI", "Tauri 2", "file:line citations"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `$ codenav ask repo/ \\
    "how does auth refresh work? cite files"
#  -> grounded answer with file:line citations

# prefer a GUI? desktop/ is a Tauri 2 app`,
  },
];

const TECH = [
  { icon: "Braces", name: "Python 3.10+", role: "Language" },
  { icon: "Blocks", name: "tree-sitter", role: "9 grammars" },
  { icon: "Cpu", name: "fastembed", role: "ONNX embeddings" },
  { icon: "Search", name: "BM25", role: "Keyword search" },
  { icon: "Layers", name: "RRF", role: "Fusion" },
  { icon: "Filter", name: "Cross-encoder", role: "Re-ranker" },
  { icon: "Boxes", name: "NumPy", role: "Vector store" },
  { icon: "Database", name: "SQLite", role: "Metadata" },
  { icon: "Sparkles", name: "Claude Sonnet", role: "Grounded answers" },
  { icon: "Monitor", name: "Tauri 2", role: "Desktop app" },
  { icon: "CheckCircle2", name: "pytest", role: "Offline tests" },
  { icon: "GitBranch", name: "GitHub Actions", role: "CI + eval gate" },
];

const ARCH = [
  {
    icon: "Blocks",
    title: lang({ vi: "Chunk & Embed", en: "Chunk & Embed" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "chunker.py + treesitter.py split code on real function/class boundaries; embedder.py turns each chunk into an ONNX vector with fastembed (BGE, 384-dim).",
  },
  {
    icon: "Layers",
    title: lang({ vi: "Retrieve & Rank", en: "Retrieve & Rank" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "store.py (numpy cosine) and lexical.py (BM25) run together; query.py fuses them with RRF, then rerank.py re-scores the top candidates with a cross-encoder.",
  },
  {
    icon: "Sparkles",
    title: lang({ vi: "Reason & Ground", en: "Reason & Ground" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "callgraph.py expands hits with the code they call; llm.py hands the context to Claude under a strict 'answer only from context, cite locators' prompt.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Search",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Engine truy hồi", en: "Retrieval Engine" }),
    items: [
      lang({
        vi: "Xây truy hồi hybrid: vector + BM25, hợp nhất bằng RRF",
        en: "Built hybrid retrieval: vector + BM25, fused with RRF",
      }),
      lang({
        vi: "Thêm tầng cross-encoder re-rank hai giai đoạn",
        en: "Added a two-stage cross-encoder re-ranking layer",
      }),
    ],
  },
  {
    icon: "Network",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Trí tuệ mã", en: "Code Intelligence" }),
    items: [
      lang({
        vi: "Chia chunk theo cấu trúc bằng tree-sitter cho 9 ngôn ngữ",
        en: "Structure-aware chunking with tree-sitter across 9 languages",
      }),
      lang({
        vi: "Dựng call graph (defs/callers/callees) và ask theo đồ thị",
        en: "Built the call graph (defs/callers/callees) and graph-aware ask",
      }),
    ],
  },
  {
    icon: "RefreshCw",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Index & lưu trữ", en: "Indexing & Storage" }),
    items: [
      lang({
        vi: "Index tăng dần bằng hash manifest, chỉ embed lại phần đổi",
        en: "Incremental indexing via a hash manifest, re-embedding only changes",
      }),
      lang({
        vi: "Vector store trong suốt: numpy + SQLite, embedding fastembed ONNX",
        en: "A see-through vector store: numpy + SQLite, fastembed ONNX embeddings",
      }),
    ],
  },
  {
    icon: "Gauge",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Công cụ & eval", en: "Tooling & Eval" }),
    items: [
      lang({
        vi: "CLI codenav và app desktop Tauri 2 trên cùng engine",
        en: "The codenav CLI and a Tauri 2 desktop app over one engine",
      }),
      lang({
        vi: "Bộ eval (recall@k/MRR) làm cổng chặn regress trong CI",
        en: "An eval harness (recall@k/MRR) gating regressions in CI",
      }),
    ],
  },
];

function CodeNavigatorDetail() {
  const isLight = useTheme();
  const Zap = Icons["Zap"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>Code Navigator | Gia Hung Pham</title>
        <meta
          name="description"
          content="Code Navigator - a local RAG and code-intelligence tool that answers questions about any codebase with file:line citations, using hybrid retrieval, tree-sitter chunking, a call graph, and a cross-encoder re-ranker."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/code-navigator"
        />
      </Helmet>
      {isLight ? <SkyBackground /> : <StarBackground />}
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-[100px] pb-20">
        {/* Hero */}
        <div
          className={`rounded-2xl overflow-hidden border mb-16 ${
            isLight ? "border-slate-200 bg-white shadow-lg" : "border-white/10 bg-white/[0.03]"
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
              Python · Local RAG · Code Intelligence
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}
            >
              Code <span className="text-sky-500">Navigator</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Hỏi codebase bằng ngôn ngữ tự nhiên. Trỏ vào một repo bất kỳ và hỏi 'JWT refresh xử lý ở đâu?', nó trả lời kèm trích dẫn tới vị trí file:dòng thật. Truy hồi hybrid, trí tuệ mã bằng tree-sitter, và cross-encoder re-rank, tất cả chạy cục bộ, không cần cloud.",
                en: "Ask your codebase in plain language. Point it at any repo and ask 'where is JWT refresh handled?' and it answers with citations to real file:line locations. Hybrid retrieval, tree-sitter code intelligence, and a cross-encoder re-ranker, all running locally with no cloud.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "Python", l: lang({ vi: "Ngôn ngữ", en: "Language" }) },
                { n: "9", l: lang({ vi: "Ngôn ngữ hỗ trợ", en: "Languages" }) },
                { n: "RRF", l: lang({ vi: "Truy hồi hybrid", en: "Hybrid retrieval" }) },
                { n: "Local", l: lang({ vi: "Không cloud", en: "No cloud" }) },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-black text-sky-500">{s.n}</div>
                  <div className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-slate-500"}`}>
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
                {lang({ vi: "Bắt đầu nhanh", en: "Quick start" })}
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`$ codenav index /path/to/repo
$ export ANTHROPIC_API_KEY=sk-ant-...
$ codenav ask /path/to/repo \\
    "how does auth refresh work? cite files"`}
              </pre>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {Zap && <Zap />} {lang({ vi: "Xem trên GitHub", en: "View on GitHub" })}
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
              vi: "Dự án cá nhân, tôi tự làm mọi thứ: engine truy hồi, trí tuệ mã, index, và bộ công cụ CLI + desktop + eval.",
              en: "A solo project. I built everything: the retrieval engine, the code intelligence, the indexer, and the CLI + desktop + eval tooling.",
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
            <div className={`absolute left-5 top-2 bottom-2 w-px ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
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
                    <h4 className={`font-bold text-sm mb-3 ${step.color}`}>{step.title}</h4>
                    <ul className="flex flex-col gap-2">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-2 text-sm leading-relaxed ${
                            isLight ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${step.dot}`} />
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
            vi: "Bốn bộ phận chính: chia chunk theo cấu trúc, truy hồi hybrid, call graph, và bộ eval, gắn kết bởi một CLI và một app desktop.",
            en: "Four moving parts: structure-aware chunking, hybrid retrieval, a call graph, and an eval harness, tied together by a CLI and a desktop app.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard key={page.num} page={page} isLight={isLight} icons={Icons} terminalLabel="codenav — zsh" />
        ))}

        {/* Tech Stack */}
        <div className="mb-10">
          <Pill label={lang({ vi: "Công nghệ", en: "Tech Stack" })} isLight={isLight} />
          <SectionTitle
            pre={lang({ vi: "Công nghệ", en: "Technologies" })}
            accent={lang({ vi: "sử dụng", en: "Used" })}
            desc={lang({
              vi: "Toàn bộ chạy cục bộ trên CPU: embedding ONNX (không PyTorch), vector store numpy + SQLite, và Claude chỉ dùng để tổng hợp câu trả lời có trích dẫn.",
              en: "Everything runs locally on CPU: ONNX embeddings (no PyTorch), a numpy + SQLite vector store, and Claude only to compose the cited answer.",
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
                  <span className="text-2xl">{IconComponent && <IconComponent />}</span>
                  <span className={`text-xs font-semibold ${isLight ? "text-slate-700" : "text-white"}`}>
                    {t.name}
                  </span>
                  <span className={`text-[10px] ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                    {t.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture */}
        <div className="mb-4">
          <Pill label={lang({ vi: "Kiến trúc", en: "Architecture" })} isLight={isLight} />
          <SectionTitle
            pre={lang({ vi: "Đường ống", en: "The" })}
            accent={lang({ vi: "xử lý", en: "Pipeline" })}
            desc={lang({
              vi: "repo → chunk → embed → (vector + BM25) → hợp nhất RRF → cross-encoder re-rank → mở rộng theo call graph → câu trả lời có trích dẫn.",
              en: "repo → chunk → embed → (vector + BM25) → RRF fuse → cross-encoder re-rank → call-graph expansion → a cited answer.",
            })}
            isLight={isLight}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARCH.map((layer) => {
              const IconComponent = Icons[layer.icon];
              return (
                <div
                  key={layer.title}
                  className={`border rounded-2xl p-6 text-center ${isLight ? layer.light : layer.dark}`}
                >
                  <div className="text-3xl mb-3 flex justify-center">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <h4 className={`font-bold text-base mb-2 ${layer.titleColor}`}>{layer.title}</h4>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
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

export default CodeNavigatorDetail;