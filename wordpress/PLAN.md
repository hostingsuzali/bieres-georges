# Plan — Rebuild Bières Georges as a WordPress site (custom theme + plugin + ACF Pro)

## Context

Today Bières Georges is a Next.js 16 / React / Tailwind v4 / framer-motion site deployed on Netlify (`bieres.netlify.app`). All content is hard-coded in TypeScript (`lib/products.ts`, `lib/data.ts`, `lib/constants.ts`, `lib/medals.ts`) and in JSX. So every text change, new beer, new article or team update needs a developer and a deploy.

**Goal:** rebuild it as WordPress with the same look, motion, URLs and speed. The marketing team and the client (Julien, Luna) must be able to edit everything from wp-admin.

**Decisions (from the user):**
- Editing uses **ACF Pro blocks in Gutenberg**. Each site section is a block with a live preview, the design is locked, and editors can add, reorder or remove sections.
- **V1 pages are the live pages.** The V2-only sections become **extra reusable blocks** that marketing can use later. The V1/V2 switcher is dropped and `/…/v2` URLs 301 to V1.
- **Forms are built into our plugin.** Submissions are saved in wp-admin and notified by email, and recipients are set in Options. No paid form plugin.

**Rules Claude Code must follow during execution:**
- Do **not** start dev servers or headless browsers without asking the user first (port 3000 is used by another project; see memory `no-dev-servers`). Prefer static checks: `php -l`, PHPCS, the build, and `wp` CLI only if the user has a local WP running.
- Client sources of truth: `pptx_extract.txt` (product sheets) and `public/Charte Graphique_Dossier/Charte Graphique Rapport.txt` (fonts: **GW Grayback** + **Poppins** only). Do not invent product data.
- All admin labels, field labels, instructions and front-end strings are in **French**. Make them translation-ready with text domain `bieres-georges` / `bg-core`.
- Keep the existing Next.js app untouched until cutover. All new code goes in a new `wordpress/` folder in this repo.

---

## 1. Target architecture

```
wordpress/
├── wp-content/themes/bieres-georges/      ← presentation only (templates, blocks' markup, CSS/JS)
├── wp-content/plugins/bg-core/            ← data & logic (CPTs, taxonomies, ACF field groups as JSON,
│                                            options pages, forms, REST, seed/import, helpers, roles)
├── seed/                                  ← JSON exported from lib/*.ts + asset manifest
├── .wp-env.json                           ← optional local env (user runs it, not Claude)
└── README.md                              ← install / build / deploy / editor guide links
scripts/export-wp-seed.ts                  ← one-shot exporter (run with `npx tsx`)
```

**Why theme + plugin are split:** content models (beers, medals, timeline, team, forms) must survive a theme change. The theme only renders.

**Stack:** WordPress ≥ 6.6, PHP ≥ 8.2, ACF Pro ≥ 6.3 (Blocks v3 via `block.json`), Composer (PHPCS/WPCS only), Node 20+ for the theme build.

**Minimal third-party plugins:**
- ACF Pro (required)
- Yoast SEO (meta, sitemap, breadcrumbs)
- WP Mail SMTP (form deliverability)
- Safe SVG (logos)
- A page cache: host-native, or LiteSpeed Cache / WP Super Cache

Nothing else; no page builder.

---

## 2. Theme `bieres-georges` (classic PHP theme + ACF blocks + `theme.json`)

### 2.1 Files
```
style.css, functions.php, theme.json
inc/ setup.php (supports, menus, image sizes), assets.php (enqueue, preload, defer),
     cleanup.php (emoji, oEmbed, jQuery off front, block-library CSS pruning),
     template-tags.php (PHP ports of UI helpers), blocks.php (auto-register /blocks/*),
     editor.php (allowed blocks, patterns, editor styles), icons.php (SVG sprite)
header.php, footer.php, front-page.php, page.php, single.php, home.php (Actualités),
single-bg_beer.php, archive-bg_beer.php (fallback), 404.php, search.php
template-parts/ header/*, footer/*, beer/{hero,technical,related,tile,card}.php,
                post/{card,featured}.php, ui/{cta-link,badge,section-label,animated-heading,
                page-hero,beer-scales,format-pictos,medal-row,ingredient-icon}.php
blocks/<name>/{block.json, render.php, style.css?, view.js?, preview.png}
patterns/ page-accueil.php, page-brasserie.php, page-trouver.php, page-tireuse.php,
          page-travailler.php, page-contact.php, page-actualites.php
assets/src/{css/main.css, js/*.js}  → assets/dist/ (built, committed for deploy)
assets/fonts/ GWGrayback.woff2 (converted from public/GW Grayback…/Variable/GWGraybackVFVF.ttf),
              poppins-{300..900}{,-italic}.woff2 (latin subset)
assets/svg/ sprite.svg (from components/ui/Icon.tsx + components/beers/Pictograms.tsx)
```

