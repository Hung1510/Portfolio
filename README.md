# Developer Portfolio

A bilingual (English / Vietnamese), themeable developer portfolio with animated cosmic backgrounds, built with React, TypeScript, and Vite.

🔗 **Live:** [giahung-portfolio.vercel.app](https://giahung-portfolio.vercel.app)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

<img width="1261" height="750" alt="preview" src="https://github.com/user-attachments/assets/917878a6-b627-4280-a902-e8fdc05975fc" />


## About


A personal portfolio site showcasing projects, skills, and experience. It supports two languages, light and dark themes, and per-project detail pages written as short case studies. The codebase is fully typed and the project routing is data-driven, so adding a new project is a localized change rather than a rewrite.

## Features

- **Bilingual (EN / VI)** - every UI string runs through a `lang()` helper; language choice persists in `localStorage`.
- **Light / dark theme** - toggle with persisted preference, each mode with its own animated background (drifting clouds in light mode, stars and meteors in dark mode).
- **Project case studies** - each project has its own detail page (problem, role, stack, hardest part, outcome).
- **Data-driven routing** - routes are generated from a single `projects` array; no per-project route wiring.
- **Responsive** across mobile, tablet, and desktop.
- **SEO + social previews** - Open Graph and Twitter Card meta tags.
- **Accessibility** - keyboard focus rings, `prefers-reduced-motion` support, labelled controls.
- **Contact form** - sends email via the Resend API.

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 18, React Router 6 |
| Language | TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| UI primitives | Radix UI (toast), `class-variance-authority`, `clsx`, `tailwind-merge` |
| Email | Resend |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Hung1510/Portfolio.git
cd Portfolio
npm install
```

### Environment variables

The contact form uses Resend. Create a `.env` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key_here
RESEND_SENDER=onboarding@resend.dev
```

> `.env` is gitignored - never commit real keys. Set these in your Vercel project's environment variables for production.

### Development

```bash
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to /dist
npm run preview  # preview the production build locally
```

## Project Structure

```
src/
├── components/
│   ├── ui/                  # Toast primitives (Radix)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ExperienceSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx  # `projects` array - single source of truth
│   ├── ContactSection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── StarBackground.tsx   # dark-mode stars + meteors
│   └── SkyBackground.tsx    # light-mode clouds
├── pages/
│   ├── projectPage/
│   │   ├── index.ts         # slug -> dedicated detail-page registry
│   │   └── SmartAdvisorDetail.tsx
│   ├── Home.tsx
│   ├── ProjectBlog.tsx      # generic, data-driven detail page
│   ├── ProjectBlogs.ts      # case-study content, keyed by slug
│   └── NotFound.tsx
├── helper/lang.ts           # EN/VI bilingual helper
├── hooks/use-toast.ts
├── lib/utils.ts             # cn() class merger
├── App.tsx                  # routes generated from `projects`
├── main.tsx
└── index.css                # theme tokens, animations, accessibility
```

## Architecture: adding a project

Routing is driven by the `projects` array in `ProjectsSection.tsx`, keyed by a unique `slug`. To add a project:

1. Append an entry (with a `slug`) to the `projects` array in `src/components/ProjectsSection.tsx`.
2. Add a matching entry, keyed by that same slug, to `src/pages/ProjectBlogs.ts` for its case-study content.
3. *(Optional)* For a fully custom detail page, create a component under `src/pages/projectPage/` and register it by slug in `src/pages/projectPage/index.ts`.

`App.tsx` generates the route automatically - no routing changes needed. A slug with a registered custom page renders that page; any other slug falls back to the generic `ProjectBlog`.

## Deployment

Deployed on **Vercel**. `vercel.json` rewrites all routes to `index.html` so client-side routing works on refresh and deep links:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Author

**Gia Hung Pham** - [Portfolio](https://giahung-portfolio.vercel.app) · [GitHub](https://github.com/Hung1510)
