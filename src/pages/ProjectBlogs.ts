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
    }
};