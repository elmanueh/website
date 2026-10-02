import { CalendarPlus, RefreshCw } from 'lucide-react'
import { useGithub } from '@/hooks/use-github'
import { en } from '@/i18n/en'
import { es } from '@/i18n/es'
import type { Locale } from '@/i18n/types'

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

// Relative months and years use approximate durations.
const TIME_UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * DAY],
  ['month', 30 * DAY],
  ['day', DAY],
  ['hour', HOUR],
  ['minute', MINUTE]
]

function formatRelativeDate(value: string, locale: string) {
  const seconds = Math.max(
    1,
    Math.floor((Date.now() - Date.parse(value)) / 1000)
  )
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })

  for (const [unit, duration] of TIME_UNITS) {
    if (seconds >= duration) {
      return formatter.format(-Math.floor(seconds / duration), unit)
    }
  }

  return formatter.format(-seconds, 'second')
}

interface Props {
  source: string
  locale: Locale
  type: 'created' | 'updated'
}

export default function GithubDate({ source, locale, type }: Readonly<Props>) {
  const state = useGithub(source)

  if (state.status === 'unavailable') return null

  const isCreated = type === 'created'
  const Icon = isCreated ? CalendarPlus : RefreshCw
  const labels = (locale === 'en' ? en : es).projectDetail
  const label = isCreated ? labels.firstCommit : labels.lastCommit
  const date =
    state.status === 'ready'
      ? state.dates[isCreated ? 'createdAt' : 'updatedAt']
      : undefined

  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="shrink-0 text-brand" aria-hidden="true" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <time
        className="font-mono text-xs text-foreground"
        dateTime={date}
        aria-live="polite"
        aria-busy={!date}
      >
        {date ? formatRelativeDate(date, locale) : '…'}
      </time>
    </div>
  )
}
