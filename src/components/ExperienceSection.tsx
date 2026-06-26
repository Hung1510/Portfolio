import { GraduationCap, Briefcase, Award } from "lucide-react";
import { lang } from "../helper/lang";

type Bilingual = { vi: string; en: string };

type TimelineItem = {
  icon: "education" | "work" | "award";
  title: Bilingual;
  org: Bilingual;
  period: Bilingual;
  description: Bilingual;
};

const items: TimelineItem[] = [
  {
    icon: "work",
    title: { vi: "Kỹ sư phần mềm", en: "Software Engineer" },
    org: {
      vi: "Astute Industries · Bán thời gian",
      en: "Astute Industries · Part-time",
    },
    period: { vi: "Th1 2026 – Hiện tại", en: "Jan 2026 – Present" },
    description: {
      vi: "Vị trí kỹ sư phần mềm bán thời gian, tham gia phát triển cùng đội ngũ kỹ thuật.",
      en: "Part-time software engineering role, contributing to development alongside the engineering team.",
    },
  },
  {
    icon: "work",
    title: { vi: "Thực tập sinh Kỹ sư phần mềm", en: "Software Engineer Intern" },
    org: { vi: "GO Fleet", en: "GO Fleet" },
    period: { vi: "Th10 2025 – Th1 2026 · 4 tháng", en: "Oct 2025 – Jan 2026 · 4 months" },
    description: {
      vi: "Kỳ thực tập kỹ sư phần mềm 4 tháng, tham gia phát triển phần mềm cùng nhóm.",
      en: "Four-month software engineering internship, working on development as part of the team.",
    },
  },
  {
    icon: "work",
    title: { vi: "Gia sư Tiếng Anh", en: "Private English Tutor" },
    org: { vi: "Tự do", en: "Freelance" },
    period: { vi: "2025 – Hiện tại", en: "2025 – Present" },
    description: {
      vi: "Dạy kèm 1-1 theo nhu cầu, tập trung vào kỹ năng ngôn ngữ và luyện thi IELTS.",
      en: "Personalized one-on-one tutoring focused on language skills and IELTS exam preparation.",
    },
  },
  {
    icon: "education",
    title: { vi: "Kỹ thuật Phần mềm", en: "B.Eng, Software Engineering" },
    org: {
      vi: "Đại học Quốc tế Miền Đông (EIU)",
      en: "Eastern International University (EIU)",
    },
    period: { vi: "Đã tốt nghiệp", en: "Graduated" },
    description: {
      vi: "Tốt nghiệp Kỹ thuật Phần mềm trong 2 năm 9 tháng. Tập trung vào phát triển full-stack, kỹ thuật backend và ứng dụng machine learning.",
      en: "Graduated with a B.Eng in Software Engineering, completed in 2 years 9 months. Focused on full-stack development, backend engineering, and applied machine learning.",
    },
  },
  {
    icon: "award",
    title: { vi: "IELTS 7.5", en: "IELTS 7.5" },
    org: { vi: "Chứng chỉ tiếng Anh", en: "English Proficiency" },
    period: { vi: "", en: "" },
    description: {
      vi: "Chứng chỉ năng lực tiếng Anh quốc tế (IELTS băng điểm 7.5).",
      en: "Certified international English proficiency (IELTS band 7.5).",
    },
  },
];

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  award: Award,
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <p className="font-mono text-xs md:text-sm text-primary tracking-[0.25em] mb-3 text-center">
          {lang({ en: "02 / EXPERIENCE", vi: "02 / KINH NGHIỆM" })}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {lang({ vi: "Kinh nghiệm &", en: "Experience &" })}{" "}
          <span className="text-primary">
            {lang({ vi: "Học vấn", en: "Education" })}
          </span>
        </h2>

        <div className="relative ml-3 space-y-10 border-l border-border">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon];
            const period = lang(item.period);
            return (
              <div key={idx} className="relative pl-8">
                <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                  <Icon size={14} />
                </span>

                <div className="bg-card rounded-lg p-5 shadow-xs card-hover text-left">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{lang(item.title)}</h3>
                    {period && (
                      <span className="text-sm text-muted-foreground">
                        {period}
                      </span>
                    )}
                  </div>
                  <p className="text-primary text-sm mb-2">{lang(item.org)}</p>
                  <p className="text-muted-foreground text-sm">
                    {lang(item.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};