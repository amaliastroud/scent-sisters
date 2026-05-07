"use client";

import { useEffect, useRef, useState } from "react";
import { pointerOverHeaderOrFooter } from "@/lib/pointerChrome";

type Puff = { x: number; y: number; born: number };

type Sparkle = {
  x: number;
  y: number;
  born: number;
  phase: number;
  /** 0=white-lilac 1=warm pearl 2=soft lavender */
  tint: number;
};

const MAX_PUFFS = 90;
const PUFF_LIFETIME_MS = 620;
const MOVE_THROTTLE_MS = 44;

const MAX_SPARKLES = 160;
const SPARKLE_LIFETIME_MS = 480;

function tintAt(sparkAlpha: number, tint: number): string {
  if (tint < 1) return `rgba(255, 252, 255, ${sparkAlpha})`;
  if (tint < 2) return `rgba(255, 232, 214, ${sparkAlpha})`;
  return `rgba(228, 214, 255, ${sparkAlpha})`;
}

function drawSparkles(
  ctx: CanvasRenderingContext2D,
  sparkles: Sparkle[],
  now: number,
) {
  if (sparkles.length === 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const s of sparkles) {
    const age = now - s.born;
    const lifeT = age / SPARKLE_LIFETIME_MS;
    if (lifeT >= 1) continue;

    const ease = Math.pow(1 - lifeT, 2.1);
    const twinkle = 0.38 + 0.62 * Math.abs(Math.sin(now * 0.017 + s.phase));
    const a = ease * twinkle;

    const size = (1.1 + (s.phase % 0.92)) * (0.72 + ease * 0.55);

    // Soft bloom
    const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size * 3.8);
    g.addColorStop(0, tintAt(Math.min(a * 0.95, 0.95), s.tint));
    g.addColorStop(0.35, tintAt(a * 0.35, s.tint));
    g.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(s.x, s.y, size * 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Thin cross glare (readable “sparkle”)
    const arm = size * (2.1 + ease);
    const rot = s.phase + age * 0.0015;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);

    ctx.strokeStyle = tintAt(Math.min(a * 0.9, 1), (s.tint + 0.4) % 3);
    ctx.lineWidth = Math.max(0.55, size * 0.16);
    ctx.lineCap = "round";
    ctx.globalAlpha = a * 0.85;
    ctx.beginPath();
    ctx.moveTo(s.x - cos * arm, s.y - sin * arm);
    ctx.lineTo(s.x + cos * arm, s.y + sin * arm);
    ctx.moveTo(s.x + sin * arm, s.y - cos * arm);
    ctx.lineTo(s.x - sin * arm, s.y + cos * arm);
    ctx.stroke();

    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

/**
 * Soft pink/purple mist that follows the pointer — `pointer-events: none`, respects reduced motion.
 */
export function PerfumeSmokeTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const puffsRef = useRef<Puff[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef(0);
  const lastMoveRef = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    setActive(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveRef.current < MOVE_THROTTLE_MS) return;
      lastMoveRef.current = now;

      if (pointerOverHeaderOrFooter(e.clientX, e.clientY)) return;

      const jitter = () => (Math.random() - 0.5) * 5;
      puffsRef.current.push(
        { x: e.clientX + jitter(), y: e.clientY + jitter(), born: now },
        { x: e.clientX + jitter() * 1.3, y: e.clientY + jitter() * 1.3, born: now - 18 },
      );
      if (puffsRef.current.length > MAX_PUFFS) {
        puffsRef.current.splice(0, puffsRef.current.length - MAX_PUFFS);
      }

      const sparks = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < sparks; i++) {
        sparklesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 46,
          y: e.clientY + (Math.random() - 0.5) * 46,
          born: now,
          phase: Math.random() * Math.PI * 2,
          tint: Math.random() * 3,
        });
      }
      if (sparklesRef.current.length > MAX_SPARKLES) {
        sparklesRef.current.splice(0, sparklesRef.current.length - MAX_SPARKLES);
      }
    };

    const tick = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      puffsRef.current = puffsRef.current.filter((p) => now - p.born < PUFF_LIFETIME_MS);

      for (const p of puffsRef.current) {
        const age = now - p.born;
        const t = age / PUFF_LIFETIME_MS;
        const ease = Math.pow(1 - t, 1.85);
        const alpha = ease * 0.5;
        if (alpha < 0.004) continue;

        const spread = 10 + age * 0.055;
        const r = spread * 2.4;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(245, 200, 228, ${alpha * 0.85})`);
        g.addColorStop(0.4, `rgba(198, 168, 245, ${alpha * 0.42})`);
        g.addColorStop(0.75, `rgba(230, 210, 255, ${alpha * 0.12})`);
        g.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        const wisp = ctx.createRadialGradient(
          p.x - spread * 0.35,
          p.y - spread * 0.25,
          0,
          p.x - spread * 0.35,
          p.y - spread * 0.25,
          r * 0.65,
        );
        wisp.addColorStop(0, `rgba(255, 240, 250, ${alpha * 0.22})`);
        wisp.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = wisp;
        ctx.beginPath();
        ctx.arc(p.x - spread * 0.35, p.y - spread * 0.25, r * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      sparklesRef.current = sparklesRef.current.filter(
        (s) => now - s.born < SPARKLE_LIFETIME_MS,
      );
      drawSparkles(ctx, sparklesRef.current, now);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ touchAction: "none" }}
    />
  );
}
