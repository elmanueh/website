import { useEffect, useState } from 'react'
import {
  clearGithubRetryAt,
  readGithubCache,
  readGithubRetryAt,
  writeGithubCache,
  writeGithubRetryAt,
  type CachedGithubDates
} from '@/lib/github-cache'

const GITHUB_OWNER = 'elmanueh'
const GITHUB_API = 'https://api.github.com'
const GITHUB_API_VERSION = '2026-03-10'
const UPDATED_AT_TTL = 15 * 60 * 1000
const CREATED_AT_TTL = 60 * 60 * 1000
const DEFAULT_RATE_LIMIT_DELAY = 60 * 1000

interface GitHubCommit {
  commit?: { committer?: { date?: unknown } }
}

export interface GitHubDates {
  createdAt: string
  updatedAt: string
}

export type GitHubState =
  | { status: 'loading' }
  | { status: 'ready'; dates: GitHubDates }
  | { status: 'unavailable' }

class GitHubRateLimitError extends Error {
  constructor(readonly retryAt: number) {
    super('GitHub API rate limit exceeded')
  }
}

const pendingRequests = new Map<string, Promise<GitHubDates>>()

function getRepositoryName(source: string) {
  const url = new URL(source)
  const [owner, repository] = url.pathname.split('/').filter(Boolean)

  if (
    url.hostname !== 'github.com' ||
    owner?.toLowerCase() !== GITHUB_OWNER ||
    !repository
  ) {
    throw new Error('Invalid GitHub repository URL')
  }

  return repository.replace(/\.git$/, '')
}

function isDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function readCommitDate(commits: GitHubCommit[]) {
  const date = commits[0]?.commit?.committer?.date
  if (!isDate(date)) throw new Error('Repository has no commits')
  return date
}

function getRetryAt(response: Response) {
  const retryAfter = Number(response.headers.get('retry-after'))
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Date.now() + retryAfter * 1000
  }

  const resetAt = Number(response.headers.get('x-ratelimit-reset'))
  if (Number.isFinite(resetAt) && resetAt > 0) return resetAt * 1000

  return Date.now() + DEFAULT_RATE_LIMIT_DELAY
}

async function isRateLimitResponse(response: Response) {
  if (response.status === 429) return true
  if (response.status !== 403) return false

  if (
    response.headers.has('retry-after') ||
    response.headers.get('x-ratelimit-remaining') === '0'
  ) {
    return true
  }

  try {
    const body = (await response.clone().json()) as { message?: unknown }
    return (
      typeof body.message === 'string' &&
      body.message.toLowerCase().includes('rate limit')
    )
  } catch {
    return false
  }
}

async function getCommits(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': GITHUB_API_VERSION
    },
    cache: 'no-store'
  })

  if (await isRateLimitResponse(response)) {
    throw new GitHubRateLimitError(getRetryAt(response))
  }

  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)
  clearGithubRetryAt()
  return { response, commits: (await response.json()) as GitHubCommit[] }
}

async function fetchLatestDate(repository: string) {
  return getCommits(
    `${GITHUB_API}/repos/${GITHUB_OWNER}/${encodeURIComponent(repository)}/commits?per_page=1`
  )
}

async function refreshDates(
  repository: string,
  cached: CachedGithubDates | undefined
): Promise<GitHubDates> {
  const now = Date.now()
  const shouldRefreshCreated =
    !cached || now - cached.createdAtCheckedAt >= CREATED_AT_TTL
  const shouldRefreshUpdated =
    !cached || now - cached.updatedAtCheckedAt >= UPDATED_AT_TTL
  const retryAt = readGithubRetryAt()

  if (retryAt) {
    if (cached) return cached
    throw new GitHubRateLimitError(retryAt)
  }
  if (!shouldRefreshCreated && !shouldRefreshUpdated && cached) return cached

  let refreshedCache: CachedGithubDates | undefined

  try {
    const latest = await fetchLatestDate(repository)
    const updatedAt = readCommitDate(latest.commits)
    refreshedCache = cached
      ? { ...cached, updatedAt, updatedAtCheckedAt: now }
      : undefined

    if (!shouldRefreshCreated && refreshedCache) {
      writeGithubCache(repository, refreshedCache)
      return refreshedCache
    }

    const oldestPageUrl = latest.response.headers
      .get('link')
      ?.split(',')
      .find((link) => link.includes('rel="last"'))
      ?.match(/<([^>]+)>/)?.[1]
    const createdAt = oldestPageUrl
      ? readCommitDate((await getCommits(oldestPageUrl)).commits)
      : updatedAt
    const dates = {
      createdAt,
      updatedAt,
      createdAtCheckedAt: now,
      updatedAtCheckedAt: now
    }

    writeGithubCache(repository, dates)
    return dates
  } catch (error) {
    const fallback = refreshedCache ?? cached

    if (error instanceof GitHubRateLimitError) {
      writeGithubRetryAt(error.retryAt)
    }

    if (fallback) {
      if (refreshedCache) writeGithubCache(repository, refreshedCache)

      return fallback
    }

    throw error
  }
}

function loadDates(source: string) {
  const repository = getRepositoryName(source)
  const existingRequest = pendingRequests.get(repository)
  if (existingRequest) return existingRequest

  const request = refreshDates(repository, readGithubCache(repository)).finally(
    () => {
      pendingRequests.delete(repository)
    }
  )

  pendingRequests.set(repository, request)
  return request
}

export function useGithub(source: string): GitHubState {
  const [state, setState] = useState<GitHubState>({ status: 'loading' })

  useEffect(() => {
    let isActive = true

    try {
      const cached = readGithubCache(getRepositoryName(source))
      setState(
        cached ? { status: 'ready', dates: cached } : { status: 'loading' }
      )
    } catch {
      setState({ status: 'unavailable' })
      return
    }

    loadDates(source)
      .then((dates) => {
        if (isActive) setState({ status: 'ready', dates })
      })
      .catch(() => {
        if (isActive) setState({ status: 'unavailable' })
      })

    return () => {
      isActive = false
    }
  }, [source])

  return state
}
