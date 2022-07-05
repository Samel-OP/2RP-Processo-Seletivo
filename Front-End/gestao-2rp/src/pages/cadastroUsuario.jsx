import { React, Component } from 'react';
import axios from 'axios';
import '../assets/css/homePage.css';
import Header from '../components/header.jsx';

export default class CadastroUsuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            senha: '',
            nome: '',
            tipo: 1,
            status: true,
            isLoading: false,
            perfilUsuario: [],
        };
    }

    BuscarPerfil = () => {
        let id = localStorage.getItem('usuario-id')
        axios('http://localhost:5000/api/Usuario/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ perfilUsuario: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    };

    AtualizaUsuario = () => {
        axios.post('http://localhost:5000/api/Usuario', {
            email: this.state.email,
            senha: this.state.senha,
            nomeUsuario: this.state.nome,
            idTipoUsuario: this.state.tipo,
            statusUsuario: this.state.status,
        },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log(this.state.email);
                    console.log(this.state.senha);
                    console.log(this.state.nome);
                    console.log(this.state.tipo);
                    console.log(this.state.status);
                    console.log(resposta);
                    this.props.history.push('/listagemUsuario')
                }
            })
            .catch((erro) => console.log(erro));
    };

    ExcluirUsuario = () => {
        let id = localStorage.getItem('usuario-id')
        axios.delete('http://localhost:5000/api/Usuario/Delete/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    this.props.history.push('/listagemUsuario')
                }
            })
            .catch((erro) => console.log(erro));
    };

    TipoUsuario = (tipo) => {
        if (tipo == 1) {
            return (
                <span className='txtDetailsCard'>Geral</span>
            )
        }
        else if (tipo == 2) {
            return (
                <span className='txtDetailsCard'>Admin</span>
            )
        }
        else if (tipo == 3) {
            return (
                <span className='txtDetailsCard'>Root</span>
            )
        }
        else {
            return (
                <span className='txtDetailsCard'>Não definido</span>
            )
        }
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
        console.log(campo.target.value)
    };

    componentDidMount() {
        this.BuscarPerfil();
    };

    render() {
        return (
            <body>
                <Header />
                <main>
                    <section className="container">
                        <div className='boxStrategyCards'>
                            <h1 className='titleStrategy'>
                                Cadastro de usuário
                            </h1>
                            <p className='subTitleStrategy'>
                                É possível cadastrar um novo usuário aqui 
                            </p>
                            <div className='containerCards'>
                                <div className='boxCardPerfil'>
                                    <div className='boxContents'>
                                        {/* <form onSubmit={this.AtualizaUsuario}> */}
                                            <div className="inputAll">
                                                <input
                                                    type="text"
                                                    name='nome'
                                                    placeholder='Nome'
                                                    onChange={this.atualizaStateCampo}
                                                    required
                                                />
                                            </div>
                                            <div className="inputAll">
                                                <input
                                                    type="email"
                                                    name='email'
                                                    placeholder='Email'
                                                    onChange={this.atualizaStateCampo}
                                                    required
                                                />
                                            </div>
                                            <div className="inputAll">
                                                <input
                                                    type="password"
                                                    name='senha'
                                                    placeholder='Senha'
                                                    onChange={this.atualizaStateCampo}
                                                    required
                                                />
                                                <label for="Senha"></label>
                                            </div>
                                            <div className='selectAll'>
                                                <select
                                                    name='tipo'
                                                    onChange={this.atualizaStateCampo}
                                                    required
                                                >
                                                    <option value={1}>Geral</option>
                                                    <option value={2}>Admin</option>
                                                    <option value={3}>Root</option>
                                                </select>
                                                {/* <label for="Tipo"></label> */}
                                            </div>
                                            <div className='selectAll'>
                                                <select
                                                    name='status'
                                                    onChange={this.atualizaStateCampo}
                                                    required
                                                >
                                                    <option value={true}>Ativo</option>
                                                    <option value={false}>Inativo</option>
                                                </select>
                                                {/* <label for="Status"></label> */}
                                            </div>
                                            <div>
                                                <button
                                                    className='btnGet'
                                                    onClick={this.AtualizaUsuario}
                                                >
                                                    <span className='txtBtn'>Cadastrar</span>
                                                </button>
                                            </div>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </body >
        )
    }
}
