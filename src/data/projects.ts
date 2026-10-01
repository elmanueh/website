import AriadneIcon from '@/assets/ariadne.svg'
import CloudPlatformImage from '@/assets/cloud-platform.png'
import CloudPlatformIcon from '@/assets/cloud-platform-icon.png'
import BelenDavidBodaImage from '@/assets/belen-david-boda.jpg'
import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'
import SolidarianIdImage from '@/assets/solidarianid.png'
import SolidarianIdIcon from '@/assets/solidarian-logo.png'
import type { ImageMetadata } from 'astro'

export interface Project {
  slug: string
  title: string
  subtitle: string
  image: ImageMetadata
  icon?: ImageMetadata
  tags: string[]
  links: { source?: string; app?: string }
}

export type ProjectTranslation = Pick<Project, 'subtitle' | 'tags'>

export interface ProjectsTranslations {
  linkLabels: { source: string; app: string }
  items: Record<string, ProjectTranslation>
}

type ProjectDefinition = Omit<Project, 'subtitle' | 'tags'>

const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'cloud-platform',
    title: 'Cloud Platform',
    image: CloudPlatformImage,
    icon: CloudPlatformIcon,
    links: {}
  },
  {
    slug: 'belen-david-boda',
    title: 'Web de boda · Belén y David',
    image: BelenDavidBodaImage,
    links: { app: 'https://belenydavidsecasan.es/' }
  },
  {
    slug: 'solidarianid',
    title: 'SolidarianID',
    image: SolidarianIdImage,
    icon: SolidarianIdIcon,
    links: { source: 'https://github.com/elmanueh/solidarianid' }
  },
  {
    slug: 'ariadne',
    title: 'Ariadne',
    image: AriadneIcon,
    links: { source: 'https://github.com/elmanueh/ariadne' }
  },
  {
    slug: 'linetree',
    title: 'LineTree',
    image: LineTreeIcon,
    links: {
      source: 'https://github.com/elmanueh/linetree',
      app: 'https://linetree.elmanueh.es/'
    }
  },
  {
    slug: 'clash-of-clans-api',
    title: 'API Clash of Clans',
    image: ClashOfClansIcon,
    links: {
      source: 'https://github.com/elmanueh/api-clashofclans.js',
      app: '/clashofclans'
    }
  }
]

export function getProjects(translations: ProjectsTranslations): Project[] {
  return projectDefinitions.map((project) => {
    const content = translations.items[project.slug]

    return { ...project, subtitle: content.subtitle, tags: content.tags }
  })
}

export function getProjectSlugs(): string[] {
  return projectDefinitions.map(({ slug }) => slug)
}

export function getProjectBySlug(
  slug: string,
  translations: ProjectsTranslations
): Project | undefined {
  return getProjects(translations).find((project) => project.slug === slug)
}
