import React, { Fragment, useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/Statecontext';
import Loginverif from '../components/Loginverif'
import Navbar from '../components/Navbar';
import Inviteduser from '../components/Inviteduser';
import userimg from '../images/user.svg';
import Msgresponse from '../components/Msgresponse';
import '../components/css/Createcalendar.css';

const Editcalendar = (props) => {

    const { history } = props;

    // ESTADO GLOBAL
    const [globalState, setGlobalState] = useContext(AppContext);

    const [state, setState] = useState({
        ResultServer: null,
        Id_calendrio: globalState.EditCalendar.Id_calendario,
        Nombre_calendario: globalState.EditCalendar.Nombre_calendario,
        Descripcion_calendario: globalState.EditCalendar.Descripcion_calendario,
        Color_calendario: globalState.EditCalendar.Color_calendario
    });

    // ENVIAR DATOS EDITADOS
    const handleSubmit = e => {
        e.preventDefault();

        let datos = new FormData(document.getElementById('form-calendar'));

        // AÑADIR ID DEL CALENDARIO A EDITAR
        datos.append('Id_calendario', state.Id_calendrio);

        let paquete = {
            method: "PUT",
            mode: 'cors',
            body: datos
        };

        fetch('Calendar', paquete)
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
    }

    // ACTUALZIAR DATOS DEL ESTADO (ACTUALIZANDO ASÍ DATOS DE LOS INPUTS)
    const handleChange = e => {
        setState(
            {
                ...state,
                [e.target.name]: e.target.value
            }
        )
    }

    // BORRAR CALENDARIO
    const handledelete = e =>{

        let datos = new FormData();

        // AÑADIR ID DEL CALENDARIO A ELIMINAR
        datos.append('Id_calendario', state.Id_calendrio);

        let paquete = {
            method: "DELETE",
            mode: 'cors',
            body: datos
        };

        fetch('Calendar', paquete)
            .then(response => response.json())
            .catch(err => console.error(err))
            .then(response => {
                setState(
                    {
                        ...state,
                        ResultServer: response
                    }
                )
                
                // UNA VEZ ELIMINADO EL CALENDARIO, REDIRIGE A LA PAGE SESION
                setTimeout(() => {
                    history.push('/sesion');
                }, 1800);

            });
    }


    return (
        <Fragment>
            <Loginverif />
            <Navbar type={2} UserName={globalState.UserName}
                img={userimg} history={history} />
            <div className='container'>
                <div className='container-form'>
                    <div className='title'>
                        <h2>¡Editar Calendario!</h2>
                    </div>
                    <form id='form-calendar' onSubmit={handleSubmit}>
                        <input type='text'
                            placeholder='Nombre del calendario'
                            name='Nombre_calendario'
                            onChange={handleChange}
                            value={state.Nombre_calendario}
                        />
                        <textarea type='textarea'
                            placeholder='Descripcion del calendario'
                            name='Descripcion_calendario'
                            onChange={handleChange}
                            value={state.Descripcion_calendario} />
                        <input type='color'
                            name='Color_calendario'
                            onChange={handleChange}
                            value={state.Color_calendario}
                        />
                        <div>
                            {
                                state.ResultServer
                                    ? <Msgresponse status={state.ResultServer.status} msg={state.ResultServer.msg} />
                                    : ''
                            }
                        </div>
                        <button type='submit'>Editar calendario</button>
                        <button name='borrar' onClick = {handledelete}>
                            Borrar calendario
                        </button>
                    </form>
                </div>
                <div className = 'invited-container'>
                    <Inviteduser idCalendar = {state.Id_calendrio}/>
                </div>
            </div>

        </Fragment>
    )
}

export default Editcalendar;
