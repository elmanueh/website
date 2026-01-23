import type { PlayerClan } from '@/types/player-clan'
import { useState } from 'react'

const rename: { [key: string]: string } = {
  player: 'Id',
  name: 'Nombre',
  role: 'Rango',
  townHall: 'TH',
  lootCapital: 'Capital +',
  addCapital: 'Capital -',
  clanGames: 'Juegos',
  warPreference: 'Guerra',
  warAttacks: 'Guerra Atq.',

  member: 'Miembro',
  admin: 'Veterano',
  coLeader: 'Colíder',
  leader: 'Líder',

  in: 'Si',
  out: 'No'
}

interface CocDataTableProps {
  playersClan: PlayerClan[]
}

export default function CocDataTable(props: Readonly<CocDataTableProps>) {
  const [players, setPlayers] = useState(props.playersClan)
  const [columnSorted, setColumnSorted] = useState<Record<string, boolean>>({})
  let id = 0

  const sortPlayers = (columnName: keyof PlayerClan) => {
    const playerSorted = props.playersClan.slice()
    const newColumnSorted = { ...columnSorted }

    if (newColumnSorted[columnName] === true) {
      playerSorted.sort((a, b) => {
        return a[columnName] > b[columnName] ? 1 : -1
      })
      newColumnSorted[columnName] = false
    } else {
      playerSorted.sort((a, b) => {
        return a[columnName] < b[columnName] ? 1 : -1
      })
      newColumnSorted[columnName] = true
    }

    setColumnSorted(newColumnSorted)
    setPlayers(playerSorted)
  }

  return (
    <div className="overflow-x-auto">
      <table className="m-0 text-center min-w-full">
        <thead>
          <tr>
            <th className="bg-gray-700 text-white py-2 text-md"></th>
            {Object.keys(players[0]).map((column) => {
              return (
                <th
                  key={column}
                  className="bg-gray-700 text-white py-2 px-3 text-md hover:text-purple-300 cursor-pointer"
                  onClick={() => sortPlayers(column as keyof PlayerClan)}
                >
                  {rename[column]}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player.player} className="bg-gray-600 even:bg-gray-500">
                <td className="py-2 px-3 font-medium">{++id}</td>
                {Object.values(player).map((column) => {
                  return (
                    <td key={column} className="px-3">
                      {rename[column] ? rename[column] : column}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
