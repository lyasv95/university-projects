/**
 * Script per inviare richieste al servizio WEB e recuperare i dati. 
 * I dati vengono inviati in maniera asincrona e vengono visualizzati dinamicamente.
 */
function formRicercaMiningFarm() {
    var divFarms = document.getElementById('modaleDashboard');
    divFarms.style.display = 'block';
    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="ricercaMiningFarm(event);">
    <h2>Ricerca Mining Farm</h2>
    <label><b>Nome</b>
    <input type="text" name="nome" required pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Ricerca</button>
    </form>`;
    divFarms.innerHTML = html;
}

function ricercaMiningFarm(event) {
    event.preventDefault();
    var miningFarm = document.querySelector('[name="nome"]').value;
    var opzioniFetch = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/mining-farms/?nome=' + encodeURIComponent(miningFarm);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 404) {
                throw new Error('Mining Farm non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(datiFarm => {
            var divFarms = document.getElementById('modaleDashboard');
            divFarms.style.display = 'block';
            var html = ` 
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Mining Farm</h2>
            <table>
            <tr><th>Nome</th><th>Città</th><th>Indirizzo</th></tr>
            <tr>
            <td>${miningFarm}</td>
            <td>${datiFarm.città}</td>
            <td>${datiFarm.indirizzo}</td>
            </tr>
            </table>`;
            divFarms.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function visualizzaMiningFarms() {
    fetch('http://localhost/api/mining-farms/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 404) {
                throw new Error('Nessun risultato');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(datiFarms => {
            var divFarms = document.getElementById('modaleDashboard');
            divFarms.style.display = 'block';
            var html = `
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Mining Farms</h2>
            <table>
            <tr><th>Nome</th><th>Città</th><th>Indirizzo</th></tr>`;
            datiFarms.forEach(function (farm) {
                html += `
                <tr>
                <td>${farm.nome}</td>
                <td>${farm.città}</td>
                <td>${farm.indirizzo}</td>
                </tr>`
            });
            html += '</table>';
            divFarms.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formEliminaMiningFarm() {
    var divFarms = document.getElementById('modaleDashboard');
    divFarms.style.display = 'block';

    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="eliminaMiningFarm(event);">
    <h2>Cancella Mining Farm</h2>
    <label><b>Nome</b>
    <input type="text" name="nome" required pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="deleteButton">Cancella</button>
    </form>`;
    divFarms.innerHTML = html;
}

function eliminaMiningFarm(event) {
    event.preventDefault();
    var nome = document.querySelector('[name="nome"]').value;
    var opzioniFetch = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/mining-farms/?nome=' + encodeURIComponent(nome);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Mining Farm non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formInserisciMiningFarm() {
    var divFarm = document.getElementById('modaleDashboard');
    divFarm.style.display = 'block';

    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="inserisciMiningFarm(event);">
    <h2>Nuova Mining Farm</h2>
    <label><b>Nome</b>
    <input type="text" name="nome" required pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Città</b>
    <input id="città" type="text" name="città" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Indirizzo</b>
    <input type="text" name="indirizzo" required pattern="[a-z0-9\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Inserisci</button>
    </form>`;
    divFarm.innerHTML = html;
}

function inserisciMiningFarm(event) {
    event.preventDefault();
    var nome = document.querySelector('[name="nome"]').value;
    var città = document.querySelector('[name="città"]').value;
    var indirizzo = document.querySelector('[name="indirizzo"]').value;

    var datiDaInviare = {
        name: nome,
        city: città,
        address: indirizzo
    };

    var opzioniFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/mining-farms/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 409) {
                throw new Error('Nome già registrato');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            // DEBUG console.error('Errore durante il recupero dei dati:', errore.message);
            fallimento(errore.message)
        });
}

function formModificaMiningFarm() {
    var divFarm = document.getElementById('modaleDashboard');
    divFarm.style.display = 'block';
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="modificaMiningFarm(event);">
    <h2>Modifica Mining Farm</h2>
    <label><b>Nome</b>
    <input type="text" name="nome" required placeholder="Mining Farm registrata" pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <h2>Dati da Aggiornare</h2>
    <label><b>Nuova Città</b>
    <input type="text" name="città" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nuovo Indirizzo</b>
    <input type="text" name="indirizzo" required pattern="[a-z0-9\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Aggiorna</button>
    </form>`;
    divFarm.innerHTML = html;
}

function modificaMiningFarm(event) {
    event.preventDefault();
    var nome = document.querySelector('[name="nome"]').value;
    var città = document.querySelector('[name="città"]').value;
    var indirizzo = document.querySelector('[name="indirizzo"]').value;
    
    var datiDaInviare = {
        name: nome,
        city: città,
        address: indirizzo
    };

    var opzioniFetch = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/mining-farms/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Mining Farm non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}


