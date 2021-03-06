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
-- Table structure for table `DoctorPatientStatoSaluteMapping`
--

DROP TABLE IF EXISTS `DoctorPatientStatoSaluteMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DoctorPatientStatoSaluteMapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `testId` int DEFAULT NULL,
  `frequencyId` int DEFAULT NULL,
  `repeitationID` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  `patientResponsel` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DoctorPatientStatoSaluteMapping`
--

LOCK TABLES `DoctorPatientStatoSaluteMapping` WRITE;
/*!40000 ALTER TABLE `DoctorPatientStatoSaluteMapping` DISABLE KEYS */;
INSERT INTO `DoctorPatientStatoSaluteMapping` VALUES (204,221,220,114,5,8,9,'1624861108',1),(205,221,230,115,1,1,1,'1624880386',1),(206,230,230,78,1,1,1,'1624883354',1),(207,230,230,68,1,1,1,'1624883438',1),(208,227,227,3,1,1,1,'1624945111',1),(209,227,227,78,1,1,1,'1624949146',1),(210,227,227,68,1,1,1,'1624949865',1),(211,221,230,118,1,1,1,'1624953696',1),(212,228,227,119,1,1,1,'1624954299',1),(213,266,266,3,1,1,1,'1625156615',1),(214,227,227,95,1,1,1,'1625215617',1),(215,227,227,92,1,1,1,'1625217656',1),(216,274,274,78,1,1,1,'1625489641',1),(217,274,274,68,1,1,1,'1625491540',1),(218,263,263,4,1,1,1,'1625553534',1),(219,264,263,120,1,2,2,'1625642616',1),(220,282,282,3,1,1,1,'1625743173',1),(221,264,282,121,1,2,1,'1625743722',1),(222,264,282,122,1,7,2,'1625743788',1),(223,264,282,123,1,1,1,'1625745023',1);
/*!40000 ALTER TABLE `DoctorPatientStatoSaluteMapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:22:40
