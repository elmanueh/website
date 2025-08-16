import { Link } from 'react-router'

interface HeaderElementProps {
  image: string
  text: string
  link: string
}

export default function HeaderElement(props: HeaderElementProps) {
  return (
    <Link
      className="flex items-center hover:bg-gray-950 transition px-5"
      to={props.link}
    >
      <img className="mr-2" src={props.image} height={25} width={25} />
      <p className="text-gray-100 font-semibold text-sm">{props.text}</p>
    </Link>
  )
}
