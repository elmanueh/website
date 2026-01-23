import AppMusicIcon from '@/assets/appmusic.png'
import ClashOfClansIcon from '@/assets/clashofclans.png'
import Favicon from '@/assets/favicon.svg'
import LineTreeIcon from '@/assets/linetree.svg'
import HeaderElement from '@/layouts/HeaderElement'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex bg-gray-900">
      <Link to="/" className="p-2">
        <img src={Favicon} height={40} width={40} alt="Website favicon" />
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
