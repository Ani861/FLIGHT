import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  // Use relative base so the built assets work when the site is served from root
  // (Netlify serves the site at the root). Absolute '/flight-explorer/' causes
  // asset URLs to point to /flight-explorer/... which 404s when the site is at /
  base: './',
})
