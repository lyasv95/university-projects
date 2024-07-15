import csv
import pymongo
from datetime import datetime

client = pymongo.MongoClient("mongodb://root:root@localhost:27017/")
data_sets = ["Dataset25", "Dataset50", "Dataset75", "Dataset100"]
dimensioni = 100000

for i in range(0, 4):
    file = "Dati/dati_" + str(dimensioni) + ".csv"
    dimensioni += 100000

    db = client[data_sets[i]]
    
    col_transazioni = db["Transazione"]
    col_utenti = db["Utente"]
    col_carte = db["Carta_di_Credito"]
    col_prodotti = db["Prodotto"]
    col_segnalazioni = db["Segnalazione_Frode"]


    with open(file, 'r') as file:
        reader = csv.DictReader(file)

        for row in reader:

            utente = {
                "_id": int(row["ID Utente"]),
                "Nome": row["Nome"],
                "Cognome": row["Cognome"],
                "Email": row["Email"],
                "Stato_Account": row["Stato Account"],
                "Rif_Carta_di_Credito": int(row["ID Carta di Credito"]),
                "Rif_Transazione": int(row["ID Transazione"])
            }
            col_utenti.insert_one(utente)

            carta = {
                "_id": int(row["ID Carta di Credito"]),
                "Numero_Carta_di_Credito": row["Numero Carta di Credito"],
                "Scadenza": datetime.strptime(row["Scadenza"], "%Y-%m-%d"),
                "Banca": row["Banca"],
            }
            col_carte.insert_one(carta)

            prodotto = {
                "_id": int(row["ID Prodotto"]),
                "Nome_Prodotto": row["Nome Prodotto"],
                "Prezzo": float(row["Prezzo"])
            }
            col_prodotti.insert_one(prodotto)

            segnalazione = {
                "_id": int(row["ID Segnalazione"]),
                "Data_Segnalazione": datetime.strptime(row["Data Segnalazione"], "%Y-%m-%d"),
                "Dettagli": row["Dettagli"],
                "Rif_Transazione": int(row["ID Transazione"])
            }
            col_segnalazioni.insert_one(segnalazione)

            transazione = {
                "_id": int(row["ID Transazione"]),
                "Data": datetime.strptime(row["Data"], "%Y-%m-%d"),
                "Metodo_di_Pagamento": row["Metodo di Pagamento"],
                "Indirizzo_IP": row["Indirizzo IP"],
                "Browser": row["Browser"],
                "Paese": row["Paese"],
                "Rif_Prodotto": int(row["ID Prodotto"]),
                "Rif_Utente": int(row["Rif_Utente"])
            }
            col_transazioni.insert_one(transazione)
