import { Link } from 'react-router-dom'
import { HeaderElement } from './HeaderElement.jsx'

export default function Header() {
  return (
    <>
      <header className="hd">
        <Link to="/">
          <img className="hd-favicon" src="./favicon.ico" />
        </Link>
        <nav className="hd-menu">
          <HeaderElement image="./src/img/appmusic-icon.png" text="TDS/CANCIONES" link="https://elmanueh.es/tds/canciones/" />
          <HeaderElement image="./src/img/coc-icon.png" text="CLASH OF CLANS" link="/clashofclans" />
          <HeaderElement image="./src/img/minecraft-icon.png" text="SERVIDOR MC" link="/minecraft" />
          <HeaderElement image="./src/img/santi-icon.png" text="WEB SANTI" link="http://143.47.54.117" />
          <HeaderElement image="./src/img/discord-icon.png" text="DISCORD" link="https://discord.gg/d4UgddQxfW" />
        </nav>
      </header>
    </>
  )
}
