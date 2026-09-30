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
  CheckCircle2,
  Cpu,
  FileCode,
  FlaskConical,
  Gamepad2,
  GitBranch,
  Globe,
  Keyboard,
  Layers,
  Package,
  Rocket,
  Shuffle,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lang } from "@/helper/lang";

// Only the icons this page uses, so the rest of lucide-react stays out of the bundle.
const Icons: Record<string, LucideIcon> = {
  CheckCircle2,
  Cpu,
  FileCode,
  FlaskConical,
  Gamepad2,
  GitBranch,
  Globe,
  Keyboard,
  Layers,
  Package,
  Rocket,
  Shuffle,
  Terminal,
  Wrench,
  Zap,
};

const REPO_URL = "https://github.com/Hung1510/Super-Earth-Armory-Forge";
const WEB_URL = "https://hung1510.github.io/Super-Earth-Armory-Forge/";
const AYAKA_URL = "https://ayakamods.com/mods/super-earth-armory-forge.4359/";
const ORIGIN_URL = "https://ayakamods.com/mods/modular-armor-passives.4350/";

const IMG = "/projects/armoryForge";

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: "Keyboard",
    iconBg: "bg-yellow-900/30",
    title: lang({ vi: "Armory terminal trong game (F7)", en: "The In-Game Armory Terminal (F7)" }),
    subtitle: lang({
      vi: "Tick passive, sửa giá trị, áp dụng ngay lập tức",
      en: "Tick passives, edit values, applied instantly",
    }),
    features: [
      lang({
        vi: "Panel vẽ bằng Lua trên LuaJIT: danh sách 31 passive bên trái, giá trị của passive đang chọn bên phải",
        en: "A Lua panel on LuaJIT: all 31 passives on the left, the selected passive's values on the right",
      }),
      lang({
        vi: "Giá trị hiển thị dạng dễ hiểu (75% kháng, +30%, +50 giáp) thay vì số thô của game; gõ trực tiếp hoặc dùng -- - + ++",
        en: "Values shown in plain terms (75% resist, +30%, +50 armor) instead of raw game numbers; type them or step with -- - + ++",
      }),
      lang({
        vi: "Mỗi passive gốc của giáp là một tab riêng, nhiều stack độc lập cùng lúc; khi trùng hiệu ứng chọn Stack all hoặc Strongest only",
        en: "One tab per armor passive, several independent stacks at once; overlapping effects resolve as Stack all or Strongest only",
      }),
      lang({
        vi: "Undo 30 bước (Ctrl+Z), copy/paste build thành một dòng mã để chia sẻ",
        en: "30-step undo (Ctrl+Z), and copy/paste a build as a one-line share code",
      }),
    ],
    dotColor: "bg-yellow-500",
    tags: ["Lua / LuaJIT", "Live memory patching", "Immediate-mode UI"],
    tagDark: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    tagLight: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    img: `${IMG}/panel-gunslinger.png`,
  },
  {
    num: "02",
    icon: "Shuffle",
    iconBg: "bg-orange-900/30",
    title: lang({ vi: "Loadout & đổi nhanh (F9)", en: "Loadouts & Quick-Swap (F9)" }),
    subtitle: lang({
      vi: "Một lần cài, nhiều build",
      en: "One install, many builds",
    }),
    features: [
      lang({
        vi: "Preset có sẵn (Kitchen Sink, Tank, Stealth, Survivor, Demolitionist, Gunner) cộng loadout tự lưu",
        en: "Built-in presets (Kitchen Sink, Tank, Stealth, Survivor, Demolitionist, Gunner) plus your own saved loadouts",
      }),
      lang({
        vi: "F9 xoay vòng các preset ngay trong trận mà không cần mở panel",
        en: "F9 cycles presets mid-game without opening the panel",
      }),
      lang({
        vi: "Mọi thay đổi tự lưu vào loadout.ini, cùng định dạng với web builder, nên import/export qua lại được",
        en: "Every change autosaves to loadout.ini, the same format the web builder reads and writes",
      }),
      lang({
        vi: "Bản cập nhật giữ nguyên build đã lưu từ phiên bản cũ (Passive Picker v4)",
        en: "Updates keep saves made under the old name (Passive Picker v4)",
      }),
    ],
    dotColor: "bg-orange-500",
    tags: ["Presets", "Hotkeys", "Persistent state"],
    tagDark: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    tagLight: "bg-orange-100 text-orange-700 border border-orange-200",
    img: `${IMG}/panel-presets.png`,
  },
  {
    num: "03",
    icon: "Globe",
    iconBg: "bg-sky-900/30",
    title: lang({ vi: "Web builder", en: "The Web Builder" }),
    subtitle: lang({
      vi: "Lên build trên trình duyệt, tải về mod sẵn cài",
      en: "Plan in the browser, download a ready-to-install mod",
    }),
    features: [
      lang({
        vi: "Trang tĩnh trên GitHub Pages dựng file .zip mod ngay trong trình duyệt bằng JSZip, không cần server",
        en: "A static GitHub Pages site that writes the mod .zip in the browser with JSZip, no server",
      }),
      lang({
        vi: "core.js là bản port của generator Python; CI buộc output của web phải trùng từng byte với Python",
        en: "core.js is a port of the Python generator; CI requires its output to be byte-identical to Python's",
      }),
      lang({
        vi: "Link chia sẻ, lưu loadout.ini, phím tắt bàn phím cho mọi thao tác chính",
        en: "Share links, loadout.ini export, and keyboard shortcuts for every main action",
      }),
    ],
    dotColor: "bg-sky-500",
    tags: ["JavaScript", "JSZip", "GitHub Pages", "Parity-tested"],
    tagDark: "bg-sky-900/40 text-sky-300 border border-sky-700/40",
    tagLight: "bg-sky-100 text-sky-700 border border-sky-200",
    img: `${IMG}/web-builder.png`,
  },
  {
    num: "04",
    icon: "FileCode",
    iconBg: "bg-purple-900/30",
    title: lang({ vi: "Lớp cấu hình & generator", en: "Config Layer & Generator" }),
    subtitle: lang({
      vi: "Từ comment hex trong file Lua 1.000 dòng tới hiệu ứng có tên",
      en: "From commenting out hex rows in a 1,000-line Lua to named effects",
    }),
    features: [
      lang({
        vi: "picker.py: catalog passive, parser loadout.ini, sinh Lua, ghi .patch_0 và zip, kèm CLI",
        en: "picker.py: the passive catalog, the loadout.ini parser, the Lua generator, and the .patch_0 + zip writer, behind a CLI",
      }),
      lang({
        vi: "Hiệu ứng được đặt tên (death_save, ammo_capacity) thay cho ID hash mà game lưu",
        en: "Named effects (death_save, ammo_capacity) instead of the hashes the game stores",
      }),
      lang({
        vi: "Giá trị passive gốc của giáp có thể thay thế, không chỉ cộng thêm; lối thoát raw rows cho người dùng nâng cao",
        en: "The armor's own passive can be replaced, not just added to; raw rows remain as an escape hatch",
      }),
    ],
    dotColor: "bg-purple-500",
    tags: ["Python", "INI DSL", "CLI"],
    tagDark: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
    tagLight: "bg-purple-100 text-purple-700 border border-purple-200",
    code: `[profile: Med-Kit]        ; armor WITH Med-Kit
conflicts = stack          ; or: strongest
Democracy Protects = on
Siege-Ready        = on
Med-Kit.stims                 = 6
Democracy Protects.death_save = 2.0

$ python tools/picker.py build loadout.ini \\
    --zip "My Stack.zip"`,
  },
  {
    num: "05",
    icon: "FlaskConical",
    iconBg: "bg-emerald-900/30",
    title: lang({ vi: "Test với một game giả", en: "Testing Against a Fake Game" }),
    subtitle: lang({
      vi: "Kiểm thử mod mà không cần mở game",
      en: "Verifying a mod without launching the game",
    }),
    features: [
      lang({
        vi: "Harness Python giả lập bộ nhớ, GUI engine, bàn phím và chuột để chạy mod thật trên LuaJIT",
        en: "A Python harness fakes memory, the engine GUI, keyboard, and mouse so the real mod runs under LuaJIT",
      }),
      lang({
        vi: "Kiểm tra các hàng patch khớp với picker.py, luồng panel, lưu/khôi phục, zip release và save từ trước khi đổi tên",
        en: "Checks patched rows match picker.py, panel flows, save/restore, the release zip, and pre-rename saves",
      }),
      lang({
        vi: "Test layout đảm bảo không chữ nào chồng lấn hay bị cắt trong mọi màn hình của panel",
        en: "A layout test guarantees no overlapping or clipped text in any panel view",
      }),
    ],
    dotColor: "bg-emerald-500",
    tags: ["5 test suites", "GitHub Actions", "LuaJIT harness"],
    tagDark: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/40",
    tagLight: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    code: `$ python tools/picker.py export-web --check
$ python tests/test_ingame.py
$ python tests/test_panel_features.py
$ python tests/test_release.py
$ python tests/test_panel_layout.py
$ node tests/test_web_parity.js
# web output == python output, byte for byte`,
  },
  {
    num: "06",
    icon: "Wrench",
    iconBg: "bg-rose-900/30",
    title: lang({ vi: "Sẵn sàng cho ngày patch", en: "Patch-Day Tooling" }),
    subtitle: lang({
      vi: "Khi game cập nhật, mod tự chẩn đoán",
      en: "When the game updates, the mod diagnoses itself",
    }),
    features: [
      lang({
        vi: "Mod ghi file STATUS: found=31 of 31, passive mới, hoặc found=0 thì tự vô hiệu an toàn",
        en: "The mod writes a STATUS file: found=31 of 31, new passives, or found=0 and it safely does nothing",
      }),
      lang({
        vi: "Dump toàn bộ passive với giá trị gốc của game; check-dump in ra dòng CATALOG sẵn để dán",
        en: "It dumps every passive with the game's own values; check-dump prints ready-to-paste CATALOG lines",
      }),
      lang({
        vi: "Tag một version, GitHub Actions dựng zip và gắn vào Release",
        en: "Push a tag and GitHub Actions builds the zip and attaches it to the release",
      }),
    ],
    dotColor: "bg-rose-500",
    tags: ["Self-diagnosing", "Release automation"],
    tagDark: "bg-rose-900/40 text-rose-300 border border-rose-700/40",
    tagLight: "bg-rose-100 text-rose-700 border border-rose-200",
    code: `ArmoryForge-STATUS.txt
  OK - perk stacked   found=31 of 31

$ python tools/picker.py check-dump
NEW      <passive>  -> paste into CATALOG
CHANGED  <passive>.<effect>  0.75 -> 0.80
$ git tag v5.0 && git push origin v5.0`,
  },
];

