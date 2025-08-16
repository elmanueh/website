import { Link } from 'react-router'
import Favicon from '../images/favicon.svg'
import AppMusicIcon from '../images/appmusic.png'
import ClashOfClansIcon from '../images/clashofclans.png'
import SantiIcon from '../images/santi.png'
import HeaderElement from './HeaderElement'

export default function Header() {
  return (
    <header className="flex bg-gray-900">
      <Link to="/" className="p-2">
        <img src={Favicon} height={40} width={40} />
      </Link>
      <nav className="flex justify-evenly w-full">
        <HeaderElement
          image={AppMusicIcon}
          text="TDS/CANCIONES"
          link="https://elmanueh.es/tds/canciones/"
        />
        <HeaderElement
          image={ClashOfClansIcon}
          text="CLASH OF CLANS"
          link="/clashofclans"
        />
        <HeaderElement
          image={SantiIcon}
          text="WEB SANTI"
          link="http://143.47.54.117"
        />
      </nav>
    </header>
  )
}
