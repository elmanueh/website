import FooterLink from '@/layouts/FooterLink'

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground font-medium">
          © {new Date().getFullYear()} Manuel Bernabé Rodríguez{' '}
          <span className="text-muted-foreground">(elmanueh)</span>
        </p>

        <div className="flex items-center gap-6 text-sm">
          <FooterLink href="mailto:bernabe2003@gmail.com" label="Email" />
          <FooterLink href="https://github.com/elmanueh" label="GitHub" />
          <FooterLink
            href="https://www.linkedin.com/in/manuel-bernabe-rodriguez/"
            label="LinkedIn"
          />
        </div>
      </div>
    </footer>
  )
}
