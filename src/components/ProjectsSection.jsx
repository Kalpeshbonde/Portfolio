import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "AutoSense",
    description: "AI-powered predictive maintenance platform for EVs, cars, and heavy trucks with ML inference APIs and AutoPilot AI assistant.",
    image: "/projects/Autosense.png",
    tags: ["React", "FastAPI", "MongoDB"],
    demoUrl: "https://auto-sense-five.vercel.app/",
    githubUrl: "https://github.com/Kalpeshbonde/AutoSense",
  },
  {
    id: 2,
    title: "MediBridge",
    description: "Full-stack appointment booking system with role-based access for patients, doctors, and admins.",
    image: "/projects/project1.png",
    tags: ["React.js", "Express.js", "MongoDB"],
    demoUrl: "https://medi-bridge-theta.vercel.app/",
    githubUrl: "https://github.com/Kalpeshbonde/MediBridge",
  },
  {
    id: 3,
    title: "Study Notion",
    description: "EdTech web application built using the MERN stack for online learning and course management.",
    image: "/projects/project2.png",
    tags: ["React.js", "Express.js", "MongoDB"],
    demoUrl: "https://studynotion-frontend.vercel.app/",
    githubUrl: "https://github.com/Kalpeshbonde/Study_Notion-",
  },
  {
    id: 4,
    title: "Vision-Watch",
    description: "Real-time drowsiness detector using computer vision to track eye movements and alert users.",
    image: "/projects/project3.png",
    tags: ["Python", "OpenCV", "Dlib", "Scipy"],
    demoUrl: "#",
    githubUrl: "https://github.com/Kalpeshbonde/Vision-Watch",
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">

        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          Featured <span className="text-primary"> Projects</span>
        </h2>

        <p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.1s" }}
        >
          Each project was carefully crafted with attention to detail, performance, and user experience.
        </p>

        {/* 1 col on mobile → 2 col on tablet → 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, key) => (
            <div
              key={project.id}
              className="group bg-card rounded-xl overflow-hidden border border-border card-hover transition-all duration-700 flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
                transitionDelay: `${0.15 + key * 0.1}s`,
              }}
            >
              {/* Image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 mt-auto">
                  {project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink size={11} /> Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Github size={11} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.6s" }}
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Kalpeshbonde"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};