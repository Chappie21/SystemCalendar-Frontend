import React, { Fragment, useContext} from 'react';

import './css/List.css'
import editImg from '../images/edit.svg'
import { AppContext } from '../context/Statecontext';

const List = (props) => {

    let display = true; // AL RENDERIZAR, LA LISTA SIEMPRE ESTARÁ DESPLEGADA

    // CONTEXTO
    const [globalState, setGlobalState] = useContext(AppContext);

    // DESPLEGAR Y PLEGAR LISTAS DE CALENDARIOS
    const handleDisplay = e => {
        let list = document.getElementById(props.type);

        if (display) {
            list.className = 'lista-interna';
            display = false;
        } else {
            list.className = 'lista-interna-down';
            display = true;
        }
    }

    // OBTENER INFO DE CALENDARIO A EDITAR
    const handleEditCalendar = (e) => {

        for(let calendario of props.calendar){
            
            // BUSCA LOS DATOS DEL CALENDARIO INDICADO Y REDIRIGE PARA EDICION DE ESTE
            if(calendario.Id_calendario === parseInt(e.target.id)){

                setGlobalState({
                    ...globalState,
                    EditCalendar: calendario
                });

                // REDIRIGIR A EDICION
                props.history.push('/editcalendar');

            }
        }

    }

    return (
        <Fragment>
            <div>
                <ul className='lista'>
                    <li name='title' onClick={handleDisplay}><strong>{props.title}</strong></li>
                    <ul className='lista-interna-down' id={props.type}>
                        {
                            props.calendar.map(calendar => {
                                if (calendar.rol === props.type) {
                                    return (
                                        <li key={calendar.Nombre_calendario}>
                                            <div>
                                                <input type='checkbox' name={props.type} />
                                                <label id={calendar.Id_calendario} style={{
                                                    color: calendar.Color_calendario,
                                                    padding: '5px'
                                                }}>{calendar.Nombre_calendario}</label>
                                                {
                                                    calendar.rol === 'prop'
                                                        ?   <label id={calendar.Id_calendario}
                                                                onClick={handleEditCalendar}>
                                                                <img src={editImg} id={calendar.Id_calendario}/>
                                                            </label>
                                                        : ''
                                                }
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </ul>
            </div>
        </Fragment>
    )
}

export default List;