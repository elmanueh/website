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

export type ProjectDefinition = Pick<Project, 'slug' | 'image' | 'icon' | 'links'>
