import '../assets/css/homePage.css';
import work from '../assets/img/imgHome.jpg';
import axios from "axios";
import { Component } from "react";
import { parseJwt, usuarioAutenticado } from '../services/auth';

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
                        <div className='boxMain'>
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

                                        <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

                                        <button className='btnGet'

                                            type="submit"
                                            disabled={
                                                //verifica se o email ou a senha está vazio
                                                this.state.email === '' || this.state.senha === ''
                                                    //se for verdadeiro desabilita o botão 
                                                    ? 'none'
                                                    //se for falso não desbilita o botão
                                                    : ''
                                            }
                                        >
                                            <span className='txtBtn'>{this.statusLogin(this.state.isLoading)}</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className='boxImgMain'>
                                <div>
                                    <img className='imgHome' src={work} alt='Trabalho' />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        )
    }
}