CREATE DATABASE project_jwt;
use project_jwt;

	create table login(
		username varchar(50) not null,
		password varchar(50) not null,
		primary key(username, password)
	);
    
    
-- Insert sample data
INSERT INTO login (username, password) VALUES 
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3'),
('admin@edipanel.cl', 'admin');

-- Visitors

	create table visitors(
        id INT PRIMARY KEY AUTO_INCREMENT,
		name varchar(50) not null,
        rut varchar(50) not null,
		building varchar(5) not null,
        apartment int not null,
		time varchar(10) not null
	);
	CREATE TABLE residents(
		id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
		resident_name VARCHAR(50) NOT NULL ,
		apartment_number INT NOT NULL ,
		building CHAR(1) NOT NULL ,
		email VARCHAR(50) ,
		whatsapp VARCHAR(50)
		) ;
-- Sample data
-- insertar datos de residentes
INSERT INTO residents (resident_name, apartment_number, building, email, whatsapp) VALUES 
('Carlos Serra', '101', 'A','carloos@gmail.com','+56982076323'),
('Carlos Serra', '101', 'B','serra@gmail.com','+56982076323'),
('Carlos Serra', '101', 'C','carloosserra@gmail.com','+56982076323'),
('Matias Selaive', '101', 'A','carloosserra@gmail.com','+56982076323'),
('Juan Perez', '101', 'A', 'juanperez@gmail.com', '+56982076324'),
('Maria Lopez', '101', 'B', 'marialopez@gmail.com', '+56982076325'),
('Pedro Rodriguez', '101', 'C', 'pedrorodriguez@gmail.com', '+56982076326'),
('Ana Martinez', '101', 'D', 'anamartinez@gmail.com', '+56982076327'),
('Luisa Fernandez', '101', 'B', 'luisafernandez@gmail.com', '+56982076328'),
('Carlos Gomez', '101', 'A', 'carlosgomez@gmail.com', '+56982076329'),
('Laura Sanchez', '101', 'C', 'laurasanchez@gmail.com', '+56982076330'),
('Jorge Ramirez', '101', 'A', 'jorgeramirez@gmail.com', '+56982076331'),
('Marta Gonzalez', '101', 'B', 'martagonzalez@gmail.com', '+56982076332'),
('David Torres', '101', 'C', 'davidtorres@gmail.com', '+56982076333');
    


-- Insertar datos falsos en la tabla visitors con RUTs chilenos
INSERT INTO visitors (name, rut, building, apartment, time) VALUES 
('John Smith', '12345678-9', 'A', 303, '2:30 PM'),
('Emily Johnson', '87654321-0', 'B', 201, '3:15 PM'),
('Michael Brown', '45678901-2', 'C', 405, '1:45 PM'),
('Sarah Davis', '98765432-1', 'A', 102, '4:00 PM'),
('Robert Martinez', '21098765-3', 'B', 304, '2:20 PM'),
('Jennifer Wilson', '54321098-4', 'C', 103, '3:30 PM'),
('Christopher Lee', '67890123-5', 'A', 202, '5:00 PM');
