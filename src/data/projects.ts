import AriadneImage from '@/assets/projects/ariadne-banner.png'
import AriadneIcon from '@/assets/projects/ariadne-logo.png'
import CloudPlatformImage from '@/assets/projects/cloud-platform-banner.png'
import CloudPlatformIcon from '@/assets/projects/cloud-platform-logo.png'
import BelenDavidBodaImage from '@/assets/projects/belen-david-boda-banner.jpg'
import BelenDavidBodaIcon from '@/assets/projects/belen-david-boda-logo.png'
import ClashOfClansIcon from '@/assets/projects/clash-of-clans-api-logo.png'
import ClashOfClansImage from '@/assets/projects/clash-of-clans-api-banner.png'
import LineTreeIcon from '@/assets/projects/linetree-logo.svg'
import SolidarianIdImage from '@/assets/projects/solidarianid-banner.png'
import SolidarianIdIcon from '@/assets/projects/solidarianid-logo.png'
import type { ProjectDefinition } from '@/types/project'

export const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'cloud-platform',
    image: CloudPlatformImage,
    icon: CloudPlatformIcon,
    links: {}
  },
  {
    slug: 'belen-david-boda',
    image: BelenDavidBodaImage,
    icon: BelenDavidBodaIcon,
    links: { app: 'https://belenydavidsecasan.es/' }
  },
  {
    slug: 'solidarianid',
    image: SolidarianIdImage,
    icon: SolidarianIdIcon,
    links: { source: 'https://github.com/elmanueh/solidarianid' }
  },
  {
    slug: 'ariadne',
    image: AriadneImage,
    icon: AriadneIcon,
    links: { source: 'https://github.com/elmanueh/ariadne' }
  },
  {
    slug: 'linetree',
    image: LineTreeIcon,
    links: {
      source: 'https://github.com/elmanueh/linetree',
      app: 'https://linetree.elmanueh.es/'
    }
  },
  {
    slug: 'clash-of-clans-api',
    image: ClashOfClansImage,
    icon: ClashOfClansIcon,
    links: {
      source: 'https://github.com/elmanueh/api-clashofclans.js',
      app: '/clashofclans'
    }
  }
]
