import { CalendarPlus, RefreshCw, type LucideIcon } from 'lucide-react'
import { useGithub } from '@/hooks/use-github'

interface Props {
  source: string
  locale: string
  createdLabel: string
  updatedLabel: string
}

interface DateItemProps {
  icon: LucideIcon
  label: string
  value?: string
  locale: string
}

function DateItem({ icon: Icon, label, value, locale }: DateItemProps) {
  const formattedDate = value
    ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
    : '…'

  return <div className="flex items-center gap-2">
    <Icon size={15} className="shrink-0 text-brand" aria-hidden="true" />
    <span className="text-xs text-muted-foreground">{label}</span>
    <time className="font-mono text-xs text-foreground" dateTime={value} aria-live="polite" aria-busy={!value}>
      {formattedDate}
    </time>
  </div>
}

export default function GithubDates({ source, locale, createdLabel, updatedLabel }: Props) {
  const state = useGithub(source)

  if (state.status === 'unavailable') return null
  const dates = state.status === 'ready' ? state.dates : undefined

  return <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
    <DateItem icon={CalendarPlus} label={createdLabel} value={dates?.createdAt} locale={locale} />
    <DateItem icon={RefreshCw} label={updatedLabel} value={dates?.updatedAt} locale={locale} />
  </div>
}
