-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2015 at 05:32 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `taclassifieds`
--

-- --------------------------------------------------------

--
-- Table structure for table `taclassifieds`
--

CREATE TABLE IF NOT EXISTS `taclassifieds` (
  `empemail` varchar(200) NOT NULL,
  `classifiedId` int(10) NOT NULL,
  `classifiedCategory` varchar(60) NOT NULL,
  `classifiedHeading` varchar(500) NOT NULL,
  `classifiedDesc` varchar(3000) NOT NULL,
  `classifiedDisplay` int(1) NOT NULL,
  PRIMARY KEY (`classifiedId`),
  KEY `empemail` (`empemail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taclassifieds`
--

INSERT INTO `taclassifieds` (`empemail`, `classifiedId`, `classifiedCategory`, `classifiedHeading`, `classifiedDesc`, `classifiedDisplay`) VALUES
('upendrav@techaspect.com', 1, 'Electronics', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('sreejas@techaspect.com', 2, 'Others', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('sreejas@techaspect.com', 3, 'Electronics', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('upendrav@techaspect.com', 4, 'Others', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('sreejas@techaspect.com', 5, 'Electronics', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('upendrav@techaspect.com', 6, 'Others', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('sreejas@techaspect.com', 7, 'Electronics', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('upendrav@techaspect.com', 8, 'Others', 'Lorem ipsum dolor sit amet 8', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('sreejas@techaspect.com', 9, 'Electronics', 'Lorem ipsum dolor sit amet 9', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 0),
('upendrav@techaspect.com', 10, 'Others', 'Lorem ipsum dolor sit amet 10', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1),
('srinathg@techaspect.com', 11, 'Electroncis', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `taclassifieds`
--
ALTER TABLE `taclassifieds`
  ADD CONSTRAINT `taclassifieds_ibfk_1` FOREIGN KEY (`empemail`) REFERENCES `taclassifiedusers` (`empemail`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
