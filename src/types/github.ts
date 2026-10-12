export interface RepositoryMetadata {
  updatedAt: string | null
  sourceUrl: string | null
  visibility: 'public' | 'private'
  releaseVersion: string | null
  activity: { start: string; end: string; isCurrent: boolean; commits: number }[] | null
}
