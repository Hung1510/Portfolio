import { lang } from "../helper/lang";

type Skill = {
  name: string;
  // devicon path, e.g. "typescript/typescript-original"
  icon: string;
};

type SkillGroup = {
  title: { vi: string; en: string };
  skills: Skill[];
};

const ICON_BASE =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons";

const skillGroups: SkillGroup[] = [
  {
    title: { vi: "Ngôn ngữ lập trình", en: "Programming Languages" },
    skills: [
      { name: "TypeScript", icon: "typescript/typescript-original" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "Python", icon: "python/python-original" },
      { name: "Java", icon: "java/java-original" },
      { name: "C#", icon: "csharp/csharp-original" },
      { name: "C++", icon: "cplusplus/cplusplus-original" },
      { name: "Rust", icon: "rust/rust-original" },
      { name: "R", icon: "r/r-original" },
      { name: "MATLAB", icon: "matlab/matlab-original" },
      { name: "SQL", icon: "microsoftsqlserver/microsoftsqlserver-plain" },
    ],
  },
  {
    title: { vi: "Frameworks & Thư viện", en: "Frameworks & Libraries" },
    skills: [
      { name: "React", icon: "react/react-original" },
      { name: "Next.js", icon: "nextjs/nextjs-original" },
      { name: "Node.js", icon: "nodejs/nodejs-original" },
      { name: "NestJS", icon: "nestjs/nestjs-original" },
      { name: "Express", icon: "express/express-original" },
      { name: "Spring Boot", icon: "spring/spring-original" },
      { name: "FastAPI", icon: "fastapi/fastapi-original" },
      { name: ".NET", icon: "dot-net/dot-net-original" },
      { name: ".NET Core", icon: "dotnetcore/dotnetcore-original" },
      { name: "TensorFlow", icon: "tensorflow/tensorflow-original" },
      { name: "NumPy", icon: "numpy/numpy-original" },
      { name: "OpenCV", icon: "opencv/opencv-original" },
      { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
    ],
  },
  {
    title: { vi: "Phần mềm & Công cụ", en: "Software & Tools" },
    skills: [
      { name: "Git", icon: "git/git-original" },
      { name: "GitHub", icon: "github/github-original" },
      { name: "VS Code", icon: "vscode/vscode-original" },
      { name: "Docker", icon: "docker/docker-original" },
      { name: "Jupyter", icon: "jupyter/jupyter-original" },
      { name: "MongoDB", icon: "mongodb/mongodb-original" },
      { name: "MySQL", icon: "mysql/mysql-original" },
      { name: "Anaconda", icon: "anaconda/anaconda-original" },
      { name: "Visual Studio", icon: "visualstudio/visualstudio-original" },
      { name: "IntelliJ IDEA", icon: "intellij/intellij-original" },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {lang({ vi: "Kỹ năng của", en: "My" })}{" "}
          <span className="text-primary">
            {lang({ vi: "tôi", en: "Skills" })}
          </span>
        </h2>

        <div className="space-y-12">
          {skillGroups.map((group) => (
            <div key={group.title.en}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="h-5 w-1 rounded-full bg-primary" />
                {lang(group.title)}
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center gap-2"
                    title={skill.name}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <img
                        src={`${ICON_BASE}/${skill.icon}.svg`}
                        alt={skill.name}
                        loading="lazy"
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs text-center text-muted-foreground">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};