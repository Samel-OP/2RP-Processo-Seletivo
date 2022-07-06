# 2RP-Processo-Seletivo
Repositório utilizado para o processo seletivo da 2RP.

## Escopo:
* Criar um sistema que possibilite o cadastro e login de usuários.

## Como executar a aplicação:
Para que seja possível sua execução é preciso que o computador tenha o framework dotnet, o NodeJS, banco de dados SQL e também o Git.

* Primeiramente é preciso que execute os Scripts SQL no banco de dados para que tenha as tabelas, e também alguns dados definidos para preencherem a aplicação.
* Para executar a API é preciso que coloque o comando "dotnet run" no terminal para iniciar a API.
* E no Front é necessário que entre na pasta e abra o terminal para colocar o comando "npm i" e após isso executar "npm start".

## Funções:
 * Cadastrar um novo usuário;
 * Listar informações de um usuário;
 * Alterar o nome e o tipo de um usuário;
 * Excluir um usuário;
 * Alterar o status de um usuário (ativo ou inativo)
 * Tipos de usuário.
 
 ## Regras de negócio:
 * A tabela usuários deve conter os campos nome, senha, tipo, email e status;
 * A tabela de tipos deve ter o tipo do usuário (geral, admin, root)
 * Um usuário pode ter apenas um único tipo;
 * Apenas usuários do tipo root e admin podem cadastrar novos usuários;
 * Apenas usuários do tipo root e admin podem alterar qualquer informa- ção do usuário (inclusive status);
 * Apenas usuários root podem excluir usuários;
 * Usuários do tipo geral só têm acesso a funcionalidade de listar informações de seu próprio usuário, bem como alterar suas próprias infor- mações;
 * O login deve ser feito com email e senha;