### 2.2 CSS: same design tokens, same utility classes
- Build Tailwind v4 with `@tailwindcss/cli`, sourcing `**/*.php` and `assets/src/js/**`. Copy `app/globals.css` **verbatim** as the base:
  - `@theme` colors: cream `#f6ede4`, cream-dark `#efe2d4`, green `#073c34`, green-deep `#052b25`, orange `#d96a3a`, orange-soft `#e08a5a`, dark-text `#063a34`
  - Utilities: `section-padding`, `container-page`, `cut-corner`, `cut-all`, `tag-shape`, `eyebrow`, `animate-marquee(-reverse)`
  - The Elfsight title-hiding selectors
- Because the PHP templates reuse the **exact Tailwind class strings** from the JSX, the visual result matches 1:1. Port JSX → PHP by copying `className` values unchanged.
- Port `app/brasserie-audacieuse/v2/page.module.css` to `blocks/*/style.css` for the V2 blocks, as namespaced plain CSS.
- Fonts: self-host WOFF2 with `@font-face` and `font-display: swap`. Preload Grayback and Poppins 400 in `<head>`. Map `--font-display` and `--font-sans` exactly as `app/layout.tsx` does. Ship only weights actually used: check with grep for `font-(light|normal|medium|semibold|bold|extrabold|black)` and `italic`.
- Define the missing `--color-green-dark` (used by `BlogSection` as `bg-green-dark` but undefined today, so it renders transparent). Ask the client whether to keep the transparent look; default to matching current rendering.

### 2.3 JS: replace framer-motion with a light vanilla runtime
Use the **`motion`** package (vanilla build by the framer-motion authors: `animate`, `inView`, `scroll`, `stagger`). Bundle with esbuild into small ES modules. Each block declares its own `viewScript` in `block.json`, so a page loads JS only for the blocks it contains. Global JS is limited to `core.js`: reveals, the age gate, the header and the menu.

Reproduce `lib/motion.ts` exactly:
- `EASE = [0.22, 1, 0.36, 1]`
- `fadeUp`: y 28→0, 0.7s
- `fadeIn`: 0.8s
- `scaleIn`: 0.92→1, 0.6s
- `stagger(0.12)`
- `inViewOnce`: `{once:true, amount:0.3}`
- `wordUp`: y 0.6em, 0.65s

Expose them as data attributes: `data-reveal="fade-up|fade-in|scale-in"`, `data-stagger="0.12"`, `data-delay`.

Pre-hide only when JS is present: `html.js [data-reveal]{opacity:0}`. This prevents flash of content and keeps no-JS/SEO safe. Respect `prefers-reduced-motion` everywhere by skipping straight to the final state. Disable all motion inside the block editor (`.editor-styles-wrapper`) so editors see the final state.

Animation inventory to port (source → target):

| Source | Behaviour | Target |
|---|---|---|
| `components/ui/AnimatedHeading.tsx` | word-by-word clipped slide-up, `accentFrom` → orange words | PHP helper `bg_animated_heading($text,$tag,$accent_from,$class)` emits spans; `core.js` staggers 0.1s |
| `components/layout/Header.tsx` | slides down (y −80→0, 0.8s) **after age verification**; desktop dropdown on hover/focus; full-screen green mobile menu, items stagger 0.07s from x −30 | `template-parts/header/*` + `core.js` (`bg:age-verified` event) |
| `components/ui/AgeVerification.tsx` + `lib/age-context.tsx` | full-screen gate, ask/refused modes, body scroll lock, fade/slide transitions; hero/header wait for "Oui" | see §2.5 |
| `components/sections/HeroSection.tsx` | logo fade-up (delay 0.3s), tagline (delay 0.75s), gated on verification | block `bg/hero-home` |
| `components/sections/BeerCollectionsSection.tsx` | card lift −8px, companion bottles rotate ±20° and fade in on hover/focus | **CSS-only** (`:hover`, `:focus-visible`, transitions with the same ease) |
| `components/sections/BrasserieSection.tsx` | scroll-linked background cream→green-deep, title/body colour interpolation, video scale 0.72→1, y 80→0, blur 10→0 | `bg/brasserie-stage` `view.js` using `scroll()` |
| `components/sections/TireuseSection.tsx` | photo parallax scale 1.08→1.18, y −4%→4%; badge pop; chips stagger | `bg/tireuse-promo` `view.js` |
| `components/sections/StoreLocatorSection.tsx` | click card → map panel expands (height, rotateX −8°), smooth-scrolls to it, closable; category title updates | `bg/store-locator-teaser` `view.js` |
| `components/store/useElfsightTitleMask.ts` | hides Elfsight's own title (shadow DOM + late mount) | `assets/src/js/elfsight-mask.js` (MutationObserver), shared |
| `components/sections/TrustedBySection.tsx`, `KeywordsMarquee.tsx` | CSS marquees, pause on hover | CSS only |
| `components/sections/brasserie/HistoireSection.tsx` | 12-date timeline, prev/next, AnimatePresence swap, era-specific image filter, mobile "En savoir plus" line-clamp | `bg/history-timeline` `view.js`; all milestones server-rendered, one visible (SEO + no-JS) |
| `components/sections/product/ProductHero.tsx` | staggered reveals, sticky bottle with scroll parallax (y 0→80, scale 1→0.92), EBC-tinted glow | `template-parts/beer/hero.php` + `beer.js` |
| `app/louer-une-tireuse/page.tsx` inline `<style>` | infinite product slider, CSS scroll-driven step entrance | move CSS into block styles |
| `app/travailler-avec-nous/page.tsx` | two opposite infinite range sliders | block `bg/range-sliders` CSS |
| `components/layout/Footer.tsx` | stagger fade-up columns | `data-reveal` |
| `components/beers/BeerMenuV2.tsx` | tabbed lineup switcher | block `bg/beer-menu` `view.js` |

