-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 22, 2023 alle 20:06
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crypto_mining_srl`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accounts`
--

CREATE TABLE `accounts` (
  `Username` varchar(30) NOT NULL,
  `Password` varchar(40) NOT NULL,
  `CodiceFiscalePersona` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `accounts`
--

INSERT INTO `accounts` (`Username`, `Password`, `CodiceFiscalePersona`) VALUES
('lyasv95', 'f0578f1e7174b1a41c4ea8c6e17f7a8a3b88c92a', 'LYSVLY95L11Z138L');

-- --------------------------------------------------------

--
-- Struttura della tabella `acquisti`
--

CREATE TABLE `acquisti` (
  `Numero` int(11) NOT NULL,
  `Data` date NOT NULL,
  `Totale` int(11) NOT NULL,
  `CodiceFiscalePersona` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `acquisti`
--

INSERT INTO `acquisti` (`Numero`, `Data`, `Totale`, `CodiceFiscalePersona`) VALUES
(2, '2023-02-01', 3000, 'ZMBVTI66D11F158G');

-- --------------------------------------------------------

--
-- Struttura della tabella `componenti`
--

CREATE TABLE `componenti` (
  `Marca` varchar(30) NOT NULL,
  `Modello` varchar(30) NOT NULL,
  `Costo` smallint(6) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `LineePciExpress` tinyint(4) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `componenti`
--

INSERT INTO `componenti` (`Marca`, `Modello`, `Costo`, `Tipo`, `LineePciExpress`) VALUES
('AMD ', 'Ryzen 3 3200G', 250, 'Processore', 12),
('ASRock', 'H510 BTC+', 200, 'Scheda madre', NULL),
('Cooler Master', 'V850', 120, 'Alimentatore', NULL),
('EVGA', 'RTX 3060TI', 450, 'Scheda Video', NULL),
('Gigabyte', 'RTX 3070', 550, 'Scheda Video', NULL),
('Intel', 'i7 1034g2', 150, 'Processore', 8),
('Kingston', 'Fury Beast 16 GB', 70, 'Ram', NULL),
('WD', 'D2 1000GB', 200, 'Hard Disk', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `composizione_rig`
--

CREATE TABLE `composizione_rig` (
  `MatricolaRig` int(11) NOT NULL,
  `MarcaComponente` varchar(30) NOT NULL,
  `ModelloComponente` varchar(30) NOT NULL,
  `Quantità` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `composizione_rig`
--

INSERT INTO `composizione_rig` (`MatricolaRig`, `MarcaComponente`, `ModelloComponente`, `Quantità`) VALUES
(1, 'AMD ', 'Ryzen 3 3200G', 1),
(1, 'ASRock', 'H510 BTC+', 1),
(1, 'Cooler Master', 'V850', 2),
(1, 'EVGA', 'RTX 3060TI', 9),
(1, 'Kingston', 'Fury Beast 16 GB', 2),
(1, 'WD', 'D2 1000GB', 1),
(2, 'ASRock', 'H510 BTC+', 1),
(2, 'Cooler Master', 'V850', 3),
(2, 'EVGA', 'RTX 3060TI', 10),
(2, 'Intel', 'i7 1034g2', 1),
(2, 'Kingston', 'Fury Beast 16 GB', 2),
(2, 'WD', 'D2 1000GB', 1),
(3, 'ASRock', 'H510 BTC+', 1),
(3, 'Cooler Master', 'V850', 2),
(3, 'Gigabyte', 'RTX 3070', 6),
(3, 'Intel', 'i7 1034g2', 1),
(3, 'Kingston', 'Fury Beast 16 GB', 2),
(3, 'WD', 'D2 1000GB', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `flight_sheet`
--

CREATE TABLE `flight_sheet` (
  `Nome` varchar(30) NOT NULL,
  `Pool` varchar(30) NOT NULL,
  `IndirizzoWallet` varchar(35) NOT NULL,
  `NomeMiner` varchar(30) NOT NULL,
  `NomeMoneta` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `flight_sheet`
--

INSERT INTO `flight_sheet` (`Nome`, `Pool`, `IndirizzoWallet`, `NomeMiner`, `NomeMoneta`) VALUES
('FL-1', 'Nanopool', '1A1zP1eP5QGefi2DMPrTTL5SLmv7DivfNa', 'Nbminer', 'Ethereum '),
('FL-2', 'Sparkpool', 'rQTyP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'Trex', 'Ravencoin'),
('FL-3', 'Nanopool', '6GFRP1eP5QGeGTh7MPTfTL5SLmv7DivfNa', 'Trex', 'Ethereum ');

-- --------------------------------------------------------

--
-- Struttura della tabella `impianti_fotovoltaici`
--

CREATE TABLE `impianti_fotovoltaici` (
  `Codice` smallint(6) NOT NULL,
  `CapacitàImpianto` smallint(6) NOT NULL,
  `CapacitàBatterie` smallint(6) NOT NULL,
  `NomeMiningFarm` varchar(30) NOT NULL
) ;

--
-- Dump dei dati per la tabella `impianti_fotovoltaici`
--

INSERT INTO `impianti_fotovoltaici` (`Codice`, `CapacitàImpianto`, `CapacitàBatterie`, `NomeMiningFarm`) VALUES
(1, 9, 6, 'Coin Farm SRL'),
(2, 12, 6, 'Crypto Solution SRL');

-- --------------------------------------------------------

--
-- Struttura della tabella `miner`
--

CREATE TABLE `miner` (
  `Nome` varchar(30) NOT NULL,
  `Versione` varchar(15) NOT NULL,
  `Tipologia` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `miner`
--

INSERT INTO `miner` (`Nome`, `Versione`, `Tipologia`) VALUES
('Nbminer', '2.45', 'NVIDIA'),
('Trex', '1.23', 'AMD');

-- --------------------------------------------------------

--
-- Struttura della tabella `mining_farm`
--

CREATE TABLE `mining_farm` (
  `Nome` varchar(30) NOT NULL,
  `NumeroPostazioni` smallint(6) NOT NULL,
  `Città` varchar(30) NOT NULL,
  `Via` varchar(30) NOT NULL,
  `Civico` varchar(4) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `mining_farm`
--

INSERT INTO `mining_farm` (`Nome`, `NumeroPostazioni`, `Città`, `Via`, `Civico`) VALUES
('Coin Farm SRL', 300, 'Catania', 'Via Magistero', '45'),
('Crypto Solution SRL', 500, 'Messina', 'Via Catania', '34'),
('DevelopFarm SRL', 370, 'Palermo', 'Via Santa Marta', '23');

-- --------------------------------------------------------

--
-- Struttura della tabella `mining_rig`
--

CREATE TABLE `mining_rig` (
  `Matricola` int(11) NOT NULL,
  `SistemaOperativo` varchar(6) NOT NULL,
  `NumeroAcquisto` int(11) DEFAULT NULL,
  `NumeroNoleggio` int(11) DEFAULT NULL,
  `NomeFlightSheet` varchar(30) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `mining_rig`
--

INSERT INTO `mining_rig` (`Matricola`, `SistemaOperativo`, `NumeroAcquisto`, `NumeroNoleggio`, `NomeFlightSheet`) VALUES
(1, 'HiveOS', 2, NULL, 'FL-1'),
(2, 'NiceOS', NULL, 1, 'FL-2'),
(3, 'HiveOS', NULL, 1, 'FL-3');

-- --------------------------------------------------------

--
-- Struttura della tabella `monete`
--

CREATE TABLE `monete` (
  `Nome` varchar(30) NOT NULL,
  `Algoritmo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `monete`
--

INSERT INTO `monete` (`Nome`, `Algoritmo`) VALUES
('Ethereum ', 'Ethash'),
('Ravencoin', 'Kawpow');

-- --------------------------------------------------------

--
-- Struttura della tabella `noleggi`
--

CREATE TABLE `noleggi` (
  `Numero` int(11) NOT NULL,
  `DataInizio` date NOT NULL,
  `DataFine` date NOT NULL,
  `Totale` int(11) NOT NULL,
  `CodiceFiscalePersona` varchar(16) NOT NULL,
  `NomeMiningFarm` varchar(30) NOT NULL
) ;

--
-- Dump dei dati per la tabella `noleggi`
--

INSERT INTO `noleggi` (`Numero`, `DataInizio`, `DataFine`, `Totale`, `CodiceFiscalePersona`, `NomeMiningFarm`) VALUES
(1, '2023-02-01', '2023-11-30', 10000, 'LDNVGN00S58C351X', 'Coin Farm SRL'),
(2, '2023-01-01', '2024-08-31', 15000, 'RBFNTN80H05F158K', 'DevelopFarm SRL');

-- --------------------------------------------------------

--
-- Struttura della tabella `ottimizzazioni`
--

CREATE TABLE `ottimizzazioni` (
  `MarcaComponente` varchar(30) NOT NULL,
  `ModelloComponente` varchar(30) NOT NULL,
  `MemoryClock` smallint(6) NOT NULL,
  `CoreClock` smallint(6) NOT NULL,
  `CoreVoltage` smallint(6) NOT NULL,
  `NomeMoneta` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ottimizzazioni`
--

INSERT INTO `ottimizzazioni` (`MarcaComponente`, `ModelloComponente`, `MemoryClock`, `CoreClock`, `CoreVoltage`, `NomeMoneta`) VALUES
('EVGA', 'RTX 3060TI', 2600, 1700, 1400, 'Ethereum '),
('Gigabyte', 'RTX 3070', 2800, 1500, 1450, 'Ravencoin');

-- --------------------------------------------------------

--
-- Struttura della tabella `overclock`
--

CREATE TABLE `overclock` (
  `MemoryClock` smallint(6) NOT NULL,
  `CoreClock` smallint(6) NOT NULL,
  `CoreVoltage` smallint(6) NOT NULL,
  `Efficienza` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `overclock`
--

INSERT INTO `overclock` (`MemoryClock`, `CoreClock`, `CoreVoltage`, `Efficienza`) VALUES
(2600, 1700, 1400, '500'),
(2800, 1500, 1450, '550');

-- --------------------------------------------------------

--
-- Struttura della tabella `persone`
--

CREATE TABLE `persone` (
  `CodiceFiscale` varchar(16) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `Cognome` varchar(30) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Ruolo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `persone`
--

INSERT INTO `persone` (`CodiceFiscale`, `Nome`, `Cognome`, `Telefono`, `Tipo`, `Ruolo`) VALUES
('LDNVGN00S58C351X', 'Virginia', 'Laudani', '3489624578', 'Cliente', NULL),
('LYSVLY95L11Z138L', 'Vitaliy', 'Lyaskovskiy', '3297771781', 'Dipendente', 'Amministratore'),
('PNILCU80L06F158I', 'Luca', 'Pini', '3561458945', 'Dipendente', 'Tecnico'),
('RBFNTN80H05F158K', 'Antonio', 'Ribuffo', '3567896512', 'Cliente', NULL),
('ZMBVTI66D11F158G', 'Vito', 'Zumbo', '3286784576', 'Cliente', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `wallet`
--

CREATE TABLE `wallet` (
  `Indirizzo` varchar(35) NOT NULL,
  `Tipologia` varchar(30) NOT NULL,
  `CodiceFiscalePersona` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `wallet`
--

INSERT INTO `wallet` (`Indirizzo`, `Tipologia`, `CodiceFiscalePersona`) VALUES
('1A1zP1eP5QGefi2DMPrTTL5SLmv7DivfNa', 'Desktop', 'ZMBVTI66D11F158G'),
('6GFRP1eP5QGeGTh7MPTfTL5SLmv7DivfNa', 'Web', 'RBFNTN80H05F158K'),
('rQTyP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'Hardware', 'LDNVGN00S58C351X');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`Username`),
  ADD KEY `fk_accounts_c_f_persona` (`CodiceFiscalePersona`);

--
-- Indici per le tabelle `acquisti`
--
ALTER TABLE `acquisti`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `fk_acquisti_c_f_persona` (`CodiceFiscalePersona`);

--
-- Indici per le tabelle `componenti`
--
ALTER TABLE `componenti`
  ADD PRIMARY KEY (`Marca`,`Modello`);

--
-- Indici per le tabelle `composizione_rig`
--
ALTER TABLE `composizione_rig`
  ADD PRIMARY KEY (`MatricolaRig`,`MarcaComponente`,`ModelloComponente`),
  ADD KEY `fk_composizione_rig_m_componente_m_componente` (`MarcaComponente`,`ModelloComponente`);

--
-- Indici per le tabelle `flight_sheet`
--
ALTER TABLE `flight_sheet`
  ADD PRIMARY KEY (`Nome`),
  ADD KEY `fk_flight_sheet_i_wallet` (`IndirizzoWallet`),
  ADD KEY `fk_flight_sheet_n_miner` (`NomeMiner`),
  ADD KEY `fk_flight_sheet_n_moneta` (`NomeMoneta`);

--
-- Indici per le tabelle `impianti_fotovoltaici`
--
ALTER TABLE `impianti_fotovoltaici`
  ADD PRIMARY KEY (`Codice`),
  ADD KEY `fk_impianti_fotovoltaici_n_m_farm` (`NomeMiningFarm`);

--
-- Indici per le tabelle `miner`
--
ALTER TABLE `miner`
  ADD PRIMARY KEY (`Nome`);

--
-- Indici per le tabelle `mining_farm`
--
ALTER TABLE `mining_farm`
  ADD PRIMARY KEY (`Nome`);

--
-- Indici per le tabelle `mining_rig`
--
ALTER TABLE `mining_rig`
  ADD PRIMARY KEY (`Matricola`),
  ADD KEY `fk_mining_rig_n_acquisto` (`NumeroAcquisto`),
  ADD KEY `fk_mining_rig_n_noleggio` (`NumeroNoleggio`),
  ADD KEY `fk_mining_rig_n_f_sheet` (`NomeFlightSheet`);

--
-- Indici per le tabelle `monete`
--
ALTER TABLE `monete`
  ADD PRIMARY KEY (`Nome`);

--
-- Indici per le tabelle `noleggi`
--
ALTER TABLE `noleggi`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `fk_noleggi_c_f_persona` (`CodiceFiscalePersona`),
  ADD KEY `fk_noleggi_n_m_farm` (`NomeMiningFarm`);

--
-- Indici per le tabelle `ottimizzazioni`
--
ALTER TABLE `ottimizzazioni`
  ADD PRIMARY KEY (`MarcaComponente`,`ModelloComponente`,`MemoryClock`,`CoreClock`,`CoreVoltage`,`NomeMoneta`),
  ADD KEY `fk_ottimizzazioni_m_clock_c_clock_c_voltage` (`MemoryClock`,`CoreClock`,`CoreVoltage`),
  ADD KEY `fk_ottimizzazioni_n_moneta` (`NomeMoneta`);

--
-- Indici per le tabelle `overclock`
--
ALTER TABLE `overclock`
  ADD PRIMARY KEY (`MemoryClock`,`CoreClock`,`CoreVoltage`);

--
-- Indici per le tabelle `persone`
--
ALTER TABLE `persone`
  ADD PRIMARY KEY (`CodiceFiscale`);

--
-- Indici per le tabelle `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`Indirizzo`),
  ADD KEY `fk_c_f_persona` (`CodiceFiscalePersona`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `impianti_fotovoltaici`
--
ALTER TABLE `impianti_fotovoltaici`
  MODIFY `Codice` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `mining_rig`
--
ALTER TABLE `mining_rig`
  MODIFY `Matricola` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `noleggi`
--
ALTER TABLE `noleggi`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `fk_accounts_c_f_persona` FOREIGN KEY (`CodiceFiscalePersona`) REFERENCES `persone` (`CodiceFiscale`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  ADD CONSTRAINT `fk_acquisti_c_f_persona` FOREIGN KEY (`CodiceFiscalePersona`) REFERENCES `persone` (`CodiceFiscale`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `composizione_rig`
--
ALTER TABLE `composizione_rig`
  ADD CONSTRAINT `fk_composizione_rig_m_componente_m_componente` FOREIGN KEY (`MarcaComponente`,`ModelloComponente`) REFERENCES `componenti` (`Marca`, `Modello`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_composizione_rig_m_rig` FOREIGN KEY (`MatricolaRig`) REFERENCES `mining_rig` (`Matricola`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `flight_sheet`
--
ALTER TABLE `flight_sheet`
  ADD CONSTRAINT `fk_flight_sheet_i_wallet` FOREIGN KEY (`IndirizzoWallet`) REFERENCES `wallet` (`Indirizzo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_flight_sheet_n_miner` FOREIGN KEY (`NomeMiner`) REFERENCES `miner` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_flight_sheet_n_moneta` FOREIGN KEY (`NomeMoneta`) REFERENCES `monete` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `impianti_fotovoltaici`
--
ALTER TABLE `impianti_fotovoltaici`
  ADD CONSTRAINT `fk_impianti_fotovoltaici_n_m_farm` FOREIGN KEY (`NomeMiningFarm`) REFERENCES `mining_farm` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `mining_rig`
--
ALTER TABLE `mining_rig`
  ADD CONSTRAINT `fk_mining_rig_n_acquisto` FOREIGN KEY (`NumeroAcquisto`) REFERENCES `acquisti` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mining_rig_n_f_sheet` FOREIGN KEY (`NomeFlightSheet`) REFERENCES `flight_sheet` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mining_rig_n_noleggio` FOREIGN KEY (`NumeroNoleggio`) REFERENCES `noleggi` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `noleggi`
--
ALTER TABLE `noleggi`
  ADD CONSTRAINT `fk_noleggi_c_f_persona` FOREIGN KEY (`CodiceFiscalePersona`) REFERENCES `persone` (`CodiceFiscale`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_noleggi_n_m_farm` FOREIGN KEY (`NomeMiningFarm`) REFERENCES `mining_farm` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `ottimizzazioni`
--
ALTER TABLE `ottimizzazioni`
  ADD CONSTRAINT `fk_ottimizzazioni_m_clock_c_clock_c_voltage` FOREIGN KEY (`MemoryClock`,`CoreClock`,`CoreVoltage`) REFERENCES `overclock` (`MemoryClock`, `CoreClock`, `CoreVoltage`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ottimizzazioni_m_componente_mcomponente` FOREIGN KEY (`MarcaComponente`,`ModelloComponente`) REFERENCES `componenti` (`Marca`, `Modello`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ottimizzazioni_n_moneta` FOREIGN KEY (`NomeMoneta`) REFERENCES `monete` (`Nome`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `fk_c_f_persona` FOREIGN KEY (`CodiceFiscalePersona`) REFERENCES `persone` (`CodiceFiscale`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
