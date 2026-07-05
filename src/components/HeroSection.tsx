import { ArrowDown, Download } from "lucide-react";
import { lang } from "../helper/lang";

const heroStats = [
  { value: "5,000+", label: { vi: "Người dùng bot", en: "Bot Users" } },
  { value: "90%+", label: { vi: "Độ chính xác ML", en: "ML Accuracy" } },
  { value: "5", label: { vi: "Dự án", en: "Projects" } },
  { value: "2", label: { vi: "Vị trí SE", en: "SE Roles" } },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 opacity-0 animate-fade-in">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
              {lang({
                en: "Software Engineer @ Astute Industries · SE Graduate @ EIU",
                vi: "Kỹ sư phần mềm @ Astute Industries · Tốt nghiệp KTPM @ EIU",
              })}
            </span>
          </div>

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

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              {lang({ vi: "Xem dự án", en: "View My Work" })}
            </a>
            <a
              href="/cv/CV_GiaHung.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              <Download size={16} />
              {lang({ vi: "Tải CV", en: "Download CV" })}
            </a>
          </div>

          <div className="pt-10 opacity-0 animate-fade-in-delay-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {heroStats.map((s) => (
                <div key={s.label.en} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {lang(s.label)}
                  </div>
                </div>
              ))}
            </div>
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