### 2.4 Header, footer, menus
- Register menus `primary` and `footer-1..3`. Seed `primary` from `navLinks` in `lib/data.ts`, keeping its 7 entries and order. Support one level of children, since the Header renders `children` dropdowns.
- Logos (Bières Georges brique, La Fabrique du Faubourg, round orange, sigle stripes) are fields in **Options → Identité**, with the current files as defaults.
- The footer reproduces `components/layout/Footer.tsx`:
  - Logo tile
  - Newsletter block (texts from Options; it posts to the plugin's newsletter endpoint)
  - 3 columns from menus: "Navigation", "La maison", "Suivez-nous"
  - Bottom bar: © year plus the loi Évin line "L'abus d'alcool est dangereux pour la santé. À consommer avec modération." The loi Évin line is locked and cannot be removed.
- Social URLs come from Options. Today they are `#` in `lib/constants.ts`; flag this to the client.

### 2.5 Age gate (legal, loi Évin) — rebuilt for a multi-page site
On Next today, the verified state is only React state, so it is re-asked on every hard load. In WordPress every navigation is a full load, so the state **must persist**:
- An inline `<head>` script (before CSS paint) reads cookie `bg_age_ok`. If it's missing, it adds `html.bg-age-pending`. The overlay markup is server-rendered from `wp_body_open` and shown only under that class, so there's no flash either way.
- "Oui" sets the cookie for N days (Options, default **30**; `0` = session), removes the class, unlocks scroll and dispatches `bg:age-verified`. Header and hero animations listen for that event, or play immediately if the cookie already exists.
- "Non" switches to the refused panel; "Retour" goes back. Copy is exactly as today and editable in Options.
- Content stays in the HTML, so crawlers can still index the site. Mark the dialog `role="dialog" aria-modal` with a focus trap and Esc disabled.
- The gate must work with page caching: it's purely client-side and must not vary by cookie in PHP.

### 2.6 Editor experience (marketing-proof)
- `theme.json`: the palette is limited to the 7 brand colors; custom colors, gradients, custom font sizes and font families are disabled; layout width matches `container-page` (78rem).
- `allowed_block_types_all`:
  - Pages: all `bg/*` blocks plus core `paragraph`, `heading`, `list`, `image`, `buttons`, `group`, `spacer`, `separator`, `embed`, `html` (admin only)
  - Posts: rich editorial core blocks plus `bg/cta-band` and `bg/beer-carousel`
  - Beers: content locked (see §3.2)
- **Block patterns** recreate each V1 page exactly (see §4), so editors can rebuild any page from scratch.
- Every block:
  - has `mode: "preview"`, an inspector-panel field group, an example (`preview.png`) and a category "Bières Georges"
  - has French field instructions with character guidance (e.g. "Titre — 2 à 5 mots, le(s) mot(s) après *Accent à partir du mot n°* passent en orange")
  - enqueues the compiled front-end CSS as editor style, so the preview is pixel-identical
- Rework the WP dashboard: a welcome widget linking to the editor guide, and a shortcuts list (Ajouter une bière, Nouvel article, Demandes reçues).

---

## 3. Plugin `bg-core` (data, logic, ACF)

### 3.1 Structure
```
bg-core.php
src/ PostTypes.php, Taxonomies.php, OptionsPages.php, Fields/ (PHP registration fallback),
     Forms/ (Controller.php REST, Validator.php, Mailer.php, Submissions.php admin list + CSV export,
            AntiSpam.php honeypot + min-time + rate limit),
     Beer/ (Repository.php queries, Formats.php, Ingredients.php, Abv.php, Ebc.php, Medals.php),
     Seo/ Schema.php (Organization/Brewery JSON-LD), Redirects.php (v2 → v1, legacy),
     Roles.php, AdminColumns.php, Cli/SeedCommand.php, Cli/ExportCommand.php
acf-json/   ← ACF local JSON (load + save point), versioned in git
languages/
```
- ACF field groups live as **local JSON in the plugin** (`acf/settings/save_json` + `load_json` → `bg-core/acf-json`). Field changes are versioned in git and deploy with the plugin. In production, set `ACF_LITE`-style behaviour: hide the ACF admin menu from non-admins.
- If ACF Pro is inactive, show an admin notice and degrade gracefully: no fatal error, and templates check `function_exists('get_field')`.

### 3.2 Content model (replaces `lib/*.ts`)

**CPT `bg_beer`** — label "Bières", public, rewrite slug **`toutes-les-bieres`** so `/toutes-les-bieres/{slug}/` stays identical. Supports title, thumbnail (packshot), excerpt off, revisions, `menu_order`. ACF group "Fiche bière", mirroring the `Beer` type in `lib/products.ts`:

| Field | Type | Notes |
|---|---|---|
| `style` | text | "Pils", "India Pale Ale"… |
| `tagline` | text | client table accroche (slides 28/35) |
| `description` | textarea | "Cette bière est une …" |
| `tasting_note` | textarea | may be empty |
| `fermentation` | select | "Haute (Ale)", "Basse (Lager)" |
| `abv` | number (step 0.1) | optional |
| `abv_label` | text | overrides `abv` ("4-5 %") |
| `ibu` | range 0–5 | Amertume /5 |
| `ebc` | range 1–5 | Couleur /5, also drives halo tint |
| `formats` | repeater: `kind` (bouteille/canette/fût), `volume` | replaces string parsing in `lib/beer-meta.ts::parseFormats`; seed converts "Fût Inox 20L / 30L" → 2 rows |
| `ingredients` | repeater: `group` (malt/houblon/levure/autre), `label` | replaces regex grouping in `groupIngredients` |
| `medals` | relationship → `bg_medal`, ordered | order as in client deck |
| `availability` | text | "Disponible le 01/10" |
| `packshot_pending` | true/false | replaces `placeholderImage`/`hasVisual()`; hides the beer from public carousels |
| `extra_content` | — | `the_content()` below the locked template, for optional blocks |

**Taxonomies:**
- `bg_range` "Circuit": GMS, CHR — terms carry a description.
- `bg_collection` "Collection": Les Originales, Les Spéciales. Term fields: `description`, `main_beer_image`, `companion_images` (2), used by the homepage collections cards (`collections` in `lib/data.ts`), plus a `limited_edition_label` flag that shows the "Édition limitée" badge in `BeerTile`.

**CPT `bg_medal`** "Médailles" (non-public): title = alt text, image, `competition` select (Concours de Lyon, World Beer Awards, Autres concours), `level` text. Seed all 25 from `lib/medals.ts`, keeping `m42…m89` as a `legacy_id` meta for traceability. The current images are low-res (40–60 px); add a field note telling the client to upload the HD originals.

**CPT `bg_lineup`** "Gammes" (non-public, ordered): `eyebrow`, `intro`, `where`, `entries` repeater (`beer` post object, `kicker`, `title_override`, `subtitle`). Seed "BG" and "Bières Georges" from `lineups`. This drives `/toutes-les-bieres/`, `lineupPlacement()` and `BeerMenuV2`.

**CPT `bg_milestone`** "Histoire": title, `year`, `text`, image, `era` (heritage / renouveau → duotone vs colour filter). Ordered by `menu_order`. Seed the 12 from `historyTimeline`.

**CPT `bg_team_member`** "Équipe": name, `role`, `department` taxonomy (`bg_department`, each term with a `badge_style` select reproducing `departmentColors`), optional `photo`, `is_founder` (spotlight card), `is_pending` (dashed "+" card). Seed the 12 from `teamMembers`. If no photo, show initials (`getInitials`).

**CPT `bg_partner`** "Partenaires": name, optional logo, optional URL. Seed the 8 from `partners`. Used by the trusted-by marquee: text if no logo, logo if present.

**Posts (Actualités):** native `post`.
- Categories seeded: Brasserie, Histoire, Gastronomie, Coulisses, Terroir, Savoir-faire.
- ACF: `read_time`, auto-computed from word count when left empty.
- Seed the 6 `blogArticles` as **drafts** with excerpt and image, plus placeholder body flagged for the client. There are no real article bodies today; links currently point to `#` or `/blog/slug`, which 404.
- Posts page `/actualites/`; single posts at `/actualites/%postname%/`.

**Options pages (ACF)** under "Bières Georges":
- *Identité & coordonnées*: logos, address, email, phone, socials (from `contactInfo`).
- *Contrôle d'âge*: all gate texts, cookie duration.
- *Pied de page & newsletter*: texts, legal line (read-only), copyright.
- *Formulaires*: per form — recipients, subject prefix, success title/text, select options (contact subjects, partner types, event types); RGPD consent text; data retention days.
- *Intégrations*: Elfsight app ID (default `555fd09f-0667-4579-8499-edd2f28f3398`), GA4/GTM ID (loaded only after the age gate, plus a cookie-consent hook), newsletter provider (none / Brevo / Mailchimp API key stored in a `wp-config` constant, not in the DB).
- *Location de tireuse*: rental steps, user-guide steps and the note (currently hard-coded in `app/louer-une-tireuse/page.tsx`). Stripe section reserved for phase 2.

### 3.3 Helpers (PHP ports of `lib/*.ts`, unit-testable)
- `Abv::format(?float $abv, ?string $label)` → "4,2 %" / label / "À confirmer" (`formatAbv`).
- `Ebc::colour(?int)` → palette `#f2d27a #e0a43c #c4692a #7c3b1d #2e1810` (`ebcColour`).
- `Medals::summary(array $ids)` → "9 médailles · Concours de Lyon (4) · …" (`summarizeMedals`, same competition order).
- `Beer\Repository::related($beer, 3)` → same rule as `app/toutes-les-bieres/[slug]/page.tsx`: other beers with a visual, sharing a collection **or** a range.
- `Repository::byRange('GMS', withVisual: true)`, `::kegBeers('CHR')`. **Bug fix:** today `louer-une-tireuse` filters `formats.includes("Fût")`, which never matches (formats are "Fût Inox 20L"), so its "bières disponibles en fût" slider is empty. The WordPress version selects CHR beers with a `fût` format row. Tell the client.
- `InternalPageHero` title split (`accentFrom`, default = last word) → `bg_split_title()`.

### 3.4 Forms (custom, in plugin)
- One REST route, `POST /wp-json/bg/v1/forms/{contact|partner|rental|newsletter}`. Progressive enhancement:
  - The `<form>` also posts to `admin-post.php` without JS.
  - With JS, it's a fetch call that swaps in the success panel exactly like today's React state ("Message envoyé", "Demande préparée", "Demande prête").
- Field sets, identical to today:
  - **contact**: name, email, subject (select), message
  - **partner**: name, company, email, phone, partnerType, message, consent (required)
  - **rental**: date, postalCode, guests (≥1), eventType, name, email, details
  - **newsletter**: email + consent
- **Security fix:** drop the "Clé API Stripe client" password field from `RentalRequestForm`. A public form must never collect a secret API key. Stripe (phase 2) uses keys from `wp-config.php` constants plus Stripe Checkout server-side.
- Validation and sanitising per field. Anti-spam: honeypot, minimum fill time of 3s, per-IP rate limit via transients, and a nonce for the REST route. Optional Cloudflare Turnstile key in Options.
- Storage: private CPT `bg_submission` with type, payload meta, IP hash and status (Nouveau / Traité). Admin list with filters, CSV export and auto-purge after N days (RGPD).
- Email: `wp_mail` to the Options recipients, Reply-To = submitter, HTML template in brand colours, sent through WP Mail SMTP.
- Newsletter: stored locally and pushed to Brevo or Mailchimp if configured.

### 3.5 Roles
- **Marketing** (custom role): edit pages, posts, beers, gammes, milestones, team, partners, media and menus; read submissions. No plugins, themes, users or ACF field editing.
- **Client**: Editor plus submissions.
- Admins only: `bg/html` block, ACF UI, Options → Intégrations.

### 3.6 SEO, redirects, schema
- Per-page title and description migrated from each Next `metadata` export into Yoast fields during seed. Beer template default: `{name} | Bières Georges` / `{name}, {style}. {description}` (as in `generateMetadata`).
- 301s:
  - `/brasserie-audacieuse/v2` → `/brasserie-audacieuse/`
  - `/toutes-les-bieres/v2` → `/toutes-les-bieres/`
  - `/trouver/v2` → `/trouver/`
  - `/louer-une-tireuse/v2` → `/louer-une-tireuse/`
  - `/blog/*` → `/actualites/*`
- JSON-LD: `Brewery` (name, address 30 Cours de Verdun 69002 Lyon, foundingDate 1836, logo, sameAs socials) on the home page. Yoast handles Article and Breadcrumb.
- Create legal pages that are missing today but legally required: **Mentions légales**, **Politique de confidentialité**, **CGV** (if rental is sold). Content comes from the client; mark them as pending.

---

## 4. Page-by-page mapping (V1 → blocks/templates)

Every block lives in `themes/bieres-georges/blocks/<name>/` and is registered via `block.json` with `"acf": {"mode":"preview","renderTemplate":"render.php"}`. Shared UI goes through `template-parts/ui/*`. Fields are listed briefly; every text/image currently hard-coded becomes a field whose default is today's value.

**Home `/`** (`app/page.tsx`), pattern `page-accueil`:
1. `bg/hero-home`: background image, overlay strength, logo, tagline + accent ("Brasserie audacieuse depuis **1836**").
2. `bg/collections`: badge, heading + accentFrom, intro, collections (taxonomy terms, ordered), link label/URL.
3. `bg/brasserie-stage`: eyebrow, heading, text, video MP4 + poster (`/assets/videos/fabrique-du-faubourg.mp4`), video caption, CTA; option "colour transition on scroll".
4. `bg/keywords-marquee`: words repeater (default `brasserieKeywords`). Inside the stage in V1, so `bg/brasserie-stage` has a toggle to append it.
5. `bg/store-locator-teaser`: heading, intro, 2 cards (title, text), CTA → `/trouver`, map panel (Elfsight from Options).
6. `bg/tireuse-promo`: image, round badge text, badge label, heading, text, occasions repeater, CTA.
7. `bg/partners-channels`: badge, heading, intro, 3 cards (image, title, text, link), CTA.
8. `bg/trusted-by`: eyebrow, heading; source = `bg_partner` (2 rows, opposite directions).
9. `bg/latest-posts`: badge "La Gazette", heading, intro, count 3, CTA → `/actualites`. Uses real posts; the placeholder images shown today ("— à venir") become the fallback image option.

**Brasserie audacieuse `/brasserie-audacieuse/`**, pattern `page-brasserie`:
- `bg/page-hero` (shared by all internal pages: eyebrow, title, accentFrom, intro, image, primary/secondary CTA)
- `bg/history-timeline` (heading + accentFrom; source `bg_milestone`)
- `bg/film-strip-divider`
- `bg/manifesto` (from `manifestoContent`: headline, 3 blocks, engagements list)
- `bg/keywords-marquee`
- `bg/values` (from `founderValues`: 5 items with icon select)
- `bg/film-strip-divider`
- `bg/team` (heading, italic subline, founder photo; source `bg_team_member`; reproduces the `xl:col-start-3` bottom-row alignment from the last commits)
- `bg/savoir-faire` (from `savoirFaireContent`: eyebrow, title, intro, paragraphs, punchline, 2 images)

**Bières emblématiques `/toutes-les-bieres/`**, pattern `page-catalogue`:
- `bg/page-hero`
- `bg/ticker-band` (orange band, text "Originales · Spéciales · Éditions limitées")
- `bg/lineup-catalogue` ×2 (select a `bg_lineup`, tone cream / cream-dark alternating; renders `BeerTile`: visual + halo, kicker, title, subtitle, tagline, TAV, bitterness hops, colour dots, format pictos, medals, availability, "Voir la fiche")
- `bg/cta-band` ("Vous êtes professionnel ?")

**Beer single `/toutes-les-bieres/{slug}/`**: PHP template `single-bg_beer.php` (locked, consistent for all beers):
- `beer/hero.php`: availability, name, tagline||style, description + tasting note, stats grid (TAV / Amertume / Couleur / Fermentation), conditionnements pictos, medals + summary, CTAs "Où la trouver ?" / "Toutes les bières", sticky parallax bottle with EBC halo, stripes pattern background
- `beer/technical.php`: ingredients grouped with icons, or "Composition à confirmer."
- `the_content()` (optional extra blocks)
- `beer/related.php` (3 related)

**Trouver `/trouver/`**, pattern `page-trouver`:
- `bg/page-hero`
- `bg/store-locator` (eyebrow, heading, intro, anchor `carte`; embed full)
- `bg/beer-carousel` (query mode: range GMS, has visual; layout "scrollable" vs "auto-marquee"; anchor `gamme-gms`; dark tone; CTA)
- `bg/split-image-cta` (image, heading, text, CTA)

**Louer une tireuse `/louer-une-tireuse/`**, pattern `page-tireuse`:
- `bg/page-hero`
- `bg/steps-timeline` (4 steps; CSS scroll-driven entrance)
- `bg/form` type `rental` (eyebrow, heading, intro, anchor `reservation`)
- `bg/media-text-list` (image, eyebrow, heading, ordered list, note with check icon, anchor `mode-emploi`)
- `bg/beer-carousel` (query CHR + keg, auto-marquee 24s)

**Travailler avec nous `/travailler-avec-nous/`**, pattern `page-travailler`:
- `bg/page-hero`
- `bg/channel-cards` (3: image, icon, title, text; anchors `magasins`/`etablissements`/`evenements` so home links resolve. Today those anchors don't exist on the page.)
- `bg/range-sliders` (2 rows: eyebrow, title, text, CTA, range, direction)
- `bg/trusted-by`
- `bg/pro-contact` (ports `ProfessionalContactPrompt` + `bg/form` type `partner`, anchor `contact-pro`)
- `bg/cta-band` dark variant ("Découvrir notre brasserie")

**Actualités `/actualites/`**: `home.php` with a featured latest post card + `bg/posts-grid` styling + `bg/cta-band`. The hero comes from fields on the Posts page (edit via the page). Add pagination and a category filter (new, light). `single.php` is a new editorial article template in the brand style: hero image, category, date, read time, content, related posts, CTA.

**Contact `/contact/`**, pattern `page-contact`:
- `bg/page-hero`
- `bg/contact-info` (info cards from Options + socials) side by side with `bg/form` type `contact` (anchor `formulaire`)
- `bg/store-locator` (dark)
- `bg/cta-band`

**V2-derived reusable blocks** (not placed on live pages, available in the inserter under "Bières Georges — Éditorial"):
- From `app/brasserie-audacieuse/v2` + `page.module.css`: `bg/editorial-hero` (split photo/copy, topline, stamp, stacked title with italic last line), `bg/ticker` (text loop), `bg/statement` ("00 / Prise de position"), `bg/chapters` (year, kicker, title, copy, image), `bg/portrait-manifesto`, `bg/numbered-values` (01–05), `bg/craft-split`, `bg/final-cta`
- From `app/toutes-les-bieres/v2`: `bg/hero-bottles` (`BeerHeroBottles`), `bg/beer-menu` (`BeerMenuV2` tabbed bar-card list), `bg/dual-cta-cards`
- From `app/trouver/v2` and `app/louer-une-tireuse/v2`: `bg/hero-editorial-simple`, `bg/formula-cards` ("Une formule pour chaque fête"), `bg/form` orange variant, `bg/steps-dark` ("Brancher. Rafraîchir. Servir."), `bg/cta-inline`
- Executor: read each V2 file fully and give every section either a dedicated block or an option on an existing block. No V2 section is left without a block.

**Not ported (dead code — confirmed unused by grep):** `FounderVisionSection`, `HistorySection`, `JournalSection`, `ProductBannerSection`, `ProfessionalsSection`, `RitualSection`, `product/ProductSpecs`, `product/ProductProfile`, `product/ProductDegustation`, `ui/Section`, `ui/ExpandableText`, plus unused data (`stores`, `articles`, `tastingSteps`, `emblematicBeers`, `historyMilestones`, `footerColumns` in `lib/data.ts`). Re-check before skipping; if any turns out to be referenced, port it as a block.

---

## 5. Content migration (zero re-typing)

1. `scripts/export-wp-seed.ts` (run `npx tsx scripts/export-wp-seed.ts`) imports `lib/products.ts`, `lib/data.ts`, `lib/medals.ts` and `lib/constants.ts`. It writes:
   - `wordpress/seed/{beers,lineups,medals,collections,milestones,team,partners,posts,options,menus}.json`
   - `assets-manifest.json`: every referenced `/public` path. Mark missing files, and normalise Unicode: e.g. `verres%203%20bie%CC%80res.jpg` uses a decomposed "è", and filenames with spaces/accents need sanitising.
   - Page texts hard-coded in JSX (heroes, CTAs, steps, channels…) go in `seed/pages.json`, built by hand by the executor from each `app/**/page.tsx`. Each page is block markup (`<!-- wp:bg/page-hero {"data":{…}} /-->`).
2. `wp bg seed [--only=beers,…] [--dry-run]` (WP-CLI command in the plugin):
   - Idempotent upserts, keyed on slug / `legacy_id`.
   - Sideloads images into the Media Library once (dedupe by hash) with French alt text.
   - Creates terms, CPT items, relationships (medals, lineups → beers), pages from patterns, menus, Options and Yoast meta.
   - Sets the front page and posts page and the permalink structure, then flushes rewrites.
3. `wp bg verify`: checks counts against the seed (21 beers, 25 medals, 2 lineups, 12 milestones, 12 team, 8 partners, 6 posts, 9 pages). It also checks that each beer has packshot, formats and ingredients, except Red Ale / Brut, which are known gaps (values still empty in slide 42).
4. Media: convert images to WebP on upload (core WebP/AVIF output); register sizes `bg-hero` 2400w, `bg-card` 800w, `bg-bottle` 1040h, `bg-thumb` 400w. The video stays an MP4 in Media.

---

## 6. Performance (match or beat Netlify)

- Get the baseline first: Lighthouse mobile and desktop plus WebPageTest for `bieres.netlify.app` on `/`, `/toutes-les-bieres/`, a beer page and `/brasserie-audacieuse/`. Save it in `wordpress/docs/perf-baseline.md`.
- Budgets: LCP ≤ 2.5s mobile, CLS ≤ 0.05, INP ≤ 200ms, first-party JS ≤ 35 KB gz on home (Elfsight excluded), CSS ≤ 40 KB gz, no render-blocking third-party code.
- Tactics:
  - Remove jQuery, emoji, oEmbed and the global styles we don't use.
  - Load `wp-block-library` CSS only for core blocks actually present (`should_load_separate_core_block_assets`).
  - Load per-block JS/CSS via `block.json`.
  - Use `defer`/`module` scripts.
  - Preload fonts and the hero image with `fetchpriority="high"`; set explicit width/height everywhere; native lazy-loading below the fold.
  - Load Elfsight only when the map enters the viewport or is opened (as `lazyOnload` does today).
  - Preload the video poster only, `preload="metadata"`.
  - Use a full-page cache (the age gate is client-side, so it's cache-safe), browser caching for `/assets/dist/*` with hashed filenames, and object cache (Redis) if the host offers it.
- Navigation feel: Next does client-side transitions. To keep the "agility", add `<script type="speculationrules">` (prerender on hover, moderate eagerness) for internal links. Add an optional View Transitions API cross-document fade (`@view-transition { navigation: auto; }`), off by default, toggled in Options.

---

## 7. Accessibility & compliance
- Keep every aria attribute from the JSX: menu buttons, timeline `aria-current`, scales `role="img"` labels, the age dialog.
- Visible focus states; skip link; mobile menu with focus trap and Esc to close.
- loi Évin: the gate plus the health mention in the footer and gate cannot be removed by editors. No analytics until age is confirmed and consent is given.
- RGPD: consent checkboxes, a retention purge and a privacy page link under every form.

---

## 8. Execution phases for Claude Code (each ends with a commit, after asking the user)

1. **Scaffold**: `wordpress/` tree, plugin and theme headers, Composer + PHPCS (WPCS), `package.json` (tailwind cli, esbuild, motion), build scripts `npm run build|watch` in the theme, `.wp-env.json`, `.gitignore` for vendor and node_modules.
2. **Design system**: port `globals.css`, fonts (convert TTF → WOFF2 with `fonttools`/`glyphhanger`), SVG sprite from `Icon.tsx` + `Pictograms.tsx`, UI template parts (CtaLink 4 variants incl. the outline nested-span trick, Badge, SectionLabel, AnimatedHeading, PageHero, BeerScales, FormatPictos, MedalRow, BeerCard, BeerTile), `core.js` motion runtime.
3. **Shell**: header (desktop nav, dropdowns, mobile menu), footer, age gate, menus, Options pages.
4. **Data layer**: CPTs, taxonomies, ACF JSON field groups, helpers (§3.3) + PHPUnit tests ported from the TS behaviour (formatAbv, ebcColour, summarizeMedals, related rule, title split).
5. **Templates**: `single-bg_beer.php`, `home.php`, `single.php`, `page.php`, `404.php`, search.
6. **Blocks**: home (9), brasserie (7), catalogue (3), trouver (3), tireuse (4), travailler (5), contact (2), then the V2 editorial set. One block = `block.json` + `render.php` + optional CSS/JS + ACF JSON + `preview.png` + pattern usage.
7. **Forms**: REST + no-JS fallback, submissions admin, emails, anti-spam, newsletter, Options wiring.
8. **Seed & migration**: exporter, `wp bg seed`, `wp bg verify`, patterns → pages, redirects, Yoast meta, legal pages.
9. **Editor hardening**: allowed blocks, theme.json locks, roles, dashboard widget, field instructions, block previews.
10. **Performance & a11y pass**: budgets, Lighthouse vs baseline, axe checks; fix regressions.
11. **Docs**:
    - `wordpress/README.md` (install, build, deploy, seed)
    - `wordpress/docs/guide-editeur.md` (French, illustrated: add a beer, a medal, an article, edit the home page, read form submissions)
    - `wordpress/docs/parity-checklist.md`
12. **Cutover** (with user): staging on the chosen host → client review by Luna on staging (she checks online, not locally) → DNS switch → keep Netlify as fallback for 2 weeks.

---

## 9. Verification

- **Static, every phase:** `php -l` on all PHP; `vendor/bin/phpcs --standard=WordPress`; `npm run build` passes; ACF JSON validates and loads; `wp bg verify` reports zero errors on a local install.
- **Unit:** PHPUnit for helpers (§3.3), form validator, anti-spam, seed idempotency (run twice → no duplicates).
- **Functional (on a WP install the user starts — ask first; never on port 3000):**
  - Every V1 URL returns 200 with the same H1. `/v2` and `/blog/*` URLs return 301.
  - Age gate: first visit shows the gate; "Oui" persists across pages; "Non" → refused → "Retour"; header and hero animations start only after "Oui".
  - Each form: success panel, DB entry, email received, honeypot blocks, rate limit triggers, works without JS.
  - Editor: a Marketing-role user can add a beer (appears in catalogue, tile, related and carousels), reorder home sections, add a V2 block, but cannot see plugins, themes or ACF.
- **Visual parity:**
  - Side-by-side screenshots of each page at 390 / 768 / 1280 / 1536 px vs `bieres.netlify.app`, logged in `parity-checklist.md` per section (spacing, typography, colours, motion timing).
  - Only with the user's permission to run a browser; otherwise the user/Luna provide screenshots.
- **Performance:** Lighthouse mobile on the 4 key URLs ≥ baseline and within budgets (§6); JS/CSS weight report from the build.

## 10. Known gaps to raise with the client (not blockers)
- Red Ale / Brut packshots and specs are still empty.
- HD medal originals are needed.
- Article bodies don't exist yet.
- Social URLs are `#`.
- Legal page texts are missing.
- Stripe rental payment (phase 2: pricing, deposit, zones).
- Newsletter provider choice.
- Team photos (today they're initials).
- Hosting choice: needs PHP 8.2, HTTPS, SMTP and page cache (e.g. o2switch / Kinsta / WP Engine / Infomaniak).
