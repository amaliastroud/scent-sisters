"use client";

import type { PropsWithChildren } from "react";
import { track } from "@/lib/analytics";

export function TrackOnClick({
  eventName,
  props,
  children,
}: PropsWithChildren<{ eventName: string; props?: Record<string, unknown> }>) {
  return (
    <span
      onClick={() => track(eventName, props)}
      className="inline-flex"
    >
      {children}
    </span>
  );
}

