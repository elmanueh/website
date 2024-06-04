import { useState } from 'react'

export function PlayerClanTable({ playerClanData }) {
  const [playersData, setPlayersData] = useState(playerClanData)
  const [columnSorted, setColumnSorted] = useState()
  let id = 0

  const mapa = {
    player: 'IdJugador',
    name: 'Nombre',
    role: 'Rango',
    townHall: 'TH',
    lootCapital: 'Capital',
    addCapital: 'Capital2',
    clanGames: 'JuegosClan',
    warPreference: 'Guerra',
    warAttacks: 'AtaquesÚltimasGuerras'
  }

  function sortPlayers(columnName) {
    let playerSorted = playerClanData.slice()
    columnSorted !== columnName
      ? playerSorted.sort((a, b) => {
          return a[columnName] > b[columnName] ? 1 : -1
        })
      : playerSorted.sort((a, b) => {
          return a[columnName] < b[columnName] ? 1 : -1
        })

    setColumnSorted(columnName)
    setPlayersData(playerSorted)
  }

  return (
    <table className="coc-table">
      <thead>
        <tr>
          <th className="coc-table-head"></th>
          {Object.keys(playersData[0]).map((column) => {
            return (
              <th className="coc-table-head" onClick={() => sortPlayers(column)}>
                {mapa[column]}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {playersData.map((player) => {
          return (
            <tr className="coc-table-row">
              <td className="coc-table-row-cell" style={{ fontWeight: 'bold' }}>
                {++id}
              </td>
              {Object.values(player).map((column) => {
                return <td>{column}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
