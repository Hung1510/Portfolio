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
  Activity,
  AppWindow,
  AudioLines,
  GitBranch,
  Gauge,
  Hash,
  Layers,
  Monitor,
  Palette,
  Settings,
  Sparkles,
  Wand2,
  Waves,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const Icons: Record<string, LucideIcon> = {
  Activity,
  AppWindow,
  AudioLines,
  GitBranch,
  Gauge,
  Hash,
  Layers,
  Monitor,
  Palette,
  Settings,
  Sparkles,
  Wand2,
  Waves,
  Zap,
};
import { lang } from "@/helper/lang";

const REPO_URL = "https://github.com/Hung1510/Somnium-Weaver";

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Sparkles",
    iconBg: "bg-blue-900/40",
    title: lang({ vi: "Trường hạt sống", en: "Living Particle Field" }),
    subtitle: lang({
      vi: "Sức khỏe máy của bạn hóa thành ánh sáng",
      en: "Your machine's vitals become light",
    }),
    features: [
      lang({
        vi: "Tải CPU quyết định tốc độ phát hạt và độ sáng của chúng",
        en: "CPU load sets how fast motes are emitted and how brightly they glow",
      }),
      lang({
        vi: "Áp lực RAM thay đổi tốc độ trôi của hạt",
        en: "RAM pressure changes their drift speed",
      }),
      lang({
        vi: "Lưu lượng mạng cấp cho một HUD tùy chọn trên màn hình",
        en: "Network throughput feeds an optional on-screen HUD",
      }),
      lang({
        vi: "Máy càng bận, trường hạt càng sôi động",
        en: "The busier the machine, the busier the field",
      }),
    ],
    dotColor: "bg-blue-500",
    tags: ["CPU", "RAM", "Network HUD"],
    tagDark: "bg-blue-900/50 text-blue-300 border border-blue-700/40",
    tagLight: "bg-blue-100 text-blue-700 border border-blue-200",
    img: "/SomniumWeaver/particles.png",
  },
  {
    num: "02",
    icon: "Wand2",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Bùng nổ đàn bướm", en: "Butterfly Bursts" }),
    subtitle: lang({
      vi: "Đỉnh tải nở thành vàng và hồng",
      en: "Spikes bloom into gold and pink",
    }),
    features: [
      lang({
        vi: "CPU vượt 80% hoặc rớt dưới 15% sẽ kích hoạt một đợt bùng nổ",
        en: "A CPU spike above 80% or a dip below 15% triggers a burst",
      }),
      lang({
        vi: "Một đàn hạt vàng-hồng xoáy ra trong khoảng hai giây",
        en: "A swarm of gold and pink motes spirals out for about two seconds",
      }),
      lang({
        vi: "Cũng được kích bởi bộ dò beat hoặc phím tắt thủ công",
        en: "Also fired by the audio beat detector or a manual hotkey",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["Spike / dip trigger", "Gold + pink", "~2s spiral"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    img: "/SomniumWeaver/butterfly.png",
  },
  {
    num: "03",
    icon: "AudioLines",
    iconBg: "bg-green-900/30",
    title: lang({ vi: "Chế độ phản ứng âm thanh", en: "Audio-Reactive Mode" }),
    subtitle: lang({
      vi: "Hạt nhảy theo âm thanh hệ thống",
      en: "Motes dance to your system audio",
    }),
    features: [
      lang({
        vi: "Bắt âm thanh desktop qua WASAPI loopback (không micro)",
        en: "Captures desktop audio via WASAPI loopback (no microphone)",
      }),
      lang({
        vi: "FFT 1024 điểm, tách bass/mid/treble + độ lớn với gain thích ứng",
        en: "A 1024-point FFT, split into bass/mid/treble + loudness with adaptive gain",
      }),
      lang({
        vi: "Bass đẩy hạt, độ lớn tăng tốc, treble làm sáng",
        en: "Bass swells push particles, loudness speeds them up, treble brightens them",
      }),
      lang({
        vi: "Bộ dò beat (bass so với trung bình trượt) bung bùng nổ theo nhịp",
        en: "A beat detector (bass vs a rolling average) fires bursts on the beat",
      }),
    ],
    dotColor: "bg-green-500",
    tags: ["WASAPI loopback", "1024-pt FFT", "Beat detection"],
    tagDark: "bg-green-900/40 text-green-300 border border-green-700/40",
    tagLight: "bg-green-100 text-green-700 border border-green-200",
    img: "/SomniumWeaver/audio.png",
  },
  {
    num: "04",
    icon: "Monitor",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Lớp phủ trong suốt", en: "Transparent Overlay" }),
    subtitle: lang({
      vi: "Nằm trên cùng, không bao giờ cản đường",
      en: "Sits on top, never in the way",
    }),
    features: [
      lang({
        vi: "Cửa sổ trong suốt, xuyên chuột, luôn trên cùng",
        en: "Transparent, click-through, always-on-top window",
      }),
      lang({
        vi: "Render trên CPU raster để có độ trong suốt theo từng pixel",
        en: "Renders on the CPU raster surface for per-pixel transparency",
      }),
      lang({
        vi: "Phím tắt toàn cục bật/tắt weave, đổi HUD và âm thanh, bung burst thủ công",
        en: "Global hotkeys start/stop the weave, toggle HUD and audio, fire a manual burst",
      }),
      lang({
        vi: "Chạy hoàn toàn cục bộ, không telemetry",
        en: "Runs fully local with no telemetry",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["Click-through", "CPU raster", "Global hotkeys"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    img: "/SomniumWeaver/overlay.png",
  },
  {
    num: "05",
    icon: "Gauge",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Tối ưu hiệu năng", en: "Performance Engineering" }),
    subtitle: lang({
      vi: "5000 hạt, vẫn mượt",
      en: "5000 particles, still fluid",
    }),
    features: [
      lang({
        vi: "Hạt được pool bằng free-list nên không cấp phát mỗi khung hình",
        en: "Particles pooled with a free-list, so no per-frame allocations",
      }),
      lang({
        vi: "Tái dùng đối tượng paint; vòng render giới hạn theo đồng hồ compositor",
        en: "Paint objects reused; the render loop is capped off the compositor clock",
      }),
      lang({
        vi: "Trần cứng 5000 hạt giữ cho mọi thứ mượt",
        en: "A hard ceiling of 5000 particles keeps it smooth",
      }),
      lang({
        vi: "Cài đặt lưu vào %AppData% với preset Low / Medium / High",
        en: "Settings persisted to %AppData% with Low / Medium / High presets",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["Object pooling", "FPS-capped", "Quality presets"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    img: "/SomniumWeaver/settings.png",
  },
];

const TECH = [
  { icon: "Hash", name: "C#", role: "Language" },
  { icon: "AppWindow", name: "WPF / .NET 8", role: "Framework" },
  { icon: "Palette", name: "SkiaSharp", role: "CPU raster render" },
  { icon: "AudioLines", name: "WASAPI", role: "Loopback capture" },
  { icon: "Waves", name: "FFT (1024-pt)", role: "Spectrum" },
  { icon: "Zap", name: "Beat detection", role: "Audio" },
  { icon: "Layers", name: "Overlay", role: "Click-through" },
  { icon: "Settings", name: "JSON settings", role: "%AppData%" },
  { icon: "GitBranch", name: "GitHub Actions", role: "win-x64 release" },
];

const ARCH = [
  {
    icon: "Activity",
    title: lang({ vi: "Cảm biến", en: "Sense" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "Live system counters (CPU, RAM, network) and, in audio mode, WASAPI loopback audio run through a 1024-point FFT into bass/mid/treble bands.",
  },
  {
    icon: "Sparkles",
    title: lang({ vi: "Dệt", en: "Weave" }),
    dark: "border-orange-500/30 bg-orange-900/10",
    light: "border-orange-200 bg-orange-50",
    titleColor: "text-orange-500",
    desc: "A pooled particle engine turns those signals into forces - emit rate, drift, brightness - and fires butterfly bursts on spikes, dips, or beats.",
  },
  {
    icon: "Monitor",
    title: lang({ vi: "Kết xuất", en: "Render" }),
    dark: "border-emerald-500/30 bg-emerald-900/10",
    light: "border-emerald-200 bg-emerald-50",
    titleColor: "text-emerald-600",
    desc: "SkiaSharp draws the scene on a CPU raster surface so the window stays per-pixel transparent, click-through, and always-on-top.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Sparkles",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Hệ thống hạt", en: "Particle System" }),
    items: [
      lang({
        vi: "Pool hạt bằng free-list, tái dùng paint, trần 5000 hạt",
        en: "Pooled particles with a free-list, reused paints, a 5000 ceiling",
      }),
      lang({
        vi: "Vòng render raster giới hạn FPS theo đồng hồ compositor",
        en: "An FPS-capped raster render loop off the compositor clock",
      }),
    ],
  },
  {
    icon: "Activity",
    color: "text-orange-500",
    dot: "bg-orange-500",
    ringDark: "ring-orange-500/20",
    ringLight: "ring-orange-200",
    title: lang({ vi: "Chỉ số → hình ảnh", en: "Metrics -> Visuals" }),
    items: [
      lang({
        vi: "Ánh xạ CPU/RAM/mạng thành tốc độ phát, độ trôi và HUD",
        en: "Mapped CPU/RAM/network to emit rate, drift, and the HUD",
      }),
      lang({
        vi: "Kích bùng nổ đàn bướm khi CPU vọt lên hoặc rớt xuống",
        en: "Fired butterfly bursts on CPU spikes and dips",
      }),
    ],
  },
  {
    icon: "AudioLines",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "DSP âm thanh", en: "Audio DSP" }),
    items: [
      lang({
        vi: "Bắt WASAPI loopback, FFT 1024 điểm, tách band + gain thích ứng",
        en: "WASAPI loopback capture, a 1024-point FFT, band split + adaptive gain",
      }),
      lang({
        vi: "Bộ dò beat bung bùng nổ theo nhịp nhạc",
        en: "A beat detector firing bursts on the beat",
      }),
    ],
  },
  {
    icon: "Layers",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Lớp phủ & hoàn thiện", en: "Overlay & Polish" }),
    items: [
      lang({
        vi: "Cửa sổ CPU-raster trong suốt, xuyên chuột, với phím tắt toàn cục",
        en: "A transparent, click-through CPU-raster window with global hotkeys",
      }),
      lang({
        vi: "Cài đặt JSON và bản build win-x64 self-contained qua GitHub Actions",
        en: "JSON settings and a self-contained win-x64 build via GitHub Actions",
      }),
    ],
  },
];

function SomniumWeaverDetail() {
  const isLight = useTheme();
  const Zap = Icons["Zap"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>Somnium Weaver | Gia Hung Pham</title>
        <meta
          name="description"
          content="Somnium Weaver - a living Windows desktop overlay (WPF / .NET 8 + SkiaSharp) that weaves CPU, RAM, and network load into drifting particles, with an opt-in WASAPI audio-reactive mode. Transparent, click-through, and fully local."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/somnium-weaver"
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
              C# · WPF / .NET 8 · Windows
            </div>

            <h1 className={`text-3xl font-black mb-3 leading-tight ${isLight ? "text-slate-800" : "text-white"}`}>
              Somnium <span className="text-sky-500">Weaver</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Một lớp phủ desktop Windows sống động dệt chính sức khỏe của máy bạn thành ánh sáng trôi nổi. Tải CPU, RAM và mạng hóa thành các hạt cyan, còn các đỉnh CPU nở thành đàn bướm vàng-hồng. Chế độ phản ứng âm thanh tùy chọn khiến hạt nhảy theo âm thanh hệ thống. Trong suốt, xuyên chuột, hoàn toàn cục bộ.",
                en: "A living Windows desktop overlay that weaves your machine's own vitals into drifting light. CPU, RAM and network load become cyan motes, and CPU spikes bloom into gold-and-pink butterfly bursts. An opt-in audio-reactive mode makes the motes dance to your system audio. Transparent, click-through, and fully local.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "WPF", l: lang({ vi: ".NET 8", en: ".NET 8" }) },
                { n: "5000", l: lang({ vi: "Hạt", en: "Particles" }) },
                { n: "FFT", l: lang({ vi: "Phản ứng âm thanh", en: "Audio-reactive" }) },
                { n: "Local", l: lang({ vi: "Không telemetry", en: "No telemetry" }) },
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
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-sm ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Điều gì điều khiển hiệu ứng", en: "What drives the weave" })}
              </div>
              <div className="flex flex-col gap-1 text-xs leading-relaxed font-mono">
                <div>CPU load   -&gt; emit rate + glow</div>
                <div>RAM        -&gt; drift speed</div>
                <div>Network    -&gt; on-screen HUD</div>
                <div>spike/dip  -&gt; butterfly burst</div>
              </div>
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
              vi: "Dự án cá nhân: tôi tự làm hệ thống hạt, ánh xạ chỉ số hệ thống, DSP âm thanh thời gian thực, và lớp phủ trong suốt.",
              en: "A solo project: I built the particle system, the system-metric mapping, the real-time audio DSP, and the transparent overlay.",
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
            vi: "Toàn bộ cảnh là thủ tục - không dùng asset game, chỉ ánh sáng sinh ra từ toán học và trạng thái của chính chiếc máy.",
            en: "The whole scene is procedural - no game assets, just light generated from math and the machine's own state.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard key={page.num} page={page} isLight={isLight} icons={Icons} />
        ))}

        {/* Tech Stack */}
        <div className="mb-10">
          <Pill label={lang({ vi: "Công nghệ", en: "Tech Stack" })} isLight={isLight} />
          <SectionTitle
            pre={lang({ vi: "Công nghệ", en: "Technologies" })}
            accent={lang({ vi: "sử dụng", en: "Used" })}
            desc={lang({
              vi: "WPF trên .NET 8 với SkiaSharp vẽ trên CPU raster để giữ cửa sổ trong suốt theo pixel, cộng một đường DSP âm thanh thời gian thực.",
              en: "WPF on .NET 8 with SkiaSharp drawing on a CPU raster surface to keep the window per-pixel transparent, plus a real-time audio DSP path.",
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
              vi: "Cảm biến → Dệt → Kết xuất: đọc trạng thái máy (và âm thanh), biến thành lực điều khiển hạt, rồi vẽ lên một lớp phủ trong suốt.",
              en: "Sense -> Weave -> Render: read the machine's state (and audio), turn it into forces on the particles, then draw onto a transparent overlay.",
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

export default SomniumWeaverDetail;