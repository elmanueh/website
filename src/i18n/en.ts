import { ProjectLinkType } from '@/data/projects'
import type { Translations } from '@/i18n/types'

export const en = {
  meta: {
    home: {
      title: 'elmanueh | Software Engineer',
      description: 'Portfolio of Manuel Bernabé Rodríguez, a Backend Software Engineer specialising in .NET, REST APIs and software architecture.'
    },
    clashOfClans: {
      title: 'Clash of Clans API | elmanueh',
      description: 'Explore player activity and metrics for a Clash of Clans clan.'
    },
    notFound: {
      title: 'Page not found | elmanueh',
      description: 'The requested page does not exist or has moved.'
    }
  },
  header: {
    home: 'Home',
    projects: 'Projects',
    homeAria: 'elmanueh — Home',
    navigationAria: 'Main navigation',
    languageSelectorAria: 'Select language',
    switchTo: { es: 'Switch to Spanish', en: 'Switch to English' }
  },
  hero: {
    location: 'Orihuela, Alicante, Spain',
    summary: 'I design and build maintainable REST APIs and enterprise software, with a particular interest in software architecture, automation and infrastructure.',
    stackLead: 'My core stack is',
    downloadCv: 'Download CV',
    profileAria: 'Profile of Manuel Bernabé Rodríguez',
    profileAlt: 'Portrait of Manuel Bernabé Rodríguez',
    focusEyebrow: 'Focus',
    focusTitle: 'Backend and architecture',
    focusDescription: 'Maintainable services, system integration and delivery lifecycle automation.'
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Projects',
    description: 'Academic and personal work focused on backend development, architecture, data and web applications.',
    cardEyebrow: 'Project',
    previewAlt: 'Preview of',
    technologiesLabel: 'Technologies used in',
    linkLabels: {
      [ProjectLinkType.Website]: 'View website',
      [ProjectLinkType.GitHub]: 'View on GitHub'
    },
    items: {
      'belen-david-boda': {
        subtitle: 'A bespoke private experience for wedding guests, featuring the schedule, gallery, practical information, RSVP flow and an invitation management dashboard.',
        tags: ['Web application', 'Astro', 'React', 'Responsive design']
      },
      solidarianid: {
        subtitle: 'A platform for managing volunteering and charitable causes, with digital identity, communities, events and social initiatives built on an event-driven microservices architecture.',
        tags: ['Microservices', 'DDD', 'NestJS', 'Apache Kafka']
      },
      ariadne: {
        subtitle: 'A command-line tool created as a master’s thesis project to validate data, analyse ontologies and mappings, assess quality and generate RDF graphs through a modular pipeline.',
        tags: ["Master's thesis", 'Python', 'Knowledge graphs', 'Hexagonal architecture']
      },
      linetree: {
        subtitle: 'A web application for creating and visualising family trees, designed to represent family relationships, inheritance and connections in a clear, structured way.',
        tags: ["Bachelor's thesis", 'Web application', 'Architecture', 'Data modelling']
      },
      'clash-of-clans-api': {
        subtitle: 'A backend API for tracking and analysing clan activity in Clash of Clans, bringing together player, war, donation and event metrics.',
        tags: ['REST API', 'Data analysis']
      }
    }
  },
  social: {
    github: "Manuel's GitHub profile",
    linkedin: "Manuel's LinkedIn profile",
    mail: 'Email contacto@elmanueh.es'
  },
  notFound: {
    eyebrow: 'Page not found',
    heading: 'This page does not exist.',
    description: 'It may have moved or the address may be incorrect. Either way, there is nothing to show here.',
    backHome: 'Back to home',
    navigationAria: 'Continue browsing'
  },
  clashOfClans: {
    heading: 'Clash Of Clans',
    searchPrefix: 'Look up information about a',
    searchHighlight: 'clan',
    searchButton: 'SEARCH',
    columns: {
      Clan: 'Clan', Player: 'Player', Name: 'Name', Role: 'Role', TownHall: 'TH', LootCapital: 'Capital +', AddCapital: 'Capital -', ClanGames: 'Games', WarPreference: 'War', WarAttacks: 'War attacks'
    },
    values: { member: 'Member', admin: 'Elder', coLeader: 'Co-leader', leader: 'Leader', in: 'Yes', out: 'No' },
    fetchError: 'The clan data could not be loaded.'
  }
} satisfies Translations
