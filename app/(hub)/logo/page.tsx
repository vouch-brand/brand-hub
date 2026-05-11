import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";
import { brand } from "@/content/brand.config";

export const metadata: Metadata = { title: "Logo — Vouch Brand Hub" };

export default function LogoPage() {
  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Logo"
        description="The Vouch wordmark is our primary brand identifier. Use only the supplied files — never recreate or typeset it."
      />

      {/* Our Logo */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">Our Logo</h2>
        <p className="font-body text-sm text-dark-neutral/70 max-w-2xl leading-relaxed">
          {brand.logo.description} The logo appears as a wordmark only — there is no standalone icon. The clear space rule is simple: maintain a minimum margin equal to the height of the &apos;h&apos; in the wordmark on all four sides.
        </p>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brand.logo.variants.map((variant) => {
            const bgClass =
              variant.name === "Blue on Sand"
                ? "bg-sand-light"
                : variant.name === "White on Dark"
                ? "bg-sea-blue-dark"
                : "bg-white";

            return (
              <div key={variant.name} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
                <div className={`${bgClass} h-36 flex items-center justify-center border-b border-black/5 px-10`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={variant.file}
                    alt={`Vouch wordmark — ${variant.name}`}
                    className="h-10 w-auto"
                  />
                </div>
                <div className="p-4">
                  <p className="font-body font-semibold text-dark-neutral text-sm mb-1">{variant.name}</p>
                  <p className="text-xs text-dark-neutral/50 font-body mb-4 leading-relaxed">{variant.usage}</p>
                  <div className="flex gap-2">
                    <a
                      href={variant.file}
                      download
                      className="flex-1 text-center text-xs font-body font-medium border border-sea-blue-mid/30 text-sea-blue-mid hover:bg-sea-blue-mid hover:text-white transition-all rounded-lg px-3 py-2"
                    >
                      SVG
                    </a>
                    <a
                      href={variant.file.replace(".svg", ".png")}
                      download
                      className="flex-1 text-center text-xs font-body font-medium border border-sea-blue-mid/30 text-sea-blue-mid hover:bg-sea-blue-mid hover:text-white transition-all rounded-lg px-3 py-2"
                    >
                      PNG
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clear Space */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">Clear Space</h2>
        <p className="font-body text-sm text-dark-neutral/70 mb-6 max-w-2xl leading-relaxed">
          Maintain a minimum clear space equal to the height of the &apos;h&apos; in the wordmark on all four sides. This ensures the logo always has room to breathe and is clear to read.
        </p>
        <div className="bg-white rounded-2xl border border-black/5 p-12 shadow-sm flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-usage/clear-space.svg"
            alt="Vouch clear space diagram"
            className="max-w-sm w-full h-auto"
          />
        </div>
      </section>

      {/* Misuse */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Logo Misuse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { file: "rotate or tilt.svg", rule: "Do not rotate or tilt the logo." },
            { file: "Stretch or distort.svg", rule: "Do not stretch or distort proportions." },
            { file: "unapproved colours or gradients.svg", rule: "Do not recolor in unapproved colours or gradients." },
            { file: "Poor contrast.svg", rule: "Do not place on busy or low-contrast backgrounds." },
            { file: "No 3D.svg", rule: "No 3D." },
            { file: "Drop shadow.svg", rule: "Do not add drop shadows or graphic effects." },
          ].map(({ file, rule }) => (
            <div key={file} className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
              <div className="bg-sand-light border-b border-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/logo-usage/${encodeURIComponent(file)}`}
                  alt={rule}
                  className="w-full h-auto block"
                />
              </div>
              <div className="p-4 flex items-start gap-3">
                <span className="text-red-400 font-body font-semibold shrink-0 text-sm mt-px">✕</span>
                <p className="text-sm font-body text-dark-neutral/70 leading-relaxed">{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Co-branding */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-3">Co-branding & Partnerships</h2>
        <p className="font-body text-sm text-dark-neutral/70 mb-6 max-w-2xl leading-relaxed">
          When the Vouch logo appears alongside a partner or client logo, these rules apply. The goal is visual harmony — neither brand should dominate.
        </p>
        <div className="space-y-4">

          {/* Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "Sizing",
                rule: "Partner logos should appear at a similar optical weight to the Vouch wordmark. Neither should be noticeably larger than the other.",
              },
              {
                label: "Separation",
                rule: "We use a '×' as the standard separator between logos. Leave clear space around the Vouch wordmark consistent with the clear space guideline above — apply the same minimum margin on the sides facing the partner logo.",
              },
              {
                label: "Backgrounds",
                rule: "Apply the same background rules as the standalone logo. Do not use a Vouch logo variant that clashes with the partner's colour.",
              },
            ].map(({ label, rule }) => (
              <div key={label} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-2">{label}</p>
                <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-500 text-xs font-body font-semibold">✓</span>
                <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30">Do</p>
              </div>
              <ul className="space-y-2">
                {[
                  "Use the supplied SVG logo files — never redraw or typeset the wordmark",
                  "Maintain clear space around the Vouch wordmark as if it were standalone",
                  "Use a neutral or brand-approved background when partner's palette conflicts",
                  "Check with ian@vouchfor.com before finalising any co-branded asset",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-400 text-xs mt-0.5 shrink-0">✓</span>
                    <span className="font-body text-sm text-dark-neutral/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-400 text-xs font-body font-semibold">✕</span>
                <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30">Don&apos;t</p>
              </div>
              <ul className="space-y-2">
                {[
                  "Don't place Vouch and partner logos so close together they appear as one lockup",
                  "Don't modify the Vouch wordmark to match a partner's colour palette",
                  "Don't stack logos vertically without a clear separator",
                  "Don't let a partner logo visually dominate the Vouch wordmark, or vice versa",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 text-xs mt-0.5 shrink-0">✕</span>
                    <span className="font-body text-sm text-dark-neutral/70 line-through decoration-red-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lockup example */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-6 py-8 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-usage/Partner%20Lock%20up%20example.svg"
                alt="Co-branding lockup example"
                style={{ height: 60, width: "auto" }}
              />
            </div>
            <div className="px-6 py-4 border-t border-black/5">
              <p className="font-body text-xs text-dark-neutral/40 leading-relaxed">
                Lockup example — more examples available, contact{" "}
                <a href="mailto:ian@vouchfor.com" className="text-sea-blue-mid hover:underline">ian@vouchfor.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>


      <PageNavigation currentHref="/logo" />
    </div>
  );
}