const TECH = [
  { icon: "Cpu", name: "Lua / LuaJIT", role: "Runtime engine + panel" },
  { icon: "Terminal", name: "Python", role: "Generator + CLI" },
  { icon: "Globe", name: "JavaScript", role: "Web builder" },
  { icon: "Package", name: "JSZip", role: "In-browser zip" },
  { icon: "Layers", name: "GitHub Pages", role: "Static hosting" },
  { icon: "GitBranch", name: "GitHub Actions", role: "CI + releases" },
  { icon: "FlaskConical", name: "lupa", role: "Lua from Python tests" },
  { icon: "Gamepad2", name: "Bingus Shared Loader", role: "Mod loader" },
  { icon: "Rocket", name: "AyakaMods", role: "Distribution" },
  { icon: "CheckCircle2", name: "5 test suites", role: "Game-free verification" },
];

const ARCH = [
  {
    icon: "Terminal",
    title: lang({ vi: "Generator (Python)", en: "Generator (Python)" }),
    dark: "border-purple-500/30 bg-purple-900/10",
    light: "border-purple-200 bg-purple-50",
    titleColor: "text-purple-500",
    desc: "picker.py is the source of truth: the passive catalog, effect names, the loadout.ini parser, and the writer for the Lua, the .patch_0 archive, and the release zip. It also exports data.json for the web builder.",
  },
  {
    icon: "Cpu",
    title: lang({ vi: "Runtime (Lua)", en: "Runtime (Lua)" }),
    dark: "border-yellow-500/30 bg-yellow-900/10",
    light: "border-yellow-200 bg-yellow-50",
    titleColor: "text-yellow-600",
    desc: "engine.lua finds the perk records in memory and applies or restores stacks; panel.lua draws the F7 terminal and handles mouse and keyboard; main.lua runs the per-frame tick. Everything saves to the same loadout.ini.",
  },
  {
    icon: "Globe",
    title: lang({ vi: "Web builder (JS)", en: "Web Builder (JS)" }),
    dark: "border-sky-500/30 bg-sky-900/10",
    light: "border-sky-200 bg-sky-50",
    titleColor: "text-sky-500",
    desc: "core.js is a port of picker.py's build logic and app.js is the UI. A parity test in CI fails the build unless the browser's output is byte-identical to Python's for the same loadout.",
  },
];

