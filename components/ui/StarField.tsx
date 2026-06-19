"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarFieldProps {
  count?: number;
  minOpacity?: number;
  maxOpacity?: number;
  parallaxStrength?: number;
}

export function StarField({
  count = 120,
  minOpacity = 0.05,
  maxOpacity = 0.25,
  parallaxStrength = 0.02,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  // Detect current theme from class on <html>
  const getStarColor = useCallback(() => {
    if (typeof window === "undefined") return "255, 255, 255";
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (!document.documentElement.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    // White stars on dark bg, black stars on light bg
    return isDark ? "255, 255, 255" : "0, 0, 0";
  }, []);

  const initStars = useCallback(
    (width: number, height: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
          twinkleSpeed: Math.random() * 0.003 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    },
    [count, minOpacity, maxOpacity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initStars(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) * parallaxStrength,
        y: (e.clientY - rect.top - rect.height / 2) * parallaxStrength,
      };
    };

    let time = 0;
    let isPaused = false;

    const animate = () => {
      if (isPaused) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      time += 1;

      const color = getStarColor();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const star of starsRef.current) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const currentOpacity = minOpacity + twinkle * (maxOpacity - minOpacity);

        const px = star.x + mx * (star.size * 0.5);
        const py = star.y + my * (star.size * 0.5);

        // Glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * 3);
        gradient.addColorStop(0, `rgba(${color}, ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer — pause animation when off-screen
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPaused) {
            isPaused = false;
            animFrameRef.current = requestAnimationFrame(animate);
          }
        } else {
          isPaused = true;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0, rootMargin: "50px" }
    );
    visibilityObserver.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Re-init stars on theme change
    const themeObserver = new MutationObserver(() => {
      const rect = canvas.getBoundingClientRect();
      initStars(rect.width, rect.height);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initStars, minOpacity, maxOpacity, parallaxStrength, getStarColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
