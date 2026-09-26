export interface Profile {
  name: string
  shortName: string
  role: string
  location: string
  email: string
  summary: string
  stack: string[]
  cvUrl: string
}

export type ProfileTranslation = Pick<Profile, 'location' | 'summary'>
type ProfileDefinition = Pick<Profile, 'name' | 'shortName' | 'role' | 'email' | 'stack' | 'cvUrl'>

const profileDefinition: ProfileDefinition = {
  name: 'Manuel Bernabé Rodríguez',
  shortName: 'elmanueh',
  role: 'Backend Software Engineer',
  email: 'contacto@elmanueh.es',
  stack: ['.NET', 'C#', 'ASP.NET Core', 'SQL Server'],
  cvUrl: '/CV_Manuel_Bernabe_Rodriguez.pdf'
}

export function getProfile(translation: ProfileTranslation): Profile {
  return { ...profileDefinition, ...translation }
}
