import { useEffect, useState } from 'react'

const GITHUB_OWNER = 'elmanueh'
const GITHUB_API = 'https://api.github.com'

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

function readCommitDate(commits: GitHubCommit[]) {
  const date = commits[0]?.commit?.committer?.date
  if (typeof date !== 'string') throw new Error('Repository has no commits')
  return date
}

async function getCommits(url: string, signal: AbortSignal) {
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store',
    signal
  })

  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)
  return { response, commits: (await response.json()) as GitHubCommit[] }
}

async function loadDates(
  source: string,
  signal: AbortSignal
): Promise<GitHubDates> {
  const repository = getRepositoryName(source)
  const latest = await getCommits(
    `${GITHUB_API}/repos/${GITHUB_OWNER}/${encodeURIComponent(repository)}/commits?per_page=1`,
    signal
  )
  const updatedAt = readCommitDate(latest.commits)
  const oldestPageUrl = latest.response.headers
    .get('link')
    ?.split(',')
    .find((link) => link.includes('rel="last"'))
    ?.match(/<([^>]+)>/)?.[1]

  if (!oldestPageUrl) return { createdAt: updatedAt, updatedAt }

  const oldest = await getCommits(oldestPageUrl, signal)
  return { createdAt: readCommitDate(oldest.commits), updatedAt }
}

export function useGithub(source: string): GitHubState {
  const [state, setState] = useState<GitHubState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    loadDates(source, controller.signal)
      .then((dates) => setState({ status: 'ready', dates }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'unavailable' })
      })

    return () => controller.abort()
  }, [source])

  return state
}
