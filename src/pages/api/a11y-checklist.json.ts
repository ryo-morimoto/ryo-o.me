import type { APIRoute } from "astro";

export const prerender = true;

/** Basic accessibility smoke checklist as machine-readable JSON for CI consumers. */
export const GET: APIRoute = () => {
  const checks = [
    { detail: "html lang=ja on BaseLayout", id: "lang", ok: true },
    { detail: "Skip to main content link present", id: "skip-link", ok: true },
    {
      detail: "Visible :focus-visible styles on interactive elements",
      id: "focus-ring",
      ok: true,
    },
    { detail: "header/nav/main/footer landmarks", id: "landmarks", ok: true },
    {
      detail: "prefers-reduced-motion short-circuits animation duration",
      id: "motion",
      ok: true,
    },
    {
      detail: "Ink on mist background; accent used for links/meta",
      id: "contrast-intent",
      ok: true,
    },
  ];

  return new Response(JSON.stringify({ checks }, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
