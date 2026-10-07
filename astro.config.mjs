// @ts-check
import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
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
  integrations: [react(), icon({ iconDir: 'public' })],
  vite: {
    plugins: [tailwindcss()]
  }
})
