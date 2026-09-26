import { ProjectLinkType } from '@/data/projects'
import type { Translations } from '@/i18n/types'

export const es = {
  meta: {
    home: {
      title: 'elmanueh | Software Engineer',
      description: 'Portfolio de Manuel Bernabé Rodríguez, Backend Software Engineer especializado en .NET, APIs REST y arquitectura de software.'
    },
    clashOfClans: {
      title: 'API Clash of Clans | elmanueh',
      description: 'Consulta métricas y actividad de jugadores de un clan de Clash of Clans.'
    },
    notFound: {
      title: 'Página no encontrada | elmanueh',
      description: 'La página solicitada no existe o ha cambiado de dirección.'
    }
  },
  header: {
    home: 'Inicio',
    projects: 'Proyectos',
    homeAria: 'elmanueh — Inicio',
    navigationAria: 'Navegación principal',
    languageSelectorAria: 'Seleccionar idioma',
    switchTo: { es: 'Cambiar a español', en: 'Cambiar a inglés' }
  },
  hero: {
    location: 'Orihuela, Alicante, España',
    summary: 'Diseño y desarrollo APIs REST y software empresarial mantenible, con especial interés en arquitectura de software, automatización e infraestructura.',
    stackLead: 'Mi stack principal es',
    downloadCv: 'Descargar CV',
    profileAria: 'Perfil de Manuel Bernabé Rodríguez',
    profileAlt: 'Retrato de Manuel Bernabé Rodríguez',
    focusEyebrow: 'Enfoque',
    focusTitle: 'Backend y arquitectura',
    focusDescription: 'Servicios mantenibles, integración entre sistemas y automatización del ciclo de entrega.'
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Proyectos',
    description: 'Trabajos académicos y personales centrados en backend, arquitectura, datos y aplicaciones web.',
    cardEyebrow: 'Proyecto',
    previewAlt: 'Vista previa de',
    technologiesLabel: 'Tecnologías de',
    linkLabels: {
      [ProjectLinkType.Website]: 'Ver web',
      [ProjectLinkType.GitHub]: 'Código en GitHub'
    },
    items: {
      'belen-david-boda': {
        subtitle: 'Experiencia web personalizada para invitados con acceso privado, itinerario, galería, información práctica, confirmación de asistencia y panel de gestión de invitaciones.',
        tags: ['Aplicación web', 'Astro', 'React', 'Diseño responsive']
      },
      solidarianid: {
        subtitle: 'Plataforma para gestionar voluntariado y causas solidarias, con identidad digital, comunidades, eventos y acciones benéficas sobre una arquitectura de microservicios orientada a eventos.',
        tags: ['Microservicios', 'DDD', 'NestJS', 'Apache Kafka']
      },
      ariadne: {
        subtitle: 'Herramienta de línea de comandos desarrollada como TFM para validar datos, analizar ontologías y mappings, evaluar calidad y generar grafos RDF mediante un pipeline modular.',
        tags: ['TFM', 'Python', 'Grafos de conocimiento', 'Arquitectura hexagonal']
      },
      linetree: {
        subtitle: 'Aplicación web para la creación y visualización de árboles genealógicos, diseñada para representar relaciones familiares, herencias y vínculos de forma clara y estructurada.',
        tags: ['TFG', 'Aplicación web', 'Arquitectura', 'Modelado de datos']
      },
      'clash-of-clans-api': {
        subtitle: 'API backend para el seguimiento y análisis de la actividad de un clan en Clash of Clans, centralizando métricas de jugadores, guerras, donaciones y eventos.',
        tags: ['API REST', 'Análisis de datos']
      }
    }
  },
  social: {
    github: 'GitHub de Manuel',
    linkedin: 'LinkedIn de Manuel',
    mail: 'Enviar un correo a contacto@elmanueh.es'
  },
  notFound: {
    eyebrow: 'Página no encontrada',
    heading: 'Esta página no existe.',
    description: 'Puede que se haya movido o que la dirección no sea correcta. En cualquier caso, aquí no hay nada que mostrar.',
    backHome: 'Volver al inicio',
    navigationAria: 'Opción para continuar'
  },
  clashOfClans: {
    heading: 'Clash Of Clans',
    searchPrefix: 'Consultar información sobre un',
    searchHighlight: 'clan',
    searchButton: 'BUSCAR',
    columns: {
      Clan: 'Clan', Player: 'Jugador', Name: 'Nombre', Role: 'Rango', TownHall: 'TH', LootCapital: 'Capital +', AddCapital: 'Capital -', ClanGames: 'Juegos', WarPreference: 'Guerra', WarAttacks: 'Guerra Atq.'
    },
    values: { member: 'Miembro', admin: 'Veterano', coLeader: 'Colíder', leader: 'Líder', in: 'Sí', out: 'No' },
    fetchError: 'No se pudieron cargar los datos del clan.'
  }
} satisfies Translations
