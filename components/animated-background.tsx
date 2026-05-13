"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Blob positions
    const blobs = [
      { x: 0.3, y: 0.3, radius: 300, vx: 0.0003, vy: 0.0002, color: "oklch(0.65 0.12 220 / 0.4)" },
      { x: 0.7, y: 0.6, radius: 350, vx: -0.0002, vy: 0.0003, color: "oklch(0.75 0.08 200 / 0.35)" },
      { x: 0.5, y: 0.8, radius: 280, vx: 0.0002, vy: -0.0002, color: "oklch(0.55 0.15 240 / 0.3)" },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated blobs
      blobs.forEach((blob, index) => {
        const offsetX = Math.sin(time + index) * 50;
        const offsetY = Math.cos(time + index * 0.7) * 50;

        // Mouse interaction - subtle repulsion
        const dx = mouseX - blob.x * canvas.width;
        const dy = mouseY - blob.y * canvas.height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;
        const influence = Math.max(0, 1 - dist / maxDist) * 30;

        const x = blob.x * canvas.width + offsetX - (dx / dist || 0) * influence;
        const y = blob.y * canvas.height + offsetY - (dy / dist || 0) * influence;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update blob position slightly
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < 0.1 || blob.x > 0.9) blob.vx *= -1;
        if (blob.y < 0.1 || blob.y > 0.9) blob.vy *= -1;
      });

      time += 0.005;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
