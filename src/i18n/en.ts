import type { Translations } from '@/i18n/types'

export const en = {
  anchors: { home: 'home', projects: 'projects' },
  meta: {
    home: {
      title: 'elmanueh | Software Engineer'
    },
    clashOfClans: {
      title: 'Clash of Clans API | elmanueh'
    },
    notFound: {
      title: 'Page not found | elmanueh'
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
      source: 'View source code',
      app: 'View application'
    }
  },
  projectDetail: {
    eyebrow: 'Case study',
    onThisPage: 'On this page',
    firstCommit: 'Created',
    lastCommit: 'Last updated',
    backToProjects: 'Back to projects',
    openCaseStudy: 'View case study for'
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
