//Funzione che gestisce il login
function loginUser(event) {
    event.preventDefault();
    const requestData = {
        username: document.querySelector('[name="username"]').value,
        password: document.querySelector('[name="password"]').value
    };
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 401) {
                throw new Error('Credenziali errate');
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            if (data.jwt) {
                window.location.href = 'dashboard.html';
                sessionStorage.setItem('token', JSON.stringify(data.jwt));
            } else {
                throw new Error('La risposta non contiene un token');
            }
        })
        .catch(errore => {
            document.getElementById('responseMessage').innerHTML = '⛔ ' + errore.message;
        });
}

//Funzione che viene usata nella dashboard per indicare che l'operazione richiesta si è conclusa con successo
function successo() {
    var modDashboard = document.getElementById('modaleDashboard');
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <div class="serverResponse">✅ Eseguito con Successo</i>
    </div>`;
    modDashboard.innerHTML = html;
}

//Funzione che viene usata nella dashboard per indicare che l'operazione richiesta non è andata a buon fine + mostra errore
function fallimento(status) {
    var modDashboard = document.getElementById('modaleDashboard');
    modDashboard.style.display = "block";
    var html = `
    <span class="modalClose" onclick="chiudiRisultati()" title="Chiudi">&times;</span>
    <div class="serverResponse">⛔ Errore: ${status}</div>`;
    modDashboard.innerHTML = html;
}

function chiudiRisultati() {
    var divClienti = document.getElementById('modaleDashboard');
    divClienti.style.display = 'none';
}

function chiudiModale() {
    var modale = document.getElementById('modalLogin');
    modale.style.display='none';
}

function convertiInMinuscolo(inputElement) {
    inputElement.value = inputElement.value.toLowerCase();
}

//Mostra il modale usato per l'autenticazione
function login() {
    document.getElementById('modalLogin').style.display = 'block';
}

function logout() {
    sessionStorage.removeItem('token');
    window.location.href = 'index.html';
}

function areaRiservata() {
    window.location.href = 'dashboard.html';
}

//Effettuato il login sostituisce i button visualizzati
document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('token') !== null) {
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("dashButton").style.display = "block";
    }
});

//Chiusura del modale se si effettua un click al di fuori del modale stesso
document.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modalLogin')) {
        document.getElementById('modalLogin').style.display = "none";
    }
});











