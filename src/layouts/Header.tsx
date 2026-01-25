import ClashOfClansIcon from '@/assets/clashofclans.png'
import LineTreeIcon from '@/assets/linetree.svg'
import HeaderElement from '@/layouts/HeaderElement'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/favicon.svg"
            width={26}
            height={26}
            alt="Logo"
            className="opacity-90"
          />
          <span className="text-sm font-medium tracking-tight">elmanueh</span>
        </Link>

        <nav className="flex items-center gap-6">
          <HeaderElement
            image={LineTreeIcon}
            text="LineTree"
            link="https://linetree.elmanueh.es"
            external
          />
          <HeaderElement
            image={ClashOfClansIcon}
            text="Clash of Clans"
            link="/clashofclans"
          />
        </nav>
      </div>
    </header>
  )
}
