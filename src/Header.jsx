import { HeaderElement } from './components/HeaderElement.jsx'

export function Header() {
  return (
    <header className="hd">
      <a href="/">
        <img className="hd-favicon" src="./favicon.ico" />
      </a>
      <nav className="hd-menu">
        <HeaderElement image="./src/img/appmusic-icon.png" text="TDS/CANCIONES" link="https://elmanueh.es/tds/canciones/" />
        <HeaderElement image="./src/img/coc-icon.png" text="CLASH OF CLANS" link="/clashofclans" />
        <HeaderElement image="./src/img/minecraft-icon.png" text="SERVIDOR MC" link="/minecraft" />
        <HeaderElement image="./src/img/santi-icon.png" text="WEB SANTI" link="http://143.47.54.117" />
        <HeaderElement image="./src/img/discord-icon.png" text="DISCORD" link="https://discord.gg/d4UgddQxfW" />
      </nav>
    </header>
  )
}
