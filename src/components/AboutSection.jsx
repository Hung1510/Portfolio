import { Code, User } from "lucide-react";
import { lang } from "../helper/lang";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
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
                vi: "Kỹ sư phần mềm kết hợp kỹ năng full-stack với thiết kế web.",
                en: "A Software engineer blending full-stack skills with web design.",
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
                      vi: "Phát triển Web",
                      en: "Web Development",
                    })}
                  </h4>
                  <p className="text-muted-foreground">
                    {lang({
                      vi: "Xây dựng website và ứng dụng web responsive, thân thiện với người dùng bằng các framework và công nghệ hiện đại, đảm bảo trải nghiệm mượt mà trên mọi thiết bị.",
                      en: "Creating responsive and user-friendly websites and web applications using modern frameworks and technologies to deliver seamless experiences across devices.",
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
                      vi: "Thiết kế UI/UX",
                      en: "UI/UX Design",
                    })}
                  </h4>
                  <p className="text-muted-foreground">
                    {lang({
                      vi: "Thiết kế giao diện trực quan và xây dựng trải nghiệm người dùng mượt mà, giúp nâng cao tính dễ sử dụng và mức độ tương tác.",
                      en: "Designing intuitive user interfaces and crafting seamless user experiences that enhance usability and engagement.",
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