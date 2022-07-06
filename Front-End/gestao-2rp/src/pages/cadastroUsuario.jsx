import { React, Component } from 'react';
import axios from 'axios';
import '../assets/css/style.css';
import Header from '../components/header.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    notify = () => toast.success(('Usuário cadastrado!'), {
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

    CadastraUsuario = (event) => {
        event.preventDefault();
        var formData = new FormData();

        formData.append('email', this.state.email);
        formData.append('senha', this.state.senha);
        formData.append('nomeUsuario', this.state.nome);
        formData.append('idTipoUsuario', this.state.tipo);
        formData.append('statusUsuario', this.state.status);

        axios({
            method: "post",
            url: "http://localhost:5000/api/Usuario",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    var name = document.getElementById('nomeUser');
                    name.value = '';
                    var email = document.getElementById('emailUser');
                    email.value = '';
                    var senha = document.getElementById('senhaUser');
                    senha.value = '';
                    var tipo = document.getElementById('tipoUser');
                    tipo.value = 1;
                    var status = document.getElementById('statusUser');
                    status.value = true;
                    this.notify()
                    console.log(resposta);
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
                    this.props.history.push('/listagemUsuario')
                }
            })
            .catch((erro) => console.log(erro));
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
                        <div className='boxMain'>
                            <h1 className='titlePage'>
                                Cadastro de usuário
                            </h1>
                            <div className='boxPerfil'>
                                <div className='boxContents'>
                                    <form onSubmit={this.CadastraUsuario}>
                                        <div className="inputAll">
                                            <label className='labelInput' for="Nome">Nome</label>
                                            <input
                                                type="text"
                                                id='nomeUser'
                                                name='nome'
                                                placeholder='Nome'
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
                                                placeholder='Email'
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
                                                placeholder='Senha'
                                                onChange={this.atualizaStateCampo}
                                                required
                                            />
                                            <label for="Senha"></label>
                                        </div>
                                        <div className='selectAll'>
                                            <label className='labelInput' for="Tipo">Tipo</label>
                                            <select
                                                name='tipo'
                                                id='tipoUser'
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
                                                id='statusUser'
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value={true}>Ativo</option>
                                                <option value={false}>Inativo</option>
                                            </select>
                                        </div>
                                        <div className='btnCenter'>
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
                                                <span className='txtBtn'>Cadastrar</span>
                                            </button>
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
