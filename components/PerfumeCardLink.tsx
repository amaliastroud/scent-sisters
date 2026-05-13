"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { track } from "@/lib/analytics";

export function PerfumeCardLink({
  href,
  perfumeId,
  className,
  children,
}: PropsWithChildren<{ href: string; perfumeId: string; className: string }>) {
  return (
    <Link
      href={href}
      onClick={() => track("perfume_card_click", { perfumeId })}
      className={className}
    >
      {children}
    </Link>
  );
}
