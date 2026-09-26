import AriadneIcon from '@/assets/ariadne.svg'
import BelenDavidBodaImage from '@/assets/belen-david-boda.jpg'
import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'
import SolidarianIdImage from '@/assets/solidarianid.png'
import SolidarianIdIcon from '@/assets/solidarian-logo.png'
import type { ImageMetadata } from 'astro'

export enum ProjectLinkType {
  Website = 'website',
  GitHub = 'github'
}

export interface Project {
  slug: string
  href: string
  title: string
  subtitle: string
  image: ImageMetadata
  icon?: ImageMetadata
  linkType: ProjectLinkType
  tags: string[]
  linkLabel: string
}

export type ProjectTranslation = Pick<Project, 'subtitle' | 'tags'>

export interface ProjectsTranslations {
  linkLabels: Record<ProjectLinkType, string>
  items: Record<string, ProjectTranslation>
}

type ProjectDefinition = Omit<Project, 'subtitle' | 'tags' | 'linkLabel'>

const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'belen-david-boda',
    href: 'https://belenydavidsecasan.es/',
    title: 'Web de boda · Belén y David',
    image: BelenDavidBodaImage,
    linkType: ProjectLinkType.Website
  },
  {
    slug: 'solidarianid',
    href: 'https://github.com/elmanueh/solidarianid',
    title: 'SolidarianID',
    image: SolidarianIdImage,
    icon: SolidarianIdIcon,
    linkType: ProjectLinkType.GitHub
  },
  {
    slug: 'ariadne',
    href: 'https://github.com/elmanueh/ariadne',
    title: 'Ariadne',
    image: AriadneIcon,
    linkType: ProjectLinkType.GitHub
  },
  {
    slug: 'linetree',
    href: 'https://linetree.elmanueh.es/',
    title: 'LineTree',
    image: LineTreeIcon,
    linkType: ProjectLinkType.Website
  },
  {
    slug: 'clash-of-clans-api',
    href: '/clashofclans',
    title: 'API Clash of Clans',
    image: ClashOfClansIcon,
    linkType: ProjectLinkType.Website
  }
]

export function getProjects(translations: ProjectsTranslations): Project[] {
  return projectDefinitions.map((project) => {
    const content = translations.items[project.slug]

    return {
      ...project,
      subtitle: content.subtitle,
      tags: content.tags,
      linkLabel: translations.linkLabels[project.linkType]
    }
  })
}
