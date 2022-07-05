using gestaoUsuarios2Rp.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gestaoUsuarios2Rp.webAPI.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Valida o usuário
        /// </summary>
        /// <param name="email">E-mail do usuário</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns>Um objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);

        /// <summary>
        /// Cadastra um novo usuário
        /// </summary>
        /// <param name="novoUsuario">Objeto contendo as informações do novo usuário o</param>
        void Cadastrar(Usuario novoUsuario);

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        List<Usuario> ListarTodos();

        /// <summary>
        /// Atualiza um usuário pelo seu id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usuarioAtualizado"></param>
        void Atualizar(int id, Usuario usuarioAtualizado);

        /// <summary>
        /// Busca um usuário pelo seu id
        /// </summary>
        /// <param name="id">id do usuário que será buscado</param>
        /// <returns>O usuário buscado</returns>
        Usuario BuscarPorId(int id);

        /// <summary>
        /// Deleta um usuário pelo seu id
        /// </summary>
        /// <param name="id">id do usuário que será deletado</param>
        void Deletar(int id);
    }
}
