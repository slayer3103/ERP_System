-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: erp_database
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `counters`
--

DROP TABLE IF EXISTS `counters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counters` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `seq` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counters`
--

LOCK TABLES `counters` WRITE;
/*!40000 ALTER TABLE `counters` DISABLE KEYS */;
INSERT INTO `counters` VALUES ('invoice_2025-26',6),('purchase_order_2025-26',3),('quotation_2025-26',3),('work_order_2025-26',2);
/*!40000 ALTER TABLE `counters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_type` enum('Domestic','International') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Domestic',
  `title` enum('MR','MS','MRS','DR') COLLATE utf8mb4_general_ci DEFAULT 'MR',
  `customer_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `company_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `display_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `office_no` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pan` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gst` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_general_ci DEFAULT 'INR',
  `document_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_recipient_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_country` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_address1` text COLLATE utf8mb4_general_ci,
  `billing_address2` text COLLATE utf8mb4_general_ci,
  `billing_city` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_state` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_state_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'State code for billing address (e.g., 27 for Maharashtra)',
  `billing_pincode` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_fax` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_recipient_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_country` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_address1` text COLLATE utf8mb4_general_ci,
  `shipping_address2` text COLLATE utf8mb4_general_ci,
  `shipping_city` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_state` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_state_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'State code for shipping address (e.g., 27 for Maharashtra)',
  `shipping_pincode` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_fax` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Active','Inactive') COLLATE utf8mb4_general_ci DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Domestic','MR','Rajesh Kumar Sharma','Sharma Enterprises Pvt Ltd','Sharma Enterprises','rajesh.sharma@sharmaenterprises.com','9876543210','02224567890','ABCPS1234R','27ABCPS1234R1Z5','INR',NULL,'Rajesh Kumar Sharma','India','Plot No. 45, MIDC Industrial Area','Andheri East','Mumbai','Maharashtra','27','400093',NULL,NULL,'Rajesh Kumar Sharma','India','Plot No. 45, MIDC Industrial Area',NULL,'Mumbai','Maharashtra','27','400093',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(2,'Domestic','DR','Priya Mehta','Mehta Healthcare Solutions','Mehta Healthcare','priya.mehta@mehtahealthcare.com','9823456781','02228901234','BCDPM5678S','27BCDPM5678S1Z3','INR',NULL,'Priya Mehta','India','B-12, Bandra Kurla Complex','Near HDFC Bank','Mumbai','Maharashtra','27','400051',NULL,NULL,'Priya Mehta','India','B-12, Bandra Kurla Complex',NULL,'Mumbai','Maharashtra','27','400051',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(3,'Domestic','MR','Suresh Patil','Patil Construction Ltd','Patil Construction','suresh.patil@patilconstruction.com','9765432109','02022345678','CDESP9012T','27CDESP9012T1Z1','INR',NULL,'Suresh Patil','India','Survey No. 112, Hinjewadi Phase 2','IT Park Road','Pune','Maharashtra','27','411057',NULL,NULL,'Suresh Patil','India','Survey No. 112, Hinjewadi Phase 2',NULL,'Pune','Maharashtra','27','411057',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(4,'International','MR','James Anderson','Anderson Global Imports','Anderson Global','james.anderson@andersonglobal.com','9812345670','02226789012','DEFJA3456U','29DEFJA3456U1Z8','USD',NULL,'James Anderson','India','500 Tech Park, Whitefield','Outer Ring Road','Bangalore','Karnataka','29','560066',NULL,NULL,'James Anderson','India','500 Tech Park, Whitefield',NULL,'Bangalore','Karnataka','29','560066',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(5,'Domestic','MRS','Kavita Desai','Desai Textiles Pvt Ltd','Desai Textiles','kavita.desai@desaitextiles.com','9734567891','02125678901','EFGKD7890V','24EFGKD7890V1Z6','INR',NULL,'Kavita Desai','India','Textile Market, Ring Road','Surat City','Surat','Gujarat','24','395003',NULL,NULL,'Kavita Desai','India','Textile Market, Ring Road',NULL,'Surat','Gujarat','24','395003',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(6,'Domestic','MR','Amit Verma','Verma Auto Components','Verma Auto','amit.verma@vermaauto.com','9645678902','01123456789','FGHAV2345W','07FGHAV2345W1Z4','INR',NULL,'Amit Verma','India','A-45, Okhla Industrial Estate','Phase III','New Delhi','Delhi','07','110020',NULL,NULL,'Amit Verma','India','A-45, Okhla Industrial Estate',NULL,'New Delhi','Delhi','07','110020',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(7,'International','MS','Sarah Williams','Williams Tech Solutions','Williams Tech','sarah.williams@williamstech.com','9556789013','04423456789','GHISW6789X','33GHISW6789X1Z2','USD',NULL,'Sarah Williams','India','No. 78, Anna Salai','Teynampet','Chennai','Tamil Nadu','33','600018',NULL,NULL,'Sarah Williams','India','No. 78, Anna Salai',NULL,'Chennai','Tamil Nadu','33','600018',NULL,NULL,NULL,'2026-05-14 18:01:25','Active'),(8,'Domestic','MR','Vikram Singh','Singh Pharma Industries','Singh Pharma','vikram.singh@singhpharma.com','9467890124','01612345678','HIJVS0123Y','06HIJVS0123Y1Z9','INR',NULL,'Vikram Singh','India','Plot 23, Pharma Zone','Sector 18','Gurugram','Haryana','06','122015',NULL,NULL,'Vikram Singh','India','Plot 23, Pharma Zone',NULL,'Gurugram','Haryana','06','122015',NULL,NULL,NULL,'2026-05-14 18:01:25','Active');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_years`
