import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';

import '../components/css/Login.css'

import Msgresponse from '../components/Msgresponse';
import { AppContext } from '../context/Statecontext';

const Login = () => {


    // DATOS DE ESTADO
    const [datos, setDatos] = useState({
        UserName: '',
        Clave: '',
        ResultServer: {}
    })

    const [globalState, setGlobalState] = useContext(AppContext);

    // CAMBIAR DATOS DE ESTADO
    const handleChange = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });

    }

    // ENVIAR DATOS DE LOGIN
    const handleSubmit = e => {
        e.preventDefault();

        // OBTENER FORMULARIO
        let datosform = new FormData(document.getElementById('form-login'));

        let paquete = {
            method: "POST",
            mode: 'cors',
            body: datosform
        };

        fetch('Login', paquete)
            .then(response => response.json())
            .catch(err => console.error(err))
            .then(response => {

                // Obtener resultados del intento de logueo
                let form = {
                    exito: response.status === 200 ? true : false,
                    msg: response.message,
                    UserName: response.UserName,
                    CorreoUser: response.CorreoUser
                }

                setDatos({
                    UserName: '',
                    Clave: '',
                    ResultServer: form,
                })

                // actualizar estado global
                setGlobalState(
                    {
                        ...globalState,
                        Login: form.exito,
                        UserName: form.UserName,
                        UserCorreo: form.CorreoUser
                    }
                )
                
            });

    }

    return (
        <div className='p-container'>
            <div className='p-container'>
                <div className='container-form-login'>
                    <form id='form-login' onSubmit={handleSubmit}>

                        <header>
                            <h2>Iniciar de Sesion</h2>
                        </header>

                        <input
                            type='text'
                            name='UserName'
                            placeholder='Nombre de usuario o correo'
                            value={datos.UserName}
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            name='Clave'
                            placeholder='Contraseña'
                            value={datos.Clave}
                            onChange={handleChange}
                        />
                        <div>
                            {
                                datos.ResultServer.exito === false
                                    ? <Msgresponse color = 'red' msg = {datos.ResultServer.msg}/>
                                    : ''
                            }
                        </div>
                        <button type='submit'>
                            Iniciar
                        </button>
                    </form>
                </div>

                <div>
                    {
                        globalState.Login
                            ? <Redirect to='/sesion' />
                            : ''
                    }
                </div>
            </div>
        </div>
    );


}


export default Login;