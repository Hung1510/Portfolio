import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

// ─────────────────────────────────────────────────────────────────────────────
// PER-PAGE SOCIAL PREVIEWS (build-time)
//
// The site is an SPA: every route is served index.html and Helmet sets the real
// <title>/og:* tags in the browser. Link-preview crawlers (Discord, LinkedIn,
// Facebook, X, Zalo...) don't run JavaScript, so every shared link used to show
// the generic home-page card.
//
// After `vite build`, this plugin writes a copy of dist/index.html for every
// project and blog route (dist/projects/<slug>/index.html, dist/blog/<slug>/
// index.html) with that page's title, description, image and URL baked into
// the meta tags. Vercel serves real files before applying the SPA rewrite in
// vercel.json, so crawlers get the right card and browsers still boot the app.
//
// The data is read from the same modules the app renders from (ProjectsSection,
// BlogPosts), so adding a project or post needs no change here.
// ─────────────────────────────────────────────────────────────────────────────

const DESC_MAX = 280;

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clip = (s) => {
  const t = String(s).replace(/\s+/g, " ").trim();
  if (t.length <= DESC_MAX) return t;
  const cut = t.slice(0, DESC_MAX);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-]+$/, "") + "...";
};

/** Replace one attribute value; warns (never throws) if the tag is missing. */
function setAttr(html, selector, attr, value, page) {
  // e.g. selector = 'property="og:title"' -> <meta ... property="og:title" ... content="...">
  const re = new RegExp(
    `(<(?:meta|link)\\b[^>]*?${selector}[^>]*?\\s${attr}=")[^"]*(")`,
  );
  if (!re.test(html)) {
    console.warn(`[og-pages] ${page}: no tag with ${selector} in index.html`);
    return html;
  }
  return html.replace(re, `$1${esc(value)}$2`);
}

function render(template, page) {
  const { url, title, description, image, type } = page;
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(title)}</title>`,
  );
  const set = (sel, attr, v) => (html = setAttr(html, sel, attr, v, url));
  set('name="title"', "content", title);
  set('name="description"', "content", description);
  set('rel="canonical"', "href", url);
  set('property="og:type"', "content", type);
  set('property="og:url"', "content", url);
  set('property="og:title"', "content", title);
  set('property="og:description"', "content", description);
  set('property="og:image"', "content", image);
  set('name="twitter:url"', "content", url);
  set('name="twitter:title"', "content", title);
  set('name="twitter:description"', "content", description);
  set('name="twitter:image"', "content", image);
  return html;
}

export function ogPages({ siteUrl, defaultImage }) {
  let root;
  let outDir;
  const abs = (p) => (/^https?:\/\//.test(p) ? p : siteUrl + (p.startsWith("/") ? p : "/" + p));

  return {
    name: "og-pages",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return; // build failed earlier
      const template = fs.readFileSync(indexPath, "utf8");

      // lang() reads localStorage; previews are generated in English.
      Object.defineProperty(globalThis, "localStorage", {
        value: { getItem: () => "en", setItem() {}, removeItem() {} },
        configurable: true,
        writable: true,
      });

      const server = await createServer({
        root,
        configFile: false,
        logLevel: "error",
        appType: "custom",
        server: { middlewareMode: true, hmr: false },
        resolve: { alias: { "@": path.resolve(root, "src") } },
        esbuild: { jsx: "automatic" },
        optimizeDeps: { noDiscovery: true, include: [] },
      });

      const pages = [];
      try {
        const { projects, flagshipProjects } = await server.ssrLoadModule(
          "/src/components/ProjectsSection.tsx",
        );
        const { blogPosts } = await server.ssrLoadModule("/src/pages/BlogPosts.ts");

        for (const p of [...flagshipProjects, ...projects]) {
          if (!p.slug) continue;
          pages.push({
            route: `projects/${p.slug}`,
            url: `${siteUrl}/projects/${p.slug}`,
            title: `${p.title} | Gia Hung Pham`,
            description: clip(p.description),
            image: abs(p.ogImage || p.image || defaultImage),
            type: "website",
          });
        }
        for (const [slug, post] of Object.entries(blogPosts)) {
          pages.push({
            route: `blog/${slug}`,
            url: `${siteUrl}/blog/${slug}`,
            title: `${post.title} | Gia Hung Pham`,
            description: clip(post.excerpt),
            image: abs(defaultImage),
            type: "article",
          });
        }
      } finally {
        await server.close();
      }

      for (const page of pages) {
        const dir = path.join(outDir, page.route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), render(template, page));
      }
      console.log(`[og-pages] wrote ${pages.length} pages with per-page social tags`);
    },
  };
}
