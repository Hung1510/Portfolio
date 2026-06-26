import { Code, User } from "lucide-react";
import { lang } from "../helper/lang";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <p className="font-mono text-xs md:text-sm text-primary tracking-[0.25em] mb-3 text-center">
          {lang({ en: "01 / ABOUT", vi: "01 / GIỚI THIỆU" })}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {lang({ vi: "Thông tin về", en: "About" })}{" "}
          <span className="text-primary">
            {lang({ vi: "tôi", en: "Me" })}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {lang({
                vi: "Một kỹ sư phần mềm với kinh nghiệm phát triển full-stack, quan tâm đến machine learning.",
                en: "A software engineer with full stack development experience, with interest in machine learning.",
              })}
            </h3>

            <p className="text-muted-foreground">
              {lang({
                vi: "Là sinh viên năm 3 đang chuẩn bị tốt nghiệp, tôi có nền tảng vững chắc về lập trình và đam mê mạnh mẽ với phát triển full-stack cũng như xây dựng các ứng dụng web hiện đại.",
                en: "As a third-year student preparing for graduation, I have a solid foundation in programming and a strong passion for full-stack development and building modern web applications.",
              })}
            </p>

            <p className="text-muted-foreground">
              {lang({
                vi: "Tôi có kinh nghiệm thực tế trong việc phát triển ứng dụng web với React, Node.js, Java, C# và các công nghệ hiện đại khác. Tôi cũng làm việc với cơ sở dữ liệu như SQL và MongoDB, đồng thời sử dụng Python để giải quyết bài toán và tự động hóa. Mục tiêu của tôi là thiết kế và xây dựng các sản phẩm web có khả năng mở rộng, thân thiện với người dùng và mang lại giá trị thực tế.",
                en: "I have hands-on experience developing web solutions with React, Node.js, Java, C#, and other modern frameworks & technologies. I also work with databases such as SQL and MongoDB, and leverage Python for problem-solving and automation. My goal is to design and deliver scalable, user-friendly, and impactful web experiences.",
              })}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {lang({ vi: "Liên hệ", en: "Get In Touch" })}
              </a>

              <a
                href="/cv/CV_GiaHung.pdf"
                target="_blank"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                {lang({ vi: "Tải CV", en: "Download CV" })}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {lang({
                      vi: "Phát triển Full Stack",
                      en: "Full Stack Development",
                    })}
                  </h4>
                  <p className="text-muted-foreground">
                    {lang({
                      vi: "Xây dựng ứng dụng web hoàn chỉnh từ giao diện front-end đến xử lý back-end, làm việc với cơ sở dữ liệu và API để tạo ra sản phẩm hoàn thiện.",
                      en: "Building complete web applications from front-end interfaces to back-end logic, working with databases and APIs to deliver fully functional products.",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {lang({
                      vi: "Nghiên cứu và áp dụng Machine Learning",
                      en: "Machine Learning & ML application Learner",
                    })}
                  </h4>
                  <p className="text-muted-foreground">
                    {lang({
                      vi: "Đang học và khám phá các kỹ thuật học máy, từ xử lý dữ liệu đến xây dựng và huấn luyện mô hình để giải quyết các bài toán thực tế.",
                      en: "Learning and exploring machine learning techniques, from data processing to building and training models to solve real-world problems.",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};