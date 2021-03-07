DROP DATABASE IF EXISTS bay_db;

CREATE DATABASE bay_db;

USE bay_db;

CREATE TABLE bay (
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(45) NOT NULL,
    creator VARCHAR(100),
    starting_bid INT default 0,
    highest_bid INT default 0,
    PRIMARY KEY (id)
);
