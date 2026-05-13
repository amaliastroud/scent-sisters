"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export function AnalyticsClient() {
  const pathname = usePathname();

  useEffect(() => {
    // Fires on first mount and every client-side navigation.
    track("page_view", { pathname });
  }, [pathname]);

  return null;
}

