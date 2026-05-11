import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import logo from "@/assets/karrar-logo.png";
import css from "@/assets/karrar/index.css?raw";
import bodyHtml from "@/assets/karrar/index.body.html?raw";
import scriptsRaw from "@/assets/karrar/index.js?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karrar — Elite Content Marketing for SaaS Agencies" },
      {
        name: "description",
        content:
          "Karrar helps SaaS agencies grow pipelines through elite content — scripts, SEO, blogs, emails, LinkedIn, strategy & bespoke websites.",
      },
      { property: "og:title", content: "Karrar — Elite Content Marketing for SaaS Agencies" },
      {
        property: "og:description",
        content: "Bespoke content systems for SaaS agencies. Pipelines that compound.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const extraCss = `
.logo-img { height: 32px; width: auto; display: inline-block; vertical-align: middle; }
.sb-logo .logo-img { height: 26px; }
nav .logo .logo-img { height: 30px; }
nav.stuck .logo .logo-img { height: 26px; }
footer .logo .logo-img { height: 36px; margin-bottom: 4px; }
@media (hover: none) { html, body { cursor: auto !important; } #cur, #curR { display: none; } }
`;

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  // Inline logo URL into HTML at render time
  const html = bodyHtml.replace(/__LOGO__/g, logo);

  useEffect(() => {
    // Load GSAP then run page scripts
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("failed " + src));
        document.head.appendChild(s);
      });

    let cancelled = false;
    (async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        if (cancelled) return;
        // Extract pure JS from <script> tags and execute
        const jsBlocks = [...scriptsRaw.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)]
          .map((m) => m[1])
          .join("\n");
        // eslint-disable-next-line no-new-func
        new Function(jsBlocks)();
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + extraCss }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
