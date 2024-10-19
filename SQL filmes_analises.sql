CREATE DATABASE filmes_analises;
USE filmes_analises;

CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    diretor VARCHAR(255),
    ano_lancamento INT,
    genero VARCHAR(50),
    sinopse VARCHAR(500)
);

CREATE TABLE analises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    analise VARCHAR(500),
    nota DOUBLE(4, 2),
    CONSTRAINT fk_filme FOREIGN KEY (id_filme) REFERENCES filmes(id)
);