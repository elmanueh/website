import { Link } from 'react-router-dom'

interface HeaderElementProps {
  image: string
  text: string
  link: string
  external?: boolean
}

export default function HeaderElement({
  image,
  text,
  link,
  external
}: Readonly<HeaderElementProps>) {
  const baseClasses =
    'flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'

  const content = (
    <>
      <img src={image} width={20} height={20} alt="" className="opacity-80" />
      <span className="hidden sm:inline">{text}</span>
    </>
  )

  if (external) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className={baseClasses}>
        {content}
      </a>
    )
  }

  return (
    <Link to={link} className={baseClasses}>
      {content}
    </Link>
  )
}