const MY_ROLE_STEPS = [
  {
    icon: "Keyboard",
    color: "text-yellow-500",
    dot: "bg-yellow-500",
    ringDark: "ring-yellow-500/20",
    ringLight: "ring-yellow-200",
    title: lang({ vi: "Armory terminal trong game", en: "In-Game Armory Terminal" }),
    items: [
      lang({
        vi: "Thiết kế và dựng panel F7: tab theo từng giáp, sửa giá trị trực tiếp, undo, mã chia sẻ",
        en: "Designed and built the F7 panel: per-armor tabs, live value editing, undo, and share codes",
      }),
      lang({
        vi: "Hệ thống loadout: preset, lưu/đổi tên/xóa, đổi nhanh bằng F9",
        en: "The loadout system: presets, save/rename/delete, and F9 quick-swap",
      }),
    ],
  },
  {
    icon: "FileCode",
    color: "text-purple-500",
    dot: "bg-purple-500",
    ringDark: "ring-purple-500/20",
    ringLight: "ring-purple-200",
    title: lang({ vi: "Lớp cấu hình", en: "Config Layer" }),
    items: [
      lang({
        vi: "Thay việc comment hex trong Lua bằng loadout.ini với hiệu ứng có tên và giá trị dễ hiểu",
        en: "Replaced commenting out hex rows in Lua with loadout.ini, named effects, and plain values",
      }),
      lang({
        vi: "Nhiều stack độc lập theo passive gốc, và chế độ xử lý trùng Stack all / Strongest only",
        en: "Multiple independent stacks keyed by base passive, and Stack all / Strongest only conflict modes",
      }),
    ],
  },
  {
    icon: "Globe",
    color: "text-sky-500",
    dot: "bg-sky-500",
    ringDark: "ring-sky-500/20",
    ringLight: "ring-sky-200",
    title: lang({ vi: "Web builder", en: "Web Builder" }),
    items: [
      lang({
        vi: "Port logic build sang JavaScript và giữ nó trùng từng byte với Python bằng test parity",
        en: "Ported the build logic to JavaScript and kept it byte-identical to Python with a parity test",
      }),
    ],
  },
  {
    icon: "CheckCircle2",
    color: "text-emerald-500",
    dot: "bg-emerald-500",
    ringDark: "ring-emerald-500/20",
    ringLight: "ring-emerald-200",
    title: lang({ vi: "Kiểm thử & phát hành", en: "Testing & Release" }),
    items: [
      lang({
        vi: "Harness game giả cho LuaJIT, 5 bộ test chạy trong CI",
        en: "A fake-game harness for LuaJIT and five test suites running in CI",
      }),
      lang({
        vi: "Release tự động qua tag, công cụ check-dump cho ngày patch, phát hành trên AyakaMods",
        en: "Tag-driven releases, check-dump tooling for patch day, and publishing on AyakaMods",
      }),
    ],
  },
];

