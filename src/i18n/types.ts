import type { ProfileTranslation } from '@/data/profile'
import type { SocialLabels } from '@/data/social-links'
import type { PlayerClan } from '@/types/player-clan'

export type Locale = 'es' | 'en'

export interface Translations {
  anchors: Record<'home' | 'projects', string>
  meta: {
    home: { title: string }
    clashOfClans: { title: string }
    notFound: { title: string }
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
  projects: {
    linkLabels: { source: string; app: string }
    eyebrow: string
    title: string
    description: string
    cardEyebrow: string
    previewAlt: string
    technologiesLabel: string
  }
  projectDetail: {
    eyebrow: string
    onThisPage: string
    lastCommit: string
    activityPeriod: string
    publicRepository: string
    repository: string
    privateRepository: string
    latestRelease: string
    noReleases: string
    backToProjects: string
    openCaseStudy: string
    emptyTitle: string
    emptyDescription: string
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
