import type { ProjectsTranslations } from '@/data/projects'
import type { ProfileTranslation } from '@/data/profile'
import type { SocialLabels } from '@/data/social-links'
import type { PlayerClan } from '@/types/player-clan'

export type Locale = 'es' | 'en'

export interface Translations {
  meta: {
    home: { title: string; description: string }
    clashOfClans: { title: string; description: string }
    notFound: { title: string; description: string }
  }
  header: {
    home: string
    projects: string
    homeAria: string
    navigationAria: string
    languageSelectorAria: string
    switchTo: Record<Locale, string>
  }
  hero: ProfileTranslation & {
    stackLead: string
    downloadCv: string
    profileAria: string
    profileAlt: string
    focusEyebrow: string
    focusTitle: string
    focusDescription: string
  }
  projects: ProjectsTranslations & {
    eyebrow: string
    title: string
    description: string
    cardEyebrow: string
    previewAlt: string
    technologiesLabel: string
  }
  social: SocialLabels
  notFound: {
    eyebrow: string
    heading: string
    description: string
    backHome: string
    navigationAria: string
  }
  clashOfClans: {
    heading: string
    searchPrefix: string
    searchHighlight: string
    searchButton: string
    columns: Record<keyof PlayerClan, string>
    values: Record<string, string>
    fetchError: string
  }
}
