using System;
using System.Collections.Generic;

#nullable disable

namespace gestaoUsuarios2Rp.webAPI.Domains
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public bool StatusUsuario { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
    }
}
