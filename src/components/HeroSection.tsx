import { ArrowDown } from "lucide-react";
import { lang } from "../helper/lang";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">
              {lang({ vi: "Xin chào, tôi là", en: "Hi, I'm" })}
            </span>

            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              {lang({ vi: "Phạm Trần Gia Hưng", en: "Gia Hung Pham" })}
            </span>

            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            {lang({
              vi: "Tôi tập trung vào phát triển full-stack, xây dựng backend an toàn, hiệu quả và phát triển frontend nhằm tạo ra các ứng dụng hoàn chỉnh. Tôi cũng quan tâm đến thiết kế phần mềm và kiến trúc hệ thống để đảm bảo tính mở rộng và khả năng bảo trì.",
              en: "I focus on full-stack development, building secure and efficient backend systems while enhancing my frontend skills to deliver complete applications. I am also passionate about software design and system architecture, aiming to build scalable and maintainable systems.",
            })}
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              {lang({ vi: "Xem dự án", en: "View My Work" })}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">
          {lang({ vi: "Cuộn xuống", en: "Scroll" })}
        </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};