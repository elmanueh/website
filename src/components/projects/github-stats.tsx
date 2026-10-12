import { CircleAlert, Globe, LockKeyhole, RefreshCw, Tag, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import GithubActivity from '@/components/projects/github-activity'
import Skeleton from '@/components/skeleton'
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

function GithubStatItem({ icon: Icon, label, children }: Readonly<GithubStatItemProps>) {
  return (
    <div className="grid grid-cols-[14px_max-content] items-start justify-self-center gap-2 text-left max-[680px]:flex max-[680px]:w-full max-[680px]:items-center max-[680px]:justify-between max-[680px]:gap-4">
      <dt className="col-span-full flex items-center gap-2 text-xs text-muted-foreground">
        <Icon size={14} className="shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd className="col-start-2 m-0 font-mono text-xs text-foreground">{children}</dd>
    </div>
  )
}

function GithubStatsLayout({ children, loading = false }: Readonly<{ children: ReactNode; loading?: boolean }>) {
  return (
    <div
      className="grid min-h-22 grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-center gap-8 max-[900px]:min-h-42.5 max-[900px]:grid-cols-1 max-[680px]:min-h-51.75 max-[680px]:gap-6"
      aria-busy={loading}
    >
      {children}
    </div>
  )
}

interface GithubStatsProps {
  slug: string
  locale: Locale
}

export default function GithubStats({ slug, locale }: Readonly<GithubStatsProps>) {
  const state = useGithub(slug)
  const labels = (locale === 'en' ? en : es).github

  if (state.status === 'loading') {
    return (
      <GithubStatsLayout loading>
        <output className="sr-only">{labels.loadingData}</output>
        <div className="flex w-full min-w-0 flex-col gap-3" aria-hidden="true">
          <div className="flex min-h-5 flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Skeleton className="h-4 w-56 max-w-full" />
            <span className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
              <span className="font-mono text-lg leading-none">
                <Skeleton className="h-[1em] w-8" />
              </span>
              <span className="text-xs text-muted-foreground">commits</span>
            </span>
          </div>
          <Skeleton className="h-10 w-full shrink-0" />
          <span className="text-xs leading-4 text-muted-foreground">{labels.activityPeriod}</span>
        </div>
        <dl className="m-0 grid min-w-0 grid-cols-3 gap-x-5 gap-y-4 max-[680px]:grid-cols-1">
          <GithubStatItem icon={Globe} label={labels.repository}>
            <Skeleton className="h-4 w-14" />
          </GithubStatItem>
          <GithubStatItem icon={Tag} label={labels.latestRelease}>
            <Skeleton className="h-4 w-16" />
          </GithubStatItem>
          <GithubStatItem icon={RefreshCw} label={labels.lastCommit}>
            <Skeleton className="h-4 w-28" />
          </GithubStatItem>
        </dl>
      </GithubStatsLayout>
    )
  }

  if (state.status === 'unavailable') {
    return (
      <GithubStatsLayout>
        <output className="col-span-full m-0 flex items-start justify-center gap-2 text-sm leading-6 text-muted-foreground">
          <CircleAlert size={16} className="mt-1 shrink-0" aria-hidden="true" />
          {labels.dataUnavailable}
        </output>
      </GithubStatsLayout>
    )
  }

  const { metadata } = state
  const date = metadata.updatedAt
  const VisibilityIcon = metadata.visibility === 'private' ? LockKeyhole : Globe

  return (
    <GithubStatsLayout>
      {metadata.activity?.length ? (
        <GithubActivity periods={metadata.activity} locale={locale} />
      ) : (
        <div className="flex min-h-22 min-w-0 flex-col justify-center gap-3">
          <span className="text-xs leading-4 text-muted-foreground">{labels.activityPeriod}</span>
          <output className="m-0 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <CircleAlert size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            {labels.activityUnavailable}
          </output>
        </div>
      )}
      <dl className="m-0 grid min-w-0 grid-cols-3 gap-x-5 gap-y-4 max-[680px]:grid-cols-1">
        <GithubStatItem icon={VisibilityIcon} label={labels.repository}>
          {metadata.visibility === 'private' ? labels.privateRepository : labels.publicRepository}
        </GithubStatItem>
        <GithubStatItem icon={Tag} label={labels.latestRelease}>
          {metadata.releaseVersion === null ? labels.valueUnavailable : metadata.releaseVersion || labels.noReleases}
        </GithubStatItem>
        <GithubStatItem icon={RefreshCw} label={labels.lastCommit}>
          {date ? <time dateTime={date}>{formatRelativeDate(date, locale)}</time> : labels.noCommits}
        </GithubStatItem>
      </dl>
    </GithubStatsLayout>
  )
}
