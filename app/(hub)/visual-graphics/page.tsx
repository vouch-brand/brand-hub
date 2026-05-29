"use client";

import { useState } from "react";
import PageNavigation from "@/components/ui/PageNavigation";
import PageHeader from "@/components/ui/PageHeader";

const BACKGROUNDS = [
  "blue_grain_bg",
  "blue_wave_grain_bg",
  "dark_blue_grain_bg",
  "dark_blue_wave_grain_bg",
  "dark_grain_bg",
  "dark_wave_grain_bg",
];

const IMAGERY = [
  "advocacy-create-linkedin-post-landscape",
  "advocacy-generate-social-post",
  "amplify-voices-generate-social-post",
  "ask-vouch-ai-home",
  "ask-vouch-generate-highlights-video",
  "asset-library-search",
  "asset-library-share-post",
  "auto-edit-video-editor",
  "employee-storytelling-record-and-share",
  "employer-branding-ask-vouch-landscape",
  "employer-branding-overview",
  "internal-comms-company-announcement",
  "internal-comms-video-summary-landscape",
  "internal-comms-video-summary",
  "linkedin-highlights-reel",
  "recruiter-share-approved-assets",
  "recruiter-share-job-assets",
  "video-sharing-and-distribution",
  "vouch-platform-overview",
  "vouch-recruiter-inmail-generation-square",
  "vouch-recruiter-inmail-landscape",
  "vouch-recruiter-inmail",
  "vouch-recruiter-linkedin-inmail",
  "vouch-recruiter-personalised-outreach",
  "Advocacy",
  "Advocacy-no_bg",
  "Content",
  "Content-no_bg",
  "Recruiter",
  "Recruiter-no_bgr",
  "Agents 1",
  "Agents 2",
  "Agents 3",
  "Ask Vouch - Draft content",
  "Ask Vouch - Edit through prompts",
  "Ask Vouch - Find the gaps",
  "Ask Vouch - find the right clips",
  "vouch mcp",
  "vouch mcp square",
];

