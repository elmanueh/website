export type SocialIcon = 'github' | 'linkedin' | 'mail'

export interface SocialLink {
  href: string
  label: string
  icon: SocialIcon
  external: boolean
}

type SocialLinkDefinition = Omit<SocialLink, 'label'>
export type SocialLabels = Record<SocialIcon, string>

const socialLinkDefinitions: SocialLinkDefinition[] = [
  {
    href: 'https://github.com/elmanueh',
    icon: 'github',
    external: true
  },
  {
    href: 'https://www.linkedin.com/in/manuelbernaberodriguez',
    icon: 'linkedin',
    external: true
  },
  {
    href: 'mailto:contacto@elmanueh.es',
    icon: 'mail',
    external: false
  }
]

export function getSocialLinks(labels: SocialLabels): SocialLink[] {
  return socialLinkDefinitions.map((link) => ({
    ...link,
    label: labels[link.icon]
  }))
}
