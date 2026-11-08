# Vouch Brand Hub: handover

Accurate as of 9 November 2026. Prepared for whoever takes over the hub, whether or not they write code.

**If you only read one section,** read [Do these first](#1-do-these-first).

| | |
|---|---|
| **What it is** | Vouch's password-protected home for brand guidelines and assets, with an AI brand assistant called Flow |
| **Live site** | https://brand.vouchfor.com (also https://brand-hub-gamma.vercel.app) |
| **Code** | https://github.com/vouch-brand/brand-hub, branch `main` |
| **Hosting** | Vercel. Every push to `main` goes live automatically, usually within a couple of minutes |
| **AI** | Anthropic Claude API, currently `claude-haiku-4-5-20251001` |
| **Built by** | Ian Cook, Creative Lead (ian@vouchfor.com) |

---

## 1. Do these first

1. **Take over the accounts.** Use the checklist in [section 9](#9-accounts-and-secrets).
2. **Change the secrets if the previous holders should lose access.** That means the hub password and the Anthropic API key.
3. **Have a developer update Next.js.** `npm audit` currently reports 4 advisories against the installed version (14.2.35): 1 critical and 3 high. The password check relies on Next.js middleware, so check whether any advisory affects it. A fix may need a major version upgrade, so test the whole site afterwards.
4. **Decide the open brand questions** in [section 10](#10-known-issues-and-open-decisions).
5. **Replace Ian's contact details** if someone else is now the contact. [Section 5](#contact-details-and-labels) lists every location.

---

## 2. Using the hub

### Signing in

Everyone shares one password. There are no individual accounts. After signing in, a browser stays signed in for 30 days.

### What's on each page

| Sidebar item | Address | What it's for |
|---|---|---|
| Home | `/` | Ask Flow questions |
| Logo | `/logo` | Variants, clear space, misuse, co-branding |
| Colours | `/colours` | Palette values (click to copy) and accessibility pairings |
| Typography | `/typography` | Typefaces, type scales, Google alternatives |
| Visual Language | `/visual-graphics` | Backgrounds, motion, texture, brand imagery |
| Iconography | `/iconography` | Brand motifs and icons |
| Photography | `/photography` | Approved photos |
| Brand Overview | `/brand-overview` | About Vouch, visual identity, personality |
| Brand Voice & Messaging | `/brand-voice` | Tone, writing guidelines, examples (marked Draft) |
| Brand Application | `/brand-application` | Email signature generator, Canva templates, examples |
| Packaged Assets | `/assets` | Downloads bundled as zip files |

### Flow, the AI assistant

Flow can answer brand questions, review or write copy, and show colours, logos, fonts, icons and images as cards with download buttons. Use **Get inspired** for an example question.

- Conversations aren't saved. Refreshing the page starts a new one.
- Flow only knows what's written into its instructions. It doesn't read the hub pages or browse the web, so its instructions need updating separately ([section 6](#6-updating-flow)).
- As with any AI tool, check important answers against the guidelines.

### Email signatures

On Brand Application, enter a name, title and optional phone number, choose a banner, select **Copy Signature**, and paste into Gmail under Settings, See all settings, Signature.

### Getting files

- Single files: download from the relevant page.
- Bundles: use Packaged Assets. The zip is built in the browser, so Photography (about 178 MB) can take a while.
- Martina Plantijn is licensed. People request it by email, and it isn't offered for download.
- Templates live in the Vouch Canva workspace. A manager grants access.

---

## 3. How it's built

You only need this section if you're changing the code.

| Part | Technology | Location |
|---|---|---|
| Website | Next.js 14 App Router, TypeScript | `app/` |
| Styling | Tailwind CSS with brand colour names | `tailwind.config.ts`, `app/globals.css` |
| Shared brand data | One TypeScript file | `content/brand.config.ts` |
| Page order | Prev/next links | `content/nav.ts` |
| Sidebar | Navigation | `components/sidebar/Sidebar.tsx` |
| Flow interface | Chat and result cards | `components/agent/BrandAgent.tsx` |
| Flow instructions and model | Claude API route | `app/api/agent/route.ts` |
| Password | Check, cookie and login page | `middleware.ts`, `app/api/auth/route.ts`, `app/login/page.tsx` |
| Files | Images, fonts, logos, video | `public/assets/` |
| Usage stats | Vercel Analytics | Enabled in `app/layout.tsx` |

Three behaviours are worth knowing:

- **Pages are password-protected, but `/assets/` is not.** Anyone with a direct file address can open a file. The site's fonts, the login page and every email signature already sent depend on this, so never put confidential files in `public/assets/`.
- **Search engines are told to stay out** by `public/robots.txt`.
- **File names are case-sensitive once live.** `Photos` and `photos` are the same on a Mac but different on Vercel. Something that works on a laptop can break in production for this reason.

---

## 4. How to make a change

**Option A: Claude Code (recommended).** Open the project folder in Claude Code and describe the change. It reads `CLAUDE.md` automatically, so it knows how the project works. For example:

> Add these three photos to the Photography page, the Photography zip on Packaged Assets, and Flow's photo list. Run the type check, then commit and push.

> Update the Brand Voice page and Flow with the attached tone of voice guidance, and remove the Draft label.

**Option B: GitHub website.** Good for a small wording change. Open the file on GitHub, select the pencil icon, edit, and commit to `main`.

**Option C: On your own computer.** See [section 7](#7-running-it-locally).

Whichever option you use, the routine is the same:

1. Make the change.
2. For code changes, run `npx tsc --noEmit` and fix any errors.
3. Commit and push to `main`. **This publishes the change.**
4. Check the live site, including Flow if its instructions changed.

If something goes wrong, see [section 8](#8-publishing-and-undoing-a-change).

---

## 5. Updating content

### Where each page's content lives

Most pages combine shared data with text written directly into the page file. Page files are in `app/(hub)/<address>/page.tsx`.

| Page | Edit here |
|---|---|
| Logo | `brand.config.ts` (`logo`) for variants; the page file for clear space, misuse and co-branding |
| Colours | `brand.config.ts` (`colours`) for swatches; the page file for the accessibility table |
| Typography | `brand.config.ts` (`typography`) for typeface details and scales; the page file for the remaining text |
| Visual Language | Page file, including the `BACKGROUNDS` and `IMAGERY` lists |
| Iconography | Page file, `BRAND_MOTIFS` and `ICONS` lists |
| Photography | Page file, `PHOTOS` list |
| Brand Overview | Page file, plus `description` and `brandPersonality` in `brand.config.ts` |
| Brand Voice | Page file |
| Brand Application | Page file, including the signature settings at the top and the Brand in Action file list |
| Packaged Assets | Page file, `CATEGORIES` list |
| Home | `components/agent/BrandAgent.tsx`, including `INSPIRED_QUESTIONS` |

Anything changed in `brand.config.ts` reaches Flow automatically. Anything changed in a page file does not.

### Adding or changing files

Asset lists are kept by hand, so a new file has to be added in each place it should appear. Use lowercase, hyphenated file names, and keep the PNG and WebP names identical.

| Adding a... | Put the files in | Then add its name to |
|---|---|---|
| Photo | `public/assets/Photos/PNG/` and `Photos/WebP/` | `PHOTOS` on Photography; Photography in `CATEGORIES`; Flow's photo list |
| Brand image | `public/assets/images/Imagery/PNG/` and `Imagery/WebP/` | `IMAGERY` on Visual Language; Brand imagery in `CATEGORIES`; Flow's imagery list |
| Background | `public/assets/images/Backgrounds/PNG/` and `Backgrounds/WebP/` | `BACKGROUNDS` on Visual Language; Backgrounds in `CATEGORIES`; Flow's background list |
| Icon | `public/assets/icons/` (SVG), `public/assets/icons/png/` (PNG) | `ICONS` on Iconography; Icons in `CATEGORIES`; Flow's icon list |
| Brand in Action example | `public/assets/brand-in-action/` | The file list in the Brand Application page |

If the number of files changes, also update the count shown in `CATEGORIES` (`meta`, and `description` for Icons) and the matching count in Flow's "Packaged Assets page" paragraph.

**Replacing a file** is easier: upload a new version with exactly the same name and nothing else needs to change.

Keep files under GitHub's 100 MB limit. The largest today are about 13 MB.

### Changing a brand colour

Hex values are stored in several places, so search the project for the old value.

1. `content/brand.config.ts`: the hub's swatches and Flow's data.
2. `tailwind.config.ts` and `app/globals.css`: the colours the website itself uses. Update both.
3. `app/(hub)/colours/page.tsx`: the accessibility table. Recheck the contrast ratios.
4. `app/api/agent/route.ts`: Flow's written guidance and examples.
5. `docs/vouch-brand-theme.md` and `vouch-brand-swatches.ase`: the Google Slides reference and Adobe swatches.

### Changing a typeface

1. Add web font files under `public/assets/fonts/`.
2. Update the `@font-face` rules in `app/globals.css` and `fontFamily` in `tailwind.config.ts`.
3. Update `brand.config.ts` (`typography`), the Typography page, the Packaged Assets page and Flow's font guidance.

Check the font's licence covers web use. Inter's web files are in a folder called `WOFF 2`, and the space is part of the name.

### Changing a logo

Replace the files in `public/assets/logo/` using the same names. For a new variant, add it to `logo.variants` in `brand.config.ts` and to Logos in `CATEGORIES`.

### Adding a new page

1. Create `app/(hub)/my-page/page.tsx`, following the pattern in `CLAUDE.md`.
2. Add it to `NAV` in `components/sidebar/Sidebar.tsx`.
3. Add it to `content/nav.ts` in the matching position.
4. Add an icon to `public/assets/section-icons/`.
5. Tell Flow about it in `app/api/agent/route.ts`.

### Contact details and labels

`ian@vouchfor.com` or Ian's name appears in these files. Search for both when the contact changes.

- `content/brand.config.ts`
- `components/sidebar/Sidebar.tsx` (Share Feedback, in two places)
- `components/ui/PlaceholderSection.tsx`
- `components/agent/BrandAgent.tsx` (Martina Plantijn request link)
- `app/(hub)/logo/page.tsx`
- `app/(hub)/typography/page.tsx`
- `app/(hub)/assets/page.tsx`
- `app/(hub)/brand-voice/page.tsx`

The "Last updated November 2026, version 1.1" label is typed by hand in two places in `Sidebar.tsx`.

---

## 6. Updating Flow

Everything is in `app/api/agent/route.ts`.

**Its instructions** are the long `SYSTEM_PROMPT` text at the top. They include all of `brand.config.ts` automatically, followed by hand-written sections with clear capitalised headings: positioning, tone of voice, examples, founder voice, asset lists and so on. Edit the relevant section in plain English.

**Keep these rules intact** unless you're also changing the interface:

- Flow must write plain text, because the chat doesn't display Markdown.
- Blocks such as `[BRAND_COLOURS]...[/BRAND_COLOURS]` are what produce the visual cards. They must contain valid JSON and exact file names.
- Martina Plantijn must keep an empty `variants` list. That's what shows **Request access** instead of downloads.

**Its model** is the `model:` value in the `POST` function. Anthropic retires older models over time. If Flow stops working, check that first, then replace it with a current model from Anthropic's documentation. `max_tokens` limits the length of each answer.

**After any Flow change, test it on the live site:** ask about colours, ask for a logo, ask about fonts, and ask for some copy to be reviewed. Check that the cards appear and that no raw `[BRAND_...]` text is showing.

**Cost.** Each message is billed to the Anthropic account and sends the full instructions plus the conversation so far. The app has no usage limit of its own, so set a monthly spend limit in the Anthropic Console.

---

## 7. Running it locally

You'll need Git and Node.js (tested on Node 24; Next.js 14 needs at least 18.17).

```bash
git clone https://github.com/vouch-brand/brand-hub.git
cd brand-hub
npm install
```

Create a file called `.env.local` in the project folder:

```bash
ANTHROPIC_API_KEY=your_key
HUB_PASSWORD=choose_any_password
```

Then run `npm run dev` and open http://localhost:3000. The repository is large, so the first download can take a while (about 380 MB of history).

| Command | What it does |
|---|---|
| `npm run dev` | Runs the site locally and updates as you edit |
| `npx tsc --noEmit` | Checks for type errors. Run before pushing |
| `npm run build` | Runs a full production build. Use this for larger changes |
| `npm run lint` | Checks code style |

There are no automated tests, so check changes by eye.

---

## 8. Publishing and undoing a change

Pushing to `main` publishes automatically. Progress and error logs are on the project's **Deployments** page in Vercel.

**To undo a bad change quickly:** in Vercel's Deployments page, find the last good deployment and promote it to production. That restores the live site straight away, but the code on GitHub is unchanged, so follow up with the next step.

**To undo it in the code:** run `git revert <commit>` and push. This keeps the history intact.

The tag `v0.6-stable` marks an older baseline from May 2026. It predates later changes, so don't treat it as a recent backup.

### Troubleshooting

| Symptom | Likely cause |
|---|---|
| Flow says "Sorry, I ran into an issue" | Check Vercel's logs. Usually an invalid or out-of-credit API key, or a retired model |
| Flow shows raw `[BRAND_...]` text | The block in its reply didn't follow the format; review recent prompt edits |
| A Flow card has a broken image | The file name in Flow's list doesn't exactly match the file |
| Images work locally but not live | Upper or lower case differences in the path, or the file wasn't committed |
| The correct password doesn't work | `HUB_PASSWORD` was changed without redeploying, or isn't set in Vercel |
| The deployment failed | Open its log in Vercel. Run `npm run build` locally to reproduce it |
| A zip is missing a file or is corrupt | A path in `CATEGORIES` doesn't match the actual file |

---

## 9. Accounts and secrets

No passwords or keys are stored in this document or in Git.

| Service | Used for | New owner has access? |
|---|---|---|
| GitHub: `vouch-brand/brand-hub` | The code | ☐ |
| Vercel: Vouch account, Brand Hub project | Hosting, settings, analytics | ☐ |
| Anthropic Console | API key and billing for Flow | ☐ |
| DNS for `vouchfor.com` | Points `brand.vouchfor.com` at Vercel | ☐ |
| Canva: Vouch workspace | Presentation and social templates | ☐ |
| Martina Plantijn licence | Licence documents and the font files | ☐ |

**Settings required in Vercel** (Project, Settings, Environment Variables):

| Name | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Lets Flow reach Claude |
| `HUB_PASSWORD` | The shared site password |

**To change the password:** update `HUB_PASSWORD` in Vercel, then redeploy. Settings only apply to new deployments. Everyone is signed out and needs the new password.

**To replace the API key:** create a new key in the Anthropic Console, update Vercel, redeploy, confirm Flow works, then delete the old key.

### Copying this folder

Clone it fresh from GitHub where possible. If you copy the folder directly, leave these out:

| Leave out | Why |
|---|---|
| `.env.local` | **Contains live secrets**, including the API key and password |
| `.claude/` | One person's local Claude Code settings |
| `node_modules/`, `.next/` | Generated, and recreated by `npm install` and a build |
| `.DS_Store` files | Mac system files |

Keep the `.git` folder, because that's the project's history.

---

## 10. Known issues and open decisions

### Needs a decision

| Item | Detail |
|---|---|
| **Company values** | The Brand Overview page says "Values in progress" and Flow's instructions say they're not yet defined, but `brand.config.ts` lists four (Expert, Innovative, Trustworthy, Collaborative), which Flow can also see. Confirm them and update all three, or remove them from `brand.config.ts`. |
| **Brand Voice is still Draft** | The page has a Draft badge and a work-in-progress banner. Remove them once signed off. |
| **Positioning status is out of date** | `brand.config.ts` still says "pending customer research validation (expected w/c April 20)". Flow's instructions also label the positioning May 2026 and WIP. |
| **"Talent teams" wording** | The preferred phrases and some on-brand examples say "talent teams", while current positioning focuses on Employer Brand and Internal Comms teams. Decide which should stand. |
| **Newer imagery isn't packaged** | 15 images added in May 2026 (Advocacy, Content, Recruiter, Agents, Ask Vouch, MCP) appear on Visual Language, but aren't in the Brand imagery zip or Flow's list. Add them if they should be. |

### Technical

| Item | Detail |
|---|---|
| **Next.js security advisories** | See [Do these first](#1-do-these-first). Highest priority. |
| **Simple password protection** | One shared password, and the login cookie contains the password itself. That's reasonable for low-sensitivity brand material, but it isn't suitable for anything confidential. Individual sign-in would be the upgrade. |
| **Martina Plantijn can be reached directly** | Browsers need the font files to display headings, so they can't be fully locked. Downloads are no longer offered, but someone could still fetch the files. Check this against the licence's web-use terms. |
| **Signatures depend on the domain** | Sent signatures load images from `brand.vouchfor.com/assets/`. Moving the domain or files would break the images in signatures people are already using. |
| **Signature logo is an SVG** | Some email apps don't display SVG images. Test in the apps your team uses, and switch to the PNG if needed. The setting is `LOGO_URL` in the Brand Application page. |
| **Canva link is generic** | It goes to canva.com rather than the Vouch workspace. Update it on the Brand Application page and in Flow's instructions. |
| **Unused files** | Safe to remove when convenient: `lemniscate-fixed.json`, `lemniscate-loop-working.json` and `lemniscate-mask-fixed.json` in `public/assets/`, the Geist fonts in `app/fonts/`, the empty `public/assets/patterns/` folder, and `PlaceholderSection.tsx` if placeholders aren't needed. `README.md` is the default Next.js text. |

---

## 11. Reusing this for another brand

The hub was built so it can be rebranded. `CLAUDE.md` has the step-by-step list under "Rebranding this for a new company". With Claude Code, supply the new brand guidelines and assets and ask it to apply them. Allow time to rewrite Flow's instructions and the text in each page file, because that's where most of the Vouch-specific content lives.

## 12. Other documents in this project

| File | What it's for |
|---|---|
| `CLAUDE.md` | Technical guide read automatically by Claude Code. Keep it current |
| `docs/vouch-brand-theme.md` | Colour and type reference for building a Google Slides theme |
| `vouch-brand-swatches.ase` | Brand colours for Adobe apps |
