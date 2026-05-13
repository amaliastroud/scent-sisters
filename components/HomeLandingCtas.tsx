"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function HomeLandingCtas() {
  return (
    <div className="mt-12 flex flex-col justify-center gap-4 sm:mt-16 sm:flex-row sm:gap-5">
      <Link
        href="/collection"
        onClick={() => track("cta_click", { cta: "sign_in", to: "/collection" })}
        className="rounded-full border border-[rgba(196,113,122,0.5)] bg-[#FFFAF7]/95 px-10 py-4 text-base font-semibold text-[#C4717A] shadow-lg shadow-[rgba(196,113,122,0.18)] backdrop-blur-sm transition hover:bg-white sm:min-w-[11rem] sm:px-12 sm:py-[1.125rem] sm:text-lg"
      >
        Sign In
      </Link>
      <Link
        href="/collection"
        onClick={() => track("cta_click", { cta: "join_sisterhood", to: "/collection" })}
        className="rounded-full bg-[#C4717A] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[rgba(196,113,122,0.4)] transition hover:brightness-95 sm:min-w-[11rem] sm:px-12 sm:py-[1.125rem] sm:text-lg"
      >
        Join the sisterhood
      </Link>
    </div>
  );
}
