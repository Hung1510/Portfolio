import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { lang } from "@/helper/lang";
import { blogList } from "@/pages/BlogPosts";

export const WritingSection = () => {
  return (
    <section id="writing" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <p className="font-mono text-xs md:text-sm text-primary tracking-[0.25em] mb-3 text-center">
          {lang({ en: "05 / WRITING", vi: "05 / BÀI VIẾT" })}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {lang({ vi: "Nhật ký", en: "Dev" })}{" "}
          <span className="text-primary">
            {lang({ vi: "lập trình", en: "Log" })}
          </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {lang({
            vi: "Một vài ghi chép kỹ thuật về cách tôi giải quyết vấn đề trong các dự án - từ thuật toán và kiểm thử đến xử lý âm thanh thời gian thực và thị giác máy tính.",
            en: "A few technical notes on how I approach problems in my projects - from algorithms and testing to real-time audio and computer vision.",
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-xs card-hover p-6 text-left"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={13} /> {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={tag + idx}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {lang({ vi: "Đọc bài", en: "Read post" })}
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};