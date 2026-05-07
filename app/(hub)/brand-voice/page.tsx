import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageNavigation from "@/components/ui/PageNavigation";
import { brand } from "@/content/brand.config";

export const metadata: Metadata = { title: "Brand Voice & Messaging — Vouch Brand Hub" };

export default function BrandVoicePage() {
  const { voice } = brand;

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-5xl">
      <PageHeader
        title="Brand Voice & Messaging"
        description="How Vouch speaks — the tone, vocabulary, and principles that make our communication recognisably ours."
        badge="Draft"
      />

      {/* Draft banner */}
      <div className="bg-sun-light border border-sun-mid/30 rounded-xl px-5 py-4 mb-10 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-sun-dark">
          <path d="M8 6v4M8 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        <p className="text-sm font-body text-sun-dark">
          <span className="font-semibold">Draft — pending internal review.</span> This content reflects current thinking but has not yet been formally approved. Please check with Ian Cook before using in external communications.
        </p>
      </div>

      {/* Voice and Tone */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Voice and Tone</h2>
        <div className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm">
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-4 max-w-2xl">
            Think of it this way: you have the same voice all the time, but your tone changes. Same person at a team lunch versus presenting to a new client — different register, same personality. Vouch works the same way. Our voice is consistent. Our tone shifts depending on who we&apos;re talking to and what they&apos;re going through.
          </p>
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-4 max-w-2xl">
            We&apos;ve spent time with talent teams. We know what their days actually look like — the pressure, the manual work, the one-more-urgent-request. We&apos;re not here to sound impressive. We&apos;re here to be useful.
          </p>
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-4 max-w-2xl">
            Vouch is an Australian company, and that shapes how we write. We don&apos;t overclaim. We don&apos;t shout. There&apos;s a directness and lack of pretension that runs through everything we make — we&apos;d rather understate something great than oversell something ordinary. <span className="text-dark-neutral font-medium">Confident</span> without the bravado. <span className="text-dark-neutral font-medium">Human</span> without being gushing. <span className="text-dark-neutral font-medium">Decaffeinated</span> — calm in an industry that&apos;s permanently at full volume.
          </p>
          <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-6 max-w-2xl">
            Tone-wise: warmer when things are going well, patient and precise when explaining something complex, calm and direct when something&apos;s gone wrong. Vouch has personality — let it show when it comes naturally. But don&apos;t force it. A straight face is better than a strained joke.
          </p>
          <div className="border-t border-black/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {[
              { label: "Plainspoken", body: "Cut the buzzwords, superlatives, jargon. If it reads like a press release, rewrite it." },
              { label: "Direct", body: "Lead with what matters. Say it once, clearly. Don't bury the point in qualifications." },
              { label: "Human", body: "Write for the person. Acknowledge what they're actually going through." },
              { label: "Understated", body: "\"See how it works\" beats \"transform your workflow.\" The product earns the proof." },
            ].map(({ label, body }) => (
              <div key={label} className="flex gap-3">
                <span className="text-sea-blue-mid/40 text-xs mt-0.5 shrink-0">—</span>
                <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">
                  <span className="text-dark-neutral font-medium">{label}.</span> {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Guidelines */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Writing Guidelines</h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden divide-y divide-black/5">
          {[
            {
              rule: "Sentence case",
              guidance: "Headings and titles use sentence case, not title case. \"Let your team tell your story\" — not \"Let Your Team Tell Your Story.\" It's more readable and less formal, which matches the brand.",
            },
            {
              rule: "Australian English",
              guidance: "We're an Australian company — use Australian spelling throughout. Realise, colour, organisation, centre, behaviour, recognise. When in doubt, follow the Macquarie Dictionary.",
            },
            {
              rule: "Active voice",
              guidance: "The subject does the action. \"Vouch sends the brief\" — not \"The brief is sent by Vouch.\" Passive voice adds words without adding meaning.",
            },
            {
              rule: "Contractions",
              guidance: "Use them. They're warmer and more direct. \"You're\" not \"you are\". \"It's\" not \"it is\". We're talking to people, not writing a legal document.",
            },
            {
              rule: "Exclamation marks",
              guidance: "Sparingly — only if you'd genuinely say it that way out loud. Never in error messages or failure states. When in doubt, leave it out.",
            },
            {
              rule: "Numbers",
              guidance: "Spell out one through nine. Use numerals for 10 and above. If a number starts a sentence, always spell it out.",
            },
            {
              rule: "Oxford comma",
              guidance: "Always. \"Collaboration, content, and automation\" — not \"collaboration, content and automation.\"",
            },
            {
              rule: "Em dash",
              guidance: "Use an em dash — like this — in place of semicolons for related asides. No spaces on either side. Never use double hyphens (--).",
            },
            {
              rule: "Positive framing",
              guidance: "\"To add a user, go to Settings\" — not \"You can't add a user unless you go to Settings.\" Frame what to do, not what not to do.",
            },
          ].map(({ rule, guidance }) => (
            <div key={rule} className="px-6 py-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-8 items-baseline">
              <p className="font-body font-semibold text-dark-neutral text-sm">{rule}</p>
              <p className="font-body text-sm text-dark-neutral/70 leading-relaxed">{guidance}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vocabulary */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-6">Vocabulary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-4">Use these</p>
            <ul className="space-y-2">
              {voice.preferredPhrases.map((phrase) => (
                <li key={phrase} className="flex items-start gap-2">
                  <span className="text-sea-blue-mid/40 text-xs mt-0.5 shrink-0">—</span>
                  <span className="font-body text-sm text-dark-neutral">{phrase}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-4">Avoid these</p>
            <ul className="space-y-2">
              {voice.avoidPhrases.map((phrase) => (
                <li key={phrase} className="flex items-start gap-2">
                  <span className="text-dark-neutral/20 text-xs mt-0.5 shrink-0">—</span>
                  <span className="font-body text-sm text-dark-neutral/40 line-through">{phrase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* In Practice */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-dark-neutral mb-3">In Practice</h2>
        <p className="font-body text-sm text-dark-neutral/70 leading-relaxed mb-6 max-w-2xl">
          The same idea, written two ways. The off-brand version isn&apos;t always obviously wrong — that&apos;s the point.
        </p>
        <div className="space-y-4">
          {[
            {
              scenario: "Describing what Vouch does",
              offBrand: "Vouch is a revolutionary, game-changing platform that disrupts the talent acquisition industry with cutting-edge AI capabilities and a next-generation suite of tools.",
              onBrand: "Vouch is an AI-enabled workspace for talent teams. It reduces time to hire by bringing collaboration, content, and automation into one place.",
              note: "Drop the buzzwords. Lead with what it actually does.",
            },
            {
              scenario: "A call to action",
              offBrand: "Sign up now and supercharge your talent team's workflow with our powerful, industry-leading solution!",
              onBrand: "See how it works. Book a demo.",
              note: "Short and confident beats loud and breathless.",
            },
            {
              scenario: "Describing a feature",
              offBrand: "Our fancy AI-powered feature automates your entire content creation process, saving you hassle and dramatically boosting productivity across your team.",
              onBrand: "Create a brief. Vouch builds the assets. Your team reviews and sends.",
              note: "Show the workflow, not the hype. Let the product speak.",
            },
            {
              scenario: "Talking about customers",
              offBrand: "Thousands of users leverage our platform to optimise their talent acquisition workflows and maximise ROI.",
              onBrand: "Thousands of talent teams use Vouch to fill roles faster — without the chaos.",
              note: "Write like you're on their side, not reporting metrics at them.",
            },
          ].map(({ scenario, offBrand, onBrand, note }) => (
            <div key={scenario} className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/5">
                <p className="font-body font-semibold text-dark-neutral text-sm">{scenario}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/5">
                <div className="px-6 py-5">
                  <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-3">Off-brand</p>
                  <p className="font-body text-sm text-dark-neutral/50 leading-relaxed italic">&ldquo;{offBrand}&rdquo;</p>
                </div>
                <div className="px-6 py-5 bg-sea-blue-dark/[0.02]">
                  <p className="text-[10px] uppercase tracking-widest font-body text-dark-neutral/30 mb-3">On-brand</p>
                  <p className="font-body text-sm text-dark-neutral leading-relaxed">&ldquo;{onBrand}&rdquo;</p>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-black/5 bg-sand-light/50">
                <p className="font-body text-xs text-dark-neutral/40 leading-relaxed">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PageNavigation currentHref="/brand-voice" />
    </div>
  );
}
