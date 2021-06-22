import React, { Fragment, useContext, useState } from 'react';

import Navbar from '../components/Navbar';
import Loginverif from '../components/Loginverif'
import { AppContext } from '../context/Statecontext';

import '../components/css/UserInfo.css'

import userimg from '../images/user.svg';
import edituser from '../images/edituser.svg';
import Msgresponse from '../components/Msgresponse';

const Userinfo = (props) =>{

    const { history } = props;

    // ESTADO GLOBAL
    const [globalState, setGlobalState] = useContext(AppContext);

    const [datos, setDatos] = useState({
        UserName: globalState.UserName,
        UserCorreo: globalState.UserCorreo,
        Password: '',
        ConfPassword: '',
        FormInfo: {},
        ServerResult: {}
    })


    const handleSubmit = e =>{
        e.preventDefault();

        ComprobarForm() // ! COMPROBAR FORMULARIO

        if(datos.FormInfo.rellenado){
            let datosform = new FormData(document.getElementById('edituser'));

            let paquete = {
                method: "POST",
                mode: 'cors',
                body: datosform
            };
    
            // REALZIAR PETICION A LA BASE DE DATOS
            fetch('UserInfo', paquete)
            .then(response => response.json())
            .then(response =>{
                
                setDatos({
                    ...datos,
                    ServerResult:{
                        status: response.status,
                        msg: response.message
                    }
                })
                
                // RESETEA EL ESTADO DEL SERVIDOR
                setTimeout(() =>{
                    setDatos({
                        ...datos,
                        ServerResult:{},
                        FormInfo: {}
                    })
                }, 2500)

            })    
        }

    }

    // EDITAR DATOS DEL ESTADO AL EDITAR CAMPOS
    const handleChange = e =>{

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

    }

    // COMPROBAR QUE EL FORMULARIO ESTÉ RELLENADO CORECTAMENTE
    const ComprobarForm = () =>{

        let rellenado = true;
        let mensaje = '';

        /*
            * El cambio de contraseña no es un campo obligatorio,
            * por ende es posible no rellenarlo y realizar los
            * cambios respectivos, ya sea de nombre o contraseña
            
            En caso de que este relleno nombre y correo, pero
            no contraseña y confirmacion, quiere decir que solo
            cambiará usuario o correo

            en caso de faltar uno de los dos primeros campos tambien
            avisará a el usuario

        */
        if(datos.UserName && datos.UserCorreo){
            if(datos.UserName !== '' || datos.ConfPassword  !== ''){
                
                if(datos.Password === datos.ConfPassword){
                    rellenado = true;
                }else{
                    rellenado = false;
                    mensaje = 'Claves no coinciden'
                }

            }else{
                rellenado = true;
            }
        }else{
            rellenado = false;
            mensaje = 'Porfavor rellene los dos primeros campos';
        }

        // ESTABLECER DATOS DEL INFOR FORMULARIO
        setDatos({
            ...datos,
            FormInfo: {
                rellenado: rellenado,
                mensaje: mensaje
            }
        })

    }

    // BORRAR CUENTA DEL USUARIO
    const handleDelete = () =>{

        // eslint-disable-next-line no-restricted-globals
        let confirmacion = confirm('¿Esta seguro de eliminar su cuenta?');

        if(confirmacion){

            let paquete = {
                method: "DELETE",
                mode: 'cors'
            };

            // ! BORRAR EL USUARIO Y REGRESAR AL LOGIN
            /*
                Regresa al login al actulizar el estado global
                debido a que login pasa a ser falso,
                el componente que verifica si el suaurio esta logueado
                o no lo redirige
            */
            fetch('UserInfo', paquete)
            .then(response => response.json())
            .then(response =>{

                if(response.status === 200){
                    alert("la sesion se cerrará (cuenta eliminada)");

                    // se reinicia la variable global
                    setGlobalState({
                        Login: false,
                        Calendarios: []
                    })
                }

            })

        }

    }

    return(
        <Fragment>
           <Loginverif />
           <Navbar type = {2} 
                UserName={globalState.UserName} 
                history = {history}
                img = {userimg}
            />
            <div className = 'container'>

                <div className = 'container-form'>

                    <div className = 'title'>
                        <h2>Informacion de cuenta</h2>
                    </div>

                    <form id = 'edituser' onSubmit = {handleSubmit}>
                        <input 
                            type = 'text'
                            placeholder = 'Nombre de usuario'
                            name = 'UserName'
                            value = {datos.UserName}
                            onChange = {handleChange}
                        />
                        <input 
                            type = 'email'
                            placeholder = 'Correo electronico'
                            name = 'UserCorreo'
                            value = {datos.UserCorreo}
                            onChange = {handleChange}
                        />
                        <input 
                            type = 'password'
                            placeholder = 'Nueva contraseña'
                            name = 'Password'
                            value = {datos.Password}
                            onChange = {handleChange}
                        />
                        <input 
                            type = 'password'
                            placeholder = 'Confirmar nueva contraseña'
                            name = 'ConfPassword'
                            value = {datos.ConfPassword}
                            onChange = {handleChange}
                        />
                        {
                            datos.ServerResult.status
                            ? <Msgresponse status = {datos.ServerResult.status} msg = {datos.ServerResult.msg}/>
                            : ''
                        }
                        {
                            datos.FormInfo.rellenado === false
                            ? <Msgresponse color = 'red' msg = {datos.FormInfo.mensaje}/>
                            : ''
                        }
                        <button type = 'submit'>
                            ACEPTAR CAMBIOS
                        </button>
                        <button name = 'borrar' onClick = {handleDelete}>
                            ELIMINAR CUENTA
                        </button>
                    </form>
                </div>

                <div className = 'container-img'>
                    <img src = {edituser} />
                </div>

            </div>
        </Fragment>
    )

}

export default Userinfo;