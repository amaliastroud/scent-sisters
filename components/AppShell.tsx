"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PerfumeSmokeTrail } from "@/components/PerfumeSmokeTrail";
import { ScentSistersBottleMark } from "@/components/ScentSistersBottleMark";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full px-4 py-2 text-sm transition",
        "border backdrop-blur",
        active
          ? "border-[rgb(var(--stroke))] bg-white/70 text-[rgb(var(--ink))] shadow-sm"
          : "border-transparent text-[rgb(var(--muted))] hover:border-[rgb(var(--stroke))] hover:bg-white/55 hover:text-[rgb(var(--ink))]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <>
        <PerfumeSmokeTrail />
        <main className="relative z-[1] isolate min-h-dvh w-full overflow-x-hidden p-0">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <PerfumeSmokeTrail />
      <div className="relative z-[1] mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pb-10 sm:px-8">
      <header className="sticky top-0 z-40 -mx-5 mb-6 border-b border-[rgb(var(--stroke))] bg-[rgba(var(--bg),0.78)] px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/collection"
            className="group inline-flex max-w-[min(100%,20rem)] items-start gap-3 sm:max-w-md"
          >
            <ScentSistersBottleMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
            <div className="min-w-0 leading-tight">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgb(var(--muted))]">
                SCENT SISTERS
              </p>
              <p className="font-display text-lg text-[rgb(var(--ink))]">Scent Sisters</p>
              <p className="font-display mt-1.5 text-[11px] italic leading-snug text-[rgb(var(--muted))] tracking-[0.015em]">
                Buy the fragrance you wish to smell in the world.
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-2">
            <NavLink href="/collection" label="My Collection" />
            <NavLink href="/wishlist" label="My Wishlist" />
            <NavLink href="/api-docs" label="API Docs" />
          </nav>
        </div>
      </header>

      <main className="relative flex-1">{children}</main>

      <footer className="mt-12 border-t border-[rgb(var(--stroke))] pt-6 text-xs text-[rgb(var(--muted))]">
        <span className="font-medium text-[rgb(var(--ink))]">Scent Sisters</span> — Warm,
        editorial perfume journaling. Demo data + starter API routes.
      </footer>
    </div>
    </>
  );
}
