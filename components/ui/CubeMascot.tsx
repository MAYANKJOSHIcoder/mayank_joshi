"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface CubeMascotProps {
  size?: number;
  accentColor?: string;
  className?: string;
  interactive?: boolean;
}

/** Tagged pixel: "x,y" for white, "p:x,y" for pupil */
type Pixel = string;

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const GRID = 32;

// Face block: 24 wide × 16 tall, slides within the 32×32 screen
const FACE_W = 24;
const FACE_H = 16;

// Eyes relative to face origin — each 6×8, gap of 4 between them
const LEFT_EYE = { x: 3, y: 4, w: 6, h: 8 };
const RIGHT_EYE = { x: 15, y: 4, w: 6, h: 8 };

// How far the face can slide from center in grid pixels
const MAX_OFFSET = 6;

// Lerp factors
const TRACK_LERP = 0.28;
const IDLE_LERP = 0.025;

// Max pupil travel within eye white (grid pixels)
// With eye W=6, H=8 and pupil=3, safe range is ±1 horizontal, ±2 vertical
// (must keep 1px white border between pupil edge and eye edge)
const MAX_PUPIL_X = 1;
const MAX_PUPIL_Y = 2;

// Colors
const SCREEN_BG_DARK = "#08080c";
const SCREEN_BG_LIGHT = "#d8d8e0";

/* ================================================================== */
/*  Pixel face builder                                                 */
/*  Returns a Set of tagged pixel strings.                            */
/*  faceOx / faceOy = top-left of the face block in grid coords.     */
/*  blinkPhase: 0 = open, 1 = half, 2 = closed                       */
/* ================================================================== */

function buildFace(faceOx: number, faceOy: number, blinkPhase: number, pupilX: number, pupilY: number): Set<Pixel> {
  const pixels = new Set<Pixel>();

  const add = (lx: number, ly: number) => {
    pixels.add(`${faceOx + lx},${faceOy + ly}`);
  };

  const addPupil = (lx: number, ly: number) => {
    pixels.add(`p:${faceOx + lx},${faceOy + ly}`);
  };

  // --- Eyes ---
  const eyeH = blinkPhase === 2 ? 1 : blinkPhase === 1 ? 3 : 8;
  const yOff = blinkPhase === 0 ? 0 : blinkPhase === 1 ? 2 : 3;

  for (const eye of [LEFT_EYE, RIGHT_EYE]) {
    const ex = eye.x;
    const ey = eye.y + yOff;
    const ew = eye.w;

    // Eye white
    for (let r = 0; r < eyeH; r++) {
      for (let c = 0; c < ew; c++) {
        // Round corners when fully open
        if (blinkPhase === 0 && eyeH > 4) {
          const corner = (r === 0 || r === eyeH - 1) && (c === 0 || c === ew - 1);
          if (corner) continue;
        }
        add(ex + c, ey + r);
      }
    }

    // Pupil — 3×3 with independent gaze offset (1×1 when half-blinking)
    // Dynamically clamped to always maintain ≥1px white border inside the eye
    if (blinkPhase < 2) {
      const ps = blinkPhase === 1 ? 1 : 3;
      const border = 1;

      // Safe range relative to eye origin
      const minPx = border;
      const maxPx = ew - ps - border;
      const minPy = border;
      const maxPy = eyeH - ps - border;

      // Base (centered) position within eye
      const basePx = Math.floor(ew / 2) - Math.floor(ps / 2);
      const basePy = Math.floor(eyeH / 2) - Math.floor(ps / 2);

      // Apply gaze offset then clamp to safe range
      const pcx = ex + Math.max(minPx, Math.min(maxPx, basePx + pupilX));
      const pcy = ey + Math.max(minPy, Math.min(maxPy, basePy + pupilY));

      for (let r = 0; r < ps; r++) {
        for (let c = 0; c < ps; c++) {
          addPupil(pcx + c, pcy + r);
        }
      }
    }
  }

  return pixels;
}

