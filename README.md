# İrem Gök | Portfolio

Personal portfolio built with **React (Vite)**, **Tailwind CSS v4**, **Framer Motion** and **Lucide React**.
Dark cyberpunk / retro-pixel theme with neon pink (`#ff007f`), violet (`#8a2be2`) and electric blue accents.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serves dist/ with the same security headers as vercel.json
```

## Structure

```
public/assets/            images, logos and cv/IREM_GOK_CV.pdf (served as /assets/...)
src/
├── data/content.js       all text: profile, timeline, projects, tech stack
├── components/
│   ├── Navbar.jsx        glass navbar, active-section highlight, mobile menu
│   ├── Hero.jsx          intro, CTAs, floating character
│   ├── FloatingDecor.jsx pixel alien / heart / laptop / planet / floppy decor
│   ├── About.jsx
│   ├── Experience.jsx    timeline with logos
│   ├── Projects.jsx      cards + details modal
│   ├── TechStack.jsx     tabbed grid
│   ├── Contact.jsx       validated form (opens mail client), socials, CV button
│   ├── Footer.jsx
│   ├── Reveal.jsx        shared scroll animations
│   └── BrandIcons.jsx    GitHub / LinkedIn SVGs
├── App.jsx
└── index.css             Tailwind theme tokens & component classes
vercel.json               CSP, COOP/COEP/CORP, X-Frame-Options, HSTS, caching
```

To change content, edit `src/data/content.js` only.

## Security

- Strict CSP: `script-src 'self'`, `font-src 'self'` (fonts are self-hosted via `@fontsource`), no third-party origins.
- Asset inlining is disabled in `vite.config.js` so nothing is emitted as a `data:` font that the CSP would block.
- All external links use `target="_blank" rel="noopener noreferrer"`; no inline JS handlers.