--

DROP TABLE IF EXISTS `financial_years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_years`
--

LOCK TABLES `financial_years` WRITE;
/*!40000 ALTER TABLE `financial_years` DISABLE KEYS */;
INSERT INTO `financial_years` VALUES (1,'2023-03-16','2024-03-15',0,'2025-07-16 16:00:29'),(3,'2024-04-01','2025-03-31',0,'2025-07-23 08:46:33'),(4,'2025-08-07','2026-08-06',0,'2025-08-20 09:35:29'),(5,'2025-04-01','2026-03-31',1,'2025-10-09 08:07:15');
/*!40000 ALTER TABLE `financial_years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `invoice_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_notes` text COLLATE utf8mb4_general_ci,
  `terms_and_conditions` text COLLATE utf8mb4_general_ci,
  `sub_total` double DEFAULT NULL,
  `freight` decimal(10,2) DEFAULT '0.00',
  `cgst` double DEFAULT NULL,
  `sgst` double DEFAULT NULL,
  `igst` decimal(10,2) DEFAULT '0.00',
  `grand_total` double DEFAULT NULL,
  `status` enum('Draft','Partial','Paid') COLLATE utf8mb4_general_ci DEFAULT 'Draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_id` int NOT NULL,
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `financial_year_id` int DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `idx_invoice_financial_year` (`financial_year_id`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`financial_year_id`) REFERENCES `financial_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES ('ME/2025-26/001','Rajesh Kumar Sharma','2025-05-10','2025-06-10','Supply of Conveyor Belt System','Thank you for your business.','Payment within 30 days. GST extra as applicable.',45000,1500.00,4185,4185,0.00,54870,'Paid','2026-05-14 18:01:26',1,1,NULL),('ME/2025-26/002','Priya Mehta','2025-06-15','2025-07-15','Control Panel Installation','Thank you for choosing Merraki Expert.','Warranty: 12 months from date of installation.',28500,0.00,2565,2565,0.00,33630,'Partial','2026-05-14 18:01:26',2,2,NULL),('ME/2025-26/003','Suresh Patil','2025-07-20','2025-08-20','Hydraulic Pump Supply','Delivery within 2 weeks.','Transportation charges extra at actual.',37500,2000.00,3555,3555,0.00,46610,'Paid','2026-05-14 18:01:26',3,3,NULL),('ME/2025-26/004','James Anderson','2025-08-05','2025-09-05','Annual Maintenance Contract 2025-26','AMC includes 4 quarterly visits.','Service as per agreed scope of work.',75000,0.00,0,0,13500.00,88500,'Draft','2026-05-14 18:01:26',4,4,NULL),('ME/2025-26/005','Kavita Desai','2025-09-12','2025-10-12','Steel Frame Fabrication','Custom fabrication as per drawing.','50% advance, balance before dispatch.',85000,3500.00,7965,7965,0.00,104430,'Paid','2026-05-14 18:01:26',5,5,NULL);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int DEFAULT NULL,
  `item_detail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `uom_amount` decimal(10,2) DEFAULT '0.00',
  `uom_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
INSERT INTO `invoice_items` VALUES (1,1,'Industrial Conveyor Belt',1,45000,0,45000,0.00,'pcs'),(2,2,'Control Panel Unit',1,28500,0,28500,0.00,'pcs'),(3,3,'Hydraulic Pump',2,18750,0,37500,0.00,'pcs'),(4,4,'Annual Maintenance Contract',1,75000,0,75000,0.00,'nos'),(5,5,'Steel Frame Structure',100,850,0,85000,0.00,'kg');
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_entries`
--

DROP TABLE IF EXISTS `payment_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_entries` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `invoice_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `payment_date` date NOT NULL,
  `payment_mode` enum('Online','Cash','Cheque') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Cash',
  `currency` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'INR',
  `amount` decimal(10,2) NOT NULL,
  `invoice_total` decimal(10,2) NOT NULL,
  `remaining_balance` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `financial_year_id` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `idx_invoice_id` (`invoice_id`),
  KEY `idx_payment_entries_financial_year` (`financial_year_id`),
  CONSTRAINT `payment_entries_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`) ON DELETE CASCADE,
  CONSTRAINT `payment_entries_ibfk_2` FOREIGN KEY (`financial_year_id`) REFERENCES `financial_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_entries`
--

LOCK TABLES `payment_entries` WRITE;
/*!40000 ALTER TABLE `payment_entries` DISABLE KEYS */;
INSERT INTO `payment_entries` VALUES (1,1,'ME/2025-26/001','2025-05-25','Online','INR',54870.00,54870.00,0.00,'2026-05-14 18:01:28','2026-05-14 18:01:28',NULL),(2,2,'ME/2025-26/002','2025-07-01','Cheque','INR',16815.00,33630.00,16815.00,'2026-05-14 18:01:28','2026-05-14 18:01:28',NULL),(3,3,'ME/2025-26/003','2025-08-10','Online','INR',46610.00,46610.00,0.00,'2026-05-14 18:01:29','2026-05-14 18:01:29',NULL),(4,5,'ME/2025-26/005','2025-09-20','Online','INR',104430.00,104430.00,0.00,'2026-05-14 18:01:29','2026-05-14 18:01:29',NULL);
/*!40000 ALTER TABLE `payment_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_units`
--

DROP TABLE IF EXISTS `product_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unit_name` (`unit_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_units`
--

LOCK TABLES `product_units` WRITE;
/*!40000 ALTER TABLE `product_units` DISABLE KEYS */;
INSERT INTO `product_units` VALUES (1,'cm','2025-10-18 17:49:53'),(2,'mm','2025-10-18 17:49:53'),(3,'kg','2025-10-18 17:49:53'),(4,'pcs','2025-10-18 17:49:53'),(5,'liters','2025-10-18 17:49:53'),(6,'gm','2025-10-18 17:49:53'),(7,'box','2025-10-18 17:49:53'),(8,'dozen','2025-10-18 17:49:53');
/*!40000 ALTER TABLE `product_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_services`
--

DROP TABLE IF EXISTS `products_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('Product','Service') COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sku` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_applicable` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('Active','Inactive') COLLATE utf8mb4_general_ci DEFAULT 'Active',
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `sale_discount` decimal(5,2) DEFAULT NULL,
  `sale_discount_type` enum('%','Flat') COLLATE utf8mb4_general_ci DEFAULT '%',
  `sale_description` text COLLATE utf8mb4_general_ci,
  `purchase_price` decimal(10,2) DEFAULT NULL,
  `purchase_discount` decimal(5,2) DEFAULT NULL,
  `purchase_discount_type` enum('%','Flat') COLLATE utf8mb4_general_ci DEFAULT '%',
  `purchase_description` text COLLATE utf8mb4_general_ci,
  `preferred_vendor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_services`
--

LOCK TABLES `products_services` WRITE;
/*!40000 ALTER TABLE `products_services` DISABLE KEYS */;
INSERT INTO `products_services` VALUES (1,'Product','Industrial Conveyor Belt','SKU-CB001','1','Active','Machinery','pcs',45000.00,5.00,'%','Heavy duty conveyor belt for industrial use',38000.00,3.00,'%','Conveyor belt from Gupta Steel','Gupta Steel Suppliers','2026-05-14 18:01:25'),(2,'Product','Control Panel Unit','SKU-CP002','1','Active','Electrical','pcs',28500.00,0.00,'%','Automated control panel with PLC integration',22000.00,0.00,'%','Control panel from Joshi Electronics','Joshi Electronics Pvt Ltd','2026-05-14 18:01:25'),(3,'Product','Hydraulic Pump','SKU-HP003','1','Active','Machinery','pcs',18750.00,5.00,'%','High pressure hydraulic pump 200 bar',14500.00,2.00,'%','Hydraulic pump procurement','Gupta Steel Suppliers','2026-05-14 18:01:25'),(4,'Service','Annual Maintenance Contract','SKU-AMC004','1','Active','Services','nos',75000.00,10.00,'%','Annual maintenance and support contract',0.00,0.00,'%','Internal service offering','','2026-05-14 18:01:25'),(5,'Product','Steel Frame Structure','SKU-SF005','1','Active','Fabrication','kg',850.00,0.00,'%','Custom fabricated steel frame per kg',680.00,0.00,'%','Steel from Gupta Steel Suppliers','Gupta Steel Suppliers','2026-05-14 18:01:25'),(6,'Product','Electrical Cable 4mm','SKU-EC006','1','Active','Electrical','mtr',125.00,0.00,'%','4mm copper electrical cable per meter',95.00,0.00,'%','Cable from Joshi Electronics','Joshi Electronics Pvt Ltd','2026-05-14 18:01:25'),(7,'Service','Installation & Commissioning','SKU-IC007','1','Active','Services','nos',35000.00,0.00,'%','On-site installation and commissioning service',0.00,0.00,'%','Internal service','','2026-05-14 18:01:25'),(8,'Product','Pneumatic Cylinder','SKU-PC008','1','Active','Machinery','pcs',6500.00,5.00,'%','Double acting pneumatic cylinder 100mm bore',5200.00,2.00,'%','Pneumatic cylinder procurement','Tiwari Raw Materials','2026-05-14 18:01:25');
/*!40000 ALTER TABLE `products_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_items`
--

DROP TABLE IF EXISTS `purchase_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_order_id` int DEFAULT NULL,
  `item_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `uom_amount` decimal(10,2) DEFAULT '0.00',
  `uom_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_order_id` (`purchase_order_id`),
  CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_items`
--

LOCK TABLES `purchase_order_items` WRITE;
/*!40000 ALTER TABLE `purchase_order_items` DISABLE KEYS */;
INSERT INTO `purchase_order_items` VALUES (1,1,'Industrial Conveyor Belt',1,38000.00,0.00,38000.00,0.00,NULL),(2,2,'Control Panel Unit',2,22000.00,0.00,44000.00,0.00,NULL),(3,3,'Steel Frame Structure',75,680.00,0.00,51000.00,0.00,NULL),(4,3,'Hydraulic Pump',1,1000.00,0.00,1000.00,0.00,NULL);
/*!40000 ALTER TABLE `purchase_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_order_no` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `delivery_to` enum('organization','customer') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `delivery_address` text COLLATE utf8mb4_general_ci,
  `vendor_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `payment_terms` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `customer_notes` text COLLATE utf8mb4_general_ci,
  `terms_and_conditions` text COLLATE utf8mb4_general_ci,
  `sub_total` decimal(10,2) DEFAULT NULL,
  `freight` decimal(10,2) DEFAULT '0.00',
  `cgst` decimal(10,2) DEFAULT NULL,
  `sgst` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vendor_id` int DEFAULT NULL,
  `financial_year_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `idx_purchase_orders_financial_year` (`financial_year_id`),
  CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  CONSTRAINT `purchase_orders_ibfk_2` FOREIGN KEY (`financial_year_id`) REFERENCES `financial_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (1,'PO/2025-26/001',NULL,NULL,'Gupta Steel Suppliers','2025-04-15','2025-05-15','Net 30',NULL,NULL,NULL,38000.00,1200.00,3528.00,3528.00,46256.00,NULL,'2026-05-14 18:01:27',NULL,5),(2,'PO/2025-26/002',NULL,NULL,'Joshi Electronics Pvt Ltd','2025-05-20','2025-06-20','Net 15',NULL,NULL,NULL,44000.00,0.00,3960.00,3960.00,51920.00,NULL,'2026-05-14 18:01:27',NULL,5),(3,'PO/2025-26/003',NULL,NULL,'Prakash Nair','2025-06-10','2025-07-10','Due end of the month',NULL,'','',52000.00,2000.00,4860.00,4860.00,63720.00,'','2026-05-14 18:01:27',NULL,5);
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation` (
  `quotation_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quotation_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_notes` text COLLATE utf8mb4_general_ci,
  `terms_and_conditions` text COLLATE utf8mb4_general_ci,
  `sub_total` double DEFAULT NULL,
  `freight` decimal(10,2) DEFAULT '0.00',
  `cgst` double DEFAULT NULL,
  `sgst` double DEFAULT NULL,
  `igst` decimal(10,2) DEFAULT '0.00',
  `attachment_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `grand_total` int DEFAULT NULL,
  `status` enum('Draft','Sent') COLLATE utf8mb4_general_ci DEFAULT 'Draft',
  `quote_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `financial_year_id` int DEFAULT NULL,
  PRIMARY KEY (`quotation_id`),
  KEY `idx_quotation_financial_year` (`financial_year_id`),
  CONSTRAINT `quotation_ibfk_1` FOREIGN KEY (`financial_year_id`) REFERENCES `financial_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
INSERT INTO `quotation` VALUES (1,'Amit Verma','2025-05-01','2025-05-16','Quotation for Pneumatic Cylinders','Valid for 15 days only.','Delivery: 2-3 weeks. Payment: 100% advance.',65000,1000.00,5940,5940,0.00,NULL,'2026-05-14 18:01:26',77880,'Draft','QT/2025-26/001',5),(2,'Sarah Williams','2025-06-10','2025-06-25','Electrical Cable Supply Quotation','Prices subject to change after validity.','GST extra as applicable. Freight at actual.',37500,500.00,0,0,6840.00,NULL,'2026-05-14 18:01:26',44840,'Draft','QT/2025-26/002',5),(3,'Vikram Singh','2025-07-15','2025-07-30','Installation & Commissioning Services','Site visit required before final quote.','Work to be completed within 10 working days.',70000,0.00,6300,6300,0.00,NULL,'2026-05-14 18:01:26',82600,'Draft','QT/2025-26/003',5);
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_items`
--

DROP TABLE IF EXISTS `quotation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `quotation_id` int DEFAULT NULL,
  `item_detail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `uom_amount` decimal(10,2) DEFAULT '0.00',
  `uom_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `quotation_id` (`quotation_id`),
  CONSTRAINT `quotation_items_ibfk_1` FOREIGN KEY (`quotation_id`) REFERENCES `quotation` (`quotation_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_items`
--

LOCK TABLES `quotation_items` WRITE;
/*!40000 ALTER TABLE `quotation_items` DISABLE KEYS */;
INSERT INTO `quotation_items` VALUES (1,1,'Pneumatic Cylinder',10,6500,0,65000,0.00,'pcs'),(2,2,'Electrical Cable 4mm',300,125,0,37500,0.00,'mtr'),(3,3,'Installation & Commissioning',2,35000,0,70000,0.00,'nos');
/*!40000 ALTER TABLE `quotation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxes`
--

DROP TABLE IF EXISTS `taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tax_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT NULL,
  `tax_code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `details` text COLLATE utf8mb4_general_ci,
  `status` enum('Active','Inactive') COLLATE utf8mb4_general_ci DEFAULT 'Active',
  `effective_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
INSERT INTO `taxes` VALUES (1,'GST',18.00,'GST18','Standard GST 18%','Active','2024-04-01'),(2,'GST',12.00,'GST12','Reduced GST 12%','Active','2024-04-01'),(3,'GST',5.00,'GST5','Lower GST 5%','Active','2024-04-01'),(4,'GST',28.00,'GST28','Luxury GST 28%','Active','2024-04-01'),(5,'GST',0.00,'GST0','Exempt GST 0%','Active','2024-04-01');
/*!40000 ALTER TABLE `taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uom_types`
--

DROP TABLE IF EXISTS `uom_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uom_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `conversion_factor` decimal(10,4) DEFAULT '1.0000',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uom_types`
--

LOCK TABLES `uom_types` WRITE;
/*!40000 ALTER TABLE `uom_types` DISABLE KEYS */;
INSERT INTO `uom_types` VALUES (1,'Pieces','Individual units or pieces',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(2,'Kilograms','Weight in kilograms',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(3,'Meters','Length in meters',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(4,'Liters','Volume in liters',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(5,'Hours','Time in hours',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(6,'Square Meters','Area in square meters',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25'),(7,'Cubic Meters','Volume in cubic meters',1.0000,'2025-10-09 17:16:25','2025-10-09 17:16:25');
/*!40000 ALTER TABLE `uom_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','superadmin') COLLATE utf8mb4_unicode_ci DEFAULT 'admin',
  `status` enum('Active','Inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$ux7rAEeDxhzHIrwE.NkAmeV3oS7aA4rkNa0DaeT99nIzbNCRzdgJu','admin','Active','2025-10-07 18:06:04'),(3,'superadmin','$2b$10$ux7rAEeDxhzHIrwE.NkAmeV3oS7aA4rkNa0DaeT99nIzbNCRzdgJu','superadmin','Active','2025-10-07 18:10:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pan` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gst` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_recipient_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_address1` text COLLATE utf8mb4_general_ci,
  `billing_address2` text COLLATE utf8mb4_general_ci,
  `billing_city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_pincode` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_fax` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_recipient_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_address1` text COLLATE utf8mb4_general_ci,
  `shipping_address2` text COLLATE utf8mb4_general_ci,
  `shipping_city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_pincode` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_fax` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_holder_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bank_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_number` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ifsc` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` text COLLATE utf8mb4_general_ci,
  `status` enum('Active','Inactive') COLLATE utf8mb4_general_ci DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Ramesh Gupta','Gupta Steel Suppliers','Gupta Steel','ramesh.gupta@guptasteel.com','9312345678','ABCRG1234A','27ABCRG1234A1Z5','Ramesh Gupta','India','Shed No. 7, MIDC Bhosari','Bhosari Industrial Area','Pune','Maharashtra','411026',NULL,NULL,'Ramesh Gupta','India','Shed No. 7, MIDC Bhosari',NULL,'Pune','Maharashtra','411026',NULL,NULL,'Ramesh Gupta','State Bank of India','32145678901234','SBIN0001234','Primary steel supplier','Active'),(2,'Neha Joshi','Joshi Electronics Pvt Ltd','Joshi Electronics','neha.joshi@joshielectronics.com','9223456789','BCDNJ5678B','27BCDNJ5678B1Z3','Neha Joshi','India','C-14, Electronics Zone','Andheri West','Mumbai','Maharashtra','400058',NULL,NULL,'Neha Joshi','India','C-14, Electronics Zone',NULL,'Mumbai','Maharashtra','400058',NULL,NULL,'Neha Joshi','HDFC Bank','50100234567890','HDFC0001234','Electronic components vendor','Active'),(3,'Prakash Nair','Nair Logistics Services','Nair Logistics','prakash.nair@nairlogistics.com','9134567890','CDEPN9012C','32CDEPN9012C1Z1','Prakash Nair','India','Warehouse No. 3, NH-66','Edapally Junction','Kochi','Kerala','682024',NULL,NULL,'Prakash Nair','India','Warehouse No. 3, NH-66',NULL,'Kochi','Kerala','682024',NULL,NULL,'Prakash Nair','Axis Bank','915010012345678','UTIB0001234','Logistics and transport partner','Active'),(4,'Sunita Rao','Rao Packaging Solutions','Rao Packaging','sunita.rao@raopackaging.com','9045678901','DEFSR3456D','36DEFSR3456D1Z8','Sunita Rao','India','Plot 89, Industrial Estate','Nacharam','Hyderabad','Telangana','500076',NULL,NULL,'Sunita Rao','India','Plot 89, Industrial Estate',NULL,'Hyderabad','Telangana','500076',NULL,NULL,'Sunita Rao','ICICI Bank','123456789012','ICIC0001234','Packaging materials supplier','Active'),(5,'Mohan Tiwari','Tiwari Raw Materials','Tiwari Raw Materials','mohan.tiwari@tiwariraw.com','8956789012','EFGMT7890E','09EFGMT7890E1Z6','Mohan Tiwari','India','Gala No. 12, Bhiwandi Warehouse','Near NH-3','Bhiwandi','Maharashtra','421302',NULL,NULL,'Mohan Tiwari','India','Gala No. 12, Bhiwandi Warehouse',NULL,'Bhiwandi','Maharashtra','421302',NULL,NULL,'Mohan Tiwari','Bank of Baroda','29040100012345','BARB0001234','Raw material supplier','Active');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_order_items`
--

DROP TABLE IF EXISTS `work_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `work_order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `item_detail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '0.00',
  `rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `uom_amount` decimal(10,2) DEFAULT '0.00',
  `uom_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `work_order_id` (`work_order_id`),
  CONSTRAINT `work_order_items_ibfk_1` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`work_order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_order_items`
--

LOCK TABLES `work_order_items` WRITE;
/*!40000 ALTER TABLE `work_order_items` DISABLE KEYS */;
INSERT INTO `work_order_items` VALUES (1,1,NULL,'Installation & Commissioning',1.00,35000.00,0.00,35000.00,0.00,'nos'),(2,2,NULL,'Hydraulic Pump',1.00,18750.00,0.00,18750.00,0.00,'pcs'),(3,2,NULL,'Installation & Commissioning',1.00,9250.00,0.00,9250.00,0.00,'nos');
/*!40000 ALTER TABLE `work_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_orders`
--

DROP TABLE IF EXISTS `work_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_orders` (
  `work_order_id` int NOT NULL AUTO_INCREMENT,
  `work_order_number` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `work_order_date` date NOT NULL,
  `due_date` date NOT NULL,
  `payment_terms` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_notes` text COLLATE utf8mb4_general_ci,
  `terms_and_conditions` text COLLATE utf8mb4_general_ci,
  `attachment_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sub_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cgst` decimal(10,2) NOT NULL DEFAULT '0.00',
  `sgst` decimal(10,2) NOT NULL DEFAULT '0.00',
  `grand_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'Draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `purchase_order_number` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `financial_year_id` int DEFAULT NULL,
  PRIMARY KEY (`work_order_id`),
  UNIQUE KEY `work_order_number` (`work_order_number`),
  KEY `idx_work_orders_financial_year` (`financial_year_id`),
  CONSTRAINT `work_orders_ibfk_1` FOREIGN KEY (`financial_year_id`) REFERENCES `financial_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_orders`
--

LOCK TABLES `work_orders` WRITE;
/*!40000 ALTER TABLE `work_orders` DISABLE KEYS */;
INSERT INTO `work_orders` VALUES (1,'WO/2025-26/001','Rajesh Kumar Sharma','2025-05-15','2025-06-15','Net 30','Installation of Conveyor Belt System',NULL,NULL,NULL,35000.00,3150.00,3150.00,41300.00,'In Progress','2026-05-14 18:01:27','2026-05-14 18:01:27',NULL,NULL,5),(2,'WO/2025-26/002','Suresh Patil','2025-07-01','2025-07-31','Due end of the month','Hydraulic System Commissioning',NULL,NULL,NULL,28000.00,2520.00,2520.00,33040.00,'Pending','2026-05-14 18:01:27','2026-05-14 18:01:27',NULL,NULL,5);
/*!40000 ALTER TABLE `work_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-15 14:15:31
