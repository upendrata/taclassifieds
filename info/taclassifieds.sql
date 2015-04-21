-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2015 at 03:48 PM
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
CREATE DATABASE `taclassifieds` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `taclassifieds`;

-- --------------------------------------------------------

--
-- Table structure for table `taclassifiedquestions`
--

CREATE TABLE IF NOT EXISTS `taclassifiedquestions` (
  `tacquestion` varchar(200) NOT NULL,
  `tacquestionval` int(2) NOT NULL,
  PRIMARY KEY (`tacquestionval`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taclassifiedquestions`
--

INSERT INTO `taclassifiedquestions` (`tacquestion`, `tacquestionval`) VALUES
('What is your first pet name?', 1),
('What was your childhood nickname?', 2),
('What is the name of your favorite childhood friend?', 3),
('In what city or town did your mother and father meet?', 4),
('What is your favorite team?', 5),
('What is your favorite movie?', 6),
('Who is your childhood sports hero?', 7),
('What was the name of the company where you had your first job?', 8);

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
('sreejas@techaspect.com', 2, 'Others', 'Lorem ipsum dolor sit amet', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `taclassifiedusers`
--

CREATE TABLE IF NOT EXISTS `taclassifiedusers` (
  `empid` int(4) NOT NULL,
  `empname` varchar(200) NOT NULL,
  `empemail` varchar(200) NOT NULL,
  `emppassword` varchar(25) NOT NULL,
  `empquestion` int(3) NOT NULL,
  `empqans` varchar(80) NOT NULL,
  PRIMARY KEY (`empemail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taclassifiedusers`
--

INSERT INTO `taclassifiedusers` (`empid`, `empname`, `empemail`, `emppassword`, `empquestion`, `empqans`) VALUES
(1370, 'Sreeja S', 'sreejas@techaspect.com', 'password', 0, ''),
(1127, 'Upendra Reddy V', 'upendrav@techaspect.com', 'password', 0, '');

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
