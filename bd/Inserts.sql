USE `maderas&cnc` ;
-- Insert de categorias
INSERT INTO categorias (id_categorias, nombre, descripcion) VALUES (1, "Almacenamiento", "Productos de madera para almacenamiento.");
INSERT INTO categorias (id_categorias, nombre, descripcion) VALUES (2, "Cocina", "Productos de madera para la cocina.");
INSERT INTO categorias (id_categorias, nombre, descripcion) VALUES (3, "Decoración", "Productos de madera para decoración.");
INSERT INTO categorias (id_categorias, nombre, descripcion) VALUES (4, "Varios", "Productos de madera para usos varios.");
-- Insert de productos
insert into producto (nombre, categoria, calificacion, precio, imagen, status, categorias_idcategorias) 
values ('Porta Cerveza','Almacenamiento', 5, 250.00, 'data:image/png;base64,', 'Activo', 1);
insert into producto (nombre, categoria, calificacion, precio, imagen, status, categorias_idcategorias) 
values ('Tabla en forma de conejo','Cocina', 3, 100.00, 'data:image/png;base64,', 'Activo', 2);
insert into producto (nombre, categoria, calificacion, precio, imagen, status, categorias_idcategorias) 
values ('Soporte para telefono','Varios', 4, 150.00, 'data:image/png;base64,', 'Activo', 4);
insert into producto (nombre, categoria, calificacion, precio, imagen, status, categorias_idcategorias) 
values ('Caja para tornillos','Almacenamiento', 5, 200.00, 'data:image/png;base64,', 'Activo', 1);
insert into producto (nombre, categoria, calificacion, precio, imagen, status, categorias_idcategorias) 
values ('Porta Vaso','Varios', 4, 50.00, 'data:image/png;base64,', 'Activo', 4);
-- Insert de tipos de usuario
insert into tipo_usuario (id, nombre, descripcion) values (0, 'admin','Administrador de la pagina');
insert into tipo_usuario (id, nombre, descripcion) values (1, 'user','Usuario de la pagina');
-- Insert de usuarios
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, password, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Marihan Itzel', 'Bernal', 'Flores', 'marihan.bernal@gmail.com', 'Onedirection ', '4521122757', '1999-10-22', 0);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, password, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Eduardo Miguel', 'Victoria', 'Sanchez', 'eduardo.mvisa@gmail.com', '123456789', '9612294249', '1999-09-20', 1);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, password, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Armando', 'Elizalde', 'Santillan', 'eli_llan0dn4mr4@hotmail.com', '123456789', '7226671664', '1993-11-09', 1);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, password, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Uziel', 'Munoz', 'Flores', 'Uzielmunozflores@gmail.com', '123456789', '3327628672', '2001-11-01', 1);
insert into usuario (nombre, apellido_materno, apellido_paterno, correo, password, telefono, fecha_nacimiento, tipo_usuario_id) 
values ('Jose Luis', 'Vaca', 'Negrete', 'jluis_vakn@hotmail.com', '123456789', '4561033903', '1996-11-12', 1);