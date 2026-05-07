# Scent Sisters

Warm, blush-toned perfume tracking — now with the beginnings of a community-ready API.

The **UI reads perfumes from** `GET /api/perfumes` / `GET /api/perfumes/:id` (API-first).

## Development

```bash
npm install
npm run dev
```

### shadcn/ui (optional)

This repo already uses **Next.js + TypeScript + Tailwind**. It does **not** run the shadcn CLI by default. If you want shadcn primitives (`Button`, `Card`, etc.), run:

```bash
npx shadcn@latest init
```

That will create/update paths (often `components/ui`). We use **`components/ui/`** for leaf UI such as the **uvcanvas** hero backdrops—keeping that folder aligns with shadcn’s default and avoids mixing one-off components with app-level layout.

### Landing page

The homepage (`/`) is a **blush/cream welcome** with the Scent Sisters wordmark and placeholder **Sign In** / **Join the sisterhood** controls (visual only for now).

Optional WebGL backdrops (`components/ui/novatrix-demo.tsx`, `components/ui/xenon-component.tsx`) exist for experiments; the default route does not depend on them.

**Note:** `uvcanvas` declares `react@^18` peers; this app is on **React 19**. Installs use **`legacy-peer-deps`** (see `.npmrc`) so `npm install` succeeds without extra flags.

## API docs (Swagger UI)

Browse **`/api-docs`** with an interactive Swagger UI. The OpenAPI definition is served from **`/openapi.json`**.

For mutations, click **Authorize** and enter your API key (header `x-api-key`). Public GET routes work without a key.

## API (public GET, protected mutations)

### Public

- `GET /api/perfumes` (optionally `?q=rose`)
- `GET /api/perfumes/:id`

### Protected

Set an API key for local dev:

```bash
cp .env.example .env.local
```

(Optional) Set `NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000`) so server-side fetches to `/api/*` succeed when the incoming request has no usable `Host` header (e.g. some build contexts).

Then call protected endpoints with header `x-api-key: <SCENT_SISTERS_API_KEY>`.

- `POST /api/perfumes`
- `PATCH /api/perfumes/:id`
- `DELETE /api/perfumes/:id`

Example:

```bash
curl -X POST "http://localhost:3000/api/perfumes" \
  -H "content-type: application/json" \
  -H "x-api-key: $SCENT_SISTERS_API_KEY" \
  -d '{
    "name": "New Perfume",
    "brand": "Scent Sisters",
    "rating": 4,
    "review": "Sample review.",
    "imageLabel": "SS-NEW",
    "notes": { "top": ["Bergamot"], "middle": ["Rose"], "base": ["Musk"] }
  }'
```

## Notes

- The API uses an **in-memory store** seeded from `lib/perfumes.ts`. It resets on server restart.
- GET endpoints remain public so the app can display perfumes freely.

