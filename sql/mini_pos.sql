-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 01:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `name` int(100) NOT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `buy_amount` int(11) NOT NULL,
  `sell_amount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `refresh_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`) VALUES
(1, 'Yell Htut Aung', 'admin@yellhtut.com', '$2a$12$kM6ZfeD3CuY/ABlICOy8a.VExg9zfjv6lZTA031V.KqS/DDeX4j8C', 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwaXJlc0F0IjoiMjAyNS0wMS0yOVQxMTozMjowOS4zMDNaIiwiaWF0IjoxNzM3NTQ1NTI5LCJleHAiOjE3MzgxNTAzMjl9.4PTtvCXsiSUXbutD497wW5D73yQlvW7zFm26pUyOH5w'),
(2, 'Smitch', 'smitch4@gmail.com', '$2a$12$kM6ZfeD3CuY/ABlICOy8a.VExg9zfjv6lZTA031V.KqS/DDeX4j8C', '454345'),
(3, 'Thidar Lwin', 'thidalwin@gmail.com', '$2a$12$kM6ZfeD3CuY/ABlICOy8a.VExg9zfjv6lZTA031V.KqS/DDeX4j8C', 'fdfd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
