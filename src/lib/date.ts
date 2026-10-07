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

export function formatRelativeDate(value: string, locale: string): string {
  const seconds = Math.max(
    1,
    Math.floor((Date.now() - Date.parse(value)) / 1000)
  )
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })
  for (const [unit, duration] of TIME_UNITS) {
    if (seconds >= duration)
      return formatter.format(-Math.floor(seconds / duration), unit)
  }
  return formatter.format(-seconds, 'second')
}
