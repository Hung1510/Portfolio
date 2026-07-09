type BlogSection =
  | { type: "heading" | "text"; content: string }
  | { type: "list"; content: string[] }
  | { type: "image"; content: string; caption?: string };

export type ProjectBlogContent = {
  title: string;
  date: string;
  readTime?: string;
  sections: BlogSection[];
};

export const projectBlogs: Record<string, ProjectBlogContent> = {
    // Keyed by project `slug` (see ProjectsSection.tsx).
    // "smart-learning-advisor" intentionally has no entry: it uses its own
    // dedicated page (SmartAdvisorDetail) via the detailPages registry.

    "tethys": {
        title: "Tethys: A Native Wuthering Waves Echo Optimizer in Rust",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "Tethys is a native desktop tool that reads your Wuthering Waves echoes straight off the screen with OCR, then computes the mathematically best 5-echo build with a genetic algorithm. It grew out of a gap: the community's go-to optimizer was archived after patch 2.1, and almost everything else is web-based - so I built a maintained, native alternative in Rust."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "Echo optimization in Wuthering Waves is a real combinatorics problem - five slots, a 4-3-3-1-1 cost layout, and a large inventory of echoes with random substats. Picking the best set by hand is tedious and error-prone. I wanted a tool that scans the inventory for you and returns a provably good build, running locally with no account login and no game automation."
            },
            {
                type: "heading",
                content: "Architecture"
            },
            {
                type: "text",
                content: "The project is a Cargo workspace split into three crates so the interesting logic stays testable and platform-independent:"
            },
            {
                type: "list",
                content: [
                    "tethys-core - the domain model, scoring, and optimizer. No I/O and no platform code, so it unit-tests on any OS",
                    "tethys-scanner - capture-region math (pure and tested), screen capture, and OCR, each behind a feature flag so the default build stays pure Rust",
                    "tethys-app - a CLI plus a feature-gated egui GUI"
                ]
            },
            {
                type: "heading",
                content: "The Optimizer"
            },
            {
                type: "text",
                content: "Two solvers sit behind one interface. A genetic algorithm treats each build as a genome (one echo per slot) and evolves it with tournament selection, uniform crossover, mutation, elitism, and a repair step that stops the same echo being used twice. An exhaustive solver brute-forces every valid combination for a provable optimum. The clever part is that the exhaustive solver doubles as the test oracle: a unit test asserts the genetic algorithm reaches the brute-forced optimum within a tiny tolerance, so I can trust the fast path. Scoring lives behind an Evaluator trait, so a full damage-formula model can be added later without touching the optimizer."
            },
            {
                type: "heading",
                content: "Reading the Screen"
            },
            {
                type: "text",
                content: "The scanner captures the game window by title, then computes the true 16:9 content rectangle - skipping any letterbox or pillarbox bars - and places each UI region as a fraction of that content area. That keeps it working across exact-16:9, ultrawide, and 16:10 setups, all verified with unit tests. A calibrate command draws colored boxes over the detected regions so you can confirm alignment, and a grid layout tiles the inventory for batch scanning. It only ever reads the screen - it never clicks or automates the game, to stay within the game's terms."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Language: Rust (Cargo workspace, three crates)",
                    "Optimizer: genetic algorithm plus an exhaustive oracle, Evaluator trait for scoring",
                    "Scanning: xcap screen capture and Tesseract OCR, both feature-flagged",
                    "UI: CLI plus an optional egui desktop GUI",
                    "Site: a landing page with JSON-LD, OG cards, and PWA assets, deployed on Vercel",
                    "CI: GitHub Actions"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "The engineering I'm proudest of is the test strategy - using a brute-force solver as a live oracle for a heuristic one is a clean way to keep a genetic algorithm honest. The feature-flag design also means the pure, portable core builds and tests without any native OCR or capture dependencies, which keeps CI simple and the domain logic fast to iterate on."
            }
        ]
    },
    "warno-deck-randomizer": {
        title: "WARNO Deck Randomizer: Seeded Battlegroup Rolls",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A full-stack TypeScript web app that rolls a random WARNO battlegroup and fills it with a randomized deck. It covers 56 battlegroups across 14 nations, with two flavors of roll: a chaotic 'fun' mix, and a 'meta' mix that drafts a competent, budget-aware deck. Every roll is seeded, so any result is reproducible and shareable by link."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "WARNO players like self-imposed challenges - 'play whatever the dice give you.' I wanted a roller that does more than pick a division at random: it should build an actual, legal deck within the game's activation-point budget, and let you share the exact roll with a friend so you both play the same thing."
            },
            {
                type: "heading",
                content: "Fun vs Meta"
            },
            {
                type: "text",
                content: "The two modes are different algorithms. Fun leans into chaos - it's biased toward napalm, rockets, spam, and gimmick cards for a deliberately silly deck. Meta plays like a draft: it secures recon, tanks, and anti-air first, then stacks the strongest available cards while respecting each category's card limits and a rising slot-cost curve, where each additional card in a category costs progressively more activation points. Meta division picks are also weighted by a competitive rating that acts as a win-rate proxy."
            },
            {
                type: "heading",
                content: "Seeds and Deck Codes"
            },
            {
                type: "text",
                content: "Reproducibility is the backbone. A mulberry32 seeded RNG means the same seed always produces the same roll, so results are shareable and debuggable. On top of that, each deck is encoded into a portable base64url deck code that carries the actual cards, so a roll can be handed around without the server."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Frontend: React 18 + Vite, TypeScript",
                    "Backend: Node.js + Express, TypeScript (ESM via tsx), a small REST API (/api/randomize, /api/decode, /api/divisions)",
                    "Data: plain TypeScript modules - real per-category card limits from the WARNO wiki, no database",
                    "Randomness: mulberry32 seeded RNG, base64url deck codes",
                    "Security: helmet headers, a content security policy, per-IP rate limiting, and a small request-body cap",
                    "Deploy: Vercel - static frontend plus the Express API as a serverless function; CI on GitHub Actions"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "The satisfying design problem was making randomness feel intentional. The meta roller isn't just weighted random - it drafts in priority order and respects a real cost curve, so it produces decks that could actually be played. Seeded RNG plus portable deck codes turn a throwaway novelty into something reproducible and social, and the whole data layer is plain typed modules, which keeps it easy to update when a patch changes the card limits."
            }
        ]
    },
    "quiz-platform": {
        title: "Quiz & Interview Practice Platform: IT Interview Preparation",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A full-stack platform built to help IT students and job seekers practice technical interviews. It combines a categorized question bank, dynamic and AI-generated questions, and real-time scoring so users can rehearse interview scenarios and track their progress. Built as a capstone group project."
            },
            {
                type: "image",
                content: "/projects/quizApp.png",
                caption: "Quiz & Interview Practice Platform"
            },
            {
                type: "heading",
                content: "The Problem"
            },
            {
                type: "text",
                content: "Preparing for technical interviews usually means scattered question lists with no feedback loop. We wanted a single place where IT students could pull up categorized questions on demand, take timed quizzes, and immediately see where they stood - without an instructor hand-writing every question."
            },
            {
                type: "heading",
                content: "My Role"
            },
            {
                type: "text",
                content: "This was a group project, and I worked across the stack rather than owning a single slice:"
            },
            {
                type: "list",
                content: [
                    "Backend: built and maintained API endpoints and data models on NestJS + MongoDB",
                    "Frontend: implemented React UI and wired it to the backend",
                    "AI question generation: integrated the feature that auto-produces fresh interview questions",
                    "Testing & QA: tested user flows and fixed bugs and UI errors across the app",
                    "Stabilization: debugged and patched issues in other members' code to keep the build deployable"
                ]
            },
            {
                type: "heading",
                content: "Features"
            },
            {
                type: "list",
                content: [
                    "Dynamic quiz creation from a categorized question bank",
                    "Real-time scoring and instant feedback",
                    "AI-powered question generation",
                    "Administrative dashboard for managing content and users"
                ]
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Frontend: React",
                    "Backend: NestJS with RESTful APIs",
                    "Database: MongoDB",
                    "Deployment: Vercel"
                ]
            },
            {
                type: "heading",
                content: "The Hardest Part"
            },
            {
                type: "text",
                content: "Two things took the most effort. The first was AI question generation - getting it to return relevant, well-formed questions that fit the existing categories and scoring. The second was stabilization: because it was a shared codebase, a lot of my time went into tracking down and fixing bugs in other members' code so the parts integrated cleanly and the app stayed deployable."
            },
            {
                type: "heading",
                content: "Outcome"
            },
            {
                type: "text",
                content: "The platform was deployed and accepted as our capstone project, and it was positively reviewed by both the capstone project reviewer and the main reviewer."
            },
            {
                type: "heading",
                content: "Demo"
            },
            {
                type: "list",
                content: [
                    "Name: datly",
                    "Password: 123456"
                ]
            }
        ]
    },

    "expense-tracker": {
        title: "Expense Tracker: Personal Finance Management",
        date: "April 2025 - June 2025",
        sections: [
            {
                type: "text",
                content: "A full-stack application for tracking personal expenses and managing budgets. Users can record, classify, and analyze their spending with clear visualizations and insights to support more effective budgeting. Built as a team course project."
            },
            {
                type: "image",
                content: "/projects/expensetracker.png",
                caption: "Expense Tracker Dashboard"
            },
            {
                type: "heading",
                content: "The Problem"
            },
            {
                type: "text",
                content: "Personal spending is easy to lose track of when it's scattered across receipts and banking apps. We built one place to record expenses, classify them by category, and see spending patterns at a glance - so budgeting decisions come from actual data instead of guesswork."
            },
            {
                type: "heading",
                content: "My Role"
            },
            {
                type: "text",
                content: "A team project, and like my other group work I worked across the stack - building the React frontend and the Node/Express + MongoDB API behind it."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Frontend: React with modern hooks and context",
                    "Backend: Node.js with Express.js",
                    "Database: MongoDB",
                    "API: RESTful endpoints for transactions and categories"
                ]
            },
            {
                type: "heading",
                content: "The Hardest Part"
            },
            {
                type: "text",
                content: "This was the first project I built as part of a team, so the hardest part wasn't the code - it was the collaboration. Coordinating work across several people, and especially learning Git properly: branching, merging, and resolving conflicts without overwriting each other's work. It's where Git went from a personal save button to a real team workflow for me."
            },
            {
                type: "heading",
                content: "Outcome"
            },
            {
                type: "text",
                content: "The application was deployed and is fully usable end to end - you can record, categorize, and review expenses in a live build."
            },
            {
                type: "heading",
                content: "Demo"
            },
            {
                type: "list",
                content: [
                    "Email: a@gmail.com",
                    "Password: 123"
                ]
            }
        ]
    },

    "discord-bot": {
        title: "Galaxy Universe Discord Bot: Multi-System Community Bot",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A multi-system Discord bot built entirely solo for a Vietnamese gaming community. It bundles ten interconnected systems into a single cosmic, space-themed experience with Vietnamese-language responses, and now runs in a community server of over 5,000 members. (Personal project - designed, built, and hosted by me.)"
            },
            // 📌 IMAGE: add a screenshot at public/projects/discordBot.png to show it in the hero and add an image section here.
            {
                type: "heading",
                content: "The Problem"
            },
            {
                type: "text",
                content: "Most Discord communities stitch together half a dozen separate bots - one for economy, one for moderation, one for tickets - each with its own setup, downtime, and clashing style. I wanted a single bot that covered what a community actually needs, in one consistent space-themed voice and in Vietnamese, so admins wouldn't have to juggle several tools."
            },
            {
                type: "heading",
                content: "My Role"
            },
            {
                type: "text",
                content: "I built this one entirely on my own - the architecture, all ten systems, the database design, and the hosting. There were no other contributors, so every part of it (and every bug) was mine to own end to end."
            },
            {
                type: "heading",
                content: "Systems"
            },
            {
                type: "list",
                content: [
                    "Economy and currency",
                    "Games and mini-activities",
                    "Moderation tools",
                    "Ticket / support system",
                    "Leveling and ranking",
                    "...and five more systems (ten in total)"
                ]
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Language: TypeScript",
                    "Library: discord.js v14",
                    "Storage: SQLite via better-sqlite3",
                    "Hosting: self-hosted on an Onidel VPS, running the bot 24/7"
                ]
            },
            {
                type: "heading",
                content: "The Hardest Part"
            },
            {
                type: "text",
                content: "The toughest part wasn't writing commands - it was getting the bot to run as a reliable, always-on service. I self-host it on an Onidel VPS, so I set up the Linux server myself and had to keep the bot online 24/7 - surviving crashes, restarts, and the server itself rebooting - instead of just running a script on my laptop. A community bot has to behave like a small backend service you actually operate."
            },
            {
                type: "heading",
                content: "Outcome"
            },
            {
                type: "text",
                content: "The bot is deployed and in active daily use in a friend's community server of over 5,000 members - a real production environment, and a much larger audience than most student projects ever reach."
            }
        ]
    },

    "region-research": {
        title: "Multi-task Detection of Regional Discrimination on Vietnamese Social Media",
        date: "2026 (in progress)",
        sections: [
            {
                type: "text",
                content: "A research project developing an adversarially robust, multi-task machine learning system for detecting regional discrimination in Vietnamese social media text, designed to be delivered as a deployable REST API that other applications and sites can call for content moderation. The work is aligned with the content-moderation requirements of Vietnam's Decree 147/2024."
            },
            // 📌 IMAGE: add a figure/screenshot at public/projects/regionResearch.png to show it in the hero and add an image section here.
            {
                type: "heading",
                content: "My Role"
            },
            {
                type: "text",
                content: "I carried out this research under the academic supervision of my professor - from framing the problem and assembling the data through building, fine-tuning, running, and evaluating the model. The research direction and the hands-on ML work are my own; my professor provided guidance and oversight."
            },
            {
                type: "heading",
                content: "Problem & Motivation"
            },
            {
                type: "text",
                content: "Regional discrimination (\"phân biệt vùng miền\") is a recognized social problem in Vietnam, appearing daily as slurs, province-level stereotyping, and Telex-obfuscated variants. English-trained moderation tools fail on Vietnamese, and existing Vietnamese hate-speech tools target generic hate rather than regional discrimination specifically. The academic literature contains very little prior work on this exact task."
            },
            {
                type: "heading",
                content: "Research Goals"
            },
            {
                type: "list",
                content: [
                    "Robustness to character-level obfuscation (Telex, tone removal, letter substitution, leetspeak)",
                    "Span- and target-level outputs beyond a single sentence label",
                    "Interpretable predictions for moderator review"
                ]
            },
            {
                type: "heading",
                content: "Methodology"
            },
            {
                type: "list",
                content: [
                    "Base dataset: ViRDC (~17,000 labeled comments)",
                    "Programmatically generated adversarial test set of obfuscated variants",
                    "Transformer backbone (ViSoBERT / PhoBERT) with a character-level CNN branch and multi-task heads"
                ]
            },
            {
                type: "heading",
                content: "The Hardest Part"
            },
            {
                type: "text",
                content: "Two things were hardest: the data and the tuning. Vietnamese regional-discrimination data is scarce, so assembling and cleaning a usable labeled set - and generating obfuscated adversarial variants on top of it - took real effort. The second was fine-tuning the transformer to learn this specific task reliably, rather than collapsing into generic hate-speech detection, which meant a lot of iteration on the training setup."
            },
            {
                type: "heading",
                content: "Results"
            },
            {
                type: "text",
                content: "After fine-tuning, the model classifies the dataset with over 90% accuracy - a strong result for a low-resource, domain-specific Vietnamese NLP task that has very little prior work to build on."
            },
            {
                type: "heading",
                content: "Planned Deployment"
            },
            {
                type: "list",
                content: [
                    "FastAPI REST service: POST /classify returns label, target, confidence, and spans",
                    "Demo dashboard visualizing live classifications",
                    "Optional Chrome extension flagging discriminatory phrasing on job-search platforms"
                ]
            }
        ]
    },
    "shorekeeper-startup": {
        title: "Shorekeeper Startup Voice: A Windows Login Sound Player",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A fun personal project: a tiny, no-window Windows program that plays a short game voice line every time you log in, paired with a pipeline that extracts and cleans those clips from game audio banks. It started with Square Enix SAB banks and now also pulls from Wwise (.bnk / .wem) - the audio middleware behind a huge range of games. Any short .wav works, so the voice is fully swappable."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "I wanted my PC to greet me with a specific character voice line on login, but I couldn't find usable audio without recording it in-game by hand. So I built a tool to pull the lines straight from the game's own audio banks - for my own use, and for anyone who wants the same. The player also had to run completely silently in the background, with no console window flashing on screen."
            },
            {
                type: "heading",
                content: "How It Works"
            },
            {
                type: "text",
                content: "The repo is organized so each audio format is self-contained, with its own extractor, player, and docs. The extraction pipeline runs in four steps:"
            },
            {
                type: "list",
                content: [
                    "Identify: detect the container - SAB banks (magic 'sabf'), or Wwise .bnk banks and .wem streams",
                    "Decode: vgmstream reads the container and auto-detects the codec (CRI HCA for SAB; Vorbis / Opus / ADPCM / PCM for Wwise), expanding the many subsongs a bank holds",
                    "Filter: keep only streams above a length threshold, skipping tiny grunts and blips",
                    "Curate: keep the fullest takes, loudness-normalize, and add a short fade-out with ffmpeg"
                ]
            },
            {
                type: "heading",
                content: "The Player"
            },
            {
                type: "text",
                content: "The player is format-agnostic - it just plays the final .wav and doesn't care where the audio came from. It uses the Windows MCI engine, so it handles any WAV variant plus mp3, and ships as C++, VBScript, and PowerShell builds so it runs on almost any setup. A Task Scheduler 'At log on' trigger fires it at login, with no console window on screen."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Players: C++ (Win32, MCI via winmm), plus VBScript and PowerShell variants",
                    "Audio pipeline: Bash, vgmstream, ffmpeg",
                    "Supported banks: Wwise (.bnk / .wem) and Square Enix SAB (CRI HCA)",
                    "Autostart: Windows Task Scheduler"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "Adding Wwise was the big step - it's one of the most widely used game audio middlewares, so the tool now works with a large swath of games rather than just Square Enix titles. The interesting engineering is in the decoding (handling proprietary and middleware audio formats and their many subsongs through vgmstream) and in keeping the player genuinely windowless. I also kept it copyright-conscious: the repo ships only the tooling, never any game audio - that stays the rights holders' property, and you bring your own files."
            }
        ]
    },
    "somnium-weaver": {
        title: "Somnium Weaver: A Living Desktop Overlay in C#",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A living desktop overlay for Windows that turns your machine's own vitals into drifting light. CPU, RAM, and network load become cyan 'motes' that breathe across the screen, and sharp CPU spikes or dips bloom into gold-and-pink butterfly bursts. It's transparent, click-through, runs fully local with no telemetry, and was inspired by the Shorekeeper from Wuthering Waves."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "I wanted an ambient desktop companion that actually reflects what my PC is doing, instead of a static wallpaper. The overlay sits on top of everything, stays click-through so it never gets in the way, and reacts in real time - the busier the machine, the busier the particles. Everything runs offline and free; it phones nowhere."
            },
            {
                type: "heading",
                content: "How It Works"
            },
            {
                type: "text",
                content: "Live system metrics drive the particle field:"
            },
            {
                type: "list",
                content: [
                    "CPU load sets how fast motes are emitted and how brightly they glow",
                    "RAM pressure changes their drift speed",
                    "Network throughput feeds an optional on-screen HUD",
                    "A CPU spike above 80% or a dip below 15% triggers a butterfly burst - a swarm of gold and pink motes that spirals out for about two seconds"
                ]
            },
            {
                type: "heading",
                content: "Audio-Reactive Mode"
            },
            {
                type: "text",
                content: "An opt-in mode makes the motes dance to whatever the system is playing. It captures desktop audio through WASAPI loopback (no microphone), runs a 1024-point FFT, and splits the spectrum into bass, mid, and treble plus overall loudness, each with adaptive gain. Bass swells push the particles, loudness speeds them up, treble brightens them, and a beat detector - comparing bass energy against a rolling average - fires butterfly bursts on the beat."
            },
            {
                type: "heading",
                content: "The Hardest Part"
            },
            {
                type: "text",
                content: "Keeping it smooth. A particle overlay can allocate garbage every frame and stutter, so I pooled particles with a free-list (no per-frame allocations), reused paint objects, and capped the render loop off the compositor clock with a hard ceiling of 5000 particles. Per-pixel window transparency was its own constraint: the GPU-accelerated Skia element can't do it, so the overlay renders on the CPU raster surface on purpose to keep the see-through, click-through window."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Framework: WPF on .NET 8, C#",
                    "Rendering: SkiaSharp (SKElement, CPU raster for per-pixel transparency)",
                    "Audio: WASAPI loopback capture, 1024-point FFT, band splitting and beat detection",
                    "Overlay: transparent, click-through, always-on-top window with global hotkeys",
                    "Persistence: settings saved to %AppData% as JSON, with Low / Medium / High quality presets",
                    "CI/CD: GitHub Actions builds a self-contained single-file win-x64 release on version tags"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "The satisfying part is that the whole scene is procedural - no game assets are shipped, just light generated from math and the machine's own state. The performance work (pooling, paint reuse, an FPS-capped raster loop) keeps a 5000-particle field fluid, and the audio path taught me real-time DSP: loopback capture, FFT band analysis, adaptive gain, and beat detection. Global hotkeys start and stop the weave, toggle the HUD and audio mode, and fire a manual burst."
            }
        ]
    },
    "rainmeter-waifu-desktop": {
        title: "Rainmeter Waifu Desktop: A Windows Desktop Widget Suite",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "A small suite of Rainmeter widgets that give Windows the clean 'ricing' look usually associated with Linux desktops - a character cutout plus live weather, a clock, a month calendar, and CPU temperature. Four lightweight skins you can read top to bottom, with a live browser demo of the clock, calendar, and weather."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "Desktop customization ('ricing') is big on Linux but fiddly on Windows. I wanted a tidy, low-footprint set of widgets that looked intentional rather than cluttered, and that anyone could drop in, point at their own city and character art, and use."
            },
            {
                type: "heading",
                content: "Keyless Live Weather"
            },
            {
                type: "text",
                content: "The weather widget needs no account, no API key, and sends no telemetry. It makes a single HTTP GET to Open-Meteo, asking for the fields in a fixed order so one regex can pull each value out by position. The numeric weather code then runs through a small Lua table that turns it into readable words like 'Partly cloudy'."
            },
            {
                type: "heading",
                content: "What's Inside"
            },
            {
                type: "list",
                content: [
                    "Waifu: the character cutout (load several to rotate)",
                    "Weather: live Open-Meteo data, no key",
                    "Clock: time and date",
                    "Calendar: a month grid with today highlighted, in pure Lua",
                    "CpuTemp: the hottest core via the Core Temp plugin",
                    "@Resources: a single Variables.inc plus Lua helpers and images - the one place you edit location, units, fonts, colors, and art"
                ]
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Rainmeter (Windows desktop skins)",
                    "Lua for the calendar logic and weather-code mapping",
                    "WebParser + regex for the Open-Meteo request",
                    "Core Temp plugin for CPU temperature"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "It's deliberately light - around 30 MB on disk, tens of MB of RAM, and roughly 0% CPU at idle. Everything configurable lives in one Variables.inc, so swapping your city and character art makes it yours without touching the skin logic. Like my other tools, it's MIT-licensed and ships no copyrighted art - you bring your own."
            }
        ]
    },
    "code-navigator": {
        title: "Code Navigator: Ask Your Codebase, Locally",
        date: "2025",
        sections: [
            {
                type: "text",
                content: "Code Navigator is a local tool that lets you ask a codebase questions in plain language and get grounded answers with exact file:line citations. Instead of grepping around an unfamiliar repo, you ask 'where is auth handled?' and it retrieves the right code, reasons over it with Claude, and points you at the lines. Everything indexes and runs on your own machine."
            },
            {
                type: "heading",
                content: "The Idea"
            },
            {
                type: "text",
                content: "Jumping into a large or unfamiliar codebase is slow - you don't know the vocabulary yet, so keyword search misses things and semantic search alone drifts. I wanted a retrieval system that combines both, understands code structure instead of treating files as flat text, and always cites its sources so answers are verifiable rather than hallucinated."
            },
            {
                type: "heading",
                content: "Hybrid Retrieval"
            },
            {
                type: "text",
                content: "Retrieval runs two searches in parallel and fuses them. A dense pass embeds the query with an ONNX embedding model and finds semantically similar chunks; a sparse pass uses BM25 for exact keyword and identifier matches. Their rankings are merged with Reciprocal Rank Fusion (RRF), then a cross-encoder re-ranks the shortlist by scoring each candidate against the query directly. Dense catches meaning, sparse catches exact symbol names, and the re-ranker sharpens the final order."
            },
            {
                type: "heading",
                content: "Understanding Code Structure"
            },
            {
                type: "text",
                content: "Chunking is structure-aware. Rather than splitting on line counts, tree-sitter parses each file into a syntax tree and chunks along real boundaries - functions, classes, methods - across nine languages (Python, JavaScript, TypeScript, TSX, Rust, Java, C#, C++, and Go). On top of that it builds a call graph of definitions, callers, and callees, so you can trace who calls what without reading every file."
            },
            {
                type: "heading",
                content: "Staying Fast and Honest"
            },
            {
                type: "text",
                content: "Indexing is incremental: only changed files get re-parsed and re-embedded, so re-indexing after edits is cheap. To keep retrieval quality measurable instead of vibes-based, there's an eval harness that scores the pipeline against a set of question and answer expectations, so I can tell whether a change to chunking, fusion, or re-ranking actually helped."
            },
            {
                type: "heading",
                content: "Interfaces"
            },
            {
                type: "text",
                content: "It ships two front ends over the same engine: a CLI for quick queries and scripting, and a Tauri desktop app for a GUI. Answers are generated by Claude but always grounded in the retrieved chunks and returned with file:line citations, so nothing is taken on faith."
            },
            {
                type: "heading",
                content: "Technical Stack"
            },
            {
                type: "list",
                content: [
                    "Language: Python for the indexing and retrieval engine",
                    "Embeddings: an ONNX embedding model (fastembed) for dense retrieval",
                    "Keyword search: BM25, fused with the dense results via Reciprocal Rank Fusion",
                    "Re-ranking: a cross-encoder over the fused shortlist",
                    "Parsing: tree-sitter, structure-aware chunking across 9 languages, plus a call graph",
                    "Storage: a SQLite index with incremental updates",
                    "Answers: Claude (Anthropic API), grounded with file:line citations",
                    "Interfaces: a CLI and a Tauri desktop app",
                    "Quality: an eval harness for retrieval"
                ]
            },
            {
                type: "heading",
                content: "Highlights"
            },
            {
                type: "text",
                content: "The part I'm proudest of is the retrieval design: fusing dense and sparse search with RRF and a cross-encoder gives noticeably better hits than either alone, and structure-aware chunking means a 'chunk' is an actual function or class rather than an arbitrary window. The eval harness keeps all of that honest, and because indexing is incremental and everything runs locally, it stays fast and private."
            }
        ]
    }
};