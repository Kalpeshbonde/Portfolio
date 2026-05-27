import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let stars = [];
    let meteors = [];
    let lastSpawnTime = 0;
    let nextSpawnDelay = randomBetween(1500, 5000);

    function randomBetween(min, max) {
      return Math.random() * (max - min) + min;
    }

    // --- Resize handler ---
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    }

    // --- Stars ---
    function generateStars() {
      const count = Math.floor(
        (canvas.width * canvas.height) / 10000
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.003 + 0.001,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    }

    function drawStars(time) {
      for (const star of stars) {
        const pulse =
          Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.2 + 0.8;
        const opacity = star.baseOpacity * pulse;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // --- Meteors ---
    function spawnMeteor() {
      const angle = (215 * Math.PI) / 180;
      const speed = randomBetween(4, 8); // px per frame
      const length = randomBetween(60, 140);
      meteors.push({
        x: randomBetween(canvas.width * 0.1, canvas.width * 0.9),
        y: randomBetween(0, canvas.height * 0.35),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        size: randomBetween(1, 2.5),
        life: 1, // 1 → 0
        decay: randomBetween(0.005, 0.012),
      });
    }

    function updateAndDrawMeteors() {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        // Draw the tail as a gradient line
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${m.life * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${m.life})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life * 0.9})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 255, 255, ${m.life * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // --- Parallax values (updated on scroll) ---
    let parallaxScale = 1;
    let parallaxOpacity = 1;

    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      parallaxScale = 1 + progress * 0.4;
      parallaxOpacity = 1 - progress * 0.3;
    }

    // --- Animation loop ---
    function loop(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply parallax via canvas transform instead of CSS
      ctx.save();
      ctx.globalAlpha = parallaxOpacity;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.translate(cx, cy);
      ctx.scale(parallaxScale, parallaxScale);
      ctx.translate(-cx, -cy);

      drawStars(time);

      // Spawn meteors
      if (time - lastSpawnTime > nextSpawnDelay) {
        spawnMeteor();
        lastSpawnTime = time;
        nextSpawnDelay = randomBetween(1500, 5000);
      }
      updateAndDrawMeteors();

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    }

    // --- Init ---
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // read initial scroll position
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};