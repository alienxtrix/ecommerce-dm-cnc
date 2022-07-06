-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema maderas&cnc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema maderas&cnc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `maderas&cnc` DEFAULT CHARACTER SET utf8 ;
USE `maderas&cnc` ;

-- -----------------------------------------------------
-- Table `maderas&cnc`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`tipo_usuario` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido_materno` VARCHAR(45) NOT NULL,
  `apellido_paterno` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NULL,
  `tipo_usuario_id` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `tipo_usuario_id`),
  INDEX `fk_usuario_tipo_usuario1_idx` (`tipo_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_tipo_usuario1`
    FOREIGN KEY (`tipo_usuario_id`)
    REFERENCES `maderas&cnc`.`tipo_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`categorias` (
  `id_categorias` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `calificacion` INT NOT NULL,
  `precio` FLOAT NOT NULL,
  `imagen` LONGBLOB NOT NULL,
  `estatus` VARCHAR(15) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `categorias_idcategorias` INT NOT NULL,
  PRIMARY KEY (`id_producto`, `categorias_idcategorias`),
  INDEX `fk_producto_categorias1_idx` (`categorias_idcategorias` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categorias1`
    FOREIGN KEY (`categorias_idcategorias`)
    REFERENCES `maderas&cnc`.`categorias` (`id_categorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`imagen` (
  `id_imagen` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `img` LONGBLOB NOT NULL,
  PRIMARY KEY (`id_imagen`),
  INDEX `fk_imagen_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_imagen_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `maderas&cnc`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`orden` (
  `id_orden` INT NOT NULL,
  `costo` FLOAT NOT NULL,
  `clientes_id_cliente` INT NOT NULL,
  `fecha_compra` DATE NOT NULL,
  `estatus` VARCHAR(45) NOT NULL,
  `ordencol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_orden`, `clientes_id_cliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`detalles_orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`detalles_orden` (
  `id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `importe` DECIMAL NOT NULL,
  `orden_id_orden` INT NOT NULL,
  `orden_clientes_id_cliente` INT NOT NULL,
  PRIMARY KEY (`id`, `orden_id_orden`, `orden_clientes_id_cliente`),
  INDEX `fk_detalles_orden_orden1_idx` (`orden_id_orden` ASC, `orden_clientes_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_detalles_orden_orden1`
    FOREIGN KEY (`orden_id_orden` , `orden_clientes_id_cliente`)
    REFERENCES `maderas&cnc`.`orden` (`id_orden` , `clientes_id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maderas&cnc`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderas&cnc`.`direccion` (
  `id_direccion` INT NOT NULL,
  `calle` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(8) NOT NULL,
  `colonia` VARCHAR(45) NULL,
  `cp` VARCHAR(5) NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(19) NOT NULL,
  `referencia` VARCHAR(45) NULL,
  `usuario_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_direccion`),
  INDEX `fk_direccion_usuario1_idx` (`usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_direccion_usuario1`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `maderas&cnc`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
