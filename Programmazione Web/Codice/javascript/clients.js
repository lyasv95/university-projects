/**
 * Script per inviare richieste al servizio WEB e recuperare i dati. 
 * I dati vengono inviati in maniera asincrona e vengono visualizzati dinamicamente.
 */
function formRicercaCliente() {
    var divClienti = document.getElementById('modaleDashboard');
    divClienti.style.display = 'block';
    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="ricercaCliente(event);">
    <h2>Ricerca Cliente</h2>
    <label><b>Codice Fiscale</b>
    <input type="text" name="codiceFiscale" required pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Ricerca</button>
    </form>`;
    divClienti.innerHTML = html;
}

function ricercaCliente(event) {
    event.preventDefault();
    var codiceFiscale = document.querySelector('[name="codiceFiscale"]').value;
    var opzioniFetch = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/clients/?cf=' + encodeURIComponent(codiceFiscale);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 404) {
                throw new Error('Codice Fiscale non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(datiCliente => {
            var divClienti = document.getElementById('modaleDashboard');
            divClienti.style.display = 'block';
            var html = ` 
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Cliente Registrato</h2>
            <table>
            <tr><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Email</th></tr>
            <tr>
            <td>${datiCliente.nome}</td>
            <td>${datiCliente.cognome}</td>
            <td>${codiceFiscale}</td>
            <td>${datiCliente.email}</td>
            </tr>
            </table>`;
            divClienti.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function visualizzaClienti() {
    fetch('http://localhost/api/clients/', {
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
        .then(datiClienti => {
            var divClienti = document.getElementById('modaleDashboard');
            divClienti.style.display = 'block';
            var html = `
            <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
            <h2>Clienti Registrati</h2>
            <table>
            <tr><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Email</th></tr> `;
            datiClienti.forEach(function (cliente) {
                html += `
                <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.cognome}</td>
                <td>${cliente.codiceFiscale}</td>
                <td>${cliente.email}</td>
                </tr>
                `
            });
            html += '</table>';
            divClienti.innerHTML = html;
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formEliminaCliente() {
    var divClienti = document.getElementById('modaleDashboard');
    divClienti.style.display = 'block';

    var html = ` 
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="eliminaCliente(event);">
    <h2>Cancella Cliente</h2>
    <label><b>Codice Fiscale</b>
    <input type="text" name="codiceFiscale" required pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="deleteButton">Cancella</button>
    </form>`;
    divClienti.innerHTML = html;
}

function eliminaCliente(event) {
    event.preventDefault();
    var codiceFiscale = document.querySelector('[name="codiceFiscale"]').value;
    var opzioniFetch = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
    };
    var url = 'http://localhost/api/clients/?cf=' + encodeURIComponent(codiceFiscale);
    fetch(url, opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Codice Fiscale non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

function formInserisciCliente() {
    var divClienti = document.getElementById('modaleDashboard');
    divClienti.style.display = 'block';
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="inserisciCliente(event);">
    <h2>Nuovo Cliente</h2>
    <label><b>Nome</b>
    <input type="text" name="nome" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Cognome</b>
    <input type="text" name="cognome" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Codice Fiscale</b>
    <input type="text" name="codiceFiscale" required pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Email<b>
    <input type="email" name="email" required oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Inserisci</button>
    </form>`;
    divClienti.innerHTML = html;
}

function inserisciCliente(event) {
    event.preventDefault();
    var nome = document.querySelector('[name="nome"]').value;
    var cognome = document.querySelector('[name="cognome"]').value;
    var codiceFiscale = document.querySelector('[name="codiceFiscale"]').value;
    var email = document.querySelector('[name="email"]').value;

    var datiDaInviare = {
        name: nome,
        surname: cognome,
        taxCode: codiceFiscale,
        email: email
    };

    var opzioniFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/clients/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 409) {
                throw new Error('Codice Fiscale già registrato');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message)
        });
}

function formModificaCliente() {
    var divClienti = document.getElementById('modaleDashboard');
    divClienti.style.display = 'block';
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <form onsubmit="modificaCliente(event);">
    <h2>Modifica Cliente</h2>
    <label><b>Codice Fiscale</b>
    <input type="text" name="codiceFiscale" required placeholder="Cliente registrato" pattern="[a-z0-9]{16}" oninput="convertiInMinuscolo(this)"></label>
    <h2>Dati da Aggiornare</h2>
    <label><b>Nuovo Nome</b>
    <input type="text" name="nome" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nuovo Cognome</b>
    <input type="text" name="cognome" required pattern="[a-z\\sàèìòù]{3,30}" oninput="convertiInMinuscolo(this)"></label>
    <label><b>Nuova Email</b>
    <input type="email" name="email" required oninput="convertiInMinuscolo(this)"></label>
    <button type="submit" class="modalButton">Aggiorna</button>
    </form>`;
    divClienti.innerHTML = html;
}

function modificaCliente(event) {
    event.preventDefault();
    var nome = document.querySelector('[name="nome"]').value;
    var cognome = document.querySelector('[name="cognome"]').value;
    var codiceFiscale = document.querySelector('[name="codiceFiscale"]').value;
    var email = document.querySelector('[name="email"]').value;

    var datiDaInviare = {
        name: nome,
        surname: cognome,
        taxCode: codiceFiscale,
        email: email
    };

    var opzioniFetch = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
        },
        body: JSON.stringify(datiDaInviare)
    };

    fetch('http://localhost/api/clients/', opzioniFetch)
        .then(response => {
            if (response.ok) {
                successo();
            } else if (response.status == 404) {
                throw new Error('Cliente non presente');
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(errore => {
            fallimento(errore.message);
        });
}

