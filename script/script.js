let playersOriginal;
let sortTable = {};
//const route = 'http://127.0.0.1:4321';
const route = 'https://elmanueh.es:4321';

window.addEventListener('DOMContentLoaded', function () {
  // Search a clan information
  document.getElementById('enviar').addEventListener('click', async function () {
    const clanTag = document.getElementById('clan-tag').value;
    const tableHead = document.getElementById('datos-head');
    const tableBody = document.getElementById('datos-body');

    try {
      tableHead.innerHTML = '';
      tableBody.innerHTML = '';
      const response = await fetch(`${route}/clans/clan/${encodeURIComponent(clanTag)}`);
      if (response.status !== 200) throw -1;
      const players = await response.json();
      playersOriginal = players;
      await showTable(players);
    } catch (error) {
      console.log(error);
      tableHead.innerHTML = '<h3>No se puede acceder al contenido</h3>';
    }
  });
});

// Filter tablee
function sort(columnName) {
  let a = playersOriginal.slice();
  if (sortTable[columnName] === 'desc' ? (sortTable[columnName] = 'asc') : (sortTable[columnName] = 'desc'));

  a.sort((a, b) => {
    if (sortTable[columnName] === 'asc') return a[columnName] > b[columnName] ? 1 : -1;
    else return a[columnName] < b[columnName] ? 1 : -1;
  });

  showTable(a);
}

async function showTable(players) {
  const tableHead = document.getElementById('datos-head');
  const tableBody = document.getElementById('datos-body');
  tableHead.innerHTML = '';
  tableBody.innerHTML = '';
  // Head
  const headRow = document.createElement('tr');
  headRow.innerHTML += '<th></th>';
  for (const stat in players[0]) headRow.innerHTML += `<th id='${stat}' onclick="sort('${stat}')">${stat}</th>`;
  tableHead.appendChild(headRow);

  // Body
  let index = 0;
  for (const player of players) {
    const row = document.createElement('tr');
    row.innerHTML += `<td>${++index}</td>`;
    for (const stat in player) row.innerHTML += `<td>${player[stat]}</td>`;
    tableBody.appendChild(row);
  }
}
