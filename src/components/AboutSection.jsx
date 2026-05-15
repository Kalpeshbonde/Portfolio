import { Briefcase, Code, User } from "lucide-react";
import { useEffect, useRef } from "react";

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

export const AboutSection = () => {
  const headingRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center reveal-up"
        >
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6 reveal-left">
            <h3 className="text-2xl font-semibold">Passionate Web Developer</h3>
            <p className="text-muted-foreground">
              Computer Science graduate (2026 batch) with expertise in Java, Python, and C++, backed by hands-on experience in full-stack development, machine learning, and building AI-driven products. Strong foundation in algorithms, data structures, and scalable system design, seeking a full-time Software Development Engineer role to create impactful technology solutions.
            </p>
            <p className="text-muted-foreground">
              I'm passionate about creating elegant solutions to complex problems,
              constantly learning new technologies to stay at the forefront of the
              ever-evolving web landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">Get In Touch</a>
              <a
                href=""
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 gap-6 reveal-right">
            {[
              {
                icon: <Code className="h-6 w-6 text-primary" />,
                title: "Web Development",
                desc: "Creating responsive websites and web applications with modern frameworks.",
              },
              {
                icon: <User className="h-6 w-6 text-primary" />,
                title: "DevOps",
                desc: "Supporting CI/CD pipelines, infrastructure automation, and cross-team collaboration.",
              },
              {
                icon: <Briefcase className="h-6 w-6 text-primary" />,
                title: "Project Management",
                desc: "Collaborating with cross-functional teams using agile methodologies.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="gradient-border p-6 card-hover"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">{icon}</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-left { opacity: 0; transform: translateX(-50px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-right { opacity: 0; transform: translateX(50px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .revealed.reveal-up, .revealed.reveal-left, .revealed.reveal-right {
          opacity: 1; transform: translate(0, 0);
        }
      `}</style>
    </section>
  );
};