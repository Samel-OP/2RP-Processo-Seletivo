USE GESTAO_USUARIOS_2RP;
GO

INSERT INTO TIPOUSUARIO(nomeTipoUsuario)
VALUES ('Geral'), ('Admin'), ('Root');
GO

INSERT INTO USUARIO(idTipoUsuario, nomeUsuario, statusUsuario, email, senha)
VALUES (2, 'Samel', 1, 'samel@gmail.com', 'samel123'),
	   (1, 'Daniel', 1, 'daniel@gmail.com', 'dani123'),
	   (3, 'Gustavo', 1, 'gustavo@gmail.com', 'gust123');
GO