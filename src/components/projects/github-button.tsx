import type { ComponentPropsWithoutRef } from 'react'
import { useGithub } from '@/hooks/use-github'

type GithubButtonProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'target' | 'rel'
> & {
  slug: string
}

export default function GithubButton({
  slug,
  ...props
}: Readonly<GithubButtonProps>) {
  const state = useGithub(slug)
  if (state.status !== 'ready' || !state.metadata.sourceUrl) return null

  return (
    <a
      {...props}
      href={state.metadata.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
