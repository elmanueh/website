import { useEffect, useState } from 'react'
import type { RepositoryMetadata } from '@/types/github'

type GitHubState =
  | { status: 'loading' }
  | { status: 'ready'; metadata: RepositoryMetadata }
  | { status: 'unavailable' }

const pending = new Map<string, Promise<RepositoryMetadata>>()

function loadMetadata(slug: string): Promise<RepositoryMetadata> {
  const existing = pending.get(slug)
  if (existing) return existing
  const request = fetch(`/api/projects/${encodeURIComponent(slug)}`)
    .then((response) => {
      if (!response.ok) throw new Error('Metadata unavailable')
      return response.json() as Promise<RepositoryMetadata>
    })
    .finally(() => pending.delete(slug))
  pending.set(slug, request)
  return request
}

export function useGithub(slug: string): GitHubState {
  const [result, setResult] = useState<GitHubState & { slug: string }>({
    slug,
    status: 'loading'
  })
  useEffect(() => {
    let active = true
    setResult({ slug, status: 'loading' })
    loadMetadata(slug)
      .then((metadata) => {
        if (active) setResult({ slug, status: 'ready', metadata })
      })
      .catch(() => {
        if (active) setResult({ slug, status: 'unavailable' })
      })
    return () => {
      active = false
    }
  }, [slug])
  return result.slug === slug ? result : { status: 'loading' }
}
