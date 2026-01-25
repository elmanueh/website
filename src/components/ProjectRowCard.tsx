import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  subtitle: string
  image: string
  tags: string[]
}

export default function ProjectRowCard({
  title,
  subtitle,
  image,
  tags
}: Readonly<Props>) {
  return (
    <Card
      role="button"
      tabIndex={0}
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-border/60
        bg-background
        transition-colors
        hover:border-border
        hover:bg-muted/20
        hover:cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={`${title} cover`}
          loading="lazy"
          className="
      h-full w-full object-cover
      opacity-40
      saturate-[1.25] contrast-[1.08] brightness-[1.05]
      transition duration-300
      group-hover:opacity-60
      group-hover:saturate-[1.5] group-hover:contrast-[1.12]
    "
        />

        <div className="absolute inset-0 bg-background/35" />

        <div className="absolute inset-0 bg-linear-to-r from-background/75 via-background/35 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-primary/8" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="max-w-2xl space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="bg-background/60 text-xs"
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
