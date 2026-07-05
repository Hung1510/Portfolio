import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { lang } from "@/helper/lang";
import { blogPosts } from "./BlogPosts";

export const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {lang({ en: "Post Not Found", vi: "Không tìm thấy bài viết" })}
          </h1>
          <Link to="/" className="cosmic-button">
            <ArrowLeft size={16} className="mr-2" />
            {lang({ en: "Back to Home", vi: "Về trang chủ" })}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <Helmet>
        <title>{`${post.title} | Gia Hung Pham`}</title>
        <meta name="description" content={post.excerpt} />
        <link
          rel="canonical"
          href={`https://giahung-portfolio.vercel.app/blog/${slug}`}
        />
        <meta property="og:title" content={`${post.title} | Gia Hung Pham`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://giahung-portfolio.vercel.app/blog/${slug}`}
        />
      </Helmet>

      <div className="container mx-auto max-w-3xl">
        <Link
          to="/#writing"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          {lang({ en: "Back to Writing", vi: "Về mục bài viết" })}
        </Link>

        <article className="text-left">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, idx) => (
              <span
                key={tag + idx}
                className="px-3 py-1 text-sm font-medium border rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} /> {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} /> {post.readTime}
            </span>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, index) => {
              switch (section.type) {
                case "heading":
                  return (
                    <h3
                      key={index}
                      className="text-xl font-semibold mt-8 mb-4"
                    >
                      {section.content}
                    </h3>
                  );
                case "text":
                  return (
                    <p key={index} className="mb-4 leading-relaxed">
                      {section.content}
                    </p>
                  );
                case "image":
                  return (
                    <figure key={index} className="my-6">
                      <img
                        src={section.content}
                        alt={section.caption || "Post image"}
                        loading="lazy"
                        decoding="async"
                        className="rounded-lg shadow-xs w-full"
                      />
                      {section.caption && (
                        <figcaption className="text-left text-sm text-muted-foreground mt-2">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc pl-5 mb-4">
                      {section.content.map((item, i) => (
                        <li key={i} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Link
              to="/#writing"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {lang({ en: "Back to Writing", vi: "Về mục bài viết" })}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};