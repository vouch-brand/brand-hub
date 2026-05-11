import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";
import { brand } from "@/content/brand.config";

export const metadata: Metadata = { title: "Brand Overview — Vouch Brand Hub" };

export default function BrandOverviewPage() {
  const { visualIdentity } = brand;

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Brand Overview"
        description="Who we are, what we believe, and how we show up in the world."
      />

      {/* About Vouch */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">About Vouch</h2>
        <div className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm mb-4">
          <p className="font-heading text-sea-blue-dark text-3xl leading-tight mb-4 max-w-2xl">
            Let your team tell your story.
          </p>
          <p className="font-body text-dark-neutral/70 text-sm leading-relaxed max-w-2xl mb-3">
            Your employees have great stories. Getting them to share is the hard part. Vouch makes it effortless.
          </p>
          <p className="font-body text-dark-neutral/70 text-sm leading-relaxed max-w-2xl mb-6">
            {brand.description}
          </p>
          <a
            href="https://www.vouchfor.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-body text-sea-blue-mid hover:underline"
          >
            Read the Vouch story
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              heading: "Get employees to show up",
              body: "The hardest part of Employer Brand content isn't creating it. It's getting employees to participate. Vouch makes it easy to ask, easy to submit, and easy to say yes.",
            },
            {
              heading: "Keep content in one place",
              body: "Instructions scattered across docs. Videos buried in folders. Follow-ups lost in Slack. Vouch centralises your content so your team isn't chasing anything.",
            },
            {
              heading: "Find the clip instantly",
              body: "You know the content is in there somewhere. Ask Vouch finds it in seconds — from inside Vouch or from Claude, ChatGPT, or Gemini. No tab switching. No manual searching.",
            },
            {
              heading: "Do more without burning out",
              body: "Employer Brand teams are expected to produce more with less. Vouch doesn't just help you keep up. It helps you get ahead.",
            },
          ].map(({ heading, body }) => (
            <div key={heading} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="font-heading text-lg text-sea-blue-dark mb-2">{heading}</h3>
              <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-4">Our Values</h2>
        <div className="bg-sand-light rounded-xl border border-sea-blue-mid/10 px-6 py-5">
          <p className="font-body text-sm text-dark-neutral/40">Values in progress — check back soon.</p>
        </div>
      </section>

      {/* Visual Identity */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Visual Identity</h2>
        <div className="bg-sea-blue-dark rounded-2xl p-8 mb-4 space-y-3">
          <p className="font-heading text-white text-xl leading-snug max-w-2xl">
            Vouch is designed to feel like the antithesis of a typical SaaS platform — deliberately decaffeinated in a world that&apos;s permanently turned up to eleven.
          </p>
          <p className="font-body text-white/70 text-sm leading-relaxed max-w-2xl">
            Less digital, more editorial. Paper-like backgrounds, film grain, a serif that&apos;s confident without being formal, low contrast, generous space.
          </p>
          <p className="font-body text-white/70 text-sm leading-relaxed max-w-2xl">
            Where most SaaS feels glaring and clinical, Vouch feels grounded and real. More Kindle, less iPad.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-4">Design vocabulary</p>
          <div className="flex flex-wrap gap-2">
            {visualIdentity.keywords.map((word) => (
              <span key={word} className="px-3 py-1.5 rounded-full bg-sand-light border border-black/8 text-dark-neutral/70 font-body text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Personality */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Brand Personality</h2>
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            {brand.brandPersonality.keywords.map((k) => (
              <span key={k} className="px-4 py-2 rounded-full bg-sea-blue-mid/8 text-sea-blue-mid font-body font-medium text-sm">
                {k}
              </span>
            ))}
          </div>
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">{brand.brandPersonality.aesthetic}</p>
        </div>
      </section>

      <PageNavigation currentHref="/brand-overview" />
    </div>
  );
}
