"use client";

import { Novatrix } from "uvcanvas";

/** Iridescent chrome/film backdrop — layered under gradients on the landing hero. */
export default function NovatrixDemo() {
  return (
    <div className="absolute inset-0 h-full w-full min-h-[min(100%,520px)]">
      <Novatrix color={[0.62, 0.18, 0.85]} />
    </div>
  );
}
