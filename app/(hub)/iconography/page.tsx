"use client";

import { useState } from "react";
import JSZip from "jszip";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";

const BRAND_MOTIFS = [
  "short-waves-horizontal.svg",
  "wave-lines-landscape.svg",
];

const ICONS = [
  "advocacy-arcs-star.svg",
  "ai-sparkle-stars.svg",
  "badge-12-point-clean.svg",
  "badge-12-point.svg",
  "badge-15-point-clean.svg",
  "badge-15-point.svg",
  "badge-9-point-clean.svg",
  "badge-9-point.svg",
  "bar-chart-increasing.svg",
  "blob-cluster.svg",
  "blob-overlap.svg",
  "circles-stacked.svg",
  "comms-blocks-scattered.svg",
  "comms-cross.svg",
  "comms-dots-arc.svg",
  "compass-star.svg",
  "concentric-ovals-horizontal.svg",
  "concentric-rings.svg",
  "diagonal-lines-uneven.svg",
  "diagonal-lines.svg",
  "diagonal-spiral-rings.svg",
  "diagonal-wave-lines.svg",
  "diamond-outline.svg",
  "dots-concentric-rings.svg",
  "dots-grid.svg",
  "equalizer-bars.svg",
  "flag-banner.svg",
  "flag-with-pole.svg",
  "journey-wave-lines.svg",
  "library-columns.svg",
  "lift-columns.svg",
  "long-wave-arrow.svg",
  "oval-dots-grid.svg",
  "s-curve.svg",
  "s-curves-stacked.svg",
  "spiral.svg",
  "star-12-point-clean.svg",
  "star-12-point.svg",
  "triple-s-curves.svg",
  "unlock-circles-grid.svg",
  "wave-arrow.svg",
  "wave-lines-portrait.svg",
];

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

function IconTile({ file, large = false, bg = "dark" }: { file: string; large?: boolean; bg?: "dark" | "light" }) {
  const [copied, setCopied] = useState(false);
  const src = `/assets/icons/${encodeURIComponent(file)}`;
  const isDark = bg === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(src);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      className={`group relative w-full ${large ? "aspect-[4/3]" : "aspect-square"} rounded-xl flex items-center justify-center hover:opacity-90 transition-all cursor-pointer overflow-hidden ${
        isDark ? "bg-sea-blue-dark" : "bg-sand-light border border-black/5"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={file}
        className={`object-contain ${large ? "w-24 h-24" : "w-10 h-10"}`}
      />

      <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={src}
          download={file}
          onClick={(e) => e.stopPropagation()}
          title="Download"
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            isDark ? "bg-white/20 hover:bg-white/40" : "bg-black/10 hover:bg-black/20"
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v6M2.5 5l3 3 3-3M1 10h9" stroke={isDark ? "white" : "#212121"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {copied && (
        <div className={`absolute inset-0 flex items-center justify-center rounded-xl ${isDark ? "bg-sea-blue-dark/90" : "bg-sand-light/90"}`}>
          <span className={`text-[10px] font-body font-medium ${isDark ? "text-white/70" : "text-dark-neutral/50"}`}>Path copied</span>
        </div>
      )}
    </div>
  );
}

async function downloadAll() {
  const zip = new JSZip();
  const all = [...BRAND_MOTIFS, ...ICONS];

  await Promise.all(
    all.map(async (file) => {
      const res = await fetch(`/assets/icons/${encodeURIComponent(file)}`);
      const blob = await res.blob();
      zip.file(file, blob);
    })
  );

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vouch-icons.zip";
  a.click();
  URL.revokeObjectURL(url);
}

function DownloadAllButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await downloadAll();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sea-blue-dark text-white font-body text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1v8M3 7l3.5 3.5L10 7M1 12h11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {loading ? "Preparing zip..." : "Download all icons"}
    </button>
  );
}

export default function IconographyPage() {
  const [bg, setBg] = useState<"dark" | "light">("dark");

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Iconography"
        description="The Vouch icon library — purpose-built shapes that reflect our design principles: clean, purposeful, and recognisably ours."
      />

      {/* Brand Motifs */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl text-dark-neutral">Brand Motifs</h2>
          <BgToggle bg={bg} onChange={setBg} />
        </div>
        <p className="font-body text-xs text-dark-neutral/40 mb-4">All icons have transparent backgrounds — toggle above to preview on dark or light.</p>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <div className="grid grid-cols-2 max-w-sm gap-4">
            {BRAND_MOTIFS.map((file) => (
              <IconTile key={file} file={file} large bg={bg} />
            ))}
          </div>
        </div>
      </section>

      {/* All Icons */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Icons</h2>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {ICONS.map((file) => (
              <IconTile key={file} file={file} bg={bg} />
            ))}
          </div>
        </div>
      </section>

      {/* Download All */}
      <div className="flex justify-end mb-12">
        <DownloadAllButton />
      </div>

      <PageNavigation currentHref="/iconography" />
    </div>
  );
}
