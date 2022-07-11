USE `maderas&cnc` ;
-- Insert de categorias
INSERT INTO categorias ( nombre, descripcion) VALUES ("Almacenamiento", "Productos de madera para almacenamiento.");
INSERT INTO categorias (nombre, descripcion) VALUES ("Cocina", "Productos de madera para la cocina.");
INSERT INTO categorias (nombre, descripcion) VALUES ("Decoración", "Productos de madera para decoración.");
INSERT INTO categorias (nombre, descripcion) VALUES ("Varios", "Productos de madera para usos varios.");
-- Insert de productos
insert into producto (nombre, calificacion, precio, imagen, estatus, descripcion,categorias_idcategorias) 
values ('Porta Cerveza', 5, 250.00, 'data:image/png;base64,', 'Activo', 'Lleva tus cervezas a todos lados con este porta cervezas muy funcional.', 1);
insert into producto (nombre,calificacion, precio, imagen, estatus, descripcion, categorias_idcategorias) 
values ('Bandeja en forma de conejo', 3, 100.00, 'data:image/png;base64,', 'Activo', 'Bandeja con diseño de conejo elaborada 100% madera y barnizada.', 2);
insert into producto (nombre,calificacion, precio, imagen, estatus, descripcion, categorias_idcategorias) 
values ('Base para cuchillos', 2, 250.00, 'data:image/png;base64,', 'Activo', 'Porta Cuchillos hecho de madera de pino de primera calidad.', 4);
insert into producto (nombre,calificacion, precio, imagen, estatus, descripcion, categorias_idcategorias) 
values ('Base para audífonos', 3, 500.00, 'data:image/png;base64,', 'Activo', 'Base para audífonos y/o auriculares hecho 100% de madera.', 1);
insert into producto (nombre,calificacion, precio, imagen, estatus, descripcion, categorias_idcategorias) 
values ('Porta Vaso', 4, 50.00, 'data:image/png;base64,', 'Activo', 'Viste tu mesa y tus bebidas con este paquete de 4 portavasos. Con diseño de rompecabezas.', 4);
-- Insert de tipos de usuario
insert into tipo_usuario (nombre, descripcion) values ('admin','Administrador de la pagina');
insert into tipo_usuario (nombre, descripcion) values ('user','Usuario de la pagina');
-- Insert de usuarios
insert into usuario ( nombre, apellido_materno, apellido_paterno, correo, contrasena, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Marihan Itzel', 'Bernal', 'Flores', 'marihan.bernal@gmail.com', 'Onedirection ', '4521122757', '1999-10-22', 1);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, contrasena, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Eduardo Miguel', 'Victoria', 'Sanchez', 'eduardo.mvisa@gmail.com', '123456789', '9612294249', '1999-09-20', 2);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, contrasena, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Armando', 'Elizalde', 'Santillan', 'eli_llan0dn4mr4@hotmail.com', '123456789', '7226671664', '1993-11-09', 2);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, contrasena, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Uziel', 'Munoz', 'Flores', 'Uzielmunozflores@gmail.com', '123456789', '3327628672', '2001-11-01', 2);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, contrasena, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Jose Luis', 'Vaca', 'Negrete', 'jluis_vakn@hotmail.com', '123456789', '4561033903', '1996-11-12', 2);