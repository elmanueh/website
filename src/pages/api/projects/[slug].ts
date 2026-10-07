import { projectDefinitions } from '@/data/projects'
import { getRepositoryMetadata, getRepositoryMetadataMaxAge } from '@/lib/github-server'
import type { APIRoute } from 'astro'
import { getSecret } from 'astro:env/server'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  const repository = projectDefinitions.find((project) => project.slug === params.slug)?.repository
  if (!repository) return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404, headers })
  try {
    const metadata = await getRepositoryMetadata(repository, getSecret('GITHUB_TOKEN'))
    return new Response(JSON.stringify(metadata), {
      headers: { ...headers, 'Cache-Control': `private, max-age=${getRepositoryMetadataMaxAge(repository)}, must-revalidate` }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Repository metadata unavailable' }), { status: 503, headers })
  }
}
