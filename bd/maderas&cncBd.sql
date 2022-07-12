-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema maderacncdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `maderacncdb` DEFAULT CHARACTER SET utf8mb3 ;
USE `maderacncdb` ;

-- -----------------------------------------------------
-- Table `maderacncdb`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`categorias` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(20) NOT NULL,
  `category_description` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `maderacncdb`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`tipo_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;
-- -----------------------------------------------------
-- Table `maderacncdb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`usuario` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_lastNF` VARCHAR(45) NOT NULL,
  `user_lastNM` VARCHAR(45) NOT NULL,
  `user_date` DATE NOT NULL,
  `user_pass` VARCHAR(150) NOT NULL,
  `user_phone` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_type_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `user_type_id`),
  INDEX `fk_usuario_tipo_usuario_idx` (`user_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_tipo_usuario`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `maderacncdb`.`tipo_usuario` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `maderacncdb`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`direccion` (
  `id_direccion` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(8) NOT NULL,
  `colonia` VARCHAR(45) NULL DEFAULT NULL,
  `cp` VARCHAR(5) NULL DEFAULT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(19) NOT NULL,
  `referencia` VARCHAR(60) NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id_direccion`, `user_id`),
  INDEX `fk_direccion_usuario1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_direccion_usuario1`
    FOREIGN KEY (`user_id`)
    REFERENCES `maderacncdb`.`usuario` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `maderacncdb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`producto` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_img` TEXT NOT NULL,
  `product_cost` FLOAT NOT NULL,
  `product_status` VARCHAR(15) NOT NULL,
  `product_description` VARCHAR(500) NOT NULL,
  `product_rate` INT NOT NULL,
  `product_category` INT NOT NULL,
  PRIMARY KEY (`product_id`, `product_category`),
  INDEX `fk_producto_categorias1_idx` (`product_category` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categorias1`
    FOREIGN KEY (`product_category`)
    REFERENCES `maderacncdb`.`categorias` (`category_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `maderacncdb`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maderacncdb`.`imagen` (
  `id_imagen` INT NOT NULL AUTO_INCREMENT,
  `img` TEXT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id_imagen`, `product_id`),
  INDEX `fk_imagen_producto1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagen_producto1`
    FOREIGN KEY (`product_id`)
    REFERENCES `maderacncdb`.`producto` (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
