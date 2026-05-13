export type AnalyticsEvent = {
  name: string;
  ts: number;
  path?: string;
  referrer?: string;
  sessionId?: string;
  props?: Record<string, unknown>;
};

const SESSION_KEY = "ss_session_id";

function getSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "unknown";
  }
}

export async function track(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1") return;

  const evt: AnalyticsEvent = {
    name,
    ts: Date.now(),
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    sessionId: getSessionId(),
    props,
  };

  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(evt),
      keepalive: true,
    });
  } catch {
    // Swallow analytics failures.
  }
}