function formatName(filename: string): string {
  return filename
    .replace(/-no_bg\w*$/i, " No Background")
    .replace(/_bg$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function BgToggle({ bg, onChange }: { bg: "dark" | "light"; onChange: (v: "dark" | "light") => void }) {
  return (
    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/5 text-[11px] font-body">
      {(["dark", "light"] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-2.5 py-1 rounded-md transition-all capitalize ${
            bg === v ? "bg-white shadow-sm text-dark-neutral" : "text-dark-neutral/40 hover:text-dark-neutral/60"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

function ImageTile({
  filename,
  webpPath,
  pngPath,
  bg = "dark",
}: {
  filename: string;
  webpPath: string;
  pngPath: string;
  bg?: "dark" | "light";
}) {
  const [hovered, setHovered] = useState(false);
  const name = formatName(filename);
  const isDark = bg === "dark";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative rounded-xl overflow-hidden cursor-pointer ${isDark ? "bg-sea-blue-dark" : "bg-sand-light border border-black/5"}`}
        style={{ aspectRatio: "16/10" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={webpPath} alt={name} className="w-full h-full object-cover" />
        <div
          className={`absolute inset-0 bg-sea-blue-dark/70 flex items-end justify-end p-3 gap-2 transition-opacity duration-150 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={webpPath}
            download={`${filename}.webp`}
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-body hover:bg-white/35 transition-colors"
          >
            WebP
          </a>
          <a
            href={pngPath}
            download={`${filename}.png`}
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-body hover:bg-white/35 transition-colors"
          >
            PNG
          </a>
        </div>
      </div>
      <p className="text-[11px] font-body text-dark-neutral/50 leading-tight px-0.5">{name}</p>
    </div>
  );
}

export default function VisualGraphicsPage() {
  const [imageryBg, setImageryBg] = useState<"dark" | "light">("dark");

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Visual Language"
        description="Motion principles, approved backgrounds, and brand imagery for use across Vouch communications."
      />

      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">Backgrounds</h2>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BACKGROUNDS.map((file) => (
              <ImageTile
                key={file}
                filename={file}
                webpPath={`/assets/images/Backgrounds/WebP/${file}.webp`}
                pngPath={`/assets/images/Backgrounds/PNG/${file}.png`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Motion Principles */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-3">Motion Principles</h2>
        <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-6 max-w-2xl">
          Vouch motion should feel like the brand — calm, unhurried, and purposeful. If the visual identity is &ldquo;decaffeinated&rdquo;, so is the motion. Nothing should demand attention it hasn&apos;t earned.
        </p>

        {/* Four principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            {
              name: "Unhurried",
              description: "Transitions breathe. Nothing snaps or jumps. Give elements time to settle — motion should feel like content arriving, not being pushed.",
              spec: "200–400ms UI / 500–900ms reveals",
            },
            {
              name: "Purposeful",
              description: "Motion directs attention or aids comprehension — it never decorates. If removing an animation changes nothing about how the content reads, remove it.",
              spec: "One moving thing at a time",
            },
            {
              name: "Subtle",
              description: "Minimal choreography. Elements move small distances. Opacity shifts are preferred over dramatic slides. The user shouldn't notice the motion — only the result.",
              spec: "Favour opacity over distance",
            },
            {
              name: "Natural",
              description: "Physics-inspired easing — content decelerates as it arrives, like something settling under gravity. Not linear, not bouncy. Smooth and inevitable.",
              spec: "Ease-out / cubic-bezier deceleration",
            },
          ].map(({ name, description, spec }) => (
            <div key={name} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="font-heading text-xl text-sea-blue-dark mb-2">{name}</h3>
              <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-3">{description}</p>
              <span className="font-mono text-[11px] text-sea-blue-mid/60 bg-sea-blue-mid/8 px-2 py-1 rounded">{spec}</span>
            </div>
          ))}
        </div>

        {/* What to avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-400 text-xs font-body font-semibold">✕</span>
              <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30">Avoid</p>
            </div>
            <ul className="space-y-2">
              {[
                "Fast snap transitions or instant cuts between states",
                "Bounce or spring easing — too playful for the brand",
                "Multiple elements animating simultaneously",
                "Attention-seeking effects — flash, shake, spin, pulse",
                "Motion that delays the user reaching content",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 text-xs mt-0.5 shrink-0">✕</span>
                  <span className="font-body text-sm text-dark-neutral/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 text-xs font-body font-semibold">✓</span>
              <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30">In practice</p>
            </div>
            <ul className="space-y-2">
              {[
                "UI transitions: 200–300ms ease-out",
                "Page or section reveals: 500–800ms, staggered softly",
                "Video pacing: breathing room between cuts, unhurried voiceover",
                "Video frame rate: ~24fps or grain-overlaid footage for a less-digital, editorial feel",
                "Product demo animations: show one action, let it land, then continue",
                "Social content: calm is the differentiator — don't match the frenetic norm",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-sea-blue-mid/40 text-xs mt-0.5 shrink-0">—</span>
                  <span className="font-body text-sm text-dark-neutral/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reference link to Brand in Action */}
        <div className="bg-sand-light rounded-xl border border-sea-blue-mid/10 px-5 py-4 flex items-center gap-3">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-sea-blue-mid">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 6v4M8 11.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <p className="text-xs font-body text-dark-neutral/70 leading-relaxed">
            See motion in context on the{" "}
            <a href="/brand-application" className="text-sea-blue-mid hover:underline font-medium">Brand Application</a>
            {" "}page — the Brand in Action gallery includes approved video examples of Vouch motion.
          </p>
        </div>
      </section>

      {/* Texture & Tactility */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-3">Texture & Tactility</h2>
        <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-6 max-w-2xl">
          Texture is one of Vouch&apos;s strongest differentiators. Where most SaaS products lean into bright, glaring screens and clinical precision, Vouch uses tactility to feel grounded, real, and human. Subtle paper textures and film grain are not decoration — they are the brand.
        </p>

        <div className="bg-sea-blue-dark rounded-2xl p-8 mb-4">
          <p className="font-heading text-white text-xl leading-snug max-w-2xl">
            &ldquo;Less iPad, more Kindle. Less glaring screen, more page. Decaffeinated in a world that&apos;s permanently turned up to eleven.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            {
              name: "Paper textures",
              description: "Subtle paper or parchment textures applied to backgrounds — low opacity, never dominant. The texture should be felt, not seen.",
            },
            {
              name: "Film grain overlays",
              description: "A light grain layer in backgrounds and video frames. Reduces the digital glare, warms the image, and gives motion a tactile, physical quality.",
            },
            {
              name: "Lower frame rate",
              description: "Video at or closer to 24fps — or with a grain overlay that reduces the hyper-real quality of high-frame footage. Less digital, more editorial. Think Vox, not SaaS demo.",
            },
          ].map(({ name, description }) => (
            <div key={name} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="font-heading text-lg text-sea-blue-dark mb-2">{name}</h3>
              <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm mb-4">
          <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-3">Why this matters for AI</p>
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed max-w-2xl">
            Most AI brands compete on capability — slick, fast, clinical, futuristic. Vouch&apos;s texture and tactility signals something different: AI that feels human. As AI content becomes ubiquitous, the brands that feel warm and grounded will stand apart from the ones that feel generated. Texture is how we show that.
          </p>
        </div>

      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-heading text-2xl text-dark-neutral">Brand Imagery</h2>
          <BgToggle bg={imageryBg} onChange={setImageryBg} />
        </div>
        <p className="font-body text-xs text-dark-neutral/40 mb-4">
          Image backgrounds are transparent where not full bleed — use the toggle above to preview on dark or light.
        </p>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {IMAGERY.map((file) => (
              <ImageTile
                key={file}
                filename={file}
                webpPath={`/assets/images/Imagery/WebP/${file}.webp`}
                pngPath={`/assets/images/Imagery/PNG/${file}.png`}
                bg={imageryBg}
              />
            ))}
          </div>
        </div>
      </section>

      <PageNavigation currentHref="/visual-graphics" />
    </div>
  );
}
