import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'

export type Project = {
  slug: string
  title: string
  subtitle: string
  image: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'linetree',
    title: 'LineTree',
    subtitle:
      'Aplicación web para la creación y visualización de árboles genealógicos, diseñada para representar relaciones familiares, herencias y vínculos de forma clara y estructurada.',
    image: LineTreeIcon,
    tags: ['TFG', 'Aplicación web', 'Arquitectura', 'Modelado de datos']
  },
  {
    slug: 'clash-of-clans-api',
    title: 'API Clash of Clans',
    subtitle:
      'API backend para el seguimiento y análisis de la actividad de un clan en Clash of Clans, centralizando métricas de jugadores, guerras, donaciones y eventos.',
    image: ClashOfClansIcon,
    tags: ['API REST', 'Análisis de datos']
  }
]
