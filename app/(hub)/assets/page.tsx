"use client";

import { useState } from "react";
import JSZip from "jszip";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";

type Category = {
  label: string;
  description: string;
  meta: string;
  action: "zip" | "request";
  files?: { path: string; name: string }[];
  zipName?: string;
  requestHref?: string;
};

const CATEGORIES: Category[] = [
  {
    label: "Logos",
    description: "All approved logo variants — blue, dark blue, and reversed.",
    meta: "SVG + PNG · 6 files",
    action: "zip",
    zipName: "vouch-logos.zip",
    files: [
      { path: "/assets/logo/Vouch blue.svg", name: "Vouch blue.svg" },
      { path: "/assets/logo/Vouch dark blue.svg", name: "Vouch dark blue.svg" },
      { path: "/assets/logo/Vouch not white.svg", name: "Vouch not white.svg" },
      { path: "/assets/logo/Vouch blue.png", name: "Vouch blue.png" },
      { path: "/assets/logo/Vouch dark blue.png", name: "Vouch dark blue.png" },
      { path: "/assets/logo/Vouch not white.png", name: "Vouch not white.png" },
    ],
  },
  {
    label: "Inter Variable",
    description: "Secondary typeface — variable font covering all weights, regular and italic.",
    meta: "TTF · 2 files",
    action: "zip",
    zipName: "inter-variable.zip",
    files: [
      { path: "/assets/fonts/Inter/TTF/Inter-VariableFont_opsz,wght.ttf", name: "Inter-Variable.ttf" },
      { path: "/assets/fonts/Inter/TTF/Inter-Italic-VariableFont_opsz,wght.ttf", name: "Inter-Variable-Italic.ttf" },
    ],
  },
  {
    label: "Martina Plantijn",
    description: "Primary typeface — licensed font used for headings and display text. Request access to receive the files.",
    meta: "Licensed · request required",
    action: "request",
    requestHref: "mailto:ian@vouchfor.com?subject=Martina%20Plantijn%20typeface%20access%20request",
  },
  {
    label: "Icons",
    description: "The full Vouch icon library — 42 purpose-built SVGs including brand motifs.",
    meta: "SVG · 44 files",
    action: "zip",
    zipName: "vouch-icons.zip",
    files: [
      { path: "/assets/icons/short-waves-horizontal.svg", name: "short-waves-horizontal.svg" },
      { path: "/assets/icons/wave-lines-landscape.svg", name: "wave-lines-landscape.svg" },
      { path: "/assets/icons/advocacy-arcs-star.svg", name: "advocacy-arcs-star.svg" },
      { path: "/assets/icons/ai-sparkle-stars.svg", name: "ai-sparkle-stars.svg" },
      { path: "/assets/icons/badge-12-point-clean.svg", name: "badge-12-point-clean.svg" },
      { path: "/assets/icons/badge-12-point.svg", name: "badge-12-point.svg" },
      { path: "/assets/icons/badge-15-point-clean.svg", name: "badge-15-point-clean.svg" },
      { path: "/assets/icons/badge-15-point.svg", name: "badge-15-point.svg" },
      { path: "/assets/icons/badge-9-point-clean.svg", name: "badge-9-point-clean.svg" },
      { path: "/assets/icons/badge-9-point.svg", name: "badge-9-point.svg" },
      { path: "/assets/icons/bar-chart-increasing.svg", name: "bar-chart-increasing.svg" },
      { path: "/assets/icons/blob-cluster.svg", name: "blob-cluster.svg" },
      { path: "/assets/icons/blob-overlap.svg", name: "blob-overlap.svg" },
      { path: "/assets/icons/circles-stacked.svg", name: "circles-stacked.svg" },
      { path: "/assets/icons/comms-blocks-scattered.svg", name: "comms-blocks-scattered.svg" },
      { path: "/assets/icons/comms-cross.svg", name: "comms-cross.svg" },
      { path: "/assets/icons/comms-dots-arc.svg", name: "comms-dots-arc.svg" },
      { path: "/assets/icons/compass-star.svg", name: "compass-star.svg" },
      { path: "/assets/icons/concentric-ovals-horizontal.svg", name: "concentric-ovals-horizontal.svg" },
      { path: "/assets/icons/concentric-rings.svg", name: "concentric-rings.svg" },
      { path: "/assets/icons/diagonal-lines-uneven.svg", name: "diagonal-lines-uneven.svg" },
      { path: "/assets/icons/diagonal-lines.svg", name: "diagonal-lines.svg" },
      { path: "/assets/icons/diagonal-spiral-rings.svg", name: "diagonal-spiral-rings.svg" },
      { path: "/assets/icons/diagonal-wave-lines.svg", name: "diagonal-wave-lines.svg" },
      { path: "/assets/icons/diamond-outline.svg", name: "diamond-outline.svg" },
      { path: "/assets/icons/dots-concentric-rings.svg", name: "dots-concentric-rings.svg" },
      { path: "/assets/icons/dots-grid.svg", name: "dots-grid.svg" },
      { path: "/assets/icons/equalizer-bars.svg", name: "equalizer-bars.svg" },
      { path: "/assets/icons/flag-banner.svg", name: "flag-banner.svg" },
      { path: "/assets/icons/flag-with-pole.svg", name: "flag-with-pole.svg" },
      { path: "/assets/icons/journey-wave-lines.svg", name: "journey-wave-lines.svg" },
      { path: "/assets/icons/library-columns.svg", name: "library-columns.svg" },
      { path: "/assets/icons/lift-columns.svg", name: "lift-columns.svg" },
      { path: "/assets/icons/long-wave-arrow.svg", name: "long-wave-arrow.svg" },
      { path: "/assets/icons/oval-dots-grid.svg", name: "oval-dots-grid.svg" },
      { path: "/assets/icons/s-curve.svg", name: "s-curve.svg" },
      { path: "/assets/icons/s-curves-stacked.svg", name: "s-curves-stacked.svg" },
      { path: "/assets/icons/spiral.svg", name: "spiral.svg" },
      { path: "/assets/icons/star-12-point-clean.svg", name: "star-12-point-clean.svg" },
      { path: "/assets/icons/star-12-point.svg", name: "star-12-point.svg" },
      { path: "/assets/icons/triple-s-curves.svg", name: "triple-s-curves.svg" },
      { path: "/assets/icons/unlock-circles-grid.svg", name: "unlock-circles-grid.svg" },
      { path: "/assets/icons/wave-arrow.svg", name: "wave-arrow.svg" },
      { path: "/assets/icons/wave-lines-portrait.svg", name: "wave-lines-portrait.svg" },
    ],
  },
  {
    label: "Backgrounds",
    description: "Branded background textures — grain and wave variants across three colour palettes.",
    meta: "PNG · 6 files",
    action: "zip",
    zipName: "vouch-backgrounds.zip",
    files: [
      { path: "/assets/images/Backgrounds/PNG/blue_grain_bg.png", name: "blue_grain_bg.png" },
      { path: "/assets/images/Backgrounds/PNG/blue_wave_grain_bg.png", name: "blue_wave_grain_bg.png" },
      { path: "/assets/images/Backgrounds/PNG/dark_blue_grain_bg.png", name: "dark_blue_grain_bg.png" },
      { path: "/assets/images/Backgrounds/PNG/dark_blue_wave_grain_bg.png", name: "dark_blue_wave_grain_bg.png" },
      { path: "/assets/images/Backgrounds/PNG/dark_grain_bg.png", name: "dark_grain_bg.png" },
      { path: "/assets/images/Backgrounds/PNG/dark_wave_grain_bg.png", name: "dark_wave_grain_bg.png" },
    ],
  },
  {
    label: "Brand imagery",
    description: "Product screenshots and UI imagery for use in presentations, decks, and marketing materials.",
    meta: "PNG · 25 files",
    action: "zip",
    zipName: "vouch-brand-imagery.zip",
    files: [
      { path: "/assets/images/Imagery/PNG/advocacy-create-linkedin-post-landscape.png", name: "advocacy-create-linkedin-post-landscape.png" },
      { path: "/assets/images/Imagery/PNG/advocacy-generate-social-post.png", name: "advocacy-generate-social-post.png" },
      { path: "/assets/images/Imagery/PNG/amplify-voices-generate-social-post.png", name: "amplify-voices-generate-social-post.png" },
      { path: "/assets/images/Imagery/PNG/ask-vouch-ai-home.png", name: "ask-vouch-ai-home.png" },
      { path: "/assets/images/Imagery/PNG/ask-vouch-generate-highlights-video.png", name: "ask-vouch-generate-highlights-video.png" },
      { path: "/assets/images/Imagery/PNG/asset-library-search.png", name: "asset-library-search.png" },
      { path: "/assets/images/Imagery/PNG/asset-library-share-post.png", name: "asset-library-share-post.png" },
      { path: "/assets/images/Imagery/PNG/auto-edit-video-editor.png", name: "auto-edit-video-editor.png" },
      { path: "/assets/images/Imagery/PNG/employee-storytelling-record-and-share.png", name: "employee-storytelling-record-and-share.png" },
      { path: "/assets/images/Imagery/PNG/employer-branding-ask-vouch-landscape.png", name: "employer-branding-ask-vouch-landscape.png" },
      { path: "/assets/images/Imagery/PNG/employer-branding-overview.png", name: "employer-branding-overview.png" },
      { path: "/assets/images/Imagery/PNG/internal-comms-company-announcement.png", name: "internal-comms-company-announcement.png" },
      { path: "/assets/images/Imagery/PNG/internal-comms-video-summary-landscape.png", name: "internal-comms-video-summary-landscape.png" },
      { path: "/assets/images/Imagery/PNG/internal-comms-video-summary.png", name: "internal-comms-video-summary.png" },
      { path: "/assets/images/Imagery/PNG/linkedin-highlights-reel.png", name: "linkedin-highlights-reel.png" },
      { path: "/assets/images/Imagery/PNG/recruiter-share-approved-assets.png", name: "recruiter-share-approved-assets.png" },
      { path: "/assets/images/Imagery/PNG/recruiter-share-job-assets.png", name: "recruiter-share-job-assets.png" },
      { path: "/assets/images/Imagery/PNG/video-sharing-and-distribution.png", name: "video-sharing-and-distribution.png" },
      { path: "/assets/images/Imagery/PNG/vouch-platform-overview.png", name: "vouch-platform-overview.png" },
      { path: "/assets/images/Imagery/PNG/vouch-recruiter-inmail-generation-square.png", name: "vouch-recruiter-inmail-generation-square.png" },
      { path: "/assets/images/Imagery/PNG/vouch-recruiter-inmail-landscape.png", name: "vouch-recruiter-inmail-landscape.png" },
      { path: "/assets/images/Imagery/PNG/vouch-recruiter-inmail.png", name: "vouch-recruiter-inmail.png" },
      { path: "/assets/images/Imagery/PNG/vouch-recruiter-linkedin-inmail.png", name: "vouch-recruiter-linkedin-inmail.png" },
      { path: "/assets/images/Imagery/PNG/vouch-recruiter-personalised-outreach.png", name: "vouch-recruiter-personalised-outreach.png" },
    ],
  },
  {
    label: "Photography",
    description: "Approved lifestyle and portrait photography for use across brand materials.",
    meta: "PNG · 23 files",
    action: "zip",
    zipName: "vouch-photography.zip",
    files: [
      { path: "/assets/Photos/PNG/man-beard-blue-tee-home-recording.png", name: "man-beard-blue-tee-home-recording.png" },
      { path: "/assets/Photos/PNG/man-blue-cap-office-portrait.png", name: "man-blue-cap-office-portrait.png" },
      { path: "/assets/Photos/PNG/man-blue-sweater-conversation-bright.png", name: "man-blue-sweater-conversation-bright.png" },
      { path: "/assets/Photos/PNG/man-blue-sweater-laptop-office-chat.png", name: "man-blue-sweater-laptop-office-chat.png" },
      { path: "/assets/Photos/PNG/man-green-jacket-airpods-recording.png", name: "man-green-jacket-airpods-recording.png" },
      { path: "/assets/Photos/PNG/man-green-jacket-landscape-wide.png", name: "man-green-jacket-landscape-wide.png" },
      { path: "/assets/Photos/PNG/man-grey-tee-desk-phone-smiling.png", name: "man-grey-tee-desk-phone-smiling.png" },
      { path: "/assets/Photos/PNG/two-people-glasses-sofa-conversation.png", name: "two-people-glasses-sofa-conversation.png" },
      { path: "/assets/Photos/PNG/two-people-outdoor-terrace-laptop.png", name: "two-people-outdoor-terrace-laptop.png" },
      { path: "/assets/Photos/PNG/woman-beige-turtleneck-armchair-evening.png", name: "woman-beige-turtleneck-armchair-evening.png" },
      { path: "/assets/Photos/PNG/woman-black-sweater-arms-folded-testimonial.png", name: "woman-black-sweater-arms-folded-testimonial.png" },
      { path: "/assets/Photos/PNG/woman-black-sweater-fringe-phone.png", name: "woman-black-sweater-fringe-phone.png" },
      { path: "/assets/Photos/PNG/woman-blonde-white-tee-headshot.png", name: "woman-blonde-white-tee-headshot.png" },
      { path: "/assets/Photos/PNG/woman-green-knit-outdoor-sofa.png", name: "woman-green-knit-outdoor-sofa.png" },
      { path: "/assets/Photos/PNG/woman-green-sweater-conversation.png", name: "woman-green-sweater-conversation.png" },
      { path: "/assets/Photos/PNG/woman-green-sweater-phone-portrait.png", name: "woman-green-sweater-phone-portrait.png" },
      { path: "/assets/Photos/PNG/woman-linen-shirt-cafe-phone.png", name: "woman-linen-shirt-cafe-phone.png" },
      { path: "/assets/Photos/PNG/woman-linen-shirt-ipad-kitchen.png", name: "woman-linen-shirt-ipad-kitchen.png" },
      { path: "/assets/Photos/PNG/woman-navy-top-mural-portrait.png", name: "woman-navy-top-mural-portrait.png" },
      { path: "/assets/Photos/PNG/woman-platinum-hair-testimonial-seated.png", name: "woman-platinum-hair-testimonial-seated.png" },
      { path: "/assets/Photos/PNG/woman-rust-sweater-coffee-window.png", name: "woman-rust-sweater-coffee-window.png" },
      { path: "/assets/Photos/PNG/woman-rust-sweater-mug-window-gazing.png", name: "woman-rust-sweater-mug-window-gazing.png" },
      { path: "/assets/Photos/PNG/woman-yellow-sweater-armchair-laptop.png", name: "woman-yellow-sweater-armchair-laptop.png" },
    ],
  },
];

