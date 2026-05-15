import { Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitch, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "Thank you! I'll get back to you soon." });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          Have a project in mind or want to collaborate? I'm always open to new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className="space-y-8 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-50px)", transitionDelay: "0.2s" }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {[
                { icon: <Mail className="h-6 w-6 text-primary" />, label: "Email", value: "kalpeshbonde04@gmail.com", href: "mailto:kalpeshbonde04@gmail.com" },
                { icon: <Phone className="h-6 w-6 text-primary" />, label: "Phone", value: "+91", href: "#" },
                { icon: <MapPin className="h-6 w-6 text-primary" />, label: "Location", value: "Pune, Maharashtra", href: "#" },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">{icon}</div>
                  <div>
                    <h4 className="font-medium">{label}</h4>
                    <a href={href} className="text-muted-foreground hover:text-primary transition-colors">{value}</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                {[
                  { icon: <Linkedin />, href: "https://www.linkedin.com/in/kalpesh-bonde-404488265/" },
                  { icon: <Twitter />, href: "#" },
                  { icon: <Instagram />, href: "#" },
                  { icon: <Twitch />, href: "#" },
                ].map(({ icon, href }, i) => (
                  <a key={i} href={href} target="_blank" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(50px)", transitionDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Kalpesh Bonde..." },
                { id: "email", label: "Your Email", type: "email", placeholder: "kalpesh@gmail.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type} id={id} name={id} required placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message" name="message" required rows={4}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className={cn("cosmic-button w-full flex items-center justify-center gap-2")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};