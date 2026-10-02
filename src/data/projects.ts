import AriadneIcon from '@/assets/ariadne.svg'
import CloudPlatformImage from '@/assets/cloud-platform.png'
import CloudPlatformIcon from '@/assets/cloud-platform-icon.png'
import BelenDavidBodaImage from '@/assets/belen-david-boda.jpg'
import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'
import SolidarianIdImage from '@/assets/solidarianid.png'
import SolidarianIdIcon from '@/assets/solidarian-logo.png'
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
    image: AriadneIcon,
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
    image: ClashOfClansIcon,
    links: {
      source: 'https://github.com/elmanueh/api-clashofclans.js',
      app: '/clashofclans'
    }
  }
]
