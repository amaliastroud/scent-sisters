"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <p className="py-14 text-center text-sm text-[rgb(var(--muted))]">
      Loading API explorer…
    </p>
  ),
});

export default function ApiDocsPage() {
  return (
    <div className="api-docs min-h-[70vh] w-full overflow-x-auto rounded-[2rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-3 shadow-md shadow-[rgba(196,113,122,0.12)] sm:p-5">
      <SwaggerUI url="/openapi.json" docExpansion="list" />
    </div>
  );
}
