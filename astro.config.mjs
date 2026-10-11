// @ts-check
import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import node from '@astrojs/node'
import { BUILD_SITE_URL, saveSiteUrlTemplates } from './scripts/site-url.mjs'

const envFile = new URL('./.env', import.meta.url)
if (existsSync(envFile)) loadEnvFile(envFile)

export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  session: false,
  site: BUILD_SITE_URL,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false }
  },
  integrations: [
    react(),
    icon({ iconDir: 'public' }),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
      // These routes currently return 404 and must not be indexed.
      filter: (url) => !['/clashofclans', '/en/clashofclans'].includes(new URL(url).pathname.replace(/\/$/, '')),
      serialize(item) {
        const defaultLink = item.links?.find((link) => link.lang === 'en')
        if (defaultLink) item.links = [...(item.links ?? []), { lang: 'x-default', url: defaultLink.url }]
        return item
      }
    }),
    // Run after sitemap so its XML files are included in the templates.
    {
      name: 'runtime-site-url',
      hooks: {
        'astro:config:setup': ({ command, updateConfig }) => {
          if (command === 'dev') updateConfig({ site: process.env.SITE_URL?.trim() || 'http://localhost:4321' })
        },
        'astro:build:done': ({ dir }) => saveSiteUrlTemplates(dir)
      }
    }
  ],
  vite: { plugins: [tailwindcss()] }
})
