import { getCollection, render, type CollectionEntry } from 'astro:content'
import { projectDefinitions } from '@/data/projects'
import type { Locale } from '@/i18n/types'
import type { Project, ProjectDefinition } from '@/types/project'

const projectLocales = ['es', 'en'] as const satisfies readonly Locale[]

async function getProjectEntries() {
  const content = await getCollection('projects')
  const contentById = new Map(content.map((entry) => [entry.id, entry]))
  const projectIds = new Set<string>()

  for (const project of projectDefinitions) {
    if (projectIds.has(project.slug))
      throw new Error(`Duplicate project slug: ${project.slug}`)
    projectIds.add(project.slug)
    for (const locale of projectLocales) {
      if (!contentById.has(`${project.slug}/${locale}`)) {
        throw new Error(
          `Missing ${locale} project content for: ${project.slug}`
        )
      }
    }
  }
  for (const entry of content) {
    if (!projectIds.has(entry.id.split('/')[0])) {
      throw new Error(
        `Missing project definition in projects.ts for: ${entry.id}`
      )
    }
  }

  return contentById
}

function toProject(
  definition: ProjectDefinition,
  content: CollectionEntry<'projects'>
): Project {
  return {
    ...definition,
    title: content.data.title,
    subtitle: content.data.description,
    tags: content.data.tags
  }
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const contentById = await getProjectEntries()
  return projectDefinitions.map((project) =>
    toProject(project, contentById.get(`${project.slug}/${locale}`)!)
  )
}

export async function getProjectSlugs(): Promise<string[]> {
  await getProjectEntries()
  return projectDefinitions.map(({ slug }) => slug)
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<Project | undefined> {
  return (await getProjects(locale)).find((project) => project.slug === slug)
}

export async function getProjectCaseStudy(slug: string, locale: Locale) {
  const contentById = await getProjectEntries()
  const definition = projectDefinitions.find((project) => project.slug === slug)
  if (!definition) throw new Error(`Unknown project: ${slug}`)

  const content = contentById.get(`${slug}/${locale}`)!
  const rendered = await render(content)
  return { project: toProject(definition, content), ...rendered }
}
