// Dev-log / blog content. Same section shape as ProjectBlogs so the renderer
// logic is identical. Posts are keyed by slug and rendered at /blog/:slug.
// Insertion order = display order (newest first).
//
// NOTE: `date` values are placeholders - set them to the real publish dates.

export type BlogSection =
  | { type: "heading" | "text"; content: string }
  | { type: "list"; content: string[] }
  | { type: "image"; content: string; caption?: string };

export type BlogPostContent = {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
};

export const blogPosts: Record<string, BlogPostContent> = {
  "modeling-a-fake-stores-history-the-state-machine-behind-eco-faker": {
    title: "Modeling a Fake Store's History: The State Machine Behind eco-faker",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Most fake-data generators hand you a pile of unrelated JSON. eco-faker builds a whole store's history instead - every cart, order, and return traces back to one underlying state machine.",
    tags: ["TypeScript", "Node.js", "Testing"],
    sections: [
      {
        type: "text",
        content:
          "Most fake-data tools are glorified random-string generators: call a function, get a plausible-looking name or address, done. That's fine until you need a whole dataset that behaves like a real system - where an order's total actually equals its line items, a return only exists for something that was actually delivered, and a shipment's tracking events happen in the right order. eco-faker is my answer to that: a stateful, relationally-consistent fake-data generator for e-commerce, where every table is derived from the same underlying state machine instead of being faked independently.",
      },
      { type: "heading", content: "The problem with independent randomness" },
      {
        type: "text",
        content:
          "If you generate users, carts, orders, shipments, and returns as five separate random processes, you get five tables that don't agree with each other - orders referencing carts that don't exist, delivered shipments with no matching order, returns on orders that were never delivered. That's obviously wrong, but it's also the default outcome of most naive generators, because nothing enforces the relationships between tables after the fact.",
      },
      { type: "heading", content: "One pipeline: users to carts to orders to shipments to returns" },
      {
        type: "text",
        content:
          "eco-faker's generator instead runs a single pipeline. A user gets one or more carts. Each cart either gets abandoned or converts into an order, and never both. A converted order becomes a shipment, which moves through a realistic sequence of tracking stages. Only an order whose shipment actually reached delivered is eligible to spawn a return request. Every downstream record is built from the upstream one, so a shipment's line items are always the same line items its originating cart had, and a return can never exist in isolation.",
      },
      { type: "heading", content: "Keeping the money honest" },
      {
        type: "text",
        content:
          "A subtler failure mode is financial: subtotal, tax, shipping, and total drifting out of sync through floating-point rounding. eco-faker computes the subtotal as the exact sum of already-rounded line totals, rounds tax and shipping independently, and sums those into the total - so the invariant subtotal + tax + shipping = total holds by construction, even when an anomaly like a remote-shipping surcharge adjusts the numbers afterward.",
      },
      { type: "heading", content: "Determinism as a feature, not an afterthought" },
      {
        type: "text",
        content:
          "Everything runs through a single seeded PRNG, so the same seed and the same reference timestamp always produce a byte-identical dataset. That determinism is what makes a 'snapshot' cheap: instead of storing a whole generated dataset for a bug report, I can store just the seed, the config overrides, and the reference time, then replay it later to reproduce the exact same data. A few lines of JSON standing in for a multi-megabyte fixture.",
      },
      { type: "heading", content: "What the test suite actually guards" },
      {
        type: "list",
        content: [
          "Relational integrity - no orphaned carts, orders, shipments, or returns",
          "Timeline realism - tracking events strictly increase and follow a valid stage order",
          "Financial exactness - totals always reconcile, anomalies included",
          "Determinism - same seed and reference time reproduce the same dataset byte-for-byte",
          "Return eligibility - a return can only exist for a fully delivered order",
        ],
      },
      { type: "heading", content: "A bug the tests caught: false-positive schema drift" },
      {
        type: "text",
        content:
          "The dataset-diff command compares two runs and flags schema drift - fields added or removed between them. Early on it had a real bug: if a table happened to sample zero rows in one of the two runs, the empty array looked like a missing field and got flagged as drift, even though nothing had actually changed. The fix was to only compare field sets when both sides had at least one sampled row for that table. There's now a regression test locking that in, alongside a similar one for a bug where explicit CLI flags could silently clobber a scenario preset's nested anomaly config instead of merging with it.",
      },
      { type: "heading", content: "The takeaway" },
      {
        type: "text",
        content:
          "Fake data is only as useful as the guarantees it holds. The moment you need it to look like a real system's history - not just realistic-looking fields, but consistent relationships, honest math, and reproducible runs - randomness alone isn't enough. Routing everything through one state machine, one PRNG, and one set of invariants is what lets the rest of the tool (scenarios, anomalies, the mock API, the webhook replay) build on top of data it can actually trust.",
      },
    ],
  },

  "testing-a-genetic-algorithm-with-a-brute-force-oracle": {
    title: "Testing a Genetic Algorithm with a Brute-Force Oracle",
    date: "Feb 2026",
    readTime: "6 min read",
    excerpt:
      "How do you trust a probabilistic optimizer? For Tethys, I paired the genetic algorithm with a slow exhaustive solver and used it as a live test oracle.",
    tags: ["Rust", "Algorithms", "Testing"],
    sections: [
      {
        type: "text",
        content:
          "When you write a heuristic optimizer, the scary question is always the same: how do you know it's actually finding good answers? For Tethys - my Rust echo optimizer for Wuthering Waves - the core is a genetic algorithm, and genetic algorithms are probabilistic by nature. They can get stuck in local optima and you'd never know from the output alone. Here's the trick I used to keep mine honest.",
      },
      { type: "heading", content: "The problem" },
      {
        type: "text",
        content:
          "Echo optimization is a combinatorics problem: five slots, a fixed cost layout, and a large inventory of echoes with random substats. A genetic algorithm explores that space by evolving a population of candidate builds - selection, crossover, mutation - and keeping the fittest. It's fast and it scales, but it gives you no guarantee that the build it returns is the best one. For a tool people rely on to spend in-game resources, 'probably good' isn't good enough.",
      },
      { type: "heading", content: "The idea: a second solver that can't be wrong" },
      {
        type: "text",
        content:
          "Alongside the genetic algorithm, I wrote an exhaustive solver. It brute-forces every valid combination of echoes and returns the provable optimum. It's too slow for a big inventory in production, but it has one property the genetic algorithm lacks: for a given input, its answer is definitionally correct. That makes it perfect as a test oracle.",
      },
      { type: "heading", content: "The test" },
      {
        type: "text",
        content:
          "The test generates a small inventory, runs both solvers on it, and asserts that the genetic algorithm's score reaches the brute-forced optimum within a tiny tolerance (about 1e-4). If the genetic algorithm ever regresses - a bad mutation rate, a broken crossover, an off-by-one in the fitness function - the score drops below the known optimum and the test fails loudly. I'm not testing that the output matches a hard-coded expected value; I'm testing that a fast heuristic agrees with a slow proof.",
      },
      { type: "heading", content: "Why this works so well" },
      {
        type: "list",
        content: [
          "The oracle is trivially correct, so I trust the assertion without second-guessing it",
          "It catches silent quality regressions, not just crashes - the kind of bug that would otherwise ship unnoticed",
          "It documents intent: the test says, in code, that the GA is supposed to find the optimum on small inputs",
          "Small inputs keep the brute force fast, so the test runs in milliseconds in CI",
        ],
      },
      { type: "heading", content: "Keeping it decoupled" },
      {
        type: "text",
        content:
          "Both solvers sit behind one interface, and scoring lives behind an Evaluator trait. That means I can swap in a richer scoring model later - a full damage formula instead of the current weighted-substat value - and the same oracle test still guards the optimizer. The pure core has no I/O and no platform code, so all of this runs on any OS without a screen, a GPU, or the game installed.",
      },
      { type: "heading", content: "The takeaway" },
      {
        type: "text",
        content:
          "If you have a fast, approximate solution and a slow, exact one, don't throw the slow one away. Keep it as a test oracle. A brute-force checker you'd never ship can be the thing that lets you trust the clever code you do ship.",
      },
    ],
  },

  "turning-sound-into-particles-real-time-audio-dsp": {
    title: "Turning Sound into Particles: Real-Time Audio DSP in C#",
    date: "Jan 2026",
    readTime: "6 min read",
    excerpt:
      "Somnium Weaver makes desktop particles dance to your system audio. Here's the small real-time DSP pipeline behind it: WASAPI loopback, an FFT, and beat detection.",
    tags: ["C#", "Audio DSP", "FFT"],
    sections: [
      {
        type: "text",
        content:
          "Somnium Weaver is a desktop overlay that turns your PC into drifting light. One of its modes makes those particles react to whatever your system is playing - bass pushes them, treble brightens them, and beats fire off bursts of butterflies. Getting from 'system audio' to 'particles that dance on the beat' meant building a small real-time DSP pipeline in C#. Here's how it works.",
      },
      { type: "heading", content: "Capturing sound without a microphone" },
      {
        type: "text",
        content:
          "The first problem: I don't want the microphone, I want whatever the computer is already playing. Windows exposes this through WASAPI loopback capture - it hands you the audio being sent to your speakers, as a stream of samples, no mic involved. That's the input to everything else.",
      },
      { type: "heading", content: "From samples to frequencies" },
      {
        type: "text",
        content:
          "Raw audio samples tell you amplitude over time, but 'is there a lot of bass right now?' is a question about frequency, not time. To answer it I run a 1024-point FFT (Fast Fourier Transform) over each chunk of samples, which converts the waveform into a spectrum - how much energy sits at each frequency. Then I collapse that spectrum into a few bands I actually care about: bass, mid, treble, and overall loudness.",
      },
      { type: "heading", content: "Adaptive gain" },
      {
        type: "text",
        content:
          "Music is wildly inconsistent in level - a quiet ambient track and a loud mix shouldn't produce completely different visuals. So each band has its own adaptive gain: it tracks a running sense of how loud that band usually is and normalizes against it. The effect is that the particles respond to relative changes - a bass swell in a quiet song still registers - instead of only ever reacting to loud music.",
      },
      { type: "heading", content: "Detecting the beat" },
      {
        type: "text",
        content:
          "A beat is a sudden spike of energy, usually in the bass. To catch it, I compare the current bass energy against a rolling average of recent bass energy. When the current value jumps well above that average, that's a beat, and it triggers a butterfly burst - a swarm of gold and pink motes that spirals out for a couple of seconds. Using a rolling average instead of a fixed threshold means it adapts to the song rather than firing constantly during loud sections.",
      },
      { type: "heading", content: "Mapping sound to motion" },
      {
        type: "list",
        content: [
          "Bass energy pushes the particles outward",
          "Overall loudness speeds them up",
          "Treble brightens them",
          "Detected beats spawn butterfly bursts",
        ],
      },
      { type: "heading", content: "Keeping it real-time" },
      {
        type: "text",
        content:
          "All of this has to happen every frame without stuttering the overlay. The render side reuses a pooled set of particles and paint objects so the audio path and the draw loop aren't allocating garbage on every update. The DSP itself is cheap - a 1024-point FFT and a handful of band calculations - so the expensive part was never the math; it was making sure the visuals stayed smooth while it ran.",
      },
      { type: "heading", content: "What I learned" },
      {
        type: "text",
        content:
          "I came in knowing the theory of an FFT and came out understanding the practical side: windowing, picking a sensible band split, and why adaptive gain matters more than raw accuracy for something that just needs to feel right. Real-time audio is forgiving in one sense - nobody checks your numbers - and unforgiving in another - any hitch is immediately visible.",
      },
    ],
  },

  "reading-a-game-screen-content-rect-math-for-ocr": {
    title: "Reading a Game Screen: Content-Rect Math for OCR",
    date: "Dec 2025",
    readTime: "5 min read",
    excerpt:
      "Tethys reads echoes off the screen with OCR. The hard part isn't the OCR - it's finding the right regions when every player's window is a different size and shape.",
    tags: ["Rust", "OCR", "Computer Vision"],
    sections: [
      {
        type: "text",
        content:
          "Tethys reads your Wuthering Waves echoes straight off the screen - it captures the game window, finds the right regions, and runs OCR on them. The tricky part isn't the OCR. It's knowing where on the screen to look when every player's window is a different size and shape. Here's the geometry that makes it robust.",
      },
      { type: "heading", content: "The problem with pixel coordinates" },
      {
        type: "text",
        content:
          "The naive approach is to hard-code pixel positions: 'the echo cost is at x=1520, y=340.' That breaks the moment someone runs a different resolution, a windowed size, or an ultrawide monitor. I needed regions that hold up across every setup, which means never trusting absolute pixels.",
      },
      { type: "heading", content: "Find the content, not the window" },
      {
        type: "text",
        content:
          "Games render at a fixed aspect ratio - 16:9 - but a window often isn't exactly 16:9. On an ultrawide monitor you get pillarbox bars on the sides; on a 16:10 window you get letterbox bars top and bottom. The actual game image is a 16:9 rectangle centered inside the window, and those black bars are not part of it. So the first step is to compute that true 16:9 content rectangle: take the window dimensions, work out whether width or height is the limiting side, and derive the centered 16:9 area, discarding the bars.",
      },
      { type: "heading", content: "Fractions, not pixels" },
      {
        type: "text",
        content:
          "Once I have the content rectangle, every UI region is defined as a fraction of it - 'the cost readout sits at 80% across and 22% down,' not a pixel value. To turn a region into something OCR can read, I map those fractions back onto the real captured pixels. Because the fractions are relative to the content area, the same definitions work at 1080p, 1440p, ultrawide, and 16:10 without change.",
      },
      { type: "heading", content: "Proving it with tests" },
      {
        type: "text",
        content:
          "This math is pure - it takes window dimensions in and gives rectangles out, with no screen capture involved - so it's easy to unit-test. I test it against exact 16:9, an ultrawide case, and a 16:10 case, asserting the content rectangle and the mapped regions land where they should. Keeping the geometry separate from the capture and OCR code means I can trust the hard part without needing the game running.",
      },
      { type: "heading", content: "A calibration escape hatch" },
      {
        type: "text",
        content:
          "Detection math is only as good as its assumptions, so there's a calibrate command that draws colored boxes over the regions it thinks it found. You run it, glance at the overlay, and confirm everything lines up before trusting a scan. For batch scanning a full inventory, a grid layout tiles the individual echo slots as fractions of the same content area.",
      },
      { type: "heading", content: "The principle" },
      {
        type: "text",
        content:
          "The lesson generalizes past games: when you're reading pixels off someone else's UI, anchor everything to a coordinate system you compute from the content itself, express positions as fractions, and keep that math pure so you can test it. Absolute pixels are a trap; relative geometry is what survives contact with real monitors.",
      },
    ],
  },
};

// Ordered list for the Writing section and any listings.
export const blogList = Object.keys(blogPosts).map((slug) => ({
  slug,
  ...blogPosts[slug],
}));