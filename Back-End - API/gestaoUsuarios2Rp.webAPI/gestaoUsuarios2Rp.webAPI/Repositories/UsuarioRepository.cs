using gestaoUsuarios2Rp.webAPI.Contexts;
using gestaoUsuarios2Rp.webAPI.Domains;
using gestaoUsuarios2Rp.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gestaoUsuarios2Rp.webAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        GestaoUsuariosContext ctx = new GestaoUsuariosContext();

        public void Atualizar(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioAtualizado.NomeUsuario != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;
                usuarioBuscado.NomeUsuario = usuarioAtualizado.NomeUsuario;
                usuarioBuscado.StatusUsuario = usuarioAtualizado.StatusUsuario;
                usuarioBuscado.Email = usuarioAtualizado.Email;
                usuarioBuscado.Senha = usuarioAtualizado.Senha;
            }

            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(e => e.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            ctx.Usuarios.Remove(usuarioBuscado);

            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }
    }
}
