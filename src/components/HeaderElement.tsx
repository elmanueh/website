import { Link } from 'react-router'

interface HeaderElementProps {
  image: string
  text: string
  link: string
}

export default function HeaderElement(props: HeaderElementProps) {
  return (
    <Link
      className="flex items-center hover:bg-gray-950 transition px-3 sm:px-5"
      to={props.link}
    >
      <img src={props.image} height={25} width={25} />
      <p className="text-gray-100 sm:ml-2 font-semibold text-sm hidden sm:block">
        {props.text}
      </p>
    </Link>
  )
}
