import { useState } from 'react'
import type { PlayerClan } from '../types/player-clan.type'

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

export default function CocDataTable(props: CocDataTableProps) {
  const [players, setPlayers] = useState(props.playersClan)
  const [columnSorted, setColumnSorted] = useState<Record<string, boolean>>({})
  let id = 0

  const sortPlayers = (columnName: string) => {
    const playerSorted = props.playersClan.slice()

    if (columnSorted[columnName] === true) {
      playerSorted.sort((a, b) => {
        return a[columnName] > b[columnName] ? 1 : -1
      })
      columnSorted[columnName] = false
    } else {
      playerSorted.sort((a, b) => {
        return a[columnName] < b[columnName] ? 1 : -1
      })
      columnSorted[columnName] = true
    }

    setColumnSorted(columnSorted)
    setPlayers(playerSorted)
  }

  return (
    <table className="m-0 text-center">
      <thead>
        <tr>
          <th className="bg-gray-700 text-white py-2 text-md"></th>
          {Object.keys(players[0]).map((column) => {
            return (
              <th
                className="bg-gray-700 text-white py-2 px-3 text-md hover:text-purple-300 cursor-pointer"
                onClick={() => sortPlayers(column)}
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
            <tr className="bg-gray-600 nth-[even]:bg-gray-500">
              <td className="py-2 px-3 font-medium">{++id}</td>
              {Object.values(player).map((column) => {
                return (
                  <td className="px-3">
                    {rename[column] ? rename[column] : column}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
