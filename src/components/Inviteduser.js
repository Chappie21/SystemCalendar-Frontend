import React, { Fragment, useState } from 'react';

import Msgresponse from '../components/Msgresponse';
import './css/Inviteduser.css'
import '../components/css/Createcalendar.css';

const Inviteduser = (props) => {

    // ESTADO GLOBAL

    const [state, setState] = useState({
        ResultServer: null
    });


    const handleChange = e =>{
        setState(
            {
                ...state,
                [e.target.name]: e.target.value
            }
        )
    }

    // ENVIAR DATOS EDITADOS
    const handleSubmit = e => {
        e.preventDefault();

        let datos = new FormData(document.getElementById('form-invited'));

        // AÑADIR ID DEL CALENDARIO A EDITAR
        datos.append('Id_calendario', props.idCalendar);

        let paquete = {
            method: "PUT",
            mode: 'cors',
            body: datos
        };

        fetch('InviteCalendar', paquete)
            .then(response => response.json())
            .catch(err => console.error(err))
            .then(response => {
                setState(
                    {
                        ...state,
                        ResultServer: response
                    }
                )
            });

            setTimeout(() =>{
                setState(
                    {
                        ResultServer: null
                    }
                )
            }, 2000)

    }

    return (
        <Fragment>
            <div>
                <div>
                    <h2>¡Invitar usuarios!</h2>
                </div>
                <form id='form-invited' onSubmit = {handleSubmit}>
                    <input
                        type='email'
                        name='Correo_usuario'
                        placeholder='Correo de usuario a invitar'
                        value = {state.Correo_usuario}
                    />
                    {
                        state.ResultServer
                            ? <Msgresponse status={state.ResultServer.status} msg={state.ResultServer.msg} />
                            : ''
                    }
                    <button type='submit'>
                        Añadir usuario
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default Inviteduser;
