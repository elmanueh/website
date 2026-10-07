import type { Translations } from '@/i18n/types'

export const es = {
  anchors: { home: 'inicio', projects: 'proyectos' },
  meta: {
    home: {
      title: 'elmanueh | Software Engineer'
    },
    clashOfClans: {
      title: 'API Clash of Clans | elmanueh'
    },
    notFound: {
      title: 'Página no encontrada | elmanueh'
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
      source: 'Ver código fuente',
      app: 'Ver aplicación'
    }
  },
  projectDetail: {
    eyebrow: 'Caso de estudio',
    onThisPage: 'En esta página',
    lastCommit: 'Última actualización',
    activityPeriod: 'Últimos 12 meses',
    repository: 'Repositorio',
    publicRepository: 'Público',
    privateRepository: 'Privado',
    latestRelease: 'Versión',
    noReleases: 'Sin versión',
    backToProjects: 'Volver a proyectos',
    openCaseStudy: 'Ver caso de estudio de',
    emptyTitle: 'Próximamente',
    emptyDescription: 'Más detalles de este proyecto.'
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
