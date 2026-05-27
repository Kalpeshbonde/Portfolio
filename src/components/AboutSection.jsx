import { Briefcase, Code, User } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

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

const TiltCard = ({ children, delay = 0 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className="gradient-border p-6 transition-all duration-300 will-change-transform group/card"
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export const AboutSection = () => {
  const headingRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  const cards = [
    {
      icon: <Code className="h-6 w-6 text-primary transition-transform duration-300 group-hover/card:animate-[icon-bounce_0.5s_ease]" />,
      title: "Web Development",
      desc: "Creating responsive websites and web applications with modern frameworks.",
    },
    {
      icon: <User className="h-6 w-6 text-primary transition-transform duration-300 group-hover/card:animate-[icon-bounce_0.5s_ease]" />,
      title: "DevOps",
      desc: "Supporting CI/CD pipelines, infrastructure automation, and cross-team collaboration.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary transition-transform duration-300 group-hover/card:animate-[icon-bounce_0.5s_ease]" />,
      title: "Project Management",
      desc: "Collaborating with cross-functional teams using agile methodologies.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center reveal-up"
        >
          About <span className="text-primary">Me</span>
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
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56, 189, 248, 0.3)]"
              >
                Download CV
              </a>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 gap-6 reveal-right">
            {cards.map(({ icon, title, desc }, i) => (
              <TiltCard key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">{icon}</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};