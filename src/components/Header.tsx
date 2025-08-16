import { Link } from 'react-router'
import Favicon from '../images/favicon.svg'
import AppMusicIcon from '../images/appmusic.png'
import ClashOfClansIcon from '../images/clashofclans.png'
import LineTreeIcon from '../images/linetree.svg'
import HeaderElement from './HeaderElement'

export default function Header() {
  return (
    <header className="flex bg-gray-900">
      <Link to="/" className="p-2">
        <img src={Favicon} height={40} width={40} />
      </Link>
      <nav className="flex justify-center sm:gap-20  w-full">
        <HeaderElement
          image={AppMusicIcon}
          text="TDS App Music"
          link="https://elmanueh.es/tds/canciones/"
        />
        <HeaderElement
          image={LineTreeIcon}
          text="TFG LineTree"
          link="https://linetree.elmanueh.es"
        />
        <HeaderElement
          image={ClashOfClansIcon}
          text="API Clash of Clans"
          link="/clashofclans"
        />
      </nav>
    </header>
  )
}
