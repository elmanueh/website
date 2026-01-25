interface FooterLinkProps {
  href: string
  label: string
}

export default function FooterLink({ href, label }: Readonly<FooterLinkProps>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
    </a>
  )
}
