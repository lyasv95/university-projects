/**
 * Script per inviare richieste al servizio WEB e recuperare i dati. 
 * I dati vengono inviati in maniera asincrona e vengono visualizzati dinamicamente.
 */
function formRicercaMiningRig() {
    var divRigs = document.getElementById('modaleDashboard');
    divRigs.style.display = 'block';
    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="ricercaMiningRig(event);">
    <h2>Ricerca Mining Rig</h2>
    <label><b>Matricola</b>
    <input type="text" name="matricola" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="modalButton">Ricerca</button>
    </form>`;
    divRigs.innerHTML = html;
}

function ricercaMiningRig(event) {
    event.preventDefault();
    var miningRig = document.querySelector('[name="matricola"]').value;
    var opzioniFetch = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/mining-rigs/?serial-number=' + encodeURIComponent(miningRig);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 404) {
                throw new Error('Mining Rig non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(datiRig => {
            var divRigs = document.getElementById('modaleDashboard');
            divRigs.style.display = 'block';
            var html = ` 
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Mining Rig</h2>
            <table>
            <tr><th>Matricola</th><th>Moneta</th><th>Numero Noleggio</th></tr>
            <tr>
            <td>${miningRig}</td>
            <td>${datiRig.moneta}</td>
            <td>${datiRig.numeroNoleggio}</td>
            </tr>
            </table>`;
            divRigs.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function visualizzaMiningRigs() {
    fetch('http://localhost/api/mining-rigs/', {
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
        .then(datiRigs => {
            var divRigs = document.getElementById('modaleDashboard');
            divRigs.style.display = 'block';
            var html = `
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Mining Rigs</h2>
            <table>
            <tr><th>Matricola</th><th>Moneta</th><th>Numero Noleggio</th></tr>`;
            datiRigs.forEach(function (rig) {
                html += `
                <tr>
                <td>${rig.matricola}</td>
                <td>${rig.moneta}</td>
                <td>${rig.numeroNoleggio}</td>
                </tr>
                `
            });
            html += '</table>';
            divRigs.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formEliminaMiningRig() {
    var divRigs = document.getElementById('modaleDashboard');
    divRigs.style.display = 'block';

    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="eliminaRig(event);">
    <h2>Cancella Mining Rig</h2>
    <label><b>Matricola</b>
    <input type="text" name="matricola" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="deleteButton">Cancella</button>
    </form>`;
    divRigs.innerHTML = html;
}

function eliminaRig(event) {
    event.preventDefault();
    var matricola = document.querySelector('[name="matricola"]').value;
    var opzioniFetch = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/mining-rigs/?serial-number=' + encodeURIComponent(matricola);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Mining Rig non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formInserisciMiningRig() {
    var divRigs = document.getElementById('modaleDashboard');
    divRigs.style.display = 'block';

    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="inserisciMiningRig(event);">
    <h2>Nuovo Mining Rig</h2>
    <label><b>Moneta</b>
    <input type="text" name="moneta" required pattern="[a-z]{3,30}" oninput="convertiInMinuscolo(this)">
    <label><b>Numero Noleggio</b>
    <input type="text" name="numeroNoleggio" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="modalButton">Inserisci</button>
    </form>`;
    divRigs.innerHTML = html;
}

function inserisciMiningRig(event) {
    event.preventDefault();
    var moneta = document.querySelector('[name="moneta"]').value;
    var numeroNoleggio = document.querySelector('[name="numeroNoleggio"]').value;

    var datiDaInviare = {
        coin: moneta,
        rentalNumber: numeroNoleggio,
    };

    var opzioniFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/mining-rigs/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 409) {
                throw new Error("Dati non validi - Violazione FK");
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message)
        });
}

function formModificaMiningRig() {
    var divRigs = document.getElementById('modaleDashboard');
    divRigs.style.display = 'block';
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="modificaMiningRig(event);">
    <h2>Modifica Mining Rig</h2>
    <label><b>Matricola</b>
    <input type="text" name="matricola" required placeholder="Mining Rig registrato" pattern="[0-9]{1,8}"></label>
    <h2>Dati da Aggiornare</h2>
    <label><b>Nuova Moneta</b>
    <input type="text" name="moneta" required pattern="[a-z]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nuovo Numero Noleggio</b>
    <input type="text" name="numeroNoleggio" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="modalButton">Aggiorna</button>
    </form>`;
    divRigs.innerHTML = html;
}

function modificaMiningRig(event) {
    event.preventDefault();
    var matricola = document.querySelector('[name="matricola"]').value;
    var moneta = document.querySelector('[name="moneta"]').value;
    var numeroNoleggio = document.querySelector('[name="numeroNoleggio"]').value;
    
    var datiDaInviare = {
        serialNumber: matricola,
        coin: moneta,
        rentalNumber: numeroNoleggio
    };

    var opzioniFetch = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/mining-rigs/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Mining Rig non esistente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}


