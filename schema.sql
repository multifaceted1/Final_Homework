CREATE DATABASE first_passport;
USE first_passport;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE profile (
	bio TEXT NOT NULL,
	picture_link TEXT NOT NULL,
	favorite_song VARCHAR(255) NOT NULL,
	favorite_movie VARCHAR(255) NOT NULL,
	favorite_pizza VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE dog_breeds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  breed VARCHAR(255) NOT NULL,
  origin VARCHAR(255),
  size VARCHAR(255),
  average_life_span INT
);

INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Belgian Shepherd', 'Belgium', 'Medium', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('English Mastif', 'England', 'Large', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Shih Tzu', 'China', 'Small', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Chihuahua', 'Mexico', 'Small', 16);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Rottweiler', 'Germany', 'Large', 9);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Pomeranian', 'Germany', 'Small', 14);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Jack Russell Terrier', 'England', 'Small', 15);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Australian Shepherd', 'Australia', 'Medium', 13);
