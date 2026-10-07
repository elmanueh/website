export interface RepositoryMetadata {
  updatedAt: string | null
  sourceUrl: string | null
  visibility: 'public' | 'private'
  releaseVersion: string | null
  monthlyActivity: { month: string; commits: number }[] | null
}
