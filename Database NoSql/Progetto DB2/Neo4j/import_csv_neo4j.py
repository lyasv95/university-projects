from py2neo import Graph, Node, Relationship
import csv

dataset = "dataset100"
uri = f"bolt://localhost:7687"
username = "neo4j"
password = "password"

graph = Graph(uri, name=dataset, auth=(username, password))

batch_size = 100

def import_data(data):
    tx = graph.begin()
    count = 0

    for row in data:
        count += 1
        transazione = Node("Transazione", id=row["ID Transazione"], Data=row["Data"], Metodo_di_Pagamento=row["Metodo di Pagamento"], Indirizzo_IP=row["Indirizzo IP"], Browser=row["Browser"], Paese=row["Paese"], Rif_Prodotto=row["ID Prodotto"])
        prodotto = Node("Prodotto", id=row["ID Prodotto"], Nome_Prodotto=row["Nome Prodotto"], Prezzo=row["Prezzo"])
        utente = Node("Utente", id=row["ID Utente"], Nome=row["Nome"], Cognome=row["Cognome"], Email=row["Email"], Stato_Account=row["Stato Account"], Rif_Carta_di_Credito=row["ID Carta di Credito"], Rif_Transazione=row["ID Transazione"])
        carta_di_credito = Node("Carta_di_Credito", id=row["ID Carta di Credito"], Numero_Carta_di_Credito=row["Numero Carta di Credito"], Scadenza=row["Scadenza"], Banca=row["Banca"])
        segnalazione = Node("Segnalazione_frode", id=row["ID Segnalazione"], Data_Segnalazione=row["Data Segnalazione"], Dettagli=row["Dettagli"], Rif_Transazione=row["ID Transazione"])

        tx.create(transazione)
        tx.create(prodotto)
        tx.create(utente)
        tx.create(carta_di_credito)
        tx.create(segnalazione)

        possiede_utente = Relationship(utente, "POSSIEDE", carta_di_credito)
        effettua_utente = Relationship(utente, "EFFETTUA", transazione)
        riguarda_transazione = Relationship(transazione, "RIGUARDA", prodotto)
        contiene_segnalazione = Relationship(segnalazione, "CONTIENE", transazione)

        tx.create(possiede_utente)
        tx.create(effettua_utente)
        tx.create(riguarda_transazione)
        tx.create(contiene_segnalazione)

        if count % batch_size == 0:
            graph.commit(tx)
            tx = graph.begin()

    graph.commit(tx)


with open("Dati/dati_400000.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    data = [dict(row) for row in csv_reader]

    import_data(data)