import { useState } from 'react'
import { PlayerClanTable } from '../components/PlayerClanTable.jsx'
import './ClashOfClans.css'

export function ClashOfClans() {
  const [players, setPlayers] = useState(null)

  async function SearchButtonClick() {
    const clanTag = document.getElementById('coc-clanTag').value
    try {
      const response = await fetch(`http://elmanueh.es:4321/clans/clan/${encodeURIComponent(clanTag)}`)
      if (response.status !== 200) throw -1
      setPlayers(await response.json())
    } catch (error) {
      console.log(error)
      setPlayers(null)
    }
  }

  return (
    <section className="coc-page">
      <header className="coc-header">
        <h1 className="coc-header-text">Busca información de un Clan</h1>
        <input id="coc-clanTag" type="text" value="#2G00G8RP8" placeholder="#2G00G8RP8" />
        <input id="coc-buttonEnviar" type="submit" value="BUSCAR" onClick={async () => await SearchButtonClick()} />
      </header>
      {players && <PlayerClanTable playerClanData={players} />}
    </section>
  )
}
