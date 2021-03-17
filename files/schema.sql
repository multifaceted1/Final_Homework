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
