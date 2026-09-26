import { getRelativeLocaleUrl } from 'astro:i18n'
import { en } from '@/i18n/en'
import { es } from '@/i18n/es'
import type { Locale, Translations } from '@/i18n/types'

const locales = ['es', 'en'] as const satisfies readonly Locale[]
const defaultLocale: Locale = 'es'

const dictionaries: Record<Locale, Translations> = { es, en }

interface AstroI18nContext {
  currentLocale?: string
  url: URL
}

function normalizeLocale(locale?: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}

function getLocalizedPath(locale: Locale, path = ''): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, '')
  if (locale === 'es' && normalizedPath === '404') return '/404.html'
  return getRelativeLocaleUrl(locale, normalizedPath)
}

function getEquivalentPath(pathname: string): string {
  return pathname.replace(/^\/en(?:\/|$)/, '/').replace(/^\/+|\/+$/g, '')
}

export class I18n {
  static readonly locales = locales
  static readonly defaultLocale = defaultLocale

  readonly locale: Locale
  readonly t: Translations
  readonly equivalentPath: string

  private constructor(context: AstroI18nContext) {
    this.locale = normalizeLocale(context.currentLocale)
    this.t = dictionaries[this.locale]
    this.equivalentPath = getEquivalentPath(context.url.pathname)
  }

  static from(context: AstroI18nContext): I18n {
    return new I18n(context)
  }

  path(path = '', locale: Locale = this.locale): string {
    return getLocalizedPath(locale, path)
  }

  currentPath(locale: Locale = this.locale): string {
    return this.path(this.equivalentPath, locale)
  }

  languageLinks() {
    return locales.map((locale) => ({
      locale,
      href: this.currentPath(locale),
      label: this.t.header.switchTo[locale]
    }))
  }
}

export type { Locale, Translations }
