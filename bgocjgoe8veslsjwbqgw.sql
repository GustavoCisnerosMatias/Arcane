-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: bgocjgoe8veslsjwbqgw-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 30-06-2024 a las 08:31:57
-- Versión del servidor: 8.0.15-5
-- Versión de PHP: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bgocjgoe8veslsjwbqgw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `fecha` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `nombreCliente` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_mesa` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT '0.00',
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id`, `fecha`, `nombreCliente`, `id_mesa`, `total`, `estado`) VALUES
(1, '2024-06-30T03:06:11.860Z', 'gustavo', 1, 54.00, 0),
(2, '2024-06-30T03:40:45.357Z', 'Balon', 1, 8.00, 0),
(5, '2024-06-30T03:43:16.782Z', 'alejandro', 4, 10.00, 0),
(6, '2024-06-30T03:43:06.806Z', 'vanessa', 1, 5.00, 0),
(7, '2024-06-30T03:43:38.245Z', 'andres', 1, 13.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_detalle`
--

CREATE TABLE `factura_detalle` (
  `id` int(11) NOT NULL,
  `id_factura` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_detalle`
--

INSERT INTO `factura_detalle` (`id`, `id_factura`, `id_producto`, `cantidad`, `precio_unitario`, `subtotal`, `estado`) VALUES
(1, 1, 1, 2, 3.00, 6.00, 0),
(2, 1, 2, 2, 1.00, 2.00, 0),
(3, 1, 3, 2, 3.00, 6.00, 0),
(8, 1, 1, 5, 3.00, 15.00, 0),
(9, 2, 2, 1, 1.00, 1.00, 0),
(10, 2, 2, 4, 1.00, 4.00, 0),
(11, 2, 1, 1, 3.00, 3.00, 0),
(12, 1, 5, 5, 2.00, 10.00, 0),
(13, 1, 3, 5, 3.00, 15.00, 0),
(16, 5, 4, 1, 2.00, 2.00, 0),
(17, 5, 2, 5, 1.00, 5.00, 0),
(18, 5, 1, 1, 3.00, 3.00, 0),
(19, 6, 2, 5, 1.00, 5.00, 0),
(20, 7, 1, 1, 3.00, 3.00, 1),
(21, 7, 4, 1, 3.00, 3.00, 1),
(23, 7, 2, 1, 1.00, 1.00, 1),
(24, 7, 5, 1, 2.00, 2.00, 1),
(25, 7, 1, 1, 3.00, 3.00, 1),
(26, 7, 2, 1, 1.00, 1.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `id` int(11) NOT NULL,
  `numero_mesa` int(11) NOT NULL,
  `codigo_qr` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`id`, `numero_mesa`, `codigo_qr`, `estado`) VALUES
(1, 1, 'QR_CODE_STRING_1', 1),
(2, 2, 'QR_CODE_STRING_2', 1),
(4, 5, 'mesa5qr', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `img` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `img`) VALUES
(1, 'Michelada Clasica', 'Cerveza, aji tabasco, salsa inglesa, zumo de limon, sal, hielo', 3.00, 'https://cdn0.recetasgratis.net/es/posts/2/2/7/michelada_mexicana_58722_600.webp'),
(2, 'Chifles', 'Chifles', 1.00, 'https://www.infobae.com/new-resizer/xzzVrbjWyboXkzGAb1CbFM-Mcx0=/768x512/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/6PEAOM5TMNHJ3MKLTKXQWIR3HY.jpg'),
(3, 'Nachos', 'Nachos con carne y salsa cheddar', 3.00, 'https://www.gastronomiaycia.com/wp-content/uploads/2012/09/hct_salsaquesodipear.jpg'),
(4, 'Corona', 'Cerveza Corona', 3.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP27Mn3hwCJXwez1UJ_pIPbXVjEIkwZMSdeQ&s'),
(5, 'Club', 'Cerverza Club ', 2.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSpB6bP3_u_4EuUmfDkJkaJQm6OUFT1gVfQ&s');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `es_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `usuario`, `contrasena`, `es_admin`) VALUES
(1, 'Cisneros', 'admin', 'admin123', 1),
(2, 'Balon', 'mesero', 'mesero123', 0),
(3, 'gustavo', 'empleado', 'empleado123', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mesa` (`id_mesa`);

--
-- Indices de la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_factura` (`id_factura`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id`);

--
-- Filtros para la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  ADD CONSTRAINT `factura_detalle_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id`),
  ADD CONSTRAINT `factura_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
