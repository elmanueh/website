import { useState } from 'react'
import CocDataTable from '../components/CocDataTable.tsx'
import CocSearch from '../components/CocSearch.tsx'

export default function ClashOfClans() {
  const [players, setPlayers] = useState(null)

  const handlePlayers = async (clanTag: string) => {
    try {
      const response = await fetch(
        `https://elmanueh.es/v1/clans/clan/${encodeURIComponent(clanTag)}`
      )
      if (response.status !== 200) throw -1
      setPlayers(await response.json())
    } catch (error) {
      console.log(error)
      setPlayers(null)
    }
  }

  return (
    <section className="pt-20 pb-16">
      <header className="pb-12 flex flex-col items-center gap-10">
        <p className="text-4xl font-bold text-purple-300">Clash Of Clans</p>
        <CocSearch callback={handlePlayers} />
      </header>
      <div className="flex justify-center">
        {players && <CocDataTable playersClan={players} />}
      </div>
    </section>
  )
}
