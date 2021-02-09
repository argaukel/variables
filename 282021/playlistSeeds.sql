DROP DATABASE IF EXISTS playlist_db;

CREATE DATABASE playlist_db;

USE playlist_db;

CREATE TABLE songs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NULL,
    artist VARCHAR(100) NULL,
    genre VARCHAR(100) NULL,
    PRIMARY KEY (id)
);

