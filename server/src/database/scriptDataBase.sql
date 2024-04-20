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