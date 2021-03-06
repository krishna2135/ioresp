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
-- Table structure for table `firebaseTokens`
--

DROP TABLE IF EXISTS `firebaseTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `firebaseTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tokenId` varchar(1500) DEFAULT NULL,
  `deviceId` varchar(2000) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `timestamp` int DEFAULT NULL,
  `OS` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firebaseTokens`
--

LOCK TABLES `firebaseTokens` WRITE;
/*!40000 ALTER TABLE `firebaseTokens` DISABLE KEYS */;
INSERT INTO `firebaseTokens` VALUES (10,'ef5M5gVvSMWpNLKsloPeUF:APA91bFxA-VHlqgrKhl4KRZ4ux2ITb0Qza9QLJC6-z2Tlj2DUgsU2_3K2t5UwYbMT-QfHgkHBJX-8bRwqiJlNjU1SfYfTNDkl1jq-we3C5rlpY2SToZfIu0LYMbtP7aqgZR3DN8AhXmQ','becb9a2b24b1a74b',287,1625839648,'Android'),(12,'filIR69bSN63lH082swxJv:APA91bGhMVBqDu8olEKZs_JaNkhZ8odv7b19RDpuXdSdsnf81ZqflHrjg4m274A15rA2RtW97L5pZ8HHZnhY7iCXV_bKeBqu7JWQ39U5fkOoM-I1JM4yBTsS8KcNhJUqd-UWUrXk2tgw','9cd3493886b530ed',288,1626066344,'Android');
/*!40000 ALTER TABLE `firebaseTokens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:21:14
