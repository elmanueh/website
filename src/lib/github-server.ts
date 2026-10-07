import type { RepositoryMetadata } from '@/types/github'

const TTL = 15 * 60 * 1000
const ACTIVITY_MONTHS = 12
const REQUEST_TIMEOUT = 10_000
const ACTIVITY_TIMEOUT = 20_000
const MAX_ACTIVITY_PAGES = 50
const cache = new Map<string, { data: RepositoryMetadata; expiresAt: number }>()
const pending = new Map<string, Promise<RepositoryMetadata>>()
let retryAt = 0

async function github(path: string, token: string | undefined, timeout = REQUEST_TIMEOUT) {
  if (!token) throw new Error('GitHub token is not configured')
  if (Date.now() < retryAt) throw new Error('GitHub requests are temporarily paused')
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2026-03-10'
    },
    signal: AbortSignal.timeout(timeout)
  })
  if (response.status === 429 || (response.status === 403 &&
    (response.headers.has('retry-after') || response.headers.get('x-ratelimit-remaining') === '0'))) {
    const delay = Number(response.headers.get('retry-after'))
    const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000 || 0
    retryAt = delay > 0 ? Date.now() + delay * 1000 : Math.max(reset, Date.now() + 60_000)
  }
  return response
}

async function fetchMonthlyActivity(path: string, token: string | undefined, hasCommits: boolean): Promise<RepositoryMetadata['monthlyActivity']> {
  // Eleven completed calendar months plus the current month to date, in UTC.
  const now = new Date()
  const end = now.getTime()
  const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - ACTIVITY_MONTHS + 1, 1)
  const months = Array.from({ length: ACTIVITY_MONTHS }, (_, index) => ({
    month: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - ACTIVITY_MONTHS + 1 + index, 1)).toISOString().slice(0, 7),
    commits: 0
  }))
  if (!hasCommits) return months
  const monthsByDate = new Map(months.map(month => [month.month, month]))
  const query = new URLSearchParams({
    since: new Date(start).toISOString(),
    until: now.toISOString(),
    per_page: '100'
  })

  // Bound API work; omit the chart rather than return an incomplete history.
  const deadline = Date.now() + ACTIVITY_TIMEOUT
  for (let page = 1; page <= MAX_ACTIVITY_PAGES; page++) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) return null
    const response = await github(`${path}/commits?${query}&page=${page}`, token, Math.min(REQUEST_TIMEOUT, remaining))
    if (response.status === 409) return page === 1 ? months : null
    if (!response.ok) return null
    const commits = await response.json() as { commit?: { committer?: { date?: unknown } } }[]
    if (!Array.isArray(commits)) return null
    for (const commit of commits) {
      const date = commit.commit?.committer?.date
      const timestamp = typeof date === 'string' ? Date.parse(date) : Number.NaN
      if (Number.isNaN(timestamp)) return null
      const month = monthsByDate.get(new Date(timestamp).toISOString().slice(0, 7))
      if (month && timestamp >= start && timestamp <= end) month.commits++
    }
    if (!response.headers.get('link')?.includes('rel="next"')) return months
  }
  return null
}

async function fetchMetadata(repository: string, token: string | undefined): Promise<RepositoryMetadata> {
  const path = `/repos/${repository.split('/').map(encodeURIComponent).join('/')}`
  // Refresh visibility on cache misses; expired metadata is never served.
  const response = await github(path, token)
  if (!response.ok) throw new Error('Repository metadata is unavailable')
  const repo = await response.json() as { private?: unknown }
  if (typeof repo.private !== 'boolean') throw new Error('Invalid repository visibility')

  const updatedAt = await fetchLatestCommitDate(path, token)
  const monthlyActivity = await fetchMonthlyActivity(path, token, updatedAt !== null).catch(() => null)
  const releaseVersion = await fetchLatestRelease(path, token).catch(() => null)
  return {
    updatedAt,
    sourceUrl: repo.private ? null : `https://github.com/${repository}`,
    visibility: repo.private ? 'private' : 'public',
    releaseVersion,
    monthlyActivity
  }
}

async function fetchLatestCommitDate(path: string, token: string | undefined): Promise<string | null> {
  const response = await github(`${path}/commits?per_page=1`, token)
  if (response.status === 409) return null
  if (!response.ok) throw new Error('Repository commits are unavailable')
  const commits = await response.json() as { commit?: { committer?: { date?: unknown } } }[]
  const date = commits[0]?.commit?.committer?.date
  if (typeof date !== 'string' || Number.isNaN(Date.parse(date))) {
    throw new TypeError('Invalid commit date')
  }
  return date
}

async function fetchLatestRelease(path: string, token: string | undefined): Promise<string | null> {
  const response = await github(`${path}/releases/latest`, token)
  if (response.status === 404) return '' // No published stable release; null means unavailable.
  if (!response.ok) return null
  const release = await response.json() as { tag_name?: unknown }
  return typeof release.tag_name === 'string' && release.tag_name.trim() ? release.tag_name : null
}

export function getRepositoryMetadata(repository: string, token: string | undefined): Promise<RepositoryMetadata> {
  const cached = cache.get(repository)
  if (cached && cached.expiresAt > Date.now()) return Promise.resolve(cached.data)
  const existing = pending.get(repository)
  if (existing) return existing
  const request = fetchMetadata(repository, token).then(data => {
    cache.set(repository, { data, expiresAt: Date.now() + TTL })
    return data
  }).finally(() => pending.delete(repository))
  pending.set(repository, request)
  return request
}

// Browser caching shares the server's expiry instead of extending it another 15 minutes.
export function getRepositoryMetadataMaxAge(repository: string): number {
  const cached = cache.get(repository)
  return cached ? Math.max(0, Math.floor((cached.expiresAt - Date.now()) / 1000)) : 0
}
