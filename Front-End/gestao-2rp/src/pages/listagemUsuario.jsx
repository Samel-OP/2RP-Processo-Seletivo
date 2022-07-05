import { React, Component } from 'react';
import axios from 'axios';
import '../assets/css/homePage.css';
import Header from '../components/header.jsx';

export default class ListagemUsuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
                    this.setState({ listaUsuarios: resposta.data });
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

                        <div className='boxStrategyCards'>
                            <h1 className='titleStrategy'>
                                Listagem usuários
                            </h1>
                            <p className='subTitleStrategy'>
                                É possível ver aqui todos usuários do sistema
                            </p>
                            <div className='containerCards'>
                                {this.state.listaUsuarios.map((usuarios) => {
                                    return (
                                        <div className='boxCard' onClick={() => this.PegarIdUsuario(usuarios.idUsuario)} key={usuarios.idUsuario}>
                                            <div className='boxContents'>
                                                <h4>{usuarios.nomeUsuario}</h4>
                                                <div>
                                                    <span className='txtDetailsCard'>
                                                        Email:
                                                        {usuarios.email}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='txtDetailsCard'>
                                                        Tipo:
                                                        {this.TipoUsuario(usuarios.idTipoUsuario)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        )
    }

}
