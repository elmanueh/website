export default function Skeleton({ className }: Readonly<{ className: string }>) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-sm bg-muted motion-safe:animate-pulse ${className}`}
    />
  )
}

