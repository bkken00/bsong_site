"use client";

import { useEffect, useRef, useCallback } from "react";

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  waveCount: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

interface WaveLayer {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<WaterRipple[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const timeRef = useRef(0);

  // Ocean color palette
  const oceanColors = {
    deepBlue: "oklch(0.35 0.15 240)",
    midBlue: "oklch(0.50 0.18 230)",
    lightBlue: "oklch(0.70 0.12 220)",
    cyan: "oklch(0.75 0.15 200)",
    foam: "oklch(0.95 0.03 210)",
    teal: "oklch(0.60 0.14 195)",
  };

  const addRipple = useCallback((x: number, y: number, large: boolean = false) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: large ? 300 : 150 + Math.random() * 100,
      opacity: large ? 0.6 : 0.4,
      waveCount: large ? 5 : 3,
    });
  }, []);

  const addBubble = useCallback((x: number, y: number) => {
    bubblesRef.current.push({
      x,
      y,
      radius: 3 + Math.random() * 8,
      speed: 1 + Math.random() * 2,
      wobble: 0,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      opacity: 0.4 + Math.random() * 0.3,
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

    // Initialize ambient bubbles
    for (let i = 0; i < 30; i++) {
      bubblesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * document.documentElement.scrollHeight,
        radius: 2 + Math.random() * 6,
        speed: 0.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }

    // Mouse move handler
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
      if (speed > 3 && now - lastRippleTime > 80) {
        addRipple(mouseRef.current.x, mouseRef.current.y, false);
        if (speed > 10 && Math.random() > 0.7) {
          addBubble(mouseRef.current.x, mouseRef.current.y);
        }
        lastRippleTime = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      addRipple(x, y, true);
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          addBubble(
            x + (Math.random() - 0.5) * 60,
            y + (Math.random() - 0.5) * 60
          );
        }, i * 50);
      }
    };

    const handleScroll = () => {
      resize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    // Wave layers for ocean depth effect
    const waveLayers: WaveLayer[] = [
      { amplitude: 80, frequency: 0.002, speed: 0.0003, offset: 0, color: "oklch(0.30 0.12 240 / 0.15)" },
      { amplitude: 60, frequency: 0.003, speed: 0.0005, offset: Math.PI / 3, color: "oklch(0.40 0.14 235 / 0.12)" },
      { amplitude: 40, frequency: 0.004, speed: 0.0007, offset: Math.PI / 2, color: "oklch(0.50 0.16 230 / 0.10)" },
      { amplitude: 25, frequency: 0.005, speed: 0.001, offset: Math.PI, color: "oklch(0.60 0.12 225 / 0.08)" },
    ];

    // Caustic light patterns
    const drawCaustics = (ctx: CanvasRenderingContext2D, time: number) => {
      const causticCount = 12;
      for (let i = 0; i < causticCount; i++) {
        const x = (Math.sin(time * 0.3 + i * 1.5) * 0.3 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.2 + i * 1.2) * 0.3 + 0.5) * canvas.height;
        const radius = 150 + Math.sin(time + i) * 50;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, "oklch(0.85 0.08 200 / 0.15)");
        gradient.addColorStop(0.5, "oklch(0.80 0.06 210 / 0.08)");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw flowing currents
    const drawCurrents = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.strokeStyle = "oklch(0.70 0.10 210 / 0.06)";
      ctx.lineWidth = 2;

      for (let i = 0; i < 8; i++) {
        const yBase = (i / 8) * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, yBase);

        for (let x = 0; x <= canvas.width; x += 10) {
          const wave1 = Math.sin(x * 0.005 + time * 0.5 + i) * 30;
          const wave2 = Math.sin(x * 0.008 + time * 0.3 + i * 0.5) * 20;
          const wave3 = Math.sin(x * 0.012 + time * 0.7 + i * 0.8) * 15;
          const y = yBase + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.016;
      const time = timeRef.current;

      // Deep ocean gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "oklch(0.92 0.04 220)");
      bgGradient.addColorStop(0.2, "oklch(0.88 0.06 215)");
      bgGradient.addColorStop(0.4, "oklch(0.82 0.08 210)");
      bgGradient.addColorStop(0.6, "oklch(0.75 0.10 205)");
      bgGradient.addColorStop(0.8, "oklch(0.65 0.12 200)");
      bgGradient.addColorStop(1, "oklch(0.55 0.14 195)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw caustic light effects
      drawCaustics(ctx, time);

      // Draw flowing currents
      drawCurrents(ctx, time);

      // Draw wave layers
      waveLayers.forEach((layer, index) => {
        ctx.beginPath();
        ctx.fillStyle = layer.color;

        const yOffset = index * (canvas.height / waveLayers.length);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            yOffset +
            Math.sin(x * layer.frequency + time * 10 * layer.speed + layer.offset) * layer.amplitude +
            Math.sin(x * layer.frequency * 1.5 + time * 15 * layer.speed) * (layer.amplitude * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      });

      // Draw and update water ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 3;
        ripple.opacity -= 0.008;

        if (ripple.opacity <= 0) return false;

        // Draw multiple concentric waves
        for (let w = 0; w < ripple.waveCount; w++) {
          const waveRadius = ripple.radius - w * 20;
          if (waveRadius <= 0) continue;

          const waveOpacity = ripple.opacity * (1 - w / ripple.waveCount);

          // Outer glow
          const gradient = ctx.createRadialGradient(
            ripple.x,
            ripple.y,
            waveRadius * 0.8,
            ripple.x,
            ripple.y,
            waveRadius
          );
          gradient.addColorStop(0, "transparent");
          gradient.addColorStop(0.7, `oklch(0.85 0.08 210 / ${waveOpacity * 0.3})`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(ripple.x, ripple.y, waveRadius, 0, Math.PI * 2);
          ctx.fill();

          // Ripple ring
          ctx.beginPath();
          ctx.strokeStyle = `oklch(0.90 0.05 205 / ${waveOpacity})`;
          ctx.lineWidth = 2 - w * 0.3;
          ctx.arc(ripple.x, ripple.y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        return true;
      });

      // Draw and update bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;

        // Reset bubble when it goes off screen
        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }

        // Draw bubble
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `oklch(0.98 0.02 210 / ${bubble.opacity * 0.8})`);
        gradient.addColorStop(0.5, `oklch(0.90 0.04 215 / ${bubble.opacity * 0.4})`);
        gradient.addColorStop(1, `oklch(0.85 0.06 220 / ${bubble.opacity * 0.1})`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.fillStyle = `oklch(1 0 0 / ${bubble.opacity * 0.6})`;
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fill();

        return true;
      });

      // Draw light rays from top
      for (let i = 0; i < 5; i++) {
        const x = (i / 4) * canvas.width + Math.sin(time * 0.5 + i) * 50;
        const gradient = ctx.createLinearGradient(x, 0, x + 100, canvas.height * 0.6);
        gradient.addColorStop(0, "oklch(0.95 0.04 200 / 0.12)");
        gradient.addColorStop(0.5, "oklch(0.90 0.03 210 / 0.06)");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(x - 30, 0);
        ctx.lineTo(x + 70, 0);
        ctx.lineTo(x + 150, canvas.height * 0.6);
        ctx.lineTo(x - 50, canvas.height * 0.6);
        ctx.closePath();
        ctx.fill();
      }

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
  }, [addRipple, addBubble]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ height: "100%" }}
      aria-hidden="true"
    />
  );
}
