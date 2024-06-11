import { Link } from 'react-router-dom'
import { HeaderElement } from './HeaderElement.jsx'

import Favicon from '../../favicon.ico'
import AppMusicIcon from '../img/appmusic-icon.png'
import ClashOfClansIcon from '../img/coc-icon.png'
import MinecraftIcon from '../img/minecraft-icon.png'
import SantiIcon from '../img/santi-icon.png'
import DiscordIcon from '../img/discord-icon.png'

export default function Header() {
  return (
    <>
      <header className="hd">
        <Link to="/">
          <img className="hd-favicon" src={Favicon} />
        </Link>
        <nav className="hd-menu">
          <HeaderElement image={AppMusicIcon} text="TDS/CANCIONES" link="https://elmanueh.es/tds/canciones/" reload />
          <HeaderElement image={ClashOfClansIcon} text="CLASH OF CLANS" link="/clashofclans" />
          <HeaderElement image={MinecraftIcon} text="SERVIDOR MC" link="/minecraft" />
          <HeaderElement image={SantiIcon} text="WEB SANTI" link="http://143.47.54.117" reload />
          <HeaderElement image={DiscordIcon} text="DISCORD" link="https://discord.gg/d4UgddQxfW" reload />
        </nav>
      </header>
    </>
  )
}
