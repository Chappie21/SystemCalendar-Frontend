import React, { Fragment, useContext, useEffect } from 'react';

import Loginverif from '../components/Loginverif'
import Navbar from '../components/Navbar';
import Barcalendar from '../components/Barcalendar';
import { AppContext } from '../context/Statecontext';

import userimg from '../images/user.svg';


let Calendarios = [
    {   
        Id_calendario: 1,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "red",
        rol: "prop"
    },
    {
        Id_calendario: 2,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "blue",
        rol: "prop"
    },
    {
        Id_calendario: 3,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "pink",
        rol: "prop"
    },
    {
        Id_calendario: 4,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "green",
        rol: "prop"
    },
    {
        Id_calendario: 5,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "yellow",
        rol: "prop"
    },
    {
        Id_calendario: 6,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "brown",
        rol: "inv"
    },
    {
        Id_calendario: 7,
        Nombre_calendario: "Algo",
        Descripcion_calendario: "DESCRIPCION DE CALENDARIO",
        Color_calendario: "blue",
        rol: "inv"
    }
 
]

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
                <Navbar type = {1} img = {userimg} UserName={globalState.UserName} />
                <Barcalendar calendar = {globalState.Calendarios} history = {history}/>
            </div>
        </Fragment>
    );

};

export default Sesion;