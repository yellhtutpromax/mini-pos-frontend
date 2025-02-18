-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 02:21 PM
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
  `voucher_codes` varchar(255) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sell_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `voucher_codes`, `stock_id`, `user_id`, `unit_price`, `total_amount`, `quantity`, `sell_date`, `notes`, `created_at`, `updated_at`) VALUES
(1, '210708189200676', 1, 1, 4000.00, 28000.00, 7, '2025-01-29', NULL, '2025-01-29 08:23:39', '2025-01-29 08:23:39'),
(2, '210166224142727', 2, 1, 10000.00, 150000.00, 15, '2025-01-29', NULL, '2025-01-29 08:23:47', '2025-01-29 08:23:47'),
(3, '210216569772195', 4, 1, 150000.00, 2250000.00, 15, '2025-01-29', NULL, '2025-01-29 08:23:53', '2025-01-29 08:23:53'),
(4, '210005395761675', 5, 1, 15000000.00, 99999999.99, 10, '2025-01-29', NULL, '2025-01-29 08:24:05', '2025-01-29 08:24:05'),
(5, '210372580678781', 7, 1, 10000.00, 40000.00, 4, '2025-01-29', NULL, '2025-01-29 08:29:07', '2025-01-29 08:29:07'),
(6, '210046188667913', 7, 1, 10000.00, 50000.00, 5, '2025-01-29', NULL, '2025-01-29 08:29:43', '2025-01-29 08:29:43'),
(7, '210425744032061', 8, 1, 30000.00, 150000.00, 5, '2025-01-29', 'Here’s a description you can use for the date field, providing some context about what it represents:', '2025-01-29 08:36:00', '2025-01-29 13:11:39'),
(8, '210996108652633', 8, 1, 30000.00, 150000.00, 5, '2025-01-29', '', '2025-01-29 10:32:54', '2025-01-29 10:32:54'),
(9, '210665164939386', 8, 1, 30000.00, 2250000.00, 75, '2025-02-17', '', '2025-02-17 05:58:56', '2025-02-17 05:58:56');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `buy_amount` decimal(20,0) NOT NULL,
  `sell_amount` decimal(20,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `user_id`, `updated_id`, `name`, `barcode`, `buy_amount`, `sell_amount`, `quantity`, `photo`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'Box 2 Inches', '210803416064341', 2000, 4000, 43, NULL, 0, '2025-01-27 10:31:29', '2025-01-29 08:23:29'),
(2, 1, 1, 'Gift Box 6 Inches', '210885377262284', 7000, 10000, 115, '1739865349784.png', 0, '2025-01-27 11:26:15', '2025-02-18 07:55:49'),
(3, 1, NULL, '15 Inches Plastic Box', '210825351049699', 2000, 4000, 25, '1739862502531.png', 0, '2025-01-27 11:30:08', '2025-02-18 07:08:22'),
(4, 1, NULL, 'Rose Sticker 3 Inc', '210585966325425', 140000, 150000, 20, '1739862307427.png', 0, '2025-01-27 11:46:19', '2025-02-18 07:05:07'),
(5, 1, 1, 'Paper Box', '210602901984561', 12000000, 15000000, 500, '1739857032087.png', 0, '2025-01-27 11:51:31', '2025-02-18 07:55:35'),
(6, 1, NULL, 'Valentine\'s Time Surprise Box 16\"', '210238103063123', 250000, 300000, 100, '1739856646201.png', 0, '2025-01-27 12:13:03', '2025-02-18 05:30:46'),
(7, 1, NULL, 'FatherDay\'s Box', '210163288689868', 8000, 10000, 40, '1739856564703.png', 0, '2025-01-28 06:56:49', '2025-02-18 05:29:24'),
(8, 1, NULL, 'စက္ကူပုံး', '210516866131337', 25000, 30000, 50, '1739856122853.png', 0, '2025-01-28 10:59:32', '2025-02-18 05:22:02'),
(9, 1, 1, 'Birthday\'s Box', '210299472823490', 3000, 3500, 70, '1739864568637.png', 0, '2025-02-17 13:09:16', '2025-02-18 07:56:46'),
(11, 1, 1, 'Pizza Box', '210905674772695', 5000, 6000, 30, '1739865165963.png', 0, '2025-02-18 07:29:45', '2025-02-18 07:54:54');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
