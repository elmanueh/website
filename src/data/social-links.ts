export type SocialIcon = 'github' | 'linkedin' | 'mail'

export interface SocialLink {
  href: string
  label: string
  icon: SocialIcon
  external: boolean
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/elmanueh',
    label: 'GitHub de Manuel',
    icon: 'github',
    external: true
  },
  {
    href: 'https://www.linkedin.com/in/manuelbernaberodriguez',
    label: 'LinkedIn de Manuel',
    icon: 'linkedin',
    external: true
  },
  {
    href: 'mailto:contacto@elmanueh.es',
    label: 'Enviar un correo a contacto@elmanueh.es',
    icon: 'mail',
    external: false
  }
]
