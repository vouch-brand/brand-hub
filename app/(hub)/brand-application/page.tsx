"use client";

import { useState, useEffect } from "react";
import PageNavigation from "@/components/ui/PageNavigation";
import PageHeader from "@/components/ui/PageHeader";

const WEBSITE_URL = "https://vouchfor.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/vouch-hq/";
const LOGO_URL = "https://brand.vouchfor.com/assets/logo/Vouch%20blue.svg";
const SIG_SAND_URL = "https://brand.vouchfor.com/assets/email-sig/email-sig-sand.png";
const SIG_BLUE_URL = "https://brand.vouchfor.com/assets/email-sig/email-sig-blue.png";

function generateHTML(name: string, title: string, phone: string, banner: "sand" | "blue") {
  const bannerUrl = banner === "sand" ? SIG_SAND_URL : SIG_BLUE_URL;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #212121;">
  <tr><td style="padding-bottom: 12px; color: #888888; font-size: 13px;">--</td></tr>
  <tr><td style="font-weight: bold; font-size: 15px; padding-bottom: 2px;">${name}</td></tr>
  <tr><td style="padding-bottom: 2px; color: #444444;">${title}</td></tr>${phone ? `
  <tr><td style="padding-bottom: 6px; color: #444444;">${phone}</td></tr>` : `
  <tr><td style="padding-bottom: 6px;"></td></tr>`}
  <tr>
    <td style="padding-bottom: 16px;">
      <a href="${WEBSITE_URL}" style="color: #44607B; text-decoration: underline;">Website</a>
      <span style="color: #888888; padding: 0 6px;">|</span>
      <a href="${LINKEDIN_URL}" style="color: #44607B; text-decoration: underline;">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 12px;">
      <a href="${WEBSITE_URL}"><img src="${LOGO_URL}" alt="Vouch" width="100" height="auto" style="display: block;" /></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="${WEBSITE_URL}"><img src="${bannerUrl}" alt="Thousands of teams love Vouch" width="540" height="auto" style="display: block; border-radius: 8px;" /></a>
    </td>
  </tr>
</table>`;
}

export default function BrandApplicationPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [banner, setBanner] = useState<"sand" | "blue">("sand");
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const html = generateHTML(name, title, phone, banner);

  const copySignature = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const item = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: plain text copy
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Brand Application"
        description="Tools and templates for applying the Vouch brand in the real world."
      />

      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-2">Email Signature</h2>
        <p className="font-body text-sm text-dark-neutral/50 mb-6 leading-relaxed">
          Fill in your details, choose a banner style, then copy and paste directly into Gmail&apos;s signature editor.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Form */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm font-body text-dark-neutral focus:outline-none focus:ring-2 focus:ring-sea-blue-mid/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1.5">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm font-body text-dark-neutral focus:outline-none focus:ring-2 focus:ring-sea-blue-mid/30"
                placeholder="Your title"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1.5">
                Phone <span className="normal-case tracking-normal text-dark-neutral/20">— optional</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm font-body text-dark-neutral focus:outline-none focus:ring-2 focus:ring-sea-blue-mid/30"
                placeholder="+61 000 000 000"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-2">Banner Style</label>
              <div className="grid grid-cols-2 gap-3">
                {(["sand", "blue"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setBanner(v)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      banner === v ? "border-sea-blue-mid" : "border-black/5"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/assets/email-sig/email-sig-${v}.png`}
                      alt={`${v} banner`}
                      className="w-full h-auto block"
                    />
                    {banner === v && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-sea-blue-mid flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={copySignature}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-sea-blue-dark text-white text-sm font-body font-medium hover:bg-sea-blue-mid transition-colors"
            >
              {copied ? "Copied!" : "Copy Signature"}
            </button>
            <p className="text-[11px] text-dark-neutral/30 font-body leading-relaxed">
              In Gmail: Settings → See all settings → Signature → paste directly into the editor.
            </p>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
            <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-4">Preview</p>
            <div className="rounded-xl border border-black/5 p-5 bg-white">
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#888888", marginBottom: "10px" }}>--</p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", fontWeight: "bold", color: "#212121", marginBottom: "2px" }}>{name || "Your Name"}</p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#444444", marginBottom: "2px" }}>{title || "Your Title"}</p>
              {phone && <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#444444", marginBottom: "8px" }}>{phone}</p>}
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", marginBottom: "14px", marginTop: phone ? "0" : "8px" }}>
                <a href={WEBSITE_URL} style={{ color: "#44607B" }}>Website</a>
                <span style={{ color: "#888888", padding: "0 6px" }}>|</span>
                <a href={LINKEDIN_URL} style={{ color: "#44607B" }}>LinkedIn</a>
              </p>
              <a href={WEBSITE_URL}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/logo/Vouch blue.svg" alt="Vouch" style={{ height: "28px", width: "auto", display: "block", marginBottom: "12px" }} />
              </a>
              <a href={WEBSITE_URL}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/email-sig/email-sig-${banner}.png`} alt="Customer logos" style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Presentation & Social Templates */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-2">Presentation & Social Templates</h2>
        <p className="font-body text-sm text-dark-neutral/50 mb-4 leading-relaxed">
          All approved presentation and social media templates live in Canva. Always start from a template — never build from scratch.
        </p>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 flex items-center justify-between mb-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/vouch-x-canva.svg" alt="Vouch x Canva" className="h-6 w-auto mb-3" />
            <p className="font-body font-semibold text-dark-neutral text-sm mb-1">Vouch Canva Workspace</p>
            <p className="text-xs text-dark-neutral/40 font-body">Presentation decks, social post templates, and branded assets</p>
          </div>
          <a
            href="https://www.canva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-sea-blue-mid/30 text-sea-blue-mid text-xs font-body font-medium hover:bg-sea-blue-mid hover:text-white transition-all shrink-0"
          >
            Open Canva →
          </a>
        </div>
        <div className="bg-sand-light rounded-xl border border-sea-blue-mid/10 px-5 py-4 flex items-start gap-3">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-sea-blue-mid">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 6v4M8 11.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <p className="text-xs font-body text-dark-neutral/70 leading-relaxed">
            Access to the Vouch Canva workspace must be granted separately — speak to your manager to get access.
          </p>
        </div>
      </section>

      {/* Brand in Action */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-2">Brand in Action</h2>
        <p className="font-body text-sm text-dark-neutral/50 mb-6 leading-relaxed">
          Examples of the Vouch brand applied across real touchpoints — website, social, presentations, and more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "website.webp",
            "product 1.webp",
            "product 2.webp",
            "advanced_editor.webp",
            "Advocacy - What's new.webp",
            "testimonial.webp",
            "tagline.webp",
            "email sig.webp",
            "t-shirt.webp",
            "editor-main.mp4",
            "ea.mp4",
            "vouch-101.mp4",
            "new-customers.mp4",
            "shapes.mp4",
            "wall-of-vids.mp4",
          ].map((file) => {
            const src = `/assets/brand-in-action/${encodeURIComponent(file)}`;
            const isVideo = file.endsWith(".mp4");
            return (
              <button
                key={file}
                onClick={() => setLightbox(src)}
                className="block w-full cursor-zoom-in rounded-2xl overflow-hidden"
              >
                {isVideo ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto block"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={src} alt="" className="w-full h-auto block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            {lightbox.endsWith(".mp4") ? (
              <video
                src={lightbox}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="max-w-full max-h-full rounded-2xl shadow-2xl"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
            )}
          </div>
        )}

      </section>

      <PageNavigation currentHref="/brand-application" />
    </div>
  );
}
