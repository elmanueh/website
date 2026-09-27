// @ts-check
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://elmanueh.es',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [react(), icon({ iconDir: 'public' })],
  vite: {
    plugins: [tailwindcss()]
  }
})
