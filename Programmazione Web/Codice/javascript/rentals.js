/**
 * Script per inviare richieste al servizio WEB e recuperare i dati. 
 * I dati vengono inviati in maniera asincrona e vengono visualizzati dinamicamente.
 */
function formRicercaNoleggio() {
    var divNoleggi = document.getElementById('modaleDashboard');
    divNoleggi.style.display = 'block';
    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="ricercaNoleggio(event);">
    <h2>Ricerca Noleggio</h2>
    <label><b>Numero</b>
    <input type="text" name="numero" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="modalButton">Ricerca</button>
    </form>`;
    divNoleggi.innerHTML = html;
}

function ricercaNoleggio(event) {
    event.preventDefault();
    var numero = document.querySelector('[name="numero"]').value;
    var opzioniFetch = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/rentals/?id=' + encodeURIComponent(numero);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 404) {
                throw new Error('Noleggio non esistente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(datiNoleggio => {
            var divNoleggi = document.getElementById('modaleDashboard');
            divNoleggi.style.display = 'block';
            var html = ` 
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Noleggio Registrato</h2>
            <table>
            <tr><th>Numero</th><th>Data Inizio</th><th>Data Fine</th><th>Codice Fiscale Cliente</th><th>Mining Farm</th></tr>
            <tr>
            <td>${numero}</td>
            <td>${datiNoleggio.dataInizio}</td>
            <td>${datiNoleggio.dataFine}</td>
            <td>${datiNoleggio.codiceFiscaleCliente}</td>
            <td>${datiNoleggio.nomeMiningFarm}</td>
            </tr>
            </table>`;
            divNoleggi.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function visualizzaNoleggi() {
    fetch('http://localhost/api/rentals/', {
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
        .then(datiNoleggi => {
            var divNoleggi = document.getElementById('modaleDashboard');
            divNoleggi.style.display = 'block';
            var html = `
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Noleggi Registrati</h2>
            <table>
            <tr><th>Numero</th><th>Data Inizio</th><th>Data Fine</th><th>Codice Fiscale Cliente</th><th>Mining Farm</th></tr>`;
            datiNoleggi.forEach(function (noleggio) {
                html += `
                <tr>
                <td>${noleggio.numero}</td>
                <td>${noleggio.dataInizio}</td>
                <td>${noleggio.dataFine}</td>
                <td>${noleggio.codiceFiscaleCliente}</td>
                <td>${noleggio.nomeMiningFarm}</td>
                </tr>
                `
            });
            html += '</table>';
            divNoleggi.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function visualizzaNoleggiAttivi() {
    fetch('http://localhost/api/rentals?status=valid', {
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
        .then(datiNoleggi => {
            var divNoleggi = document.getElementById('modaleDashboard');
            divNoleggi.style.display = 'block';
            var html = `
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Noleggi In Corso</h2>
            <table>
            <tr><th>Numero</th><th>Data Inizio</th><th>Data Fine</th><th>Codice Fiscale Cliente</th><th>Mining Farm</th></tr>
            `;
            datiNoleggi.forEach(function (noleggio) {
                html += `
                <tr>
                <td>${noleggio.numero}</td>
                <td>${noleggio.dataInizio}</td>
                <td>${noleggio.dataFine}</td>
                <td>${noleggio.codiceFiscaleCliente}</td>
                <td>${noleggio.nomeMiningFarm}</td>
                </tr>
                `
            });
            html += '</table>';
            divNoleggi.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formEliminaNoleggio() {
    var divNoleggi = document.getElementById('modaleDashboard');
    divNoleggi.style.display = 'block';

    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="eliminaNoleggio(event);">
    <h2>Cancella Noleggio</h2>
    <labe><b>Numero</b>
    <input type="text" name="numero" required pattern="[0-9]{1,8}"></label>
    <button type="submit" class="deleteButton">Cancella</button>
    </form>
    `;
    divNoleggi.innerHTML = html;
}

function eliminaNoleggio(event) {
    event.preventDefault();
    var numero = document.querySelector('[name="numero"]').value;
    var opzioniFetch = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/rentals/?id=' + encodeURIComponent(numero);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Noleggio non esistente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formInserisciNoleggio() {
    var divNoleggi = document.getElementById('modaleDashboard');
    divNoleggi.style.display = 'block';

    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="inserisciNoleggio(event);">
    <h2>Nuovo Noleggio</h2>
    <label><b>Data Inizio</b>
    <input type="date" name="dataInizio" required></label>
    <label><b>Data Fine</b>
    <input type="date" name="dataFine" required></label>
    <label><b>Codice Fiscale Cliente</b>
    <input type="text" name="codiceFiscaleCliente" required pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nome Mining Farm<b>
    <input type="text" name="nomeMiningFarm" required pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Inserisci</button>
    </form>`;
    divNoleggi.innerHTML = html;
}

function inserisciNoleggio(event) {
    event.preventDefault();
    var dataInizio = document.querySelector('[name="dataInizio"]').value;
    var dataFine = document.querySelector('[name="dataFine"]').value;
    var codiceFiscaleCliente = document.querySelector('[name="codiceFiscaleCliente"]').value;
    var nomeMiningFarm = document.querySelector('[name="nomeMiningFarm"]').value;

    if (dataFine <= dataInizio) {
        fallimento("La data di fine noleggio è antecedente alla data di inizio");
        return;
    }

    var datiDaInviare = {
        startDate: dataInizio,
        endDate: dataFine,
        clientTaxCode: codiceFiscaleCliente,
        miningFarmName: nomeMiningFarm
    };

    var opzioniFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/rentals/', opzioniFetch)
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

function formModificaNoleggio() {
    var divNoleggi = document.getElementById('modaleDashboard');
    divNoleggi.style.display = 'block';
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="modificaNoleggio(event);">
    <h2>Modifica Noleggio</h2>
    <label><b>Numero</b>
    <input type="text" name="numero" required placeholder="Numero registrato"></label>
    <h2>Dati da Aggiornare</h2>
    <label><b>Data Inizio</b>
    <input type="date" name="dataInizio" required"></label>
    <label ><b>Data Fine</b>
    <input type="date" name="dataFine" required></label>
    <label><b>Codice Fiscale Cliente</b>
    <input type="text" name="codiceFiscaleCliente" required pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nome Mining Farm<b>
    <input type="text" name="nomeMiningFarm" required pattern="[a-z0-9]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Aggiorna</button>
    </form>`;
    divNoleggi.innerHTML = html;
}

function modificaNoleggio(event) {
    event.preventDefault();
    var numero = document.querySelector('[name="numero"]').value;
    var dataInizio = document.querySelector('[name="dataInizio"]').value;
    var dataFine = document.querySelector('[name="dataFine"]').value;
    var codiceFiscaleCliente = document.querySelector('[name="codiceFiscaleCliente"]').value;
    var nomeMiningFarm = document.querySelector('[name="nomeMiningFarm"]').value;

    if (dataFine <= dataInizio) {
        fallimento("La data di fine noleggio è antecedente alla data di inizio");
        return;
    }

    var datiDaInviare = {
        id: numero,
        startDate: dataInizio,
        endDate: dataFine,
        clientTaxCode: codiceFiscaleCliente,
        miningFarmName: nomeMiningFarm
    };

    var opzioniFetch = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/rentals/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Noleggio non esistente');
            } else if (response.status == 409) {
                throw new Error("Dati non validi - Violazione FK");
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}





