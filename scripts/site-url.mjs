// @ts-check
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const BUILD_SITE_URL = 'https://site-url.invalid'
const BUILD_SITE_HOST = new URL(BUILD_SITE_URL).hostname

/** Save original templates so each restart can use a different domain.
 * @param {URL} dir Client output directory.
 */
export async function saveSiteUrlTemplates(dir) {
  const client = fileURLToPath(dir)
  const entries = await readdir(client, { recursive: true, withFileTypes: true })
  const results = await Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .map(async (entry) => {
        const file = path.join(entry.parentPath, entry.name)
        const content = await readFile(file)
        if (!content.includes(BUILD_SITE_HOST)) return null
        const text = content.toString('utf8')
        if (!/\.(html|xml|txt|json)$/.test(file) || text.replaceAll(BUILD_SITE_URL, '').includes(BUILD_SITE_HOST)) {
          throw new Error(`Unsupported build placeholder in public file: ${file}`)
        }
        return { path: path.relative(client, file), content: text }
      })
  )
  const templates = results.filter((template) => template !== null)
  for (const required of ['robots.txt', 'sitemap-index.xml']) {
    if (!templates.some((template) => template.path === required)) {
      throw new Error(`Missing SITE_URL build template: ${required}`)
    }
  }
  await writeFile(new URL('../site-url-templates.json', dir), JSON.stringify(templates))
}
