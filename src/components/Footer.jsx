import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Kalpesh Bonde. All rights reserved.
      </p>
      <a
        href="#hero"
        className="rocket-btn p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
