"use client";

import { useId } from "react";

/**
 * Tiny flacon mark — blush / rose. Uses unique gradient ids when multiple bottles mount.
 */
export function ScentSistersBottleMark({
  className = "h-12 w-12 shrink-0",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const glassId = `ssb-g-${uid}`;
  const capId = `ssb-c-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={glassId} x1="12" y1="14" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EED2D9" />
          <stop offset="0.45" stopColor="#D58B9B" />
          <stop offset="1" stopColor="#B85668" />
        </linearGradient>
        <linearGradient id={capId} x1="18" y1="5" x2="32" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5DEE4" />
          <stop offset="1" stopColor="#C4717A" />
        </linearGradient>
      </defs>
      <rect x="17" y="5" width="14" height="7.5" rx="2.25" fill={`url(#${capId})`} />
      <rect x="21" y="12.5" width="6" height="4.5" rx="1.25" fill="#C4717A" opacity="0.5" />
      <path
        d="M16.75 17.25h14.5a1.25 1.25 0 011.25 1.25V41a4.75 4.75 0 01-4.75 4.75h-7a4.75 4.75 0 01-4.75-4.75V18.5a1.25 1.25 0 011.25-1.25z"
        stroke="rgba(176,106,118,0.42)"
        strokeWidth="1.1"
        fill={`url(#${glassId})`}
      />
      <ellipse cx="21.85" cy="31" rx="2.2" ry="10" fill="#FFF8FA" opacity="0.22" />
    </svg>
  );
}
