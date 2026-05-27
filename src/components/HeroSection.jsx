import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const roles = [
  "Full-Stack Developer",
  "ML Enthusiast",
  "DevOps Explorer",
  "Problem Solver",
];

// Code lines that type out in the terminal
const codeLines = [
  { text: "const developer = {", color: "text-sky-400" },
  { text: '  name: "Kalpesh Bonde",', color: "text-green-400" },
  { text: '  passion: "Building things",', color: "text-green-400" },
  { text: "  skills: [", color: "text-sky-400" },
  { text: '    "React", "Node.js",', color: "text-amber-400" },
  { text: '    "Java", "Python",', color: "text-amber-400" },
  { text: '    "Docker", "K8s"', color: "text-amber-400" },
  { text: "  ],", color: "text-sky-400" },
  { text: "  available: true ✓", color: "text-emerald-400" },
  { text: "};", color: "text-sky-400" },
];


// Terminal component with typing animation
const AnimatedTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines >= codeLines.length) {
      setIsTyping(false);
      // Restart after a pause
      const restart = setTimeout(() => {
        setVisibleLines(0);
        setCurrentText("");
        setIsTyping(true);
      }, 4000);
      return () => clearTimeout(restart);
    }

    const targetLine = codeLines[visibleLines].text;

    if (currentText.length < targetLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetLine.slice(0, currentText.length + 1));
      }, 35 + Math.random() * 25);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCurrentText("");
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, currentText]);

  return (
    <div className="relative w-full max-w-md">
      {/* Terminal window */}
      <div className="rounded-xl border border-border/60 bg-[hsl(222,47%,6%)] shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-[hsl(222,47%,8%)]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">~/kalpesh/portfolio</span>
        </div>

        {/* Code area */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex">
              <span className="text-muted-foreground/40 w-6 text-right mr-4 select-none text-xs leading-relaxed">
                {i + 1}
              </span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
          {/* Current typing line */}
          {visibleLines < codeLines.length && (
            <div className="flex">
              <span className="text-muted-foreground/40 w-6 text-right mr-4 select-none text-xs leading-relaxed">
                {visibleLines + 1}
              </span>
              <span className={codeLines[visibleLines].color}>
                {currentText}
                <span className="typing-cursor">&nbsp;</span>
              </span>
            </div>
          )}
          {/* Blinking cursor after completion */}
          {!isTyping && (
            <div className="flex mt-1">
              <span className="text-muted-foreground/40 w-6 text-right mr-4 select-none text-xs leading-relaxed">
                {codeLines.length + 1}
              </span>
              <span className="text-green-400">
                {">"} <span className="typing-cursor">&nbsp;</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Floating stat card
const StatCard = ({ value, label, delay }) => (
  <div
    className="px-4 py-3 rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm text-center opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
  >
    <div className="text-2xl font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Orbit rings */}
      <div
        className="orbit-ring"
        style={{
          width: "400px", height: "400px",
          top: "50%", left: "50%",
          marginTop: "-200px", marginLeft: "-200px",
          animationDuration: "25s", opacity: 0.15,
        }}
      />
      <div
        className="orbit-ring"
        style={{
          width: "650px", height: "650px",
          top: "50%", left: "50%",
          marginTop: "-325px", marginLeft: "-325px",
          animationDuration: "40s", animationDirection: "reverse", opacity: 0.08,
        }}
      />

      <div className="container max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* === LEFT SIDE — Text === */}
          <div className="text-left space-y-6 order-2 lg:order-1">
            {/* Greeting tag */}
            <div className="opacity-0 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
              <span className="text-gradient-animated opacity-0 animate-fade-in-delay-1 block text-5xl md:text-6xl lg:text-7xl mt-1">
                Kalpesh Bonde
              </span>
            </h1>

            {/* Typewriter */}
            <div className="h-9 flex items-center opacity-0 animate-fade-in-delay-2">
              <span className="text-lg md:text-xl font-medium text-muted-foreground">
                {"{ "}
                <span className="text-primary font-semibold">
                  {displayText}
                  <span className="typing-cursor">&nbsp;</span>
                </span>
                {" }"}
              </span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed opacity-0 animate-fade-in-delay-3">
              I craft modern, performant web experiences — from intuitive frontends to scalable backends. 
              Passionate about clean code, DevOps practices, and building products that make a real impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 opacity-0 animate-fade-in-delay-4">
              <a href="#projects" className="cosmic-button">
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56, 189, 248, 0.3)] font-medium"
              >
                Let's Talk
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 pt-2 opacity-0 animate-fade-in-delay-4" style={{ animationDelay: "1s" }}>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Find me</span>
              <div className="w-8 h-px bg-border" />
              {[
                { icon: <Github size={18} />, href: "https://github.com/Kalpeshbonde", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kalpesh-bonde-404488265/", label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:kalpeshbonde04@gmail.com", label: "Email" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="text-foreground/50 hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56, 189, 248, 0.5)]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* === RIGHT SIDE — Creative visuals === */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">

              {/* Orbiting tech badges — positioned around the terminal in a structured ring */}
              {[
                { name: "React",   top: "-28px",  left: "50%",   ml: "-30px" },
                { name: "Node.js", top: "12%",    right: "-50px", ml: "0" },
                { name: "Docker",  top: "55%",    right: "-44px", ml: "0" },
                { name: "Python",  bottom: "-24px", left: "50%",  ml: "-30px" },
                { name: "MongoDB", top: "55%",    left: "-54px",  ml: "0" },
                { name: "Java",    top: "12%",    left: "-34px",  ml: "0" },
              ].map((badge, i) => (
                <div
                  key={badge.name}
                  className="absolute z-20"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    left: badge.left,
                    right: badge.right,
                    marginLeft: badge.ml,
                    animation: `fade-in 0.5s ease ${0.8 + i * 0.15}s forwards, float ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                    opacity: 0,
                  }}
                >
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-primary/30 bg-card/80 text-primary backdrop-blur-md shadow-[0_0_15px_rgba(56, 189, 248, 0.12)] whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {badge.name}
                  </span>
                </div>
              ))}

              {/* Subtle connecting ring around the terminal */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none z-0"
                style={{
                  top: "-36px",
                  left: "-36px",
                  right: "-36px",
                  bottom: "-36px",
                  border: "1px dashed rgba(56, 189, 248, 0.12)",
                  borderRadius: "20px",
                }}
              />

              {/* Terminal — centered */}
              <div className="relative z-10" style={{ opacity: 0, animation: "fade-in 0.7s ease 0.3s forwards" }}>
                <AnimatedTerminal />
              </div>

              {/* Stat cards below terminal */}
              <div className="grid grid-cols-3 gap-3 mt-5 relative z-10">
                <StatCard value="10+" label="Projects" delay={1.2} />
                <StatCard value="6+" label="Technologies" delay={1.4} />
                <StatCard value="2026" label="CS Graduate" delay={1.6} />
              </div>

              {/* Decorative glow behind terminal */}
              <div
                className="absolute w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                  top: "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
