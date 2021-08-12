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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Quanto spesso hai dimenticato di fare le tue inalazioni abituali negli ultimi sette giorni:','tai',NULL,NULL),(2,'Hai dimenticato di fare tue inalazioni:','tai',NULL,NULL),(3,'Quando ti senti bene, smetti di fare le inalazioni:','tai',NULL,NULL),(4,'Durante il fine settimana o quando vai in vacanza, smetti di fare inalazioni:','tai',NULL,NULL),(5,'Quando sei ansioso o triste, smetti di fare le inalazioni:','tai',NULL,NULL),(6,'Smetti di fare le inalazioni per paura di possibili effetti indesiderati:','tai',NULL,NULL),(7,'Smetti di fare le inalazioni perche ritieni che siano di scarso aiuto nel trattamento della tua malattia:','tai',NULL,NULL),(8,'Fai meno inalazioni di quelle prescritte dal tuo medico:','tai',NULL,NULL),(9,'Smetti di fare le inalazioni perche ritieni che interferiscano con la tua vita quotidiana o lavorative:','tai',NULL,NULL),(10,'Smetti di fare le inalazioni perchè hai difficoltà a pagarle','tai',NULL,NULL),(11,'','',NULL,NULL),(12,'{\"top\":\"Non tossico mai \",\"bottom\":\"Tossico sempre\"}','cat',NULL,NULL),(13,'{\"top\":\"Il mio petto é completamente libero da catarro (muco)\",\"bottom\":\"Il mio petto é tutto pieno di catarro (muco)\"}','cat',NULL,NULL),(14,'{\"top\":\"Non avverto alcuna sensazione di costrizione al petto  \",\"bottom\":\"Avverto una forte sensazione di costrizione al petto \"}','cat',NULL,NULL),(15,'{\"top\":\"Quando cammino in salita o salgo una rampa di scale non avverto mancanza di fiato \",\"bottom\":\"Quando cammino in salita o salgo una rampa di scale attività una forte mancanza di fiato\"}','cat',NULL,NULL),(16,'{\"top\":\"Non avverto limitazioni nello svolgere qualsiasi attività in casa\",\"bottom\":\"Avverto gravi limitazioni nello svolgere qualsiasi attività in casa\"}','cat',NULL,NULL),(17,'{\"top\":\"Mi sento tranquillo ad uscire di casa nonostante la mia malattia polmonare\",\"bottom\":\"Non mi sento affatto tranquillo ad uscire di casa a causa della mia malattia polmonare\"}','cat',NULL,NULL),(18,'{\"top\":\"Dormo profondamente\",\"bottom\":\"Non riesco a dormire profondamente a causa della mia malattia polmonare\"}','cat',NULL,NULL),(19,'{\"top\":\"Ho molta energia\",\"bottom\":\"Non ho nessuna energia\"}','cat',NULL,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:20:53
