import {
  Globe,
  LockKeyhole,
  RefreshCw,
  Tag,
  type LucideIcon
} from 'lucide-react'
import type { ReactNode } from 'react'
import GithubActivity from '@/components/projects/github-activity'
import { useGithub } from '@/hooks/use-github'
import { en } from '@/i18n/en'
import { es } from '@/i18n/es'
import type { Locale } from '@/i18n/types'
import { formatRelativeDate } from '@/lib/date'

interface GithubStatItemProps {
  icon: LucideIcon
  label: string
  children: ReactNode
}

function GithubStatItem({
  icon: Icon,
  label,
  children
}: Readonly<GithubStatItemProps>) {
  return (
    <div className="grid grid-cols-[14px_max-content] items-start justify-self-center gap-2 text-left max-[680px]:flex max-[680px]:w-full max-[680px]:items-center max-[680px]:justify-between max-[680px]:gap-4">
      <dt className="col-span-full flex items-center gap-2 text-xs text-muted-foreground">
        <Icon size={14} className="shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd className="col-start-2 m-0 font-mono text-xs text-foreground">
        {children}
      </dd>
    </div>
  )
}

interface GithubStatsProps {
  slug: string
  locale: Locale
}

export default function GithubStats({
  slug,
  locale
}: Readonly<GithubStatsProps>) {
  const state = useGithub(slug)
  if (state.status === 'unavailable') return null
  const labels = (locale === 'en' ? en : es).projectDetail
  const metadata = state.status === 'ready' ? state.metadata : null
  const date = metadata?.updatedAt
  const VisibilityIcon =
    metadata?.visibility === 'private' ? LockKeyhole : Globe

  return (
    <div
      className={`grid items-center gap-8 max-[900px]:grid-cols-1 max-[680px]:gap-6 ${metadata?.monthlyActivity ? 'grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]' : 'grid-cols-1'}`}
    >
      {metadata?.monthlyActivity && (
        <GithubActivity months={metadata.monthlyActivity} locale={locale} />
      )}
      <dl className="m-0 grid min-w-0 grid-cols-3 gap-x-5 gap-y-4 max-[680px]:grid-cols-1">
        {metadata && (
          <GithubStatItem icon={VisibilityIcon} label={labels.repository}>
            {metadata.visibility === 'private'
              ? labels.privateRepository
              : labels.publicRepository}
          </GithubStatItem>
        )}
        {metadata && metadata.releaseVersion !== null && (
          <GithubStatItem icon={Tag} label={labels.latestRelease}>
            {metadata.releaseVersion || labels.noReleases}
          </GithubStatItem>
        )}
        {(state.status === 'loading' || date) && (
          <GithubStatItem icon={RefreshCw} label={labels.lastCommit}>
            <time
              dateTime={date ?? undefined}
              aria-live="polite"
              aria-busy={!date}
            >
              {date ? formatRelativeDate(date, locale) : '…'}
            </time>
          </GithubStatItem>
        )}
      </dl>
    </div>
  )
}
