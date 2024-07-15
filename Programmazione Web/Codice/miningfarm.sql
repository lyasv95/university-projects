-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 06, 2024 alle 20:46
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miningfarm`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `clienti`
--

CREATE TABLE `clienti` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `codiceFiscale` varchar(16) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `clienti`
--

INSERT INTO `clienti` (`nome`, `cognome`, `codiceFiscale`, `email`) VALUES
('giulia', 'neri', 'giulianericf0000', 'giulia.neri95@gmail.com'),
('luca', 'verdi', 'lucaverdicf00000', 'luca.verdi@gmail.com'),
('mario', 'rossi', 'mariorossicf0000', 'mario.rossi@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `mining_farm`
--

CREATE TABLE `mining_farm` (
  `nome` varchar(40) NOT NULL,
  `città` varchar(40) DEFAULT NULL,
  `indirizzo` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `mining_farm`
--

INSERT INTO `mining_farm` (`nome`, `città`, `indirizzo`) VALUES
('giove', 'catania', 'viale della libertà 15'),
('marte', 'messina', 'viale europa 10'),
('plutone', 'siracusa', 'viale san martino 25');

-- --------------------------------------------------------

--
-- Struttura della tabella `mining_rig`
--

CREATE TABLE `mining_rig` (
  `matricola` int(11) NOT NULL,
  `moneta` varchar(40) DEFAULT NULL,
  `numeroNoleggio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `mining_rig`
--

INSERT INTO `mining_rig` (`matricola`, `moneta`, `numeroNoleggio`) VALUES
(16, 'bitcoin', 19),
(17, 'ergo', 20),
(18, 'conflux', 21);

-- --------------------------------------------------------

--
-- Struttura della tabella `noleggi`
--

CREATE TABLE `noleggi` (
  `numero` int(11) NOT NULL,
  `dataInizio` date DEFAULT NULL,
  `dataFine` date DEFAULT NULL,
  `codiceFiscaleCliente` varchar(16) DEFAULT NULL,
  `nomeMiningFarm` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `noleggi`
--

INSERT INTO `noleggi` (`numero`, `dataInizio`, `dataFine`, `codiceFiscaleCliente`, `nomeMiningFarm`) VALUES
(19, '2024-05-04', '2024-05-19', 'giulianericf0000', 'giove'),
(20, '2024-05-01', '2024-05-31', 'lucaverdicf00000', 'plutone'),
(21, '2024-04-01', '2024-05-01', 'mariorossicf0000', 'giove');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(30) NOT NULL,
  `ruolo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`username`, `password`, `email`, `ruolo`) VALUES
('lyasv95', '$2y$10$3nG47Z/1m6WXQrCc1yvJ.eY0boHUrsPf55RNO7zsXS/FAavsHHG3u', 'lyasvita@gmail.com', 'amministratore');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`codiceFiscale`);

--
-- Indici per le tabelle `mining_farm`
--
ALTER TABLE `mining_farm`
  ADD PRIMARY KEY (`nome`);

--
-- Indici per le tabelle `mining_rig`
--
ALTER TABLE `mining_rig`
  ADD PRIMARY KEY (`matricola`),
  ADD KEY `numeroNoleggio` (`numeroNoleggio`);

--
-- Indici per le tabelle `noleggi`
--
ALTER TABLE `noleggi`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `nomeMiningFarm` (`nomeMiningFarm`),
  ADD KEY `noleggi_ibfk_1` (`codiceFiscaleCliente`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `mining_rig`
--
ALTER TABLE `mining_rig`
  MODIFY `matricola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `noleggi`
--
ALTER TABLE `noleggi`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `mining_rig`
--
ALTER TABLE `mining_rig`
  ADD CONSTRAINT `mining_rig_ibfk_1` FOREIGN KEY (`numeroNoleggio`) REFERENCES `noleggi` (`numero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `noleggi`
--
ALTER TABLE `noleggi`
  ADD CONSTRAINT `noleggi_ibfk_1` FOREIGN KEY (`codiceFiscaleCliente`) REFERENCES `clienti` (`codiceFiscale`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `noleggi_ibfk_2` FOREIGN KEY (`nomeMiningFarm`) REFERENCES `mining_farm` (`nome`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