/* ================================================================== */
/*  Canvas renderer — crisp pixel grid                                */
/* ================================================================== */

function PixelScreen({
  pixels,
  gridSize,
  pixelSize,
  screenBg,
  isLight,
}: {
  pixels: Set<Pixel>;
  gridSize: number;
  pixelSize: number;
  screenBg: string;
  isLight: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const total = gridSize * pixelSize;
    canvas.width = total * dpr;
    canvas.height = total * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    // Background
    ctx.fillStyle = screenBg;
    ctx.fillRect(0, 0, total, total);

    // Subtle scanlines
    ctx.fillStyle = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.015)";
    for (let i = 0; i < gridSize; i += 2) {
      ctx.fillRect(0, i * pixelSize, total, pixelSize * 0.5);
    }

    // Gap between pixels
    const gap = Math.max(1, Math.round(pixelSize * 0.18));

    const whiteColor = isLight ? "#2a2a36" : "#e8ecf0";
    const pupilColor = isLight ? "#0a0a10" : "#1a1a24";

    for (const px of pixels) {
      const isPupil = px.startsWith("p:");
      const coords = px.replace(/^p:/, "");
      const [x, y] = coords.split(",").map(Number);

      ctx.fillStyle = isPupil ? pupilColor : whiteColor;
      ctx.fillRect(
        x * pixelSize + gap / 2,
        y * pixelSize + gap / 2,
        pixelSize - gap,
        pixelSize - gap
      );
    }
  }, [pixels, gridSize, pixelSize, screenBg, isLight]);

  const total = gridSize * pixelSize;
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: total,
        height: total,
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}

/* ================================================================== */
/*  Main component                                                     */
/* ================================================================== */

