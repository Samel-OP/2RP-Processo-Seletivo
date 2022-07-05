import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login';
import ListagemUsuario from './pages/listagemUsuario';
import Perfil from './pages/perfil';
import CadastroUsuario from './pages/cadastroUsuario';
import MeuPerfil from './pages/meuPerfil';
import reportWebVitals from './reportWebVitals';

import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/listagemUsuario" component={ListagemUsuario} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/cadastroUsuario" component={CadastroUsuario} />
        <Route path="/meuPerfil" component={MeuPerfil} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);


ReactDOM.render(
  routing, document.getElementById('root')
);
reportWebVitals();