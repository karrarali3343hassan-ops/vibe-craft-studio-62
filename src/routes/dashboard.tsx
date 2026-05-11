import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "@/assets/karrar-logo.png";
import css from "@/assets/karrar/dashboard.css?raw";
import bodyHtml from "@/assets/karrar/dashboard.body.html?raw";
import scriptsRaw from "@/assets/karrar/dashboard.js?raw";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Portal — Karrar" },
      { name: "description", content: "Karrar client portal — content deliverables, calendar, invoices and chat." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Dashboard,
});

const extraCss = `
.logo-img { height: 28px; width: auto; display: inline-block; vertical-align: middle; }
.sb-logo .logo-img { height: 26px; }
@media (hover: none) { html, body { cursor: auto !important; } #cur, #curR { display: none; } }
`;

function Dashboard() {
  const html = bodyHtml.replace(/__LOGO__/g, logo);

  useEffect(() => {
    const jsBlocks = [...scriptsRaw.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)]
      .map((m) => m[1])
      .join("\n");
    try {
      // eslint-disable-next-line no-new-func
      new Function(jsBlocks)();
      if (document.readyState === "complete") {
        window.dispatchEvent(new Event("DOMContentLoaded"));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + extraCss }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
