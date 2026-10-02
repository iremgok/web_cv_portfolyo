import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Mirror the production security headers in `vite preview` so CSP issues show up locally
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf-8'))
const securityHeaders = Object.fromEntries(
  vercel.headers.find((h) => h.source === '/(.*)').headers.map(({ key, value }) => [key, value]),
)
delete securityHeaders['Strict-Transport-Security']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // public/assets is used for images & the CV, so bundled files go elsewhere
    assetsDir: 'static',
    // Never inline assets as data: URIs; the strict CSP (font-src 'self') would block them
    assetsInlineLimit: 0,
  },
  preview: {
    headers: securityHeaders,
  },
})
