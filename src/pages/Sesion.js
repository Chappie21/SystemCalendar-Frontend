import React, { Fragment, useContext, useEffect } from 'react';

import Loginverif from '../components/Loginverif'
import Navbar from '../components/Navbar';
import Barcalendar from '../components/Barcalendar';
import { AppContext } from '../context/Statecontext';

import userimg from '../images/user.svg';

const Sesion = (props) => {

    const { history } = props;

    // ESTADO GLOBAL
    const [globalState, setGlobalState] = useContext(AppContext);


    useEffect(() =>{

        let paquete = {
            method: "GET",
            mode: "cors"
        }
        
        fetch('Calendar', paquete)
            .then(response => response.json())
            .catch(err => console.error(err))
            .then(response => {
                setGlobalState({
                    ...globalState,
                    Calendarios: response.Calendarios
                })
            });

         console.log(globalState.Calendarios);
    }, []);

    return (
        <Fragment>
            <Loginverif />
            <div>
                <Navbar type = {1} img = {userimg} UserName={globalState.UserName} history = {history}/>
                <Barcalendar calendar = {globalState.Calendarios} history = {history}/>
            </div>
        </Fragment>
    );

};

export default Sesion;