export function CubeMascot({
  size = 240,
  accentColor = "#6ee7b7",
  className = "",
  interactive = true,
}: CubeMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse relative to mascot center
  const mouseRef = useRef({ x: 0, y: 0 });
  // Smoothed face offset (fractional)
  const smoothRef = useRef({ x: 0, y: 0 });
  // Target offset
  const targetRef = useRef({ x: 0, y: 0 });

  // Independent pupil tracking
  const pupilTargetRef = useRef({ x: 0, y: 0 });
  const pupilSmoothRef = useRef({ x: 0, y: 0 });

  // Blink
  const blinkRef = useRef({ phase: 0, timer: 0, nextIn: 4000 });

  // Idle
  const idleRef = useRef({ time: 0, active: true });

  // Render trigger
  const pixelsRef = useRef<Set<Pixel>>(new Set());
  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender((n) => n + 1), []);

  // Theme
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // ---- Global pointer tracking ----
  useEffect(() => {
    if (!interactive) return;

    let idleTimeout: ReturnType<typeof setTimeout>;

    const scheduleIdle = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        idleRef.current.active = true;
      }, 1500);
    };

    const handleMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current = { x: e.clientX - cx, y: e.clientY - cy };
      idleRef.current.active = false;
      scheduleIdle();
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current = { x: touch.clientX - cx, y: touch.clientY - cy };
      idleRef.current.active = false;
      scheduleIdle();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current = { x: touch.clientX - cx, y: touch.clientY - cy };
      idleRef.current.active = false;
      scheduleIdle();
    };

    const handleTouchEnd = () => {
      scheduleIdle();
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(idleTimeout);
    };
  }, [interactive]);

  // ---- Animation loop ----
  useEffect(() => {
    let lastTime = 0;

    const tick = (time: number) => {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;

      // --- Target computation ---
      let lerp: number;
      if (idleRef.current.active) {
        idleRef.current.time += dt * 0.001;
        const t = idleRef.current.time;
        targetRef.current = {
          x: Math.sin(t * 0.6) * 1.8,
          y: Math.cos(t * 0.9) * 1.0,
        };
        lerp = IDLE_LERP;
      } else {
        const dist = Math.hypot(mouseRef.current.x, mouseRef.current.y);
        const norm = Math.min(dist / 120, 1);
        const angle = Math.atan2(mouseRef.current.y, mouseRef.current.x);
        targetRef.current = {
          x: Math.cos(angle) * norm * MAX_OFFSET,
          y: Math.sin(angle) * norm * MAX_OFFSET,
        };

        // Independent pupil offset — pupils move further than face slide
        const pupilNorm = Math.min(norm * 2, 1);
        const rawPX = Math.cos(angle) * pupilNorm * MAX_PUPIL_X;
        const rawPY = Math.sin(angle) * pupilNorm * MAX_PUPIL_Y;
        pupilTargetRef.current = {
          x: Math.max(-MAX_PUPIL_X, Math.min(MAX_PUPIL_X, rawPX)),
          y: Math.max(-MAX_PUPIL_Y, Math.min(MAX_PUPIL_Y, rawPY)),
        };

        lerp = TRACK_LERP;
      }

      // --- Smooth interpolation ---
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * lerp;

      // Pupils track faster than face slide
      const pupilLerp = lerp * 1.6;
      pupilSmoothRef.current.x += (pupilTargetRef.current.x - pupilSmoothRef.current.x) * pupilLerp;
      pupilSmoothRef.current.y += (pupilTargetRef.current.y - pupilSmoothRef.current.y) * pupilLerp;

      const fox = Math.round(smoothRef.current.x);
      const foy = Math.round(smoothRef.current.y);
      const ppx = Math.round(pupilSmoothRef.current.x);
      const ppy = Math.round(pupilSmoothRef.current.y);

      // --- Blink ---
      blinkRef.current.nextIn -= dt;
      let blinkPhase = 0;
      if (blinkRef.current.nextIn <= 0) {
        blinkRef.current.timer += dt;
        const p = blinkRef.current.timer / 240; // 240ms blink
        if (p < 0.25) blinkPhase = 1;
        else if (p < 0.5) blinkPhase = 2;
        else if (p < 0.75) blinkPhase = 1;
        else if (p < 1) blinkPhase = 0;
        else {
          blinkPhase = 0;
          blinkRef.current.timer = 0;
          blinkRef.current.nextIn = 3000 + Math.random() * 4500;
        }
      }

      // --- Build & render ---
      const baseOx = Math.floor((GRID - FACE_W) / 2); // 4
      const baseOy = Math.floor((GRID - FACE_H) / 2); // 6

      // When idle, gently return pupils to center
      if (idleRef.current.active) {
        pupilTargetRef.current = { x: 0, y: 0 };
      }

      pixelsRef.current = buildFace(baseOx + fox, baseOy + foy, blinkPhase, ppx, ppy);
      rerender();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rerender]);

  /* ---------------------------------------------------------------- */
  /*  Layout                                                           */
  /* ---------------------------------------------------------------- */

  const screenSize = Math.round(size * 0.88);
  const pixelSize = Math.max(1, Math.floor(screenSize / GRID));
  const exactScreen = pixelSize * GRID;

  const borderColor = "var(--card-border, #222222)";
  const screenBg = isLight ? SCREEN_BG_LIGHT : SCREEN_BG_DARK;

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, userSelect: "none" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      aria-hidden="true"
      role="presentation"
    >
      <motion.div
        style={{ width: "100%", height: "100%", position: "relative" }}
        animate={{ y: [-3, 3, -3], rotate: [-0.4, 0.4, -0.4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Subtle screen frame */}
        <div
          style={{
            position: "absolute",
            inset: Math.round(size * 0.03),
            borderRadius: 12,
            background: screenBg,
            border: `1px solid ${borderColor}`,
            boxShadow:
              "inset 0 1px 6px rgba(0,0,0,0.2), 0 2px 12px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <PixelScreen
            pixels={pixelsRef.current}
            gridSize={GRID}
            pixelSize={pixelSize}
            screenBg={screenBg}
            isLight={isLight}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