async function downloadZip(files: { path: string; name: string }[], zipName: string) {
  const zip = new JSZip();
  await Promise.all(
    files.map(async ({ path, name }) => {
      const res = await fetch(path);
      const blob = await res.blob();
      zip.file(name, blob);
    })
  );
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  a.click();
  URL.revokeObjectURL(url);
}

function CategoryRow({ category }: { category: Category }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!category.files || !category.zipName) return;
    setLoading(true);
    await downloadZip(category.files, category.zipName);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4 px-6 py-5 hover:bg-sand-light/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-dark-neutral text-sm mb-0.5">{category.label}</p>
        <p className="text-xs text-dark-neutral/40 font-body leading-relaxed max-w-lg">{category.description}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs font-body text-dark-neutral/30 hidden sm:block">{category.meta}</span>
        {category.action === "request" ? (
          <a
            href={category.requestHref}
            className="px-4 py-2 rounded-lg border border-sea-blue-mid/20 text-sea-blue-mid text-xs font-body font-medium hover:bg-sea-blue-mid hover:text-white hover:border-sea-blue-mid transition-all"
          >
            Request access
          </a>
        ) : (
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-sea-blue-mid/20 text-sea-blue-mid text-xs font-body font-medium hover:bg-sea-blue-mid hover:text-white hover:border-sea-blue-mid transition-all disabled:opacity-50"
          >
            {!loading && (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v6M2.5 5l3 3 3-3M1 10h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {loading ? "Preparing..." : "Download"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AssetsPage() {
  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Packaged Assets"
        description="Download approved Vouch brand assets — ready to use, packaged by category."
      />

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden divide-y divide-black/5">
        {CATEGORIES.map((cat) => (
          <CategoryRow key={cat.label} category={cat} />
        ))}
      </div>

      <div className="mt-8 bg-sand-light rounded-xl border border-sea-blue-mid/10 px-6 py-5">
        <p className="text-sm font-body text-dark-neutral/70">
          <span className="font-semibold text-dark-neutral">Need something else?</span>{" "}
          Contact{" "}
          <a href="mailto:ian@vouchfor.com" className="text-sea-blue-mid hover:underline">
            Ian Cook
          </a>{" "}
          — Creative Lead — for custom file formats, higher resolution assets, or anything not listed here.
        </p>
      </div>

      <PageNavigation currentHref="/assets" />
    </div>
  );
}
