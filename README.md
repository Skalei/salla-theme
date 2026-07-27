# WOW Chocolate — Salla Twilight Theme

> **"There will be chocolate, and there will be WOW."**
> Two worlds, one identity: **WOW Chocolate** (bold, playful, high-craving) and **The Khey Coffee** (warm, calm, grounded). Arabic-first, RTL-native, built to create a reaction.

---

## 1. Project structure

```
wow-chocolate-theme/
├── twilight.json                  Theme metadata + all merchant-facing settings & home components
├── package.json
└── src/
    ├── assets/
    │   ├── fonts/                 Drop licensed Kohinoor Arabic .woff2 files here (see README.txt)
    │   ├── images/                Logo + placeholder assets (see README.txt)
    │   ├── js/                    app.js · home.js · product.js · brand-world.js
    │   └── styles/
    │       ├── app.css            Entry (imports the four layers below)
    │       ├── 01-tokens.css      ← ALL brand colors/fonts/spacing as CSS variables
    │       ├── 02-base.css        Reset, typography, RTL foundations
    │       ├── 03-components.css  Header (world tabs), footer, cards, home & brand sections
    │       └── 04-pages.css       Product, listing, cart, thank-you, customer, blog, loyalty
    ├── locales/
    │   ├── ar.json                Primary — Saudi-local microcopy (brand voice lives here)
    │   └── en.json                Secondary LTR mode
    └── views/
        ├── layouts/               master.twig (foundation) · customer.twig (account shell)
        ├── components/
        │   ├── header/ footer/    Header carries the two brand tabs
        │   ├── home/              hero-reveal · world-chooser · product-spotlight ·
        │   │                      discover-shelf · bundles-strip · coffee-pairing ·
        │   │                      ugc-strip · gifting-entry + Twilight predefined components
        │   ├── brand/             REUSABLE world sections: world-hero · world-story ·
        │   │                      world-shelf · cross-pairing (add future sub-brands with these)
        │   └── product/           card.twig
        └── pages/                 All Twilight-routed pages (names/paths are fixed by Salla)
```

## 2. Preview & push (Salla CLI)

```bash
npm i -g @salla.sa/cli     # once
salla login                # Partner account (opens the browser)
salla theme preview        # uploads the theme and previews it on a demo store
salla theme list           # themes linked to your Partner account
salla theme publish        # ⚠️ submits to the Salla Themes Marketplace — your explicit call only
```

> There is no `push` command in Salla CLI v3+. `preview` is the upload-and-test flow;
> `publish` is the marketplace submission and always remains your explicit decision.

## 3. The two brand worlds — how they work

Twilight themes can't invent URLs, so each world rides on **both** a Salla *Brand* and a *Category* (your choice per link):

| Piece | Where the merchant sets it |
|---|---|
| The two header tabs (🍫 WOW شوكليت / ☕ The Khey Coffee) | **Dashboard → Theme settings** → "رابط عالم WOW شوكليت" and "رابط عالم The Khey Coffee" — point each to the brand page or the category |
| Which **brand pages** get the coffee mood | Theme settings → "الماركات التابعة لعالم القهوة" (everything else defaults to the chocolate mood) |
| Which **category listings** get the coffee mood | Theme settings → "التصنيفات التابعة لعالم القهوة" |
| The world moods themselves | `src/assets/styles/01-tokens.css` → the `[data-world="chocolate"]` / `[data-world="coffee"]` blocks |

**Adding a third sub-brand later:** create the Brand in Salla, add a `[data-world="newworld"]` token block in `01-tokens.css`, and (optionally) extend the mapping logic at the top of `views/pages/brands/single.twig`. All `components/brand/*` sections are world-agnostic and reusable.

## 4. What the merchant customizes from the dashboard (no code)

**Store Design → Theme settings** (defined in `twilight.json → settings`):
- World tab links + show/hide the tabs row
- Sticky header, sticky mobile add-to-cart, breadcrumbs, share buttons
- Cart delivery-expectation note ("نغلّفها بعناية ونشحنها مبرّدة…")
- Gifting page link, footer tagline ("إذا قلت واو... وصلنا")
- **Primary color & font** — via Twilight's `color`/`fonts` features (wired in `master.twig`; dashboard font drives body text, headings keep the brand type)

**Store Design → Home page** (drag-and-drop, defined in `twilight.json → components`):
1. **هيرو واو — لحظة الكشف** — hero image or mp4 reveal video + headline + one CTA
2. **اختر عالمك** — the two-world chooser (chocolate & coffee images)
3. **منتج تحت الضوء** — hero product spotlight (Angel Hair Cotton Candy Pink & Blue)
4. **رف الاكتشاف** — unexpected/nostalgic flavors shelf
5. **البوكسات — لا تكسرها لحالك** — bundles strip
6. **شوكولاتة × قهوة** — the pairing cross-sell (bridge to The Khey Coffee)
7. **قالوا واو قبلك** — vertical UGC/creator reaction clips
8. **مدخل الإهداء** — gifting entry
   …plus Twilight's built-ins: photos slider, fixed banner, testimonials, YouTube, store features, products slider.

## 5. What lives in code

| Change | File |
|---|---|
| Brand colors (all 11 palette tokens) | `src/assets/styles/01-tokens.css` |
| Typography stacks / Kohinoor files | `01-tokens.css`, `02-base.css`, `src/assets/fonts/` |
| Microcopy / voice lines | `src/locales/ar.json`, `en.json` |
| Section spacing, radii, shadows | `01-tokens.css` |
| Any layout/structure | `src/views/**` |

## 6. Voice & design rules baked in

- Arabic-first RTL via logical CSS properties; English mode flips automatically (`theme.is_rtl`).
- The product is always the hero: big media, generous negative space, text never covers the product.
- Copy is short, conversational, curiosity-building — never corporate, never childish.
- **Golden rule for every change:** would this make someone want to break it, taste it, or send it to a friend? If not, simplify.
