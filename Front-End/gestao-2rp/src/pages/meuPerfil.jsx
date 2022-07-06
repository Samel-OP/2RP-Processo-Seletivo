import { React, Component } from 'react';
import axios from 'axios';
import '../assets/css/style.css';
import Header from '../components/header.jsx';
import HeaderGeral from '../components/headerGeral';
import { parseJwt } from '../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class MeuPerfil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            senha: '',
            nome: '',
            tipo: 1,
            status: false,
            isLoading: false,
            valueNome: '',
            perfilUsuario: [],
        };
    }

    notify = () => toast.success(('Usuário alterado!'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifyError = () => toast.error('Ops algo deu errado, verifique os campos e tente novamente!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    BuscarPerfil = () => {
        let id = localStorage.getItem('usuario-perfil-id')
        axios('http://localhost:5000/api/Usuario/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ perfilUsuario: resposta.data });
                    let idTipo = this.state.perfilUsuario.idTipoUsuario;
                    let idStatus = this.state.perfilUsuario.statusUsuario;
                    this.setState({ tipo: idTipo });
                    this.setState({ status: idStatus });
                }
            })
            .catch((erro) => console.log(erro));
    };

    AtualizaUsuario = (event) => {
        event.preventDefault();
        var formData = new FormData();

        formData.append('email', this.state.email);
        formData.append('senha', this.state.senha);
        formData.append('nomeUsuario', this.state.nome);
        formData.append('idTipoUsuario', this.state.tipo);
        formData.append('statusUsuario', this.state.status);

        let id = localStorage.getItem('usuario-perfil-id')
        axios({
            method: "put",
            url: "http://localhost:5000/api/Usuario/" + id,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    var name = document.getElementById('nomeUser');
                    name.value = '';
                    var email = document.getElementById('emailUser');
                    email.value = '';
                    var senha = document.getElementById('senhaUser');
                    senha.value = '';
                    this.notify()
                    this.BuscarPerfil();
                }
                else {
                    this.notifyError()
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
                    localStorage.removeItem("usuario-login");
                    this.props.history.push('/')
                }
            })
            .catch((erro) => console.log(erro));
    };

    TipoHeader = () => {
        if (parseJwt().role === '1') {
            return (
                <HeaderGeral />
            )
        }
        else if (parseJwt().role === '2') {
            return (
                <Header />
            )
        }
        else if (parseJwt().role === '3') {
            return (
                <Header />
            )
        }
    }

    BtnExcluir = () => {
        if (parseJwt().role === '3') {
            return (
                <button
                    className='btnDelete'
                    onClick={this.ExcluirUsuario}
                >
                    <span className='txtBtn'>Excluir usuário</span>
                </button>
            )
        }
    }

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
                {this.TipoHeader()}
                <main>
                    <section className="container">
                        <div className='boxMain'>
                            <h1 className='titlePage'>
                                Meu Perfil
                            </h1>
                            <div className='boxPerfil'>
                                <div className='boxContents'>
                                    <form onSubmit={this.AtualizaUsuario}>
                                        <div className="inputAll">
                                            <label className='labelInput' for="Nome">Nome</label>
                                            <input
                                                type="text"
                                                id='nomeUser'
                                                name='nome'
                                                placeholder={this.state.perfilUsuario.nomeUsuario}
                                                onChange={this.atualizaStateCampo}
                                                required
                                            />
                                        </div>
                                        <div className="inputAll">
                                            <label className='labelInput' for="Email">Email</label>
                                            <input
                                                type="email"
                                                id='emailUser'
                                                name='email'
                                                placeholder={this.state.perfilUsuario.email}
                                                onChange={this.atualizaStateCampo}
                                                required
                                            />
                                        </div>
                                        <div className="inputAll">
                                            <label className='labelInput' for="Senha">Senha</label>
                                            <input
                                                type="password"
                                                id='senhaUser'
                                                name='senha'
                                                placeholder={this.state.perfilUsuario.senha}
                                                onChange={this.atualizaStateCampo}
                                                required
                                            />

                                        </div>
                                        <div className='selectAll'>
                                            <label className='labelInput' for="Tipo">Tipo</label>
                                            <select
                                                name='tipo'
                                                value={this.state.tipo}
                                                disabled={true}
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value={1}>Geral</option>
                                                <option value={2}>Admin</option>
                                                <option value={3}>Root</option>
                                            </select>
                                        </div>
                                        <div className='selectAll'>
                                            <label className='labelInput' for="Status">Status</label>
                                            <select
                                                name='status'
                                                value={this.state.status}
                                                onChange={this.atualizaStateCampo}
                                                required
                                            >
                                                <option value={true}>Ativo</option>
                                                <option value={false}>Inativo</option>
                                            </select>
                                        </div>
                                        <div className='btnCenter'>
                                            <div>
                                                <button
                                                    className='btnChange'
                                                    type='submit'
                                                >
                                                    <ToastContainer
                                                        position="top-right"
                                                        autoClose={5000}
                                                        hideProgressBar={true}
                                                        newestOnTop={false}
                                                        closeOnClick
                                                        rtl={false}
                                                        pauseOnFocusLoss
                                                        draggable
                                                        pauseOnHover
                                                    />
                                                    <span className='txtBtn'>Alterar usuário</span>
                                                </button>
                                            </div>
                                            {this.BtnExcluir()}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </body >
        )
    }
}
