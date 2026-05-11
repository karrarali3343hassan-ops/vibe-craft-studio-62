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
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const extraCss = `
.logo-img { height: 48px; width: auto; display: inline-block; vertical-align: middle; background: transparent; border: 0; box-shadow: none; }
.sb-logo .logo-img { height: 38px; }
nav .logo .logo-img { height: 46px; transition: transform .4s cubic-bezier(.7,0,.3,1); }
nav .logo:hover .logo-img { transform: scale(1.06) rotate(-1deg); }
nav.stuck .logo .logo-img { height: 40px; }
footer .logo .logo-img { height: 56px; margin-bottom: 6px; }
.ldr-logo img { background: transparent; border: 0; box-shadow: none; }
@media (hover: none) { html, body { cursor: auto !important; } #cur, #curR { display: none; } }

/* ── STRONGER ANIMATIONS ─────────────────────────────────── */
@keyframes karFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes karPulseGlow { 0%,100% { box-shadow: 0 0 0 rgba(220,38,38,.0), 0 0 0 rgba(220,38,38,0); } 50% { box-shadow: 0 0 60px rgba(220,38,38,.18), 0 0 120px rgba(220,38,38,.08); } }
@keyframes karShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes karRise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

/* Hero crimson gradient title shimmer */
.hero-h1 em {
  background: linear-gradient(110deg, #DC2626 0%, #F87171 35%, #F5EFE0 50%, #F87171 65%, #DC2626 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: karShimmer 6s linear infinite;
}

/* Service card lift + accent border sweep */
.svc-card { transition: transform .5s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .5s; }
.svc-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -30px rgba(220,38,38,.35); border-color: #DC2626; }
.svc-n { transition: color .4s, transform .5s cubic-bezier(.2,.8,.2,1); }
.svc-card:hover .svc-n { color: rgba(220,38,38,.35); transform: scale(1.15) translateX(6px); }

/* Pricing cards */
.p-card { transition: transform .45s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .45s; }
.p-card:hover { transform: translateY(-8px); box-shadow: 0 24px 50px -25px rgba(220,38,38,.4); }
.p-card.hot { animation: karPulseGlow 4.5s ease-in-out infinite; }

/* Case cards */
.case-card { transition: transform .5s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .5s; }
.case-card:hover { transform: translateY(-12px) scale(1.01); box-shadow: 0 30px 60px -30px rgba(220,38,38,.3); }

/* Stat numbers float subtly */
.stat-box:hover .stat-n { animation: karFloat 2s ease-in-out infinite; }

/* CTA button gold (now crimson) — add ripple glow */
.btn-gold { box-shadow: 0 8px 30px -8px rgba(220,38,38,.4); }
.btn-gold:hover { box-shadow: 0 12px 40px -8px rgba(220,38,38,.7); }

/* Marquee speed-up on hover handled by JS; add gradient fade edges */
.marquee-wrap { position: relative; }
.marquee-wrap::before, .marquee-wrap::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 120px; pointer-events: none; z-index: 2;
}
.marquee-wrap::before { left: 0; background: linear-gradient(to right, #141110, transparent); }
.marquee-wrap::after  { right: 0; background: linear-gradient(to left,  #141110, transparent); }

/* Section headings — italic crimson with subtle glow */
.h2 em, .vp-h2 em, .cta-h em { text-shadow: 0 0 50px rgba(220,38,38,.35); }

/* Process step numbers pulse on hover */
.proc-step:hover .step-num { background: rgba(220,38,38,.08); border-color: #DC2626; transform: scale(1.08); transition: all .35s; }
.step-num { transition: all .35s; }

/* Form options — crimson glow on selected */
.fo.sel { box-shadow: 0 0 0 1px #DC2626, 0 8px 30px -10px rgba(220,38,38,.5); }

/* Scroll-snap for testimonials */
.testi-card { transition: transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s; }
.testi-card:hover { transform: translateY(-6px); border-color: rgba(220,38,38,.4); }

/* Body type a touch warmer */
body { font-family: 'Inter', sans-serif; }
.hero-h1, .h2, .vp-h2, .cta-h, .p-name, .step-t, .case-t, .svc-name, .testi-txt, .p-price, .stat-n, .ldr-logo, .logo, .sb-logo, .page-title, .card-title { font-family: 'Fraunces', serif; }
`;

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  // Inline logo URL into HTML at render time
  const html = bodyHtml.replace(/__LOGO__/g, logo);

  useEffect(() => {
    // Strip dark background pixels from logo PNGs via canvas
    const processImg = (img: HTMLImageElement) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx || canvas.width === 0) return;
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < d.data.length; i += 4) {
          if (d.data[i] < 80 && d.data[i + 1] < 80 && d.data[i + 2] < 80) {
            d.data[i + 3] = 0;
          }
        }
        ctx.putImageData(d, 0, 0);
        img.src = canvas.toDataURL('image/png');
      } catch (_) {}
    };
    document.querySelectorAll<HTMLImageElement>('img.logo-img, .ldr-logo img').forEach(img => {
      if (img.complete && img.naturalWidth > 0) processImg(img);
      else img.addEventListener('load', () => processImg(img), { once: true });
    });

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
        // The script attaches a window 'load' listener for the loader.
        // After client-side navigation, 'load' has already fired — fire it manually.
        if (document.readyState === "complete") {
          window.dispatchEvent(new Event("load"));
        }
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
