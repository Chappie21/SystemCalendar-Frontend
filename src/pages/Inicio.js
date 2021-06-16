import React from 'react';
import Cardnav from '../components/PrincipalComponents'

const Mensajes = ["Comience una vida más organziada, cree su propio sistema de calendario",
                 "¿Depende mucho de su tiempo? ¡es hora de distribuirlo!",
                 "El tiempo es valioso, y organizarlo hará que valga la pena",
                 "¡Comparta su tiempo con sus amigos o colegas!"];

var Mensaje = Mensajes[Math.floor(Math.random() * Mensajes.length)];



class Inicio extends React.Component{

    render(){

        return(
            <div className = 'Big-container'>
                <Cardnav Title = "SystemCalendar" Text = {Mensaje} />
            </div>
        );

    }

}

export default Inicio;