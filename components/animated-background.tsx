"use client";

import { useEffect, useRef, useCallback } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  rings: number;
}

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  type: "bubble" | "star" | "orb";
  hue: number;
}

interface FlowLine {
  points: { x: number; y: number }[];
  speed: number;
  offset: number;
  thickness: number;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const floatingRef = useRef<FloatingElement[]>([]);
  const flowLinesRef = useRef<FlowLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const timeRef = useRef(0);

  const addRipple = useCallback((x: number, y: number, large = false) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: large ? 250 : 120 + Math.random() * 80,
      opacity: large ? 0.5 : 0.35,
      rings: large ? 4 : 2,
    });
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

    // Initialize floating elements
    const initFloatingElements = () => {
      floatingRef.current = [];
      const count = Math.min(60, Math.floor(window.innerWidth / 30));
      
      for (let i = 0; i < count; i++) {
        const type = Math.random() > 0.7 ? "star" : Math.random() > 0.5 ? "orb" : "bubble";
        floatingRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * document.documentElement.scrollHeight,
          size: type === "star" ? 2 + Math.random() * 3 : 4 + Math.random() * 12,
          speed: 0.3 + Math.random() * 0.8,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
          opacity: 0.2 + Math.random() * 0.5,
          type,
          hue: 200 + Math.random() * 80, // Blue to purple range
        });
      }
    };

    // Initialize flow lines (organic currents)
    const initFlowLines = () => {
      flowLinesRef.current = [];
      const lineCount = 8;
      
      for (let i = 0; i < lineCount; i++) {
        const points: { x: number; y: number }[] = [];
        const yBase = (i / lineCount) * canvas.height;
        
        for (let x = 0; x <= canvas.width + 100; x += 50) {
          points.push({ x, y: yBase });
        }
        
        flowLinesRef.current.push({
          points,
          speed: 0.002 + Math.random() * 0.003,
          offset: Math.random() * Math.PI * 2,
          thickness: 1 + Math.random() * 2,
          opacity: 0.03 + Math.random() * 0.05,
        });
      }
    };

    initFloatingElements();
    initFlowLines();

    // Mouse handlers
    let lastRippleTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY + window.scrollY;

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const now = Date.now();
      if (speed > 5 && now - lastRippleTime > 100) {
        addRipple(mouseRef.current.x, mouseRef.current.y, false);
        lastRippleTime = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      addRipple(x, y, true);
    };

    const handleScroll = () => {
      resize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    // Draw functions
    const drawDeepOceanGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width * 0.3, canvas.height);
      gradient.addColorStop(0, "oklch(0.06 0.04 250)");
      gradient.addColorStop(0.2, "oklch(0.08 0.05 245)");
      gradient.addColorStop(0.4, "oklch(0.10 0.06 240)");
      gradient.addColorStop(0.6, "oklch(0.08 0.05 245)");
      gradient.addColorStop(0.8, "oklch(0.06 0.04 250)");
      gradient.addColorStop(1, "oklch(0.05 0.03 255)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawFlowingCurrents = (time: number) => {
      flowLinesRef.current.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = `oklch(0.50 0.15 240 / ${line.opacity})`;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = "round";

        const yOffset = (canvas.height / flowLinesRef.current.length);
        
        line.points.forEach((point, i) => {
          const wave1 = Math.sin(point.x * 0.003 + time * line.speed * 50 + line.offset) * 40;
          const wave2 = Math.sin(point.x * 0.007 + time * line.speed * 30) * 25;
          const wave3 = Math.cos(point.x * 0.002 + time * line.speed * 70 + line.offset) * 35;
          const y = point.y + wave1 + wave2 + wave3;
          
          if (i === 0) {
            ctx.moveTo(point.x, y);
          } else {
            ctx.lineTo(point.x, y);
          }
        });
        
        ctx.stroke();
      });
    };

    const drawCausticLights = (time: number) => {
      const causticCount = 15;
      for (let i = 0; i < causticCount; i++) {
        const x = (Math.sin(time * 0.2 + i * 1.3) * 0.4 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.15 + i * 1.1) * 0.4 + 0.5) * canvas.height;
        const radius = 100 + Math.sin(time * 0.5 + i) * 50;
        const hue = 220 + Math.sin(time * 0.3 + i) * 40;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `oklch(0.55 0.15 ${hue} / 0.12)`);
        gradient.addColorStop(0.4, `oklch(0.50 0.12 ${hue} / 0.06)`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawLightRays = (time: number) => {
      for (let i = 0; i < 6; i++) {
        const x = (i / 5) * canvas.width + Math.sin(time * 0.3 + i * 0.8) * 80;
        const width = 60 + Math.sin(time * 0.5 + i) * 20;
        const gradient = ctx.createLinearGradient(x, 0, x + width * 2, canvas.height * 0.7);
        const hue = 220 + i * 10;
        
        gradient.addColorStop(0, `oklch(0.65 0.12 ${hue} / 0.08)`);
        gradient.addColorStop(0.3, `oklch(0.55 0.10 ${hue} / 0.04)`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(x, 0);
        ctx.lineTo(x + width, 0);
        ctx.lineTo(x + width * 3, canvas.height * 0.7);
        ctx.lineTo(x - width, canvas.height * 0.7);
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawFloatingElements = (time: number) => {
      floatingRef.current.forEach((el) => {
        el.y -= el.speed;
        el.wobble += el.wobbleSpeed;
        el.x += Math.sin(el.wobble) * 0.8;

        // Reset when off screen
        if (el.y < -50) {
          el.y = canvas.height + 50;
          el.x = Math.random() * canvas.width;
        }

        if (el.type === "star") {
          // Draw star with twinkle
          const twinkle = 0.5 + Math.sin(time * 3 + el.wobble * 10) * 0.5;
          const size = el.size * twinkle;
          
          ctx.save();
          ctx.translate(el.x, el.y);
          ctx.rotate(time * 0.5 + el.wobble);
          
          // Star shape
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const outerX = Math.cos(angle) * size * 2;
            const outerY = Math.sin(angle) * size * 2;
            const innerAngle = angle + Math.PI / 4;
            const innerX = Math.cos(innerAngle) * size * 0.5;
            const innerY = Math.sin(innerAngle) * size * 0.5;
            
            if (i === 0) ctx.moveTo(outerX, outerY);
            else ctx.lineTo(outerX, outerY);
            ctx.lineTo(innerX, innerY);
          }
          ctx.closePath();
          
          ctx.fillStyle = `oklch(0.90 0.08 ${el.hue} / ${el.opacity * twinkle})`;
          ctx.shadowColor = `oklch(0.85 0.15 ${el.hue} / 0.8)`;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
          
        } else if (el.type === "orb") {
          // Iridescent orb
          const pulse = 1 + Math.sin(time * 2 + el.wobble) * 0.2;
          const gradient = ctx.createRadialGradient(
            el.x - el.size * 0.3, el.y - el.size * 0.3, 0,
            el.x, el.y, el.size * pulse
          );
          gradient.addColorStop(0, `oklch(0.85 0.15 ${el.hue} / ${el.opacity * 0.8})`);
          gradient.addColorStop(0.5, `oklch(0.60 0.18 ${el.hue + 30} / ${el.opacity * 0.4})`);
          gradient.addColorStop(1, `oklch(0.40 0.12 ${el.hue + 60} / 0)`);

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(el.x, el.y, el.size * pulse, 0, Math.PI * 2);
          ctx.fill();
          
        } else {
          // Bubble
          const gradient = ctx.createRadialGradient(
            el.x - el.size * 0.3, el.y - el.size * 0.3, 0,
            el.x, el.y, el.size
          );
          gradient.addColorStop(0, `oklch(0.95 0.05 ${el.hue} / ${el.opacity * 0.6})`);
          gradient.addColorStop(0.7, `oklch(0.70 0.10 ${el.hue} / ${el.opacity * 0.2})`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
          ctx.fill();

          // Highlight
          ctx.beginPath();
          ctx.fillStyle = `oklch(0.98 0.02 210 / ${el.opacity * 0.5})`;
          ctx.arc(el.x - el.size * 0.3, el.y - el.size * 0.3, el.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawRipples = () => {
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 2.5;
        ripple.opacity -= 0.008;

        if (ripple.opacity <= 0) return false;

        for (let r = 0; r < ripple.rings; r++) {
          const ringRadius = ripple.radius - r * 25;
          if (ringRadius <= 0) continue;

          const ringOpacity = ripple.opacity * (1 - r / ripple.rings);

          // Glow
          const gradient = ctx.createRadialGradient(
            ripple.x, ripple.y, ringRadius * 0.7,
            ripple.x, ripple.y, ringRadius
          );
          gradient.addColorStop(0, "transparent");
          gradient.addColorStop(0.6, `oklch(0.65 0.15 230 / ${ringOpacity * 0.3})`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
          ctx.fill();

          // Ring line
          ctx.beginPath();
          ctx.strokeStyle = `oklch(0.80 0.10 220 / ${ringOpacity})`;
          ctx.lineWidth = 1.5 - r * 0.3;
          ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        return true;
      });
    };

    const drawOrganicBlobs = (time: number) => {
      const blobs = [
        { x: 0.15, y: 0.2, size: 300, hue: 250, speed: 0.3 },
        { x: 0.85, y: 0.35, size: 400, hue: 220, speed: 0.25 },
        { x: 0.5, y: 0.65, size: 350, hue: 280, speed: 0.35 },
        { x: 0.2, y: 0.85, size: 280, hue: 200, speed: 0.4 },
        { x: 0.75, y: 0.75, size: 320, hue: 240, speed: 0.28 },
      ];

      blobs.forEach((blob, i) => {
        const x = blob.x * canvas.width + Math.sin(time * blob.speed + i) * 50;
        const y = blob.y * canvas.height + Math.cos(time * blob.speed * 0.8 + i) * 40;
        const size = blob.size + Math.sin(time * 0.5 + i * 2) * 50;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `oklch(0.45 0.18 ${blob.hue} / 0.15)`);
        gradient.addColorStop(0.5, `oklch(0.35 0.14 ${blob.hue + 20} / 0.08)`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Main draw loop
    const draw = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawDeepOceanGradient();
      drawOrganicBlobs(time);
      drawFlowingCurrents(time);
      drawCausticLights(time);
      drawLightRays(time);
      drawFloatingElements(time);
      drawRipples();

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
  }, [addRipple]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ height: "100%" }}
      aria-hidden="true"
    />
  );
}
