CREATE DATABASE  IF NOT EXISTS `iorespiro_prod` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `iorespiro_prod`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 206.189.57.74    Database: iorespiro_prod
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'Educazione','{\"title\": \"Scoprire i collegamenti genetici con lo sviluppo della pneumopatia\", \"content\": \"La broncopneumopatia cronica ostruttiva (BPCO) è una malattia polmonare progressiva incurabile che uccide oltre 5 milioni di persone ogni anno. Anche se il fumo rimane il fattore di rischio più importante, anche la genetica ha un ruolo importante, solo un fumatore su quattro ha probabilità di sviluppare la BPCO.  Capire perché alcune persone sono maggiormente predisposte a sviluppare la BPCO rispetto ad altre è importante perché potrebbe portare a diagnosi e cure più efficaci. Se identificati presto, per esempio, i fattori di rischio genetico possono essere usati come biomarcatori e agli individui ad alto rischio può essere raccomandato di evitare di fumare per prevenire la comparsa della BPCO.  Scoperta genetica fondamentale   Gli scienziati hanno recentemente fatto un’importante scoperta in questa direzione. Basandosi su alcune delle scoperte rivoluzionarie del progetto COPACETIC, finanziato dall’UE, un team internazionale di ricercatori ha svolto un’analisi genomica completa e ha potuto identificare 13 nuove regioni genetiche associate alla BPCO. Inoltre il team ha scoperto anche quattro regioni genetiche che precedentemente non erano associate ad alcuna funzione polmonare.  È stata trovata una sovrapposizione del rischio genetico di BPCO e di due altre malattie polmonari, l’asma e la fibrosi polmonare. Queste scoperte permetteranno agli scienziati di identificare soggetti ad alto rischio e di concentrarsi sui nuovi percorsi biologici per creare terapie per i pazienti affetti da questa malattia.  “Questi risultati sono possibili solo con un grande impegno di collaborazione come quello alla base di questo studio. Non solo i risultati accrescono le nostre conoscenze sulla BPCO, ma mostrano anche potenziali legami con altre malattie dei polmoni, come la fibrosi polmonare e l’asma, e possono formare la base di una strategia di medicina di precisione per la cura di più di una malattia polmonare,” ha detto il dott. James Kiley, direttore del reparto di malattie polomonari presso il National Heart, Lung, and Blood Institute (NHLBI) dell’Istituto nazionale della sanità (NIH) negli Stati Uniti.  Sviluppare le conoscenze   Il progresso scientifico è un processo continuo che sviluppa le scoperte precedenti, questi progressi nel campo della BPCO e della genetica si basano su un importante lavoro di base svolto da COPACETIC. In questo progetto, un consorzio di ricercatori di Paesi Bassi, Danimarca, Germania, Svezia e Polonia ha condotto una scannerizzazione di tutto il genoma di soggetti ad alto rischio, raccogliendo materiale genetico da migliaia di fumatori e non fumatori in tutta Europa.  Gli studi di associazione di tutto il genoma (Genome-wide association scans o GWAS) per la BPCO hanno trovato circa 350 variazioni del DNA che sono state successivamente esaminate. Sono stati condotti anche studi per identificare geni coinvolti nella ipersecrezione mucosa cronica e fattori tra cui, in via esemplificativa, la genetica che porta al declino della funzione polmonare. Gli studi di riferimento hanno mostrato che la BPCO era il risultato di un’ostruzione del flusso di aria o di un danno ai tessuti, ma non di entrambi.  Questo impegno internazionale per capire meglio la genetica alla base della BPCO ha mostrato che anche se il fumo rimane la causa principale (e che smettere di fumare è fondamentale per i malati di BPCO che desiderano stare meglio), la cessazione da sola potrebbe non essere abbastanza per prevenire la malattia. Quello che è chiaro è che la genetica ha un ruolo nel determinare chi sviluppa la malattia, l’obiettivo ora è trovare modi efficienti di usare biomarcatori per identificare questi soggetti e sviluppare terapie mirate.\", \"image_url\": \"https://media.istockphoto.com/photos/illustration-of-lungs-medical-concept-picture-id530196490\"}',NULL,NULL),(2,'Educazione','{\"title\": \"Trattamento non farmacologico dell’asma negli adulti per il fisioterapista\", \"content\": \"Sebbene la terapia farmacologica rimanga la principale modalità di trattamento nei pazienti asmatici, sono stati proposti vari trattamenti non farmacologici. Gli interventi non farmacologici sono numerosi nel trattamento dell’asma e i pazienti mostrano un crescente interesse per terapie complementari al trattamento farmacologico, per gestire la propria malattia. Queste includono, in maniera non esaustiva, il breathing retraining (BR) (rieducazione respiratoria) e altre tecniche di fisioterapia respiratoria, l’omeopatia, l’agopuntura, l’aromaterapia, la riflessologia, il massaggio e il rilassamento. In questo articolo saranno discussi solo i trattamenti non farmacologici gestiti dal fisioterapista. Tra queste modalità di trattamento, il BR è il più utilizzato ed è ben tollerato dai pazienti con asma. Esso comprende diverse tecniche: i metodi Buteyko e Papworth, la rieducazione respiratoria diaframmatica, l’allenamento dei muscoli inspiratori, lo yoga e il biofeedback. In un senso più ampio di fisioterapia toracica, al BR aerobico possono essere aggiunte tecniche di decongestione respiratoria, esercizi acquatici e il metodo Lotorp. La letteratura non raccomanda sempre l’uso di uno dei metodi del BR né di un’altra tecnica di fisioterapia respiratoria. Tuttavia, le tecniche di respirazione che mirano a ridurre l’iperventilazione (Buteyko e Papworth) sembrano le più attraenti, da una parte per migliorare i sintomi dell’asma e la qualità della vita dei pazienti e, dall’altra, per diminuire l’uso dei farmaci, anche se queste tecniche non sembrano migliorare la funzione polmonare.\", \"image_url\": \"https://media.istockphoto.com/photos/illustration-of-lungs-medical-concept-picture-id530196490\"}',NULL,NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:22:36
