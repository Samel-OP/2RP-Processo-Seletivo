using gestaoUsuarios2Rp.webAPI.Domains;
using gestaoUsuarios2Rp.webAPI.Interfaces;
using gestaoUsuarios2Rp.webAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gestaoUsuarios2Rp.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]

    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        [Authorize(Roles = "2, 3")]
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_usuarioRepository.ListarTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Cadastra um novo usuário
        /// </summary>
        /// <param name="novoUsuario">Objeto com as informações do novo usuário</param>
        /// <returns>Retorna um status code 201 - Created</returns>
        [Authorize(Roles = "2, 3")]
        [HttpPost]
        public IActionResult Cadastrar([FromForm] Usuario novoUsuario)
        {
            try
            {
                _usuarioRepository.Cadastrar(novoUsuario);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1, 2, 3")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromForm] Usuario usuarioAtualizado)
        {
            try
            {
                _usuarioRepository.Atualizar(id, usuarioAtualizado);

                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1, 2, 3")]
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "3")]
        [HttpDelete("Delete/{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                _usuarioRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}   
