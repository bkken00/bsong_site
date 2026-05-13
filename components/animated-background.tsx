"use client";

import { useEffect, useRef, useCallback } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const scrollRef = useRef(0);

  const colors = [
    "oklch(0.65 0.18 250)", // Vivid blue
    "oklch(0.70 0.15 280)", // Purple
    "oklch(0.75 0.20 200)", // Cyan
    "oklch(0.65 0.22 320)", // Magenta
    "oklch(0.80 0.12 180)", // Teal
  ];

  const addRipple = useCallback((x: number, y: number) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 150 + Math.random() * 100,
      opacity: 0.4,
      color,
    });
  }, []);

  const addParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 4,
        color,
        life: 1,
        maxLife: 60 + Math.random() * 60,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse move handler with ripple creation
    let lastRippleTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY + window.scrollY;

      // Calculate mouse speed
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Create ripples based on movement
      const now = Date.now();
      if (speed > 5 && now - lastRippleTime > 50) {
        addRipple(mouseRef.current.x, mouseRef.current.y);
        if (speed > 15) {
          addParticles(mouseRef.current.x, mouseRef.current.y, Math.floor(speed / 5));
        }
        lastRippleTime = now;
      }
    };

    // Click handler for burst effect
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addRipple(x, y), i * 100);
      }
      addParticles(x, y, 20);
    };

    // Scroll handler
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      resize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    // Animated gradient blobs
    const blobs = [
      { x: 0.15, y: 0.1, radius: 400, vx: 0.0002, vy: 0.0003, color: "oklch(0.60 0.20 250 / 0.25)" },
      { x: 0.85, y: 0.15, radius: 350, vx: -0.0003, vy: 0.0002, color: "oklch(0.70 0.18 280 / 0.20)" },
      { x: 0.5, y: 0.3, radius: 450, vx: 0.0001, vy: -0.0002, color: "oklch(0.75 0.15 200 / 0.22)" },
      { x: 0.2, y: 0.5, radius: 380, vx: 0.0002, vy: 0.0001, color: "oklch(0.65 0.22 320 / 0.18)" },
      { x: 0.8, y: 0.55, radius: 420, vx: -0.0002, vy: 0.0002, color: "oklch(0.80 0.12 180 / 0.20)" },
      { x: 0.3, y: 0.75, radius: 360, vx: 0.0003, vy: -0.0001, color: "oklch(0.68 0.20 240 / 0.22)" },
      { x: 0.7, y: 0.85, radius: 400, vx: -0.0001, vy: 0.0003, color: "oklch(0.72 0.16 300 / 0.18)" },
      { x: 0.5, y: 0.95, radius: 380, vx: 0.0002, vy: -0.0002, color: "oklch(0.78 0.14 220 / 0.20)" },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill with base gradient
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGradient.addColorStop(0, "oklch(0.97 0.02 250)");
      baseGradient.addColorStop(0.3, "oklch(0.95 0.03 270)");
      baseGradient.addColorStop(0.6, "oklch(0.96 0.025 230)");
      baseGradient.addColorStop(1, "oklch(0.94 0.035 260)");
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated blobs
      blobs.forEach((blob, index) => {
        const offsetX = Math.sin(time * 0.5 + index * 1.5) * 80;
        const offsetY = Math.cos(time * 0.4 + index * 1.2) * 80;
        const pulseRadius = blob.radius + Math.sin(time + index) * 50;

        const x = blob.x * canvas.width + offsetX;
        const y = blob.y * canvas.height + offsetY;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color.replace("/ 0.", "/ 0.1"));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Update blob position
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < 0.05 || blob.x > 0.95) blob.vx *= -1;
        if (blob.y < 0.02 || blob.y > 0.98) blob.vy *= -1;
      });

      // Draw and update ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 4;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) return false;

        const gradient = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          ripple.radius * 0.8,
          ripple.x,
          ripple.y,
          ripple.radius
        );
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, ripple.color.replace(")", ` / ${ripple.opacity * 0.5})`));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw ripple ring
        ctx.beginPath();
        ctx.strokeStyle = ripple.color.replace(")", ` / ${ripple.opacity})`);
        ctx.lineWidth = 2;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      // Draw and update particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // Gravity
        particle.life -= 1 / particle.maxLife;

        if (particle.life <= 0) return false;

        ctx.beginPath();
        ctx.fillStyle = particle.color.replace(")", ` / ${particle.life * 0.8})`);
        ctx.arc(particle.x, particle.y, particle.radius * particle.life, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw flowing lines connecting sections
      const sectionPositions = [0.2, 0.4, 0.6, 0.8];
      ctx.strokeStyle = "oklch(0.70 0.12 250 / 0.08)";
      ctx.lineWidth = 1;

      sectionPositions.forEach((pos, i) => {
        const y = pos * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);

        for (let x = 0; x <= canvas.width; x += 20) {
          const wave = Math.sin((x / canvas.width) * Math.PI * 4 + time + i) * 30;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      });

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [addRipple, addParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ height: "100%" }}
      aria-hidden="true"
    />
  );
}
