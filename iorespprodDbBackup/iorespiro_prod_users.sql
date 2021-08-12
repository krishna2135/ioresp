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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `admin_permissions` int DEFAULT NULL,
  `notificationSetting` int DEFAULT '1',
  `isTerapia` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (217,'test 1','test@abc.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(218,'test 2','test2@abc.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(219,'Abhi','abhiddesigner@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(220,'Manoj','gaurav@triposapp.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(221,'Test Doctor','krishna@gmail.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(222,'krishna','krishna21356@gmail.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(223,'krishna','krishna6@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(224,'test doctor','testdoctor@abc.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(225,'Test Doctor','mehtaneetu0493@gmail.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(226,'krishna','krishnau@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(227,'Alok Mohan','alokmohan.gupta187@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,1),(228,'Gupta','alok.mohan@sanganan.in','DOCTOR','2021-06-23 13:35:45','827ccb0eea8a706c4c34a16891f84e7b',NULL,NULL,NULL,NULL,1,1,0),(229,'Lorenzo Leoni','lor.it','PATIENT',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(230,'Test Patient','neetu.mehtnan.in','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,1),(231,'test22','test22@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(232,'test33','test33@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(233,'test123','test123@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(234,'and','abcd@asbc.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(235,'qwerty','qwerty@abc.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(236,'QWERTY','qwer@abc.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(237,'1234','zdsdsx@afdf.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(238,'Assad’s','dscxfdf@dxg.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(239,'seaxfdsfx','sfxsdxcf@jsdfh.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(240,'ascrsdfc','adxs@dscg.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(241,'Schaffer','asdcgcdft@dfhvfgy.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(242,'we’re','addhy@anc.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(243,'adds','asdxzas@dcdfscx.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(244,'eswfxds','ascdxs@adsccdf.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(245,'12qwded','asdff@bgh.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(246,'qqqq','qqqq@aaaa.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(247,'1111sdd','sjsfbszuh@sgdsu.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(248,'qqqqqwww','dhgdfvjzdf@ksxgid.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(249,'112223e3dedd','sder@asd.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(250,'112223e3dedd','vikas.chaudhary@sanganan.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(251,'112223e3dedd','vikas.chaudhary@sanganan.in','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(252,'Pulkit','sinhagaurav010@gmail.com','PATIENT','2021-06-23 13:35:45','d8578edf8458ce06fbc5bb76a58c5ca4',NULL,NULL,NULL,NULL,NULL,1,0),(253,'mukul','gaurav.sinha@sanganan.com','PATIENT','2021-06-23 13:35:45','d8578edf8458ce06fbc5bb76a58c5ca4',NULL,NULL,NULL,NULL,NULL,1,0),(254,'Rogers','rogersgary11@gmail.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(256,'asdsdfdsfd','cdchgbex@dfhgf.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(257,'scuff','dcfg@fdvfgv.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(258,'kiosks','fvfvggfh@fdvhfhy.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(259,'111122eddf','sfcdfcdfe@cdgftfgvjl.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(260,'cdfcfcd','chaudhary.vikas04@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(261,'Gustavo','sinhagaurv10@bm.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(262,'Lorenzo Leoni','tompsolution.in','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(263,'Patient Profile','neetu.mehta@sanganan.in','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,1),(264,'Dr. Test','neetumehta0493@gmail.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(265,'Tommaso Testi','toopsolution.it','DOCTOR','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,1,1,0),(266,'Lorenzo Leoni','lorensolution.it','PATIENT','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(267,'Gaurav Sinha ','dhhe@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(268,'Prashasya Choudhary','prashasya@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(269,'David Ferrini','david.fn.it','DOCTOR','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(270,'test','test@gmail.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(271,'krishna','testingrishna@gmail.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(272,'Helen','testme@gmail.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(273,'Damiano Pennese','damianotion.it','DOCTOR',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(274,'Tushar','sainit981@gmail.com','PATIENT','2021-06-23 13:35:45','639675389977af79d1a744eba8c61de2',NULL,NULL,NULL,NULL,NULL,1,1),(275,'Natalia Martone','natalia.opsolution.it','DOCTOR','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(276,'tushar saini','tushar1702058@gmail.com','DOCTOR','2021-06-23 13:35:45','639675389977af79d1a744eba8c61de2',NULL,NULL,NULL,NULL,1,1,0),(277,'ajhsfbjhddg','abckdhd@kvjf.com','DOCTOR',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(278,'qqswe','dezwyg@jsdxdsx.com','PATIENT',NULL,'e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(279,'jszfusfd','hjbdsza@jxdswnfdfhjxs.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(280,'Sid as','hgszad@hjadsxfadfs.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(281,'km','krishnaty@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(282,'Testi patient','kumariruchi2499@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,1),(283,'Prashasya11','prashasya.choudhary@sanganan.com1','PATIENT','2021-06-23 13:35:45','2ab8cea01c5cd5c8df27d4d572113cc7',NULL,NULL,NULL,NULL,NULL,1,0),(284,'Prashasya','abc@abc.com','DOCTOR','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,1,1,0),(285,'gaurav','tripos072@gmail.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0),(286,'Tommaso Testi','tommaso.testi@dropsolution.it','DOCTOR','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,1,1,0),(287,'Lorenzo Leoni','lorenzo.leoni@dropsolution.it','PATIENT','2021-06-23 13:35:45','5f4dcc3b5aa765d61d8327deb882cf99',NULL,NULL,NULL,NULL,NULL,1,0),(288,'Prashasya Choudhary','prashasya.choudhary@sanganan.com','PATIENT','2021-06-23 13:35:45','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 13:21:49
