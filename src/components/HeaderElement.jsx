import { Link } from 'react-router-dom'

export function HeaderElement({ image, text, link, reload }) {
  const reloadPage = reload ? true : false

  return (
    <>
      <Link className="hd-element" to={link} reloadDocument={reloadPage}>
        <img className="hd-element-icon" src={image} />
        <p className="hd-element-text">{text}</p>
      </Link>
    </>
  )
}
