-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-02-2021 a las 04:20:49
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category_animal`
--

CREATE TABLE `category_animal` (
  `idCategory` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category_animal`
--

INSERT INTO `category_animal` (`idCategory`, `category`) VALUES
('fejfwnnau', 'De Compania'),
('iiwnfiwls', 'De Granja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacients`
--

CREATE TABLE `pacients` (
  `idPacient` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `idCategory` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `altura` double NOT NULL,
  `peso` double NOT NULL,
  `emailPerson` varchar(50) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pacients`
--

INSERT INTO `pacients` (`idPacient`, `tipo`, `idCategory`, `nombre`, `altura`, `peso`, `emailPerson`, `avatar`, `created_at`) VALUES
('88204b2a-0921-4f3f-a2db-119454ac1849', 'Gato', 'fejfwnnau', 'micho', 50, 20, 'goyeselcoca@gmail.com', 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '2021-02-08 21:22:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `idProducts` varchar(50) NOT NULL,
  `name` varchar(25) NOT NULL,
  `stock` int(3) NOT NULL,
  `update_at` datetime NOT NULL,
  `source` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`idProducts`, `name`, `stock`, `update_at`, `source`, `description`) VALUES
('4d016cae-9f6c-45ed-b350-dd15fb9bfa18', 'mi producto aqui', 20, '2021-02-16 21:21:13', 'me.jpg', 'Este producto sirve para tales sintomas: -----, ---- , -----, -----. eso y mas aca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` varchar(50) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `provider` varchar(20) NOT NULL,
  `Phone` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `userName`, `email`, `created_at`, `isAdmin`, `avatar`, `provider`, `Phone`) VALUES
('2c974dce-97a8-40c2-ad4c-5b078cedc940', 'Aldo Toa', 'aldopapiwilo@gmail.com', '2021-02-07 15:57:28', 0, NULL, 'veterinario', 993698358),
('30e9c690-0586-4e03-aa86-62e6345a536d', 'Michelle Rodríguez', 'dayannarodriguez1314@gmail.com', '2021-02-09 10:31:54', 0, 'https://lh3.googleusercontent.com/a-/AOh14GjHhvIm5sHtTvn3_xKnpWG2Y5m_SzMMffFs0OstuA=s96-c', 'google', NULL),
('c8bd9afa-bfd9-4538-b596-6a7017d1418a', 'Andres Coello', 'goyeselcoca@gmail.com', '2021-02-08 11:00:50', 1, 'https://lh3.googleusercontent.com/a-/AOh14GiDBCtjAfGIZVErBuH-e-rR78-dhDPlV2BQwFD9dw', 'google', NULL),
('eefc7aa0-0923-4d31-84b7-bb118058f20d', 'Yexon Javier Burgos', 'javierburgoscal.25@gmail.com', '2021-02-09 10:20:02', 1, 'https://lh3.googleusercontent.com/a-/AOh14GgvX-70scC2-VBwYs76zF3FXivSSSO7kaOnXJw25dY=s96-c', 'google', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category_animal`
--
ALTER TABLE `category_animal`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indices de la tabla `pacients`
--
ALTER TABLE `pacients`
  ADD PRIMARY KEY (`idPacient`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idProducts`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pacients`
--
ALTER TABLE `pacients`
  ADD CONSTRAINT `pacients_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `category_animal` (`idCategory`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
