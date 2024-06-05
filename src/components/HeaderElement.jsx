import { Link } from 'react-router-dom'

export function HeaderElement({ image, text, link }) {
  return (
    <>
      <Link className="hd-element" to={link}>
        <img className="hd-element-icon" src={image} />
        <p className="hd-element-text">{text}</p>
      </Link>
    </>
  )
}