function ArmoryForgeDetail() {
  const isLight = useTheme();
  const RocketIcon = Icons["Rocket"];
  const ZapIcon = Icons["Zap"];
  const GameIcon = Icons["Gamepad2"];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white text-slate-800" : "bg-background text-foreground"
      }`}
    >
      <Helmet>
        <title>Super Earth Armory Forge | Gia Hung Pham</title>
        <meta
          name="description"
          content="Super Earth Armory Forge - a Helldivers 2 armor passive editor mod: stack any of the 31 armor passives and set every value live in game through an F7 Lua terminal, with loadouts, a Python generator, and a byte-identical web builder."
        />
        <link
          rel="canonical"
          href="https://giahung-portfolio.vercel.app/projects/super-earth-armory-forge"
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
          <img
            src={`${IMG}/banner.png`}
            alt="Super Earth Armory Forge"
            loading="eager"
            decoding="async"
            className="w-full h-auto block"
          />
          <div className="p-8">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs mb-4 border font-semibold ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-blue-900/30 border-blue-400/30 text-blue-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Lua · Python · JavaScript · Published on AyakaMods
            </div>

            <h1
              className={`text-3xl font-black mb-3 leading-tight ${
                isLight ? "text-slate-800" : "text-white"
              }`}
            >
              Super Earth Armory <span className="text-sky-500">Forge</span>
            </h1>

            <p
              className={`mb-8 leading-relaxed max-w-2xl mx-auto text-center ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {lang({
                vi: "Mod chỉnh passive giáp cho Helldivers 2: ghép bất kỳ passive nào trong 31 passive lên bộ giáp đang mặc và chỉnh mọi giá trị trực tiếp trong game qua terminal F7. Một lần cài, lưu và đổi loadout bằng F9, cộng web builder tùy chọn cho ra đúng từng byte như generator Python.",
                en: "A Helldivers 2 armor passive editor: stack any of the 31 armor passives onto the armor you wear and set every value live in game through an F7 terminal. One install, loadouts saved and swapped with F9, plus an optional web builder that produces byte-for-byte the same build as the Python generator.",
              })}
            </p>

            <div className="flex gap-8 mb-8 flex-wrap justify-center">
              {[
                { n: "31/31", l: lang({ vi: "Passive giáp", en: "Armor passives" }) },
                { n: "F7", l: lang({ vi: "Sửa trực tiếp trong game", en: "Live in-game editor" }) },
                { n: "5", l: lang({ vi: "Bộ test trong CI", en: "Test suites in CI" }) },
                { n: "1:1", l: lang({ vi: "Web ↔ Python", en: "Web ↔ Python parity" }) },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-black text-sky-500">{s.n}</div>
                  <div className="text-xs mt-0.5 text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 mb-6 rounded-xl border px-5 py-4 text-sm leading-relaxed ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-slate-300"
              }`}
            >
              <div className="font-semibold mb-2 text-sky-500">
                {lang({ vi: "Nguồn gốc & ghi công", en: "Origin & credit" })}
              </div>
              {lang({
                vi: "Armory Forge bắt đầu từ bản chỉnh sửa của ",
                en: "Armory Forge started as an edit of ",
              })}
              <a
                href={ORIGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:underline"
              >
                Passive Picker v3
              </a>
              {lang({
                vi: " của mostlycloudy. Lõi memory-patching, định dạng archive và dữ liệu passive vẫn đến từ mod đó (credit engine cho SHODAN). Terminal trong game, hệ thống loadout, lớp cấu hình, web builder và bộ test là phần tôi xây.",
                en: " by mostlycloudy. Its memory-patching core, archive format, and passive data still come from that mod (engine credit to SHODAN). The in-game terminal, loadouts, config layer, web builder, and test suite are my work.",
              })}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(21,101,192,0.4)]"
              >
                {RocketIcon && <RocketIcon />}{" "}
                {lang({ vi: "Mở web builder", en: "Open the web builder" })}
              </a>
              <a
                href={AYAKA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 border ${
                  isLight
                    ? "border-slate-300 text-slate-700 hover:border-sky-400 hover:text-sky-600"
                    : "border-white/20 text-white hover:border-sky-400 hover:text-sky-400"
                }`}
              >
                {GameIcon && <GameIcon />} AyakaMods
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
              vi: "Dự án cá nhân xây trên lõi của một mod có sẵn: tôi biến một file Lua phải sửa tay thành một công cụ có giao diện, lưu trạng thái, được kiểm thử và tự phát hành.",
              en: "A solo project built on an existing mod's core: I turned a hand-edited Lua file into a tool with a UI, persistent state, tests, and automated releases.",
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
            vi: "Bản gốc yêu cầu comment các dòng hex trong một file Lua 1.000 dòng rồi cài lại cho mỗi thay đổi. Armory Forge biến việc đó thành một panel trong game, áp dụng ngay.",
            en: "The original meant commenting out hex rows in a 1,000-line Lua file and reinstalling for every change. Armory Forge turns that into an in-game panel that applies instantly.",
          })}
          isLight={isLight}
        />
        {FEATURES.map((page) => (
          <FeatureCard
            key={page.num}
            page={page}
            isLight={isLight}
            icons={Icons}
            terminalLabel="armory-forge — pwsh"
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
              vi: "Ba ngôn ngữ, một nguồn sự thật: Python sinh dữ liệu, Lua chạy trong game, JavaScript dựng mod trên trình duyệt.",
              en: "Three languages, one source of truth: Python generates, Lua runs in the game, JavaScript builds the mod in the browser.",
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
                  <span className="text-[10px] text-slate-500">{t.role}</span>
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
              vi: "Một catalog, ba nơi chạy: generator Python, runtime Lua trong game, và web builder JavaScript, cùng đọc và ghi một định dạng loadout.ini.",
              en: "One catalog, three runtimes: the Python generator, the in-game Lua runtime, and the JavaScript web builder, all reading and writing the same loadout.ini.",
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

export default ArmoryForgeDetail;
