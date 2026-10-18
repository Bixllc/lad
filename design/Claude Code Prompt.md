# Prompt for Claude Code — LAD Car Rentals website

Build a production-ready marketing website for **LAD Car Rentals**, a locally owned car rental company in Jamaica. The attached file `LAD Car Rentals v2.dc.html` is the approved design. Match it closely, and use the images in `assets/`.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS. Static export, so it can deploy to Vercel or Netlify.
- No backend, no database, no booking forms, no prices. Every booking action is a deep link to WhatsApp or an Instagram DM.
- Keep all content (fleet, locations, contact details) in one `content.ts` file so it's easy to edit.

## Brand & visual system
- **Feel:** light, premium, spacious, clean (Carvatrix-like). Lots of whitespace, soft rounded cards, no heavy gradients.
- **Colors:** background `#F6F7F4` / white cards `#FFFFFF`; ink `#0F1512`; body text `#525A55`; brand green `#1A8F3C` (hover `#157532`); card image well `#F1F3EF`; footer dark `#0A0A0A` with `#C0C0C0` text.
- **Type:** Inter only.
  - Display headlines: light or regular weight (300/400), tight tracking (`-0.045em`), line-height ~1.02. The key word or phrase goes in **bold green** (e.g. "Reliable Cars at **Affordable Prices**").
  - Body: 16–19px, line-height 1.6.
- **Buttons:** 12px radius (not pills). Height 48–58px. Primary is green with white text; secondary is ink `#0F1512`.
- **Cards:** 28px radius with a 20px-radius inner image well, a 1px hairline border `rgba(15,21,18,0.05)`, and a soft shadow on hover.
- **Car images:** transparent or white cutouts with `mix-blend-mode: multiply`, and a soft elliptical ground shadow under the tyres (radial-gradient ellipse, ~32% opacity, blurred ~10px).

## Contact config
- WhatsApp: `18768238248`. Use `https://wa.me/18768238248?text=<encoded prefilled message>`.
- Instagram: `lad_carrentals`.
  - DM link: `https://ig.me/m/lad_carrentals`
  - Profile link: `https://www.instagram.com/lad_carrentals/`
- Prefilled WhatsApp messages:
  - General: "Hi LAD Car Rentals! I'd like to rent a car."
  - Per car: "Hi LAD Car Rentals! I'm interested in the {car}. My pickup location: ___ Dates: ___"

## Booking interaction pattern (reuse everywhere)
Build one `<BookNow>` component. It is a single "Book Now ▾" button that opens a small popover with two options: **Message on WhatsApp** and **Instagram DM**.
- The chevron rotates when the popover opens.
- Close on outside click, on Esc, or after an option is picked.
- Make it keyboard accessible.

Variants:
- `popover`: used in the hero, the CTA section and the header.
- `inline`: used on car cards. The button swaps for a row of [WhatsApp] [Instagram DM] [✕], and only one card can be open at a time.
- `stacked`: used in the footer. The options expand below the button.

## Pages & sections

### Header (sticky, white)
- Logo (`assets/lad-logo-on-light.png`) on the left.
- Nav: Home, Our Fleet, Locations, About Us. No "Contact" in the nav.
- On the right, a green **Contact Us ▾** button that uses the popover with "Message on Instagram" and "Message on WhatsApp".
- On mobile (<960px): a hamburger menu and a floating WhatsApp button fixed at the bottom-right.

### Home
1. **Hero:** centered.
   - H1: "Reliable Cars at" (weight 300) + "Affordable Prices" (bold green, on its own line).
   - Subtext: "Clean, dependable vehicles across Jamaica. Local service you can trust."
   - One `<BookNow>` popover.
   - Below it, the full-width hero car image `assets/hero-bmw.png` with a ground shadow. No slider.
2. **Our Full Fleet:**
   - Heading centered, in the same light display style as the hero.
   - Grid of car cards: `repeat(auto-fill, minmax(340px, 1fr))`, 24px gap.
   - Each card shows the image well with a type pill (e.g. "Sedan") at the top-left, the car name in bold 22px, a "3 day minimum" spec chip, and an inline `<BookNow>`.
3. **Why Drive with LAD Car Rentals?** (two-column split; stacks on mobile)
   - Left column:
     - H2 "Why Drive with" + "**LAD Car Rentals?**" in bold green.
     - Paragraph: "A local Jamaican team with clean, reliable cars, fair rates and quick replies. We'll help you rent with confidence."
     - Black "Book your car" button linking to WhatsApp.
   - Right column: `assets/why-hyundai-grey.png`, large and bleeding off the right edge, with a ground shadow.
4. **CTA band:** a white rounded card, centered.
   - H2: "Ready to explore" + "**Jamaica?**" in bold green.
   - Text: "Message us on Instagram or WhatsApp to book your car today."
   - One `<BookNow>` popover.

### Our Fleet
- Heading "Our Fleet" with intro copy and a vehicle count.
- Filter chips: All / Cars / SUVs / Vans.
- The same card style as the home page.

### Locations
- Cards for Montego Bay (St. James), Kingston (Kingston & St. Andrew), Ocho Rios (St. Ann) and Negril (Westmoreland).
- Each card has a 4:3 image placeholder and a WhatsApp link prefilled with "arrange a pickup in {city}".

### About Us
- Two columns: copy on one side and a 4:5 photo placeholder on the other.
- Copy: locally owned Jamaican company; clean, well-maintained cars; honest service; treating every customer like family.

### Contact
- Keep the route, but it isn't linked in the nav.
- Big WhatsApp and Instagram cards.

### Footer (dark)
- Logo, page links, and a `stacked` `<BookNow>`.
- **Icon-only** WhatsApp and Instagram links side by side: 36px rounded squares with a subtle background, and the brand color tint on hover. No visible phone number, handle or email text.

## Fleet data (home "Our Full Fleet", in this order)
| Name | Type | Image |
|---|---|---|
| BMW 5 Series | Sedan | fleet-bmw-5.png |
| BMW 3 Series | Sedan | fleet-bmw-3.png |
| Audi A3 | Sedan | fleet-audi-a3.png |
| Nissan Altima | Sedan | fleet-nissan-altima.png |
| Toyota Axio Hybrid | Sedan | fleet-toyota-axio.png |
| BMW X4 | SUV | fleet-bmw-x4.png |
| Hyundai Tucson | SUV | fleet-hyundai-tucson.png |
| Hyundai Tucson Grey | SUV | fleet-hyundai-tucson-grey.png |
| Subaru Outback | SUV | fleet-subaru-outback.png |
| Toyota Yaris | Hatchback | fleet-toyota-yaris.png |
| Honda Fit | Hatchback | fleet-honda-fit.png |
| Toyota Aqua Hybrid | Hatchback | fleet-toyota-aqua.png |

## Quality bar
- Fully responsive (test at 375 / 768 / 1280 / 1440). Use fluid type with `clamp()`.
- Lighthouse 95+ on every category. Use `next/image`, lazy loading and correct `sizes`.
- SEO:
  - Metadata title "LAD Car Rentals — Reliable Cars at Affordable Prices".
  - Open Graph image.
  - LocalBusiness / AutoRental JSON-LD.
  - sitemap and robots files.
- Accessibility: semantic landmarks, alt text on every car, visible focus states, ARIA on the popovers, WCAG AA contrast.
- Subtle motion only: fade or slide-up on scroll, and a short scale-in for the popover. Respect `prefers-reduced-motion`.
- All external links use `target="_blank" rel="noopener"`.

Start by setting up the design tokens in the Tailwind config and the `<BookNow>` component, then build the pages. Show me the home page first before doing the rest.
