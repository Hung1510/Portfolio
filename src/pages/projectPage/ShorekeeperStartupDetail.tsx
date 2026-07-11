import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import {
  Binary,
  Boxes,
  Clock,
  FileAudio,
  FileCode,
  GitBranch,
  Hammer,
  Play,
  Search,
  Sliders,
  Terminal,
  Volume2,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const Icons: Record<string, LucideIcon> = {
  Binary,
  Boxes,
  Clock,
  FileAudio,
  FileCode,
  GitBranch,
  Hammer,
  Play,
  Search,
  Sliders,
  Terminal,
  Volume2,
  Workflow,
  Zap,
};
import { lang } from "@/helper/lang";

const REPO_URL = "https://github.com/Hung1510/window-startup-greeting";

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
    icon: "FileAudio",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Trích xuất đa định dạng", en: "Multi-format Extraction" }),
    subtitle: lang({
      vi: "Bốn họ audio-bank game, một pipeline",
      en: "Four game audio-bank families, one pipeline",
    }),
    features: [
      lang({
        vi: "Square Enix SAB (magic sabf, codec CRI HCA)",
        en: "Square Enix SAB (sabf magic, CRI HCA codec)",
      }),
      lang({
        vi: "Wwise (.bnk / .wem) và FMOD (.fsb / .bank)",
        en: "Wwise (.bnk / .wem) and FMOD (.fsb / .bank)",
      }),
      lang({
        vi: "CRI ADX2 (.acb / .awb)",
        en: "CRI ADX2 (.acb / .awb)",
      }),
      lang({
        vi: "Mỗi định dạng có script và tài liệu setup riêng",
        en: "Each format has its own script and setup docs",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["SAB", "Wwise", "FMOD", "CRI ADX2"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    code: `extract/
  sab/   extract_sab.sh    # Square Enix
  wwise/ extract_wwise.sh  # .bnk / .wem
  fmod/  extract_fmod.sh   # .fsb / .bank
  cri/   extract_cri.sh    # .acb / .awb`,
  },
  {
    num: "02",
    icon: "Workflow",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Đường ống giải mã", en: "The Decode Pipeline" }),
    subtitle: lang({
      vi: "Từ bank thô đến .wav sạch",
      en: "From raw bank to a clean .wav",
    }),
    features: [
      lang({
        vi: "Nhận diện bank bằng magic bytes, rồi giải mã bằng vgmstream",
        en: "Identify the bank by magic bytes, then decode with vgmstream",
      }),
      lang({
        vi: "Một bank chứa nhiều subsong; lọc bỏ các đoạn quá ngắn",
        en: "A bank holds many subsongs; filter out clips that are too short",
      }),
      lang({
        vi: "Giữ các bản dài nhất, chuẩn hóa âm lượng và thêm fade-out (ffmpeg)",
        en: "Keep the longest takes, loudness-normalize and add a fade-out (ffmpeg)",
      }),
      lang({
        vi: "Điều chỉnh bằng MIN_SECS, TOP_N, LANG_PICK",
        en: "Tune it with MIN_SECS, TOP_N, LANG_PICK",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["vgmstream", "ffmpeg", "loudnorm"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    code: `# identify -> decode -> filter -> curate
$ MIN_SECS=1.5 TOP_N=20 LANG_PICK=JP \\
    ./extract/sab/extract_sab.sh bank.zip

#  -> out/*.wav  (normalized, faded)`,
  },
  {
    num: "03",
    icon: "Volume2",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Trình phát im lặng", en: "Silent Login Player" }),
    subtitle: lang({
      vi: "Không cửa sổ, không console",
      en: "No window, no console",
    }),
    features: [
      lang({
        vi: "Trình phát C++ Win32 qua engine MCI, build với -mwindows",
        en: "A C++ Win32 player through the MCI engine, built with -mwindows",
      }),
      lang({
        vi: "Phát voice.wav từ thư mục của nó hoặc từ đường dẫn truyền vào",
        en: "Plays voice.wav from its folder or a path argument",
      }),
      lang({
        vi: "Xử lý mọi WAV và mp3; có thêm biến thể VBScript / PowerShell",
        en: "Handles any WAV and mp3; also ships VBScript / PowerShell variants",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["C++", "Win32 MCI", "VBS / PS1"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    code: `# MinGW-w64
$ g++ player.cpp -o player.exe \\
    -mwindows -lwinmm

# or MSVC
> cl player.cpp /link winmm.lib`,
  },
  {
    num: "04",
    icon: "Clock",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Chạy khi đăng nhập", en: "Run at Login" }),
    subtitle: lang({
      vi: "Câu thoại chào bạn mỗi lần vào máy",
      en: "A voice line greets you every log in",
    }),
    features: [
      lang({
        vi: "Đăng ký player vào Task Scheduler với trigger 'At log on'",
        en: "Register the player in Task Scheduler with an 'At log on' trigger",
      }),
      lang({
        vi: "Chạy im lặng ở nền, không nháy cửa sổ console",
        en: "Runs silently in the background, no flashing console window",
      }),
      lang({
        vi: "Tài liệu setup riêng cho từng định dạng",
        en: "Per-format setup guides walk through it",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["Task Scheduler", "At-logon", "Background"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    code: `# Task Scheduler -> Create Task
#   Trigger: At log on
#   Action : player.exe
#   Run whether logged on or not: off
#   Hidden : on`,
  },
  {
    num: "05",
    icon: "Binary",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "Dịch ngược định dạng SAB", en: "Reverse-engineering SAB" }),
    subtitle: lang({
      vi: "Bóc tách một container không có tài liệu",
      en: "Unpacking an undocumented container",
    }),
    features: [
      lang({
        vi: "Nhận diện header SAB qua magic sabf và lần ra bảng subsong",
        en: "Identifies the SAB header by its sabf magic and walks the subsong table",
      }),
      lang({
        vi: "Đưa payload CRI HCA qua vgmstream để giải mã đúng codec",
        en: "Routes the CRI HCA payload through vgmstream for correct decoding",
      }),
      lang({
        vi: "Chỉ đóng gói công cụ, không kèm audio game nào",
        en: "Ships tooling only, no game audio included",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["sabf magic", "CRI HCA", "MIT"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `$ xxd bank.sab | head -1
00000000: 7361 6266 ...   # "sabf"

# subsongs -> vgmstream -> HCA decode`,
  },
];

const TECH = [
  { icon: "FileCode", name: "C++", role: "Silent player" },
  { icon: "Terminal", name: "Bash", role: "Extract pipeline" },
  { icon: "Terminal", name: "PowerShell", role: "Player variant" },
  { icon: "FileCode", name: "VBScript", role: "No-build player" },
  { icon: "FileAudio", name: "vgmstream", role: "Decode codecs" },
  { icon: "Sliders", name: "ffmpeg", role: "Normalize + fade" },
  { icon: "Clock", name: "Task Scheduler", role: "At-logon" },
  { icon: "Hammer", name: "MinGW / MSVC", role: "Build" },
  { icon: "GitBranch", name: "GitHub Actions", role: "CI" },
];

const ARCH = [
  {
    icon: "Boxes",
    title: lang({ vi: "Trích xuất", en: "Extract" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "A Bash script identifies the bank format by its magic bytes and hands it to vgmstream, which decodes every subsong (HCA, Vorbis, ADX, and more).",
  },
  {
    icon: "Sliders",
    title: lang({ vi: "Chọn lọc", en: "Curate" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "Clips below a length threshold are dropped; ffmpeg keeps the longest takes, loudness-normalizes them, and adds a fade-out to produce voice.wav.",
  },
  {
    icon: "Play",
    title: lang({ vi: "Phát", en: "Play" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "A tiny no-window C++ MCI player plays the clip, wired into Windows Task Scheduler with an at-logon trigger so it greets you on sign-in.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Binary",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Dịch ngược audio", en: "Audio Reverse-engineering" }),
    items: [
      lang({
        vi: "Nhận diện SAB (magic sabf) và giải mã bằng vgmstream",
        en: "Identified SAB (sabf magic) and decoded it via vgmstream",
      }),
      lang({
        vi: "Ánh xạ các container Wwise, FMOD và CRI ADX2",
        en: "Mapped the Wwise, FMOD, and CRI ADX2 containers",
      }),
    ],
  },
  {
    icon: "Workflow",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Đường ống trích xuất", en: "Extraction Pipeline" }),
    items: [
      lang({
        vi: "Script Bash: nhận diện → giải mã → lọc theo độ dài",
        en: "Bash scripts: identify -> decode -> filter by length",
      }),
      lang({
        vi: "Chọn lọc, chuẩn hóa âm lượng và fade-out bằng ffmpeg",
        en: "Curate, loudness-normalize, and fade-out with ffmpeg",
      }),
    ],
  },
  {
    icon: "Volume2",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Trình phát im lặng", en: "Silent Player" }),
    items: [
      lang({
        vi: "Player C++ Win32 MCI không cửa sổ, phát mọi WAV/mp3",
        en: "A no-window C++ Win32 MCI player that plays any WAV/mp3",
      }),
      lang({
        vi: "Kèm biến thể VBScript và PowerShell",
        en: "Plus VBScript and PowerShell variants",
      }),
    ],
  },
  {
    icon: "Clock",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Tích hợp khi đăng nhập", en: "At-login Integration" }),
    items: [
      lang({
        vi: "Trigger 'At log on' của Task Scheduler chạy player im lặng",
        en: "A Task Scheduler 'At log on' trigger runs the player silently",
      }),
      lang({
        vi: "Tài liệu setup riêng cho từng định dạng bank",
        en: "Per-format setup guides for each bank type",
      }),
    ],
  },
];

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
      <h2 className={`text-3xl font-black mb-2 ${isLight ? "text-slate-800" : "text-white"}`}>
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

function CodeTerminal({ code }: { code: string }) {
  return (
    <div className="h-full flex flex-col bg-[#0b1120] border-r border-white/5">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] font-mono text-slate-500">bash</span>
      </div>
      <pre className="flex-1 overflow-x-auto px-4 py-4 text-[12px] leading-relaxed font-mono text-slate-300 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function Screenshot({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center bg-slate-900/30 px-4">
        <span className="text-[11px] font-mono text-slate-500 text-center">{src}</span>
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
      <div
        className={`flex items-center gap-4 px-7 py-5 border-b ${
          isLight ? "border-slate-100 bg-slate-50" : "border-white/5 bg-white/[0.02]"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${page.iconBg}`}
        >
          {IconComponent && <IconComponent />}
        </div>
        <div>
          <h3 className={`font-bold text-base ${isLight ? "text-slate-800" : "text-white"}`}>
            {page.title}
          </h3>
          <p className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
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

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className={`border-b md:border-b-0 md:border-r overflow-hidden ${
            isLight ? "border-slate-100" : "border-white/5"
          }`}
        >
          {page.img ? (
            <Screenshot src={page.img} alt={page.title} />
          ) : (
            <CodeTerminal code={page.code ?? ""} />
          )}
        </div>

        <div className="p-7">
          <ul className="flex flex-col gap-3 mb-5">
            {page.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${page.dotColor}`} />
                {f}
              </li>
            ))}
          </ul>
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

function ShorekeeperStartupDetail() {
  const isLight = useTheme();
  const Zap = Icons["Zap"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>Shorekeeper Startup Voice | Gia Hung Pham</title>
        <meta
          name="description"
          content="A no-window Windows player that plays a game voice line at login, plus a reverse-engineering pipeline that extracts and loudness-normalizes clips from Square Enix SAB, Wwise, FMOD, and CRI ADX2 audio banks."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/shorekeeper-startup"
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
              C++ · Shell · Windows · Audio RE
            </div>

            <h1 className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}>
              Shorekeeper <span className="text-sky-500">Startup Voice</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Phát một câu thoại game khi bạn đăng nhập vào Windows. Một trình phát im lặng cộng với pipeline dịch ngược trích xuất và chuẩn hóa âm lượng các đoạn giọng nói từ kho audio Square Enix SAB, Wwise, FMOD và CRI ADX2. Bạn tự cung cấp audio, không kèm file game nào.",
                en: "Play a game voice line when you log in to Windows. A tiny silent player plus a reverse-engineering pipeline that extracts and loudness-normalizes voice clips from Square Enix SAB, Wwise, FMOD, and CRI ADX2 audio banks. Bring your own audio, no game files are shipped.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "4", l: lang({ vi: "Định dạng bank", en: "Bank formats" }) },
                { n: "C++", l: lang({ vi: "Trình phát", en: "Silent player" }) },
                { n: "Login", l: lang({ vi: "Trigger đăng nhập", en: "At-logon trigger" }) },
                { n: "MIT", l: lang({ vi: "Mã nguồn mở", en: "Open source" }) },
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
{`# Square Enix SAB -> normalized voice.wav
$ ./extract/sab/extract_sab.sh bank.zip JP

# then point the login player at it
> player.exe voice.wav`}
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
              <a
                href={`${REPO_URL}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 border ${
                  isLight
                    ? "border-slate-300 text-slate-700 hover:border-sky-400 hover:text-sky-600"
                    : "border-white/20 text-white hover:border-sky-400 hover:text-sky-400"
                }`}
              >
                {lang({ vi: "Bản phát hành", en: "Releases" })}
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
              vi: "Dự án cá nhân: dịch ngược các định dạng audio-bank, xây pipeline trích xuất, trình phát im lặng, và tích hợp chạy khi đăng nhập.",
              en: "A solo project: reverse-engineered the audio-bank formats, built the extraction pipeline, the silent player, and the at-login integration.",
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
            vi: "Một pipeline trích xuất phủ bốn họ audio-bank game, cộng một trình phát im lặng chạy khi đăng nhập Windows.",
            en: "One extraction pipeline covering four game audio-bank families, plus a silent player that runs at Windows login.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard key={page.num} page={page} isLight={isLight} />
        ))}

        {/* Tech Stack */}
        <div className="mb-10">
          <Pill label={lang({ vi: "Công nghệ", en: "Tech Stack" })} isLight={isLight} />
          <SectionTitle
            pre={lang({ vi: "Công nghệ", en: "Technologies" })}
            accent={lang({ vi: "sử dụng", en: "Used" })}
            desc={lang({
              vi: "Trình phát viết bằng C++ Win32, còn phần trích xuất là các script shell điều phối vgmstream và ffmpeg.",
              en: "The player is C++ Win32, while extraction is shell scripting that orchestrates vgmstream and ffmpeg.",
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
            pre={lang({ vi: "Luồng", en: "The" })}
            accent={lang({ vi: "xử lý", en: "Pipeline" })}
            desc={lang({
              vi: "Trích xuất → Chọn lọc → Phát: bóc audio ra khỏi bank, làm sạch thành một câu thoại, rồi phát khi đăng nhập.",
              en: "Extract -> Curate -> Play: pull audio out of the bank, clean it into a single line, then play it at login.",
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

export default ShorekeeperStartupDetail;
