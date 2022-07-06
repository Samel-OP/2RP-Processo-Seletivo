import '../assets/css/style.css';
import arrow from '../assets/img/arrow.png';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function HeaderGeral() {
    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");
        localStorage.removeItem("usuario-perfil-id");
        history.push("/");
    }
    return (
        <header className='headerHome'>
            <img className='logo2rp' src='https://www.2rpnet.com.br/assets/images/2rp-net.svg' alt='logo' />

            <div className='btnSair' onClick={logOut}>
                <Link className='textBtnSair' >Sair</Link>
                <img className='imgArrow' src={arrow} alt='Arrow' />
            </div>
        </header>
    )
}

export default HeaderGeral;