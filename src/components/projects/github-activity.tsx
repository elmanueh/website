import {
  Area,
  AreaChart,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts'
import { useGithubActivity } from '@/hooks/use-github-activity'
import { en } from '@/i18n/en'
import { es } from '@/i18n/es'
import type { Locale } from '@/i18n/types'
import type { RepositoryMetadata } from '@/types/github'

export default function GithubActivity({
  months,
  locale
}: Readonly<{
  months: NonNullable<RepositoryMetadata['monthlyActivity']>
  locale: Locale
}>) {
  const { current, isSelected, previewMonth, resetSelection, handleKeyDown } =
    useGithubActivity(months.length)
  const labels = (locale === 'en' ? en : es).github
  const numbers = new Intl.NumberFormat(locale)
  const dates = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
  const month = months[current]
  const monthLabel = dates.format(new Date(`${month.month}-01T00:00:00Z`))
  const count = numbers.format(month.commits)
  const peak = Math.max(1, ...months.map((month) => month.commits))

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      tabIndex={0}
      role="slider"
      aria-label={labels.activityPeriod}
      aria-valuemin={0}
      aria-valuemax={months.length - 1}
      aria-valuenow={current}
      aria-valuetext={`${monthLabel}: ${count} commits`}
      onBlur={resetSelection}
      onPointerLeave={resetSelection}
      onKeyDown={handleKeyDown}
    >
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-mono text-xs leading-4 text-foreground">
          {monthLabel}
        </span>
        <span className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
          <span className="font-mono text-lg leading-none text-foreground tabular-nums">
            {count}
          </span>
          <span className="text-xs text-muted-foreground">commits</span>
        </span>
      </div>
      <div
        className="h-10 w-full min-w-0 shrink-0 touch-pan-y"
        aria-hidden="true"
      >
        <AreaChart
          responsive
          height={40}
          style={{ width: '100%', height: 40 }}
          data={months}
          margin={{ top: 4, right: 3, bottom: 3, left: 3 }}
          accessibilityLayer={false}
          onMouseMove={previewMonth}
          onTouchMove={previewMonth}
          onTouchEnd={resetSelection}
        >
          <XAxis dataKey="month" hide />
          <YAxis hide domain={[0, peak]} />
          <Area
            type="monotoneX"
            dataKey="commits"
            stroke="var(--brand)"
            strokeWidth={2}
            fill="var(--brand)"
            fillOpacity={0.15}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
          {isSelected && (
            <>
              <ReferenceLine
                x={month.month}
                stroke="var(--brand)"
                strokeWidth={2}
                strokeOpacity={0.5}
              />
              <ReferenceDot
                x={month.month}
                y={month.commits}
                r={4}
                fill="var(--brand)"
                stroke="var(--card)"
              />
            </>
          )}
        </AreaChart>
      </div>
      <span className="text-xs leading-4 text-muted-foreground">
        {labels.activityPeriod}
      </span>
    </div>
  )
}
