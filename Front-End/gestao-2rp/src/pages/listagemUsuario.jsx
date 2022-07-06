import { React, Component } from 'react';
import axios from 'axios';
import '../assets/css/style.css';
import Header from '../components/header.jsx';
import { parseJwt } from '../services/auth';

export default class ListagemUsuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            resposta: [],
            isLoading: false,
            listaUsuarios: [],
        };
    }

    ListarUsuarios = () => {
        axios('http://localhost:5000/api/Usuario', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaUsuarios: resposta.data })
                    // this.state.listaUsuarios.map((usuario) => {
                    //     usuario.id == parseJwt().jti
                    // })              
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

    //Pegar Id
    PegarIdUsuario = (id) => {
        localStorage.setItem('usuario-id', id);
        console.log(id)
        this.props.history.push('/perfil')
    };

    componentDidMount() {
        this.ListarUsuarios();
    };

    render() {
        return (
            <body>
                <Header />
                <main>
                    <section className="container">

                        <div className='boxMain'>
                            <h1 className='titlePage'>
                                Listagem usuários
                            </h1>
                            <p className='subTitlePage'>
                                É possível ver aqui todos usuários do sistema
                            </p>
                            <div className='containerCards'>
                                {this.state.listaUsuarios.map((usuarios) => {
                                    if (usuarios.idUsuario != parseJwt().jti) {
                                        return (
                                            <div className='boxCard' onClick={() => this.PegarIdUsuario(usuarios.idUsuario)} key={usuarios.idUsuario}>
                                                <div className='boxContents'>
                                                    <h4>{usuarios.nomeUsuario}</h4>
                                                    <div className='boxTxtDetails'>
                                                        <span className='txtTituloDetailsCard'>
                                                            Email:
                                                        </span>
                                                        <span className='txtDetailsCard'>
                                                            {usuarios.email}
                                                        </span>
                                                    </div>
                                                    <div className='boxTxtDetails'>
                                                        <span className='txtTituloDetailsCard'>
                                                            Tipo:
                                                        </span>
                                                        <span className='txtDetailsCard'>
                                                            {this.TipoUsuario(usuarios.idTipoUsuario)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        )
    }

}
