import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BUILD_SITE_URL } from './site-url.mjs'

const siteUrl = (process.env.SITE_URL?.trim() || `http://localhost:${process.env.PORT || 4321}`).replace(/\/$/, '')

const client = fileURLToPath(new URL('../dist/client/', import.meta.url))
const templates = JSON.parse(await readFile(new URL('../dist/site-url-templates.json', import.meta.url), 'utf8'))
await Promise.all(
  templates.map((template) =>
    writeFile(path.join(client, template.path), template.content.replaceAll(BUILD_SITE_URL, siteUrl))
  )
)

// Start listening only after all static URLs have been configured.
await import('../dist/server/entry.mjs')
