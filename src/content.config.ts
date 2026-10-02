import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({
    pattern: '*/*.md',
    base: './src/content/projects',
    generateId: ({ entry }) => {
      const match = /^([a-z][a-z0-9-]*)\/(es|en)\.md$/.exec(entry)
      if (!match) throw new Error(`Project content must use <project>/(es|en).md: ${entry}`)
      return `${match[1]}/${match[2]}`
    }
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).min(1)
  }).strict()
})

export const collections = { projects }
