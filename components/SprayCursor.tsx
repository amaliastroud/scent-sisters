"use client";

import { useEffect, useState } from "react";
import { pointerOverHeaderOrFooter } from "@/lib/pointerChrome";

const PINK = "#FFB7C5";
const PURPLE = "#C9A7EB";

type Particle = { id: number; x: number; y: number; color: string };

let nextId = 0;

export function SprayCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (pointerOverHeaderOrFooter(e.clientX, e.clientY)) return;

      nextId += 1;
      const id = nextId;
      const color = Math.random() < 0.5 ? PINK : PURPLE;

      setParticles((prev) => [...prev, { id, x: e.clientX, y: e.clientY, color }]);

      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1000);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10100] overflow-hidden"
      aria-hidden
    >
      {particles.map((dot) => (
        <div
          key={dot.id}
          className="spray-cursor-particle"
          style={{
            left: dot.x,
            top: dot.y,
            background: dot.color,
            color: dot.color,
          }}
        />
      ))}
    </div>
  );
}
