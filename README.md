# Eco Clean — Next.js Pest Control Landing Page

Original responsive site inspired by the **feel** of MotionSite, the pest-control service categories in your screenshot, and Niqa's careers application format. Includes an original AI-generated hero visual and your uploaded EC brand mark.

## Quick start

```bash
npm install
npm run dev
```

Then visit http://localhost:3000. Build with `npm run build`.

## Included

- Glassmorphism navbar, EC-only clickable logo, desktop Services dropdown and mobile navigation.
- 7 unique `/services/[slug]` pages generated from `lib/data.ts`.
- Motion-enhanced hero, subtle rotating rings, hover microinteractions, glowing call-to-action.
- Framer Motion scroll-scrubbed, horizontally sliding **How It Works** panels on desktop, readable stacked image cards on mobile.
- About, brand-value cards, Careers and Book a Visit sections.
- `/careers` page with position picker, PDF selection guidance, and application template.
- Original hero imagery inside `public/assets`; user-provided brand icon is also there.

## Before deployment — important

The booking and career forms currently compose a **mailto** draft, because no company email address, booking backend or storage/API credentials were supplied. The recipient is blank. Update `components/BookingForm.tsx` and `app/careers/page.tsx` to send forms through your chosen backend and real email address. **The résumé file is not transmitted or attached automatically**; the applicant must attach it in their email application. Do not present it as a working file upload until a backend/storage integration is added.

The review section presents **service benefits rather than fabricated customer testimonials**. Replace these with verified reviews when you have them. Confirm any regulatory certification, guarantees, service areas and actual contact details before launch.

## Customize

- Brand palette and responsive styling: `app/globals.css`
- Services and process: `lib/data.ts`
- Hero sections and home layout: `app/page.tsx`
- Site assets: `public/assets/`

Use the images as needed in your own project; the EC logo was supplied by you.

## Updated service catalog

Eight service cards, header dropdown links, booking form options and dynamically generated service detail routes are synchronised from `lib/data.ts`. Matching line icons are rendered by `components/ServiceIcon.tsx` using lucide-react. The original header navigation labels and all unrelated sections remain unchanged.
