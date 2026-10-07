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
    repository: 'elmanueh/cloud-platform',
    image: CloudPlatformImage,
    icon: CloudPlatformIcon
  },
  {
    slug: 'belen-david-boda',
    repository: 'elmanueh/belendavid-boda-web',
    image: BelenDavidBodaImage,
    icon: BelenDavidBodaIcon,
    appUrl: 'https://belenydavidsecasan.es/'
  },
  {
    slug: 'solidarianid',
    repository: 'elmanueh/solidarianid',
    image: SolidarianIdImage,
    icon: SolidarianIdIcon
  },
  {
    slug: 'ariadne',
    repository: 'elmanueh/ariadne',
    image: AriadneImage,
    icon: AriadneIcon
  },
  {
    slug: 'linetree',
    repository: 'elmanueh/linetree',
    image: LineTreeIcon
  },
  {
    slug: 'clash-of-clans-api',
    repository: 'elmanueh/api-clashofclans.js',
    image: ClashOfClansImage,
    icon: ClashOfClansIcon
  }
]
