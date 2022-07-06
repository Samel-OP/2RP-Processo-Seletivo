import '../assets/css/style.css';
import work from '../assets/img/imgLogin.jpg';
import axios from "axios";
import { Component } from "react";
import { parseJwt } from '../services/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false,
        };
    }

    efetuaLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha,
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    const token = resposta.data.token;
                    localStorage.setItem('usuario-login', resposta.data.token);
                    localStorage.setItem('usuario-perfil-id', parseJwt(token).jti);
                    this.setState({ isLoading: false });
                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);

                    console.log(parseJwt().role)
                    if (parseJwt().role === '1') {
                        this.props.history.push('/meuPerfil');
                    }
                    else if (parseJwt().role === '2') {
                        this.props.history.push('/listagemUsuario');
                    }
                    else if (parseJwt().role === '3') {
                        this.props.history.push('/listagemUsuario')
                    }
                    else {
                        console.log("Não está cadastrado no sistema!")
                    }
                }
            })

            .catch(() => {
                this.setState({
                    erroMensagem: 'E-mail e/ou senha inválidos!',
                    isLoading: false,
                });
            });
    };

    statusLogin = (loading) => {
        if (loading == false) {
            return (
                <span>Entrar</span>
            )
        }
        else if (loading == true) {
            return (
                <span>Loading...</span>
            )
        }
        else {
            return (
                <span>???</span>
            )
        }
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };

    render() {
        return (
            <body>
                <main>
                    <section className="container">
                        <div className='boxMainLogin'>
                            <div className='boxImgLogin'>
                                <img className='imgLogin' src={work} alt='Trabalho' />
                            </div>
                            <div>
                                <img className='logo2rpLogin' src='https://www.2rpnet.com.br/assets/images/2rp-net.svg' alt='logo' />
                                <div className='boxLogin'>
                                    <form onSubmit={this.efetuaLogin}>
                                        <h1>Login</h1>

                                        <p className='txtDetails'>
                                            Faça login para melhor gestão de sua conta.
                                        </p>

                                        <div className="inputAll">
                                            <input className="login_campo"
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.atualizaStateCampo}
                                                placeholder="Email" required />
                                            <label for="Email"></label>
                                        </div>

                                        <div className="inputAll">
                                            <input className="login_campo"
                                                type="password"
                                                name="senha"
                                                value={this.state.senha}
                                                onChange={this.atualizaStateCampo}
                                                placeholder="Senha" required />
                                            <label for="Senha"></label>
                                        </div>

                                        <p className='errorMessage'>{this.state.erroMensagem}</p>

                                        <button className='btnChange'

                                            type="submit"
                                            disabled={ this.state.email === '' || this.state.senha === '' ? 'none' : '' }
                                        >
                                            <span className='txtBtn'>{this.statusLogin(this.state.isLoading)}</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        )
    }
}