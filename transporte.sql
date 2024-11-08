-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-11-2024 a las 03:06:35
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transporte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE IF NOT EXISTS `vehiculo` (
  `placa` varchar(9) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `modelo` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `year` varchar(4) NOT NULL,
  `precio` int(11) NOT NULL,
  PRIMARY KEY (`placa`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`placa`, `marca`, `modelo`, `color`, `year`, `precio`) VALUES
('aaa123', 'mazda', '2020', 'azul', '2020', 5000),
('wde111', 'bmw', '2025', 'verde', '2025', 10000),
('asd567', 'toyota', '2000', 'amarillo', '2000', 1500);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
