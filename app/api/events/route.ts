import { NextRequest, NextResponse } from "next/server";

type AnalyticsEvent = {
  name: string;
  ts: number;
  path?: string;
  referrer?: string;
  sessionId?: string;
  props?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as AnalyticsEvent | null;
  if (!body || typeof body.name !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid event payload." }, { status: 400 });
  }

  // Basic eventing: write to server logs (Vercel captures these).
  // Intentionally avoid collecting IP/user-agent beyond what platform logs already contain.
  // eslint-disable-next-line no-console
  console.log("[analytics]", JSON.stringify(body));

  return NextResponse.json({ ok: true });
}

