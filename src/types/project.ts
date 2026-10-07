import type { ImageMetadata } from 'astro'

export interface Project {
  slug: string
  repository?: string
  title: string
  subtitle: string
  image: ImageMetadata
  icon?: ImageMetadata
  tags: string[]
  appUrl?: string
}

export type ProjectDefinition = Pick<Project, 'slug' | 'repository' | 'image' | 'icon' | 'appUrl'>
