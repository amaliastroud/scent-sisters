"use client";

import { Xenon } from "uvcanvas";

/** Optional Y2K WebGL fill — pair with a blush gradient overlay for contrast. */
export default function XenonHeroBackground() {
  return (
    <div className="absolute inset-0 h-full w-full min-h-[min(100%,480px)]">
      <Xenon />
    </div>
  );
}
