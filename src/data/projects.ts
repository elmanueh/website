import AriadneIcon from '@/assets/ariadne.svg'
import BelenDavidBodaImage from '@/assets/belen-david-boda.jpg'
import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'
import SolidarianIdImage from '@/assets/solidarianid.png'
import type { ImageMetadata } from 'astro'

export interface Project {
  slug: string
  href: string
  title: string
  subtitle: string
  image: ImageMetadata
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'belen-david-boda',
    href: 'https://belenydavidsecasan.es/',
    title: 'Web de boda · Belén y David',
    subtitle:
      'Experiencia web personalizada para invitados con acceso privado, itinerario, galería, información práctica, confirmación de asistencia y panel de gestión de invitaciones.',
    image: BelenDavidBodaImage,
    tags: ['Aplicación web', 'Astro', 'React', 'Diseño responsive']
  },
  {
    slug: 'solidarianid',
    href: 'https://github.com/elmanueh/solidarianid',
    title: 'SolidarianID',
    subtitle:
      'Plataforma para gestionar voluntariado y causas solidarias, con identidad digital, comunidades, eventos y acciones benéficas sobre una arquitectura de microservicios orientada a eventos.',
    image: SolidarianIdImage,
    tags: ['Microservicios', 'DDD', 'NestJS', 'Apache Kafka']
  },
  {
    slug: 'ariadne',
    href: 'https://github.com/elmanueh/ariadne',
    title: 'Ariadne',
    subtitle:
      'Herramienta de línea de comandos desarrollada como TFM para validar fuentes de datos, analizar ontologías y mappings, evaluar reglas de calidad y generar grafos RDF mediante un pipeline modular.',
    image: AriadneIcon,
    tags: ['TFM', 'Python', 'Grafos de conocimiento', 'Arquitectura hexagonal']
  },
  {
    slug: 'linetree',
    href: 'https://linetree.elmanueh.es/',
    title: 'LineTree',
    subtitle:
      'Aplicación web para la creación y visualización de árboles genealógicos, diseñada para representar relaciones familiares, herencias y vínculos de forma clara y estructurada.',
    image: LineTreeIcon,
    tags: ['TFG', 'Aplicación web', 'Arquitectura', 'Modelado de datos']
  },
  {
    slug: 'clash-of-clans-api',
    href: '/clashofclans',
    title: 'API Clash of Clans',
    subtitle:
      'API backend para el seguimiento y análisis de la actividad de un clan en Clash of Clans, centralizando métricas de jugadores, guerras, donaciones y eventos.',
    image: ClashOfClansIcon,
    tags: ['API REST', 'Análisis de datos']
  }
]
