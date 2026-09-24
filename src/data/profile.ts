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

export const profile: Profile = {
  name: 'Manuel Bernabé Rodríguez',
  shortName: 'elmanueh',
  role: 'Backend Software Engineer',
  location: 'Orihuela, Alicante, España',
  email: 'contacto@elmanueh.es',
  summary:
    'Diseño y desarrollo APIs REST y software empresarial mantenible, con especial interés en arquitectura de software, automatización e infraestructura.',
  stack: ['.NET', 'C#', 'ASP.NET Core', 'SQL Server'],
  cvUrl: '/CV_Manuel_Bernabe_Rodriguez.pdf'
}
