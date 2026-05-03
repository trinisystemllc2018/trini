"use client";

/**
 * PerspectiveGrid.tsx — Fixed 3D grid that reacts to mouse movement
 *
 * Renders a vanishing-point grid behind the hero or any full-bleed section.
 * The grid shifts slightly on mousemove to simulate depth/parallax.
 *
 * Usage:
 *   <div className="relative">
 *     <PerspectiveGrid />          ← inside a relative container
 *     <YourContent />
 *   </div>
 *
 * Props:
 *   color       — grid line color (default: rgba(129,140,248,0.55))
 *   cellSize    — px size of one cell at the horizon (default: 60)
 *   strength    — how much the grid shifts on mouse move 0–1 (default: 0.018)
 *   fixed       — whether to use position:fixed (for whole-page grids)
 */

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface PerspectiveGridProps {
  color?: string;
  cellSize?: number;
  strength?: number;
  fixed?: boolean;
  opacity?: number;
}

export function PerspectiveGrid({
  color = "rgba(129,140,248,0.55)",
  cellSize = 60,
  strength = 0.018,
  fixed = false,
  opacity = 0.06,
}: PerspectiveGridProps) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      style={{
        position: fixed ? "fixed" : "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        opacity,
        /* The grid itself is a CSS background — we shift its position with motion */
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        /* Perspective transform on the entire grid plane */
        transform: "perspective(600px) rotateX(55deg) scaleY(2.2)",
        transformOrigin: "50% 0%",
        /* Shift grid position with spring motion to react to mouse */
        backgroundPosition: `
          calc(50% + ${strength * 100}% * var(--mx, 0.5)) 
          calc(0px + ${strength * 100}% * var(--my, 0.5))
        `,
        x: smx,
        y: smy,
      } as React.CSSProperties}
    />
  );
}

/**
 * HeroGridCanvas — alternative canvas-based grid for the hero.
 * Draws an animated perspective grid that breathes and reacts to scroll.
 * More performant than the CSS version for full-page coverage.
 */
export function HeroGridCanvas({
  color = "rgba(99,102,241,0.45)",
  lineWidth = 0.6,
}: {
  color?: string;
  lineWidth?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    const onMouse = (e: MouseEvent) => {
      targetRef.current.x = e.clientX / window.innerWidth;
      targetRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let t = 0;

    const draw = () => {
      t += 0.004;
      /* Lerp mouse */
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.06;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const vanishX = W / 2 + (mouseRef.current.x - 0.5) * W * 0.12;
      const vanishY = H * 0.46 + (mouseRef.current.y - 0.5) * H * 0.06;

      const COLS = 14;
      const ROWS = 18;
      const breathe = 1 + Math.sin(t) * 0.012;

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      /* Vertical lines spreading from vanishing point */
      for (let c = 0; c <= COLS; c++) {
        const frac = c / COLS;
        const x0 = vanishX;
        const y0 = vanishY;
        const x1 = frac * W * breathe;
        const y1 = H * 1.1;

        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, color);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      /* Horizontal lines — perspective spacing (closer at bottom) */
      for (let r = 0; r <= ROWS; r++) {
        const frac = r / ROWS;
        /* Exponential spacing = perspective illusion */
        const yFrac = Math.pow(frac, 1.8);
        const y = vanishY + (H * 1.1 - vanishY) * yFrac;

        /* Width at this y */
        const lerpT = (y - vanishY) / (H * 1.1 - vanishY);
        const x0 = vanishX + (0 - vanishX) * lerpT * breathe;
        const x1 = vanishX + (W - vanishX) * lerpT * breathe;

        const alpha = Math.min(1, frac * 2);
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.8})`);
        ctx.lineWidth = lineWidth * (0.4 + frac * 0.6);

        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [color, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}
