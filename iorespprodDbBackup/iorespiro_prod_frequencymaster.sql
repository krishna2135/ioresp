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
-- Table structure for table `frequencymaster`
--

DROP TABLE IF EXISTS `frequencymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frequencymaster` (
  `id` int NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  `Value` int DEFAULT NULL,
  `DayWeekMonthYearIndicator` char(1) DEFAULT NULL,
  `Remarks` varchar(100) DEFAULT NULL,
  `CreateDt` int DEFAULT NULL,
  `UpdateDt` int DEFAULT NULL,
  `frequencymastercol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frequencymaster`
--

LOCK TABLES `frequencymaster` WRITE;
/*!40000 ALTER TABLE `frequencymaster` DISABLE KEYS */;
INSERT INTO `frequencymaster` VALUES (1,'Ogni giorno',1,'d','every day',NULL,NULL,NULL),(2,'Ogni 2 giorni',2,'d','every alternate day',NULL,NULL,NULL),(3,'Ogni settimana',1,'w','every week',NULL,NULL,NULL),(4,'Ogni 2 settimane',2,'w','every 2 weeks',NULL,NULL,NULL),(5,'Ogni mese',1,'m','every month',NULL,NULL,NULL),(6,'Ogni 6 mesi',6,'m','every 6 months',NULL,NULL,NULL),(7,'Ogni anno',1,'y','every year',NULL,NULL,NULL);
/*!40000 ALTER TABLE `frequencymaster` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:22:06
