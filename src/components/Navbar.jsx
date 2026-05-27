import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between md:grid md:grid-cols-3">
        {/* Logo with hover pulse */}
        <a
          className="text-xl font-bold text-primary flex items-center group transition-transform duration-300 hover:scale-105"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground transition-all duration-300 group-hover:text-primary">
              {" "}Kalpesh's{" "}
            </span>{" "}
            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(56, 189, 248, 0.6)]">
              Portfolio
            </span>
          </span>
        </a>

        {/* Desktop nav — centered */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className={cn(
                "nav-link-cosmic",
                activeSection === item.href && "active"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Spacer to balance the grid on desktop */}
        <div className="hidden md:block" />

        {/* Mobile nav toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        {/* Mobile menu with staggered entrance */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "nav-link-cosmic text-foreground/80 hover:text-primary transition-all duration-300",
                  activeSection === item.href && "active"
                )}
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(40px)",
                  transition: `opacity 0.3s ease ${0.1 + key * 0.08}s, transform 0.3s ease ${0.1 + key * 0.08}s, color 0.3s ease`,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
