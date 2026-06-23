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
                content: "A full-stack platform built to help IT students and job seekers practice technical interviews. It combines a categorized question bank, dynamic quiz generation, and real-time scoring so users can rehearse interview scenarios and track their progress. (Group project.)"
            },
            {
                type: "image",
                content: "/projects/quizApp.png",
                caption: "Quiz & Interview Practice Platform"
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
        date: "April 2025 – June 2025",
        sections: [
            {
                type: "text",
                content: "A full-stack application for tracking personal expenses and managing budgets. Users can record, classify, and analyze their spending patterns with clear visualizations and insights to support more effective budgeting. (Course project.)"
            },
            {
                type: "image",
                content: "/projects/expensetracker.png",
                caption: "Expense Tracker Dashboard"
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
                content: "A multi-system Discord bot built for a Vietnamese community of roughly 350 members. It bundles ten interconnected systems into a single cosmic, space-themed experience with Vietnamese-language responses. (Personal project.)"
            },
            // 📌 IMAGE: add a screenshot at public/projects/discordBot.png to show it in the hero and add an image section here.
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
                    "Deployment: Railway with a persistent volume for the SQLite database"
                ]
            }
        ]
    },

    "region-research": {
        title: "Multi-task Detection of Regional Discrimination on Vietnamese Social Media",
        date: "2026 (in progress)",
        sections: [
            {
                type: "text",
                content: "A research project proposing an adversarially robust, multi-task machine learning system for detecting regional discrimination in Vietnamese social media text, delivered as a deployable REST API that other applications and sites can call for content moderation. The work is aligned with the content-moderation requirements of Vietnam's Decree 147/2024."
            },
            // 📌 IMAGE: add a figure/screenshot at public/projects/regionResearch.png to show it in the hero and add an image section here.
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
