import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import Statecontext from './context/Statecontext';
import Login from './pages/Login';
import Register from './pages/Register';
import Sesion from './pages/Sesion';
import Createcalendar from './pages/Createcalendar';
import Editcalendar from './pages/Editcalendar'

// REACT ROUTER, SE ENCARGAR DE RENDERIZAR LAS PAGINAS (O GRANDES COMPONENTES) DE LA APP
// ESTO POR MEDIO DE RUTAS
const App = () => {

    return (
        <Statecontext>
            <Router>
                <Route exact path='/' component={Inicio} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/sesion' component={Sesion} />
                <Route exact path='/createcalendar' component={Createcalendar} />
                <Route exact path='/editcalendar' component={Editcalendar} />
            </Router>
        </Statecontext>
    );

};


export default App;