import type { Metadata } from "next";
import { Source_Serif_4, Roboto } from "next/font/google";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";
import { brand } from "@/content/brand.config";

const sourceSerif4 = Source_Serif_4({ subsets: ["latin"], weight: ["600"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = { title: "Typography — Vouch Brand Hub" };

const scale = brand.typography.scale;

const scaleEntries = [
  { key: "H1", spec: scale.h1, sample: "The future of talent teams" },
  { key: "H2", spec: scale.h2, sample: "Streamline your hiring workflow" },
  { key: "H3", spec: scale.h3, sample: "Collaborate with confidence" },
  { key: "P1", spec: scale.p1, sample: "Vouch brings clarity to complex hiring processes.", heading: false },
  { key: "P2", spec: scale.p2, sample: "Effortless experience for every talent team member.", heading: false },
  { key: "P3", spec: scale.p3, sample: "Use Inter for all UI elements, supporting copy, and body text.", heading: false },
];

export default function TypographyPage() {
  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Typography"
        description="Two typefaces work in harmony — Martina Plantijn for expression, Inter for clarity."
      />

      {/* Primary Typeface */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Primary Typeface — Martina Plantijn</h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="bg-sea-blue-dark p-10">
            <p className="font-heading text-white text-5xl leading-none mb-2">Aa</p>
            <p className="font-heading text-white/60 text-xl mt-4">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 !@#$%&
            </p>
          </div>
          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-body font-semibold text-dark-neutral text-sm mb-1">Martina Plantijn</p>
              <p className="text-xs text-dark-neutral/50 font-body max-w-sm leading-relaxed mb-1">
                {brand.typography.primary.role}
              </p>
              <p className="text-xs text-dark-neutral/30 font-body">
                Weights: {brand.typography.primary.weights.join(", ")}
              </p>
              <p className="text-xs text-dark-neutral/30 font-body mt-0.5">
                Google fallback: {brand.typography.primary.googleFallback}
              </p>
            </div>
            <a
              href="mailto:ian@vouchfor.com?subject=Martina%20Plantijn%20typeface%20access%20request"
              className="shrink-0 px-4 py-2 rounded-lg border border-sea-blue-mid/30 text-sea-blue-mid text-xs font-body font-medium hover:bg-sea-blue-mid hover:text-white transition-all"
            >
              Request access
            </a>
          </div>
        </div>
      </section>

      {/* Secondary Typeface */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Secondary Typeface — Inter</h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="bg-sand-light p-10 border-b border-black/5">
            <p className="font-body text-sea-blue-dark text-5xl font-normal leading-none mb-2">Aa</p>
            <p className="font-body text-sea-blue-dark/50 text-xl mt-4">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 !@#$%&
            </p>
          </div>
          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-body font-semibold text-dark-neutral text-sm mb-1">Inter</p>
              <p className="text-xs text-dark-neutral/50 font-body max-w-sm leading-relaxed mb-1">
                {brand.typography.secondary.role}
              </p>
              <p className="text-xs text-dark-neutral/30 font-body">
                Weights: {brand.typography.secondary.weights.join(", ")}
              </p>
              <p className="text-xs text-dark-neutral/30 font-body mt-0.5">
                Google fallback: {brand.typography.secondary.googleFallback}
              </p>
            </div>
            <a
              href={brand.typography.secondary.file}
              download
              className="shrink-0 px-4 py-2 rounded-lg border border-sea-blue-mid/30 text-sea-blue-mid text-xs font-body font-medium hover:bg-sea-blue-mid hover:text-white transition-all"
            >
              Download .otf
            </a>
          </div>
        </div>
      </section>

      {/* Type Scale */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Type Scale</h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden divide-y divide-black/5">
          {scaleEntries.map(({ key, spec, sample, heading = true }) => (
            <div key={key} className="p-6 flex items-center gap-6">
              <div className="w-8 shrink-0">
                <span className="text-xs font-body font-semibold text-sea-blue-mid/60 uppercase tracking-widest">{key}</span>
              </div>
              <div className="flex-1">
                <p
                  className={heading ? "font-heading text-dark-neutral" : "font-body text-dark-neutral"}
                  style={{
                    fontSize: spec.size,
                    fontWeight: spec.weight === "Medium" ? 500 : spec.weight === "SemiBold" ? 600 : 400,
                    letterSpacing: spec.kerning === "-3" ? "-0.03em" : "0",
                    lineHeight: spec.lineHeight,
                  }}
                >
                  {sample}
                </p>
              </div>
              <div className="shrink-0 text-right text-[11px] font-body text-dark-neutral/30 space-y-0.5">
                <p>{spec.size} / {spec.weight}</p>
                <p>Kern {spec.kerning} / LH {spec.lineHeight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Spacing & Alignment</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Line Height", value: "1.5× body size" },
            { label: "Heading Kerning", value: "-3" },
            { label: "Body Kerning", value: "0" },
            { label: "Paragraph Spacing", value: "1.5× font size" },
          ].map((rule) => (
            <div key={rule.label} className="bg-white rounded-xl border border-black/5 p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1">{rule.label}</p>
              <p className="font-body font-semibold text-dark-neutral text-sm">{rule.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web Type Scale */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Web Type Scale</h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <div className="grid grid-cols-4 border-b border-black/5 min-w-[480px]">
            {["Style", "Desktop", "Tablet", "Mobile"].map((h) => (
              <div key={h} className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-body font-semibold text-dark-neutral/30">
                {h}
              </div>
            ))}
          </div>
          {[
            { label: "Display", desktop: "112px / 7rem", tablet: "88px / 5.5rem", mobile: "64px / 4rem" },
            { label: "H1", desktop: "80px / 5rem", tablet: "64px / 4rem", mobile: "48px / 3rem" },
            { label: "H2", desktop: "64px / 4rem", tablet: "48px / 3rem", mobile: "40px / 2.5rem" },
            { label: "H3", desktop: "48px / 3rem", tablet: "40px / 2.5rem", mobile: "36px / 2.25rem" },
            { label: "H4", desktop: "32px / 2rem", tablet: "28px / 1.75rem", mobile: "—" },
            { label: "H5", desktop: "24px / 1.5rem", tablet: "—", mobile: "—" },
            { label: "H6 / Large", desktop: "20px / 1.25rem", tablet: "—", mobile: "—" },
            { label: "Body", desktop: "16px / 1rem", tablet: "—", mobile: "—" },
            { label: "Small", desktop: "14px / 0.875rem", tablet: "—", mobile: "—" },
          ].map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 min-w-[480px] ${i % 2 === 0 ? "" : "bg-sand-light/40"} divide-x divide-black/5`}>
              <div className="px-4 py-3 text-xs font-body font-semibold text-dark-neutral">{row.label}</div>
              <div className="px-4 py-3 text-xs font-mono text-dark-neutral/70">{row.desktop}</div>
              <div className="px-4 py-3 text-xs font-mono text-dark-neutral/40">{row.tablet}</div>
              <div className="px-4 py-3 text-xs font-mono text-dark-neutral/40">{row.mobile}</div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Google Alternatives */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">Google Alternatives</h2>
        <p className="text-sm text-dark-neutral/50 font-body mb-4 leading-relaxed">
          For Google Slides, Docs, or any environment where custom fonts aren&apos;t available:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-black/5 p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1">Martina Plantijn alternative</p>
            <p className={`${sourceSerif4.className} font-semibold text-dark-neutral text-base`}>Source Serif 4</p>
            <p className="text-xs text-dark-neutral/40 font-body mt-1">Available on Google Fonts — use for headings in documents</p>
          </div>
          <div className="bg-white rounded-xl border border-black/5 p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-1">Inter alternative</p>
            <p className={`${roboto.className} font-semibold text-dark-neutral text-base`}>Roboto</p>
            <p className="text-xs text-dark-neutral/40 font-body mt-1">Available on Google Fonts — use for body and UI copy in documents</p>
          </div>
        </div>
      </section>

      <PageNavigation currentHref="/typography" />
    </div>
  );
}
