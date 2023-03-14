DROP DATABASE IF EXISTS todos_db;
CREATE DATABASE todos_db;

USE todos_db;

CREATE TABLE todos (
  name VARCHAR(30) NOT NULL,
  complete BOOLEAN NOT NULL DEFAULT false
)
