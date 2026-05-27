import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 60, category: "frontend" },
  { name: "Tailwind CSS", level: 40, category: "frontend" },
  { name: "Next.js", level: 40, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 80, category: "backend" },
  { name: "Java", level: 80, category: "backend" },
  { name: "SpringBoot", level: 75, category: "backend" },
  { name: "MongoDB", level: 85, category: "backend" },
  { name: "MySql", level: 85, category: "backend" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 90, category: "tools" },
  { name: "Jenkins", level: 60, category: "tools" },
  { name: "IntelliJ IDE", level: 75, category: "tools" },
  { name: "Kubernetes", level: 60, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

const AnimatedCounter = ({ target, visible, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      const duration = 1000;
      const steps = 30;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [visible, target, delay]);

  return <span>{count}%</span>;
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
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

  const filteredSkills = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          My <span className="text-primary">Skills</span>
        </h2>

        <div
          className="flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(56, 189, 248, 0.4)]"
                  : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-[0_0_10px_rgba(56, 189, 248, 0.2)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover shimmer-effect transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${0.1 + key * 0.05}s`,
              }}
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden relative">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-1000 relative"
                  style={{
                    width: visible ? skill.level + "%" : "0%",
                    transitionDelay: `${0.3 + key * 0.05}s`,
                  }}
                >
                  {/* Glowing dot at the tip */}
                  {visible && (
                    <div className="progress-glow-dot" />
                  )}
                </div>
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground font-medium">
                  <AnimatedCounter
                    target={skill.level}
                    visible={visible}
                    delay={0.3 + key * 0.05}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};