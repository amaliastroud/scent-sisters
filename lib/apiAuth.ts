import { NextRequest } from "next/server";

export const API_KEY_HEADER = "x-api-key";

export function requireApiKey(req: NextRequest) {
  const expected = process.env.SCENT_SISTERS_API_KEY;
  const provided = req.headers.get(API_KEY_HEADER);

  if (!expected) {
    return {
      ok: false as const,
      status: 500,
      message:
        "Server misconfigured: SCENT_SISTERS_API_KEY is not set.",
    };
  }

  if (!provided || provided !== expected) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized: missing or invalid API key.",
    };
  }

  return { ok: true as const };
}

