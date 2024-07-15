import csv
from faker import Faker
import random

fake = Faker()

metodi_pagamento = ['carta di credito', 'paypal', 'bonifico bancario', 'bitcoin']

nome_prodotti = ['macbook pro', 'surface 4 pro', 'iphone 16', 'samsung galaxy s23', 'manuale mongodb', 'manuale neo4j', 'bicicletta scott', 'monopattino ducati', 'batterie aaa', 'camicia di lino']

stati_account = ['attivo', 'bloccato']

dimensioni_dataset = [100000, 200000, 300000, 400000]


for dimensione in dimensioni_dataset:
    nome_file = "./Dati/dati_" + str(dimensioni_dataset) + ".csv"
    with open(nome_file, 'w', newline='') as file:
        writer = csv.writer(file)

        # Intestazione del CSV
        writer.writerow(["ID Transazione", "Data", "Metodo di Pagamento", "Indirizzo IP", "Browser", "Paese", "Rif_Prodotto", "Rif_Utente", "ID Utente", "Nome", "Cognome", "Email", "Stato Account", "Rif_Carta_di_Credito", "ID Prodotto", "Nome Prodotto", "Prezzo", "ID Segnalazione", "Data Segnalazione", "Dettagli", "Rif_Transazione", "ID Carta di Credito", "Numero Carta di Credito", "Scadenza", "Banca"])

        # Generazione dei record (1.000, 10.000, 100.000, 1.000.000)
        for x in range(dimensione):
            writer.writerow([
                fake.unique.random_number(digits=10),  # ID Transazione
                fake.date(),  # Data
                random.choice(metodi_pagamento),  # Metodo di Pagamento
                fake.ipv4(),  # Indirizzo_IP
                fake.user_agent(),  # Browser
                fake.country(),  # Paese
                fake.random_number(digits=10),  # Rif Prodotto
                fake.random_number(digits=10),  # Rif Utente
                fake.unique.random_number(digits=10),  # ID Utente
                fake.first_name(),  # Nome
                fake.last_name(),  # Cognome
                fake.email(),  # Email
                random.choice(stati_account),  # Stato Account
                fake.random_number(digits=10),  # Rif Carta di Credito
                fake.unique.random_number(digits=10),  # ID Prodotto
                random.choice(nome_prodotti), # Nome Prodotto
                fake.random_number(digits=4),  # Prezzo
                fake.unique.random_number(digits=10),  # ID Segnalazione
                fake.date(),  # Data_Segnalazione
                fake.text(max_nb_chars=200),  # Dettagli
                fake.random_number(digits=10),  # Rif Transazione
                fake.unique.random_number(digits=10), # ID Carta di Credito
                fake.credit_card_number(),  # Numero Carta Di Credito
                fake.date_time_between(start_date='now', end_date='+5y').date(),  # Scadenza
                fake.company()  # Banca
            ])
