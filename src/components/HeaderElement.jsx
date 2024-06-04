export function HeaderElement({ image, text, link }) {
  return (
    <a className="hd-element" href={link}>
      <img className="hd-element-icon" src={image} />
      <p className="hd-element-text">{text}</p>
    </a>
  )
}
