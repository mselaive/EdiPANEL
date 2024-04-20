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
('user3', 'password3');

-- Visitors

	create table visitors(
		name varchar(50) not null,
		guests varchar(50) not null,
		building int not null,
		time varchar(10) not null,
        primary key(name)
	);
    
-- Sample data

INSERT INTO visitors (name, guests, building, time) VALUES 
('John Doe', '2', 101, '10:00 AM'),
('Jane Smith', '1', 202, '11:30 AM'),
('Michael Johnson', '3', 303, '2:00 PM'),
('Emily Brown', '2', 404, '3:45 PM'),
('David Wilson', '1', 303, '5:15 PM');
