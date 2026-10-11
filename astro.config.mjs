// @ts-check
import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import node from '@astrojs/node'

const envFile = new URL('./.env', import.meta.url)
if (existsSync(envFile)) loadEnvFile(envFile)

export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  session: false,
  site: process.env.SITE_URL || undefined,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    icon({ iconDir: 'public' }),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
      serialize(item) {
        const defaultLink = item.links?.find((link) => link.lang === 'en')
        if (defaultLink) item.links = [...(item.links ?? []), { lang: 'x-default', url: defaultLink.url }]
        return item
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})
