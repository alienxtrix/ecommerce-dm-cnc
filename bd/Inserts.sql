USE `maderacncdb` ;
-- Insert de categorias
INSERT INTO categorias (category_name, category_description) VALUES ("Almacenamiento", "Productos de madera para almacenamiento.");
INSERT INTO categorias (category_name, category_description) VALUES ("Cocina", "Productos de madera para la cocina.");
INSERT INTO categorias (category_name, category_description) VALUES ("Decoración", "Productos de madera para decoración.");
INSERT INTO categorias (category_name, category_description) VALUES ("Varios", "Productos de madera para usos varios.");
-- Insert de productos
insert into producto (product_name, product_img, product_cost, product_status, product_description, product_rate, product_category) 
values ('Porta Cerveza', 'data:image/png;base64,', 250.00, 'Activo', 'Lleva tus cervezas a todos lados con este porta cervezas muy funcional.', 5, 1);
insert into producto (product_name, product_img, product_cost, product_status, product_description, product_rate, product_category) 
values ('Bandeja en forma de conejo','data:image/png;base64,', 100.00,  'Activo', 'Bandeja con diseño de conejo elaborada 100% madera y barnizada.', 3, 2);
insert into producto (product_name, product_img, product_cost, product_status, product_description, product_rate, product_category) 
values ('Base para cuchillos', 'data:image/png;base64,', 250.00,  'Activo', 'Porta Cuchillos hecho de madera de pino de primera calidad.', 2, 4);
insert into producto (product_name, product_img, product_cost, product_status, product_description, product_rate, product_category) 
values ('Base para audífonos', 'data:image/png;base64,', 500.00, 'Activo', 'Base para audífonos y/o auriculares hecho 100% de madera.', 3, 1);
insert into producto (product_name, product_img, product_cost, product_status, product_description, product_rate, product_category) 
values ('Porta Vaso', 'data:image/png;base64,', 50.00,  'Activo', 'Viste tu mesa y tus bebidas con este paquete de 4 portavasos. Con diseño de rompecabezas.', 4, 4);
-- Insert de tipos de usuario
insert into tipo_usuario (nombre) values ('usuario');
insert into tipo_usuario (nombre) values ('administrador');
-- Insert de usuarios
insert into usuario (user_name, user_lastNF, user_lastNM, user_date, user_pass, user_phone, user_email, user_type_id) 
values ('Marihan Itzel', 'Bernal', 'Flores', '1999-10-22', 'Onedirection', '4521122757', 'marihan.bernal@gmail.com', 2);
insert into usuario (user_name, user_lastNF, user_lastNM, user_date, user_pass, user_phone, user_email, user_type_id) 
values ('Eduardo Miguel', 'Victoria', 'Sanchez', '1999-09-20', '123456789', '9612294249', 'eduardo.mvisa@gmail.com', 1);
insert into usuario (user_name, user_lastNF, user_lastNM, user_date, user_pass, user_phone, user_email, user_type_id) 
values ('Armando', 'Elizalde', 'Santillan', '1993-11-09', '123456789', '7226671664', 'eli_llan0dn4mr4@hotmail.com', 1);
insert into usuario (user_name, user_lastNF, user_lastNM, user_date, user_pass, user_phone, user_email, user_type_id) 
values ('Uziel', 'Munoz', 'Flores', '2001-11-01','123456789', '3327628672', 'Uzielmunozflores@gmail.com', 1);
insert into usuario (user_name, user_lastNF, user_lastNM, user_date, user_pass, user_phone, user_email, user_type_id) 
values ('Jose Luis', 'Vaca', 'Negrete', '1996-11-12', '123456789', '4561033903', 'jluis_vakn@hotmail.com', 1);