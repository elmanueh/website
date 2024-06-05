import { useState } from 'react'

export function PlayerClanTable({ playerClanData }) {
  const [playersData, setPlayersData] = useState(playerClanData)
  const [columnSorted, setColumnSorted] = useState({})
  let id = 0

  const rename = {
    player: 'IdJugador',
    name: 'Nombre',
    role: 'Rango',
    townHall: 'TH',
    lootCapital: 'GanadoCapital',
    addCapital: 'GastadoCapital',
    clanGames: 'JuegosClan',
    warPreference: 'Guerra',
    warAttacks: 'AtaquesÚltimasGuerras',

    member: 'Miembro',
    admin: 'Veterano',
    coLeader: 'Colíder',
    leader: 'Líder',

    in: 'Si',
    out: 'No'
  }

  function sortPlayers(columnName) {
    let playerSorted = playerClanData.slice()

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
                {rename[column]}
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
                return <td>{rename[column] ? rename[column] : column}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
