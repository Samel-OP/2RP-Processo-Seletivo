import '../assets/css/homePage.css';
import arrow from '../assets/img/arrow.png';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Header() {
    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");

        history.push("/");
    }
    return (
        <header className='headerHome'>
            <img className='logo2rp' src='https://www.2rpnet.com.br/assets/images/2rp-net.svg' alt='logo' />
            <nav className='navHeader'>
                <Link className='linkHeader' to={'/meuPerfil'}>Meu perfil</Link>
                <Link className='linkHeader' to={'/listagemUsuario'}>Lista usuários</Link>
                <Link className='linkHeader' to={'/cadastroUsuario'}>Cadastro de usuario</Link>
            </nav>

            {/* <Link className='linkHeader' to={'/login'}>Login</Link> */}

            <div className='btnMember' onClick={logOut}>
                <Link className='textBtnMember' >Sair</Link>
                <img className='imgArrow' src={arrow} alt='Arrow' />
            </div>
        </header>
    )
}

export default Header;