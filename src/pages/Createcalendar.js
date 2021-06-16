import React, { Fragment, useContext, useState } from 'react';

import { AppContext } from '../context/Statecontext';
import Loginverif from '../components/Loginverif'
import Navbar from '../components/Navbar';
import userimg from '../images/user.svg';
import Msgresponse from '../components/Msgresponse';
import  '../components/css/Createcalendar.css';

const  Createcalendar = (props) => {

    const { history } = props;

    // ESTADO GLOBAL
    const [globalState, setGlobalState] = useContext(AppContext);
    const [state, setState] = useState({
        ResultServer: null
    });

    const handleSubmit = e =>{
        e.preventDefault();

        let datos = new FormData(document.getElementById('form-calendar'));

        let paquete = {
            method: "POST",
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

    return (
        <Fragment>
            <Loginverif />
            <Navbar type = {2} UserName = {globalState.UserName} 
                img = {userimg} history = {history}/>
            <div className = 'container'>
                <div className = 'container-form'>
                    <div className = 'title'>
                        <h2>¡Crear nuevo calendario!</h2>
                    </div>
                    <form id = 'form-calendar' onSubmit={handleSubmit}>
                        <input type = 'text' 
                        placeholder = 'Nombre del calendario' 
                        name = 'Name_Calendar'/>
                         <textarea type = 'textarea' 
                        placeholder = 'Descripcion del calendario' 
                        name = 'Description_Calendar'/>
                        <input type = 'color' 
                        name = 'Color_Calendar'/>
                        <div>
                            {
                                state.ResultServer
                                    ? <Msgresponse status = {state.ResultServer.status} msg = {state.ResultServer.msg}/>
                                    : ''
                            }
                        </div>
                        <button type = 'submit'>Crear calendario</button>
                    </form>
                </div>
                <div>
                    <img />
                </div>
            </div>
        </Fragment>
    )
}

export default Createcalendar;
