-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 02:14 PM
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
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sell_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `buy_amount` decimal(20,0) NOT NULL,
  `sell_amount` decimal(20,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `name`, `barcode`, `buy_amount`, `sell_amount`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 'Box 2 Inches', '210803416064341', 2000, 4000, 30, '2025-01-27 10:31:29', '2025-01-27 10:31:29'),
(2, 'Gift Box 6 Inches', '210885377262284', 7000, 10000, 140, '2025-01-27 11:26:15', '2025-01-28 10:21:36'),
(3, '15 Inches Plastic Box', '210825351049699', 2000, 4000, 30, '2025-01-27 11:30:08', '2025-01-27 11:30:08'),
(4, 'Rose Sticker 3 Inc', '210585966325425', 140000, 150000, 30, '2025-01-27 11:46:19', '2025-01-27 11:46:19'),
(5, 'Paper Box', '210602901984561', 12000000, 15000000, 2500, '2025-01-27 11:51:31', '2025-01-27 11:51:31'),
(6, 'Valentine\'s Time Surprise Box 16\"', '210238103063123', 250000, 300000, 105, '2025-01-27 12:13:03', '2025-01-28 10:13:45'),
(7, 'FatherDay\'s Box', '210163288689868', 8000, 10000, 60, '2025-01-28 06:56:49', '2025-01-28 06:56:49'),
(8, 'စက္ကူပုံး', '210516866131337', 2500000000000, 45000000, 850, '2025-01-28 10:59:32', '2025-01-28 11:04:29');

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
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_id` (`stock_id`),
  ADD KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
