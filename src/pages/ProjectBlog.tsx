import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { projects } from "../components/ProjectsSection"; // Import projects
import { projectBlogs } from "./ProjectBlogs"; // Import blog content

type ProjectBlogProps = {
    slug: string;
};

export const ProjectBlog = ({ slug }: ProjectBlogProps) => {
    const { toast } = useToast();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="cosmic-button">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const handleLinkClick = (url: string) => {
        if (url === "#") {
            toast({
                title: "Link not available",
                description: "This project link is not currently available.",
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    const content = projectBlogs[project.slug] || {
        title: `${project.title} - Detailed Overview`,
        date: "Coming soon",
        readTime: "0 min read",
        sections: [
            {
                type: "text",
                content: "Detailed blog content is being prepared for this project. Check back soon!"
            }
        ]
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <Link
                    to="/"
                    className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Home
                </Link>

                <article className="bg-card rounded-lg shadow-xs overflow-hidden">
                    {project.image && (
                        <div className="h-64 md:h-80 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={tag + idx}
                                    className="px-3 py-1 text-sm font-medium border rounded-full bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                            <div className="flex items-center">
                                <Calendar size={16} className="mr-2" />
                                {content.date}
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {content.sections.map((section, index) => {
                                switch (section.type) {
                                    case "heading":
                                        return <h3 key={index} className="text-xl font-semibold mt-8 mb-4">{section.content}</h3>;
                                    case "text":
                                        return <p key={index} className="mb-4">{section.content}</p>;
                                    case "image":
                                        return (
                                            <figure key={index} className="my-6">
                                                <img
                                                    src={section.content}
                                                    alt={section.caption || "Project image"}
                                                    className="rounded-lg shadow-xs w-full"
                                                />
                                                {section.caption && (
                                                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                                                        {section.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    case "list":
                                        return (
                                            <ul key={index} className="list-disc pl-5 mb-4">
                                                {section.content.map((item, i) => (
                                                    <li key={i} className="mb-2">{item}</li>
                                                ))}
                                            </ul>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-12 pt-6 border-t border-border">
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                onClick={(e) => !handleLinkClick(project.demoUrl) && e.preventDefault()}
                                className="cosmic-button flex items-center gap-2"
                            >
                                <ExternalLink size={16} />
                                Live Demo
                            </a>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                onClick={(e) => !handleLinkClick(project.githubUrl) && e.preventDefault()}
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2"
                            >
                                <Github size={16} />
                                View Code
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};
