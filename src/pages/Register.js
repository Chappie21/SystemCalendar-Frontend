import React, { useState } from 'react';

import Msgresponse from '../components/Msgresponse';
import '../components/css/Register.css'


// HOOK DE REGISTRO
const Register = (props) => {

    // DATOS DE ESTADO
    const [datos, setDatos] = useState({
        UserName: '',
        Correo: '',
        Clave: '',
        ConfirmarClave: '',
        serverResponse: {},
        FormError: {}
    })

    const { history } = props

    // evento de registrar
    const handleRegister = e => {
        e.preventDefault();

        if (verificarContraseñas()) {
            let form = document.getElementById("form-register");

            let paquete = {
                method: "POST",
                body: new FormData(form)
            };

            fetch('Register', paquete)
                .then(response => response.json())
                .then(response => {

                    setDatos({
                        ...datos,
                        ['serverResponse']: response
                    });

                });

        } else {
            console.log("Contraseñas no congruentes");
        }

    }

    // al cambiar algún dato del formulario
    const handleChangeData = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
            ['FormError']: verifFormulario()
        });

    }

    // VERIFICACION DE CONTRASEÑAS
    const verificarContraseñas = () => {

        if (datos['ConfirmarClave'].length !== 0) {
            if (datos['Clave'] === datos['ConfirmarClave']) {
                return true; /* Contraseñas coinciden */
            }
        }

        return false; /* Contraseñas no coinciden */
    }

    const verifFormulario = () =>{

        let form = {
            color: '',
            msg: ''
        }

        if((datos.UserName === '') ||
            (datos.Correo === '') ||
            (datos.Clave === '')){

            form['color'] = 'red';
            form['msg'] = 'Rellene todo el formulario';

        }else if(verificarContraseñas()){
            form['color'] = 'red';
            form['msg'] = 'Claves no coinciden';
        }else{
            form = {}
        }
        
        return form;
    }


    // RENDERIZADO DEL COMPONENTE (O PAGE)
    return (
        <div className='container'>

            <div className='container-img'>
              
            </div>

            <div>
                <div className='container-form'>

                    <div>
                        <h2>¡Registrarse Ahora!</h2>
                        <p>Comience a organizar su vida, y a compartirla con sus amigos</p>
                    </div>

                    <form id="form-register" onSubmit={handleRegister}>
                        <input name="UserName" type="text"
                            placeholder="Nombre de usuario"
                            onChange={handleChangeData}
                            value={datos.UserName} />
                        <input name="Correo" type="email"
                            placeholder="Correo Electronico"
                            onChange={handleChangeData}
                            value={datos.Correo} />
                        <input name="Clave" type="password"
                            placeholder="Contraseña"
                            onChange={handleChangeData}
                            value={datos.Clave} />
                        <input name="ConfirmarClave" type="password"
                            placeholder="Confirmar Contraseña"
                            onChange={handleChangeData}
                            value={datos.ConfirmarClave} />

                        <div>
                            {
                                datos.serverResponse || datos.FormError ?
                                    <Msgresponse status={datos.serverResponse.status} color = {datos.FormError.color}
                                        msg={datos.serverResponse.message || datos.FormError.msg} />
                                    : ''
                            }
                        </div>

                        <button type="submit">
                            Relizar registro
                        </button>

                        <div>
                            {
                                datos.serverResponse.status === 200
                                    ? <button  onClick={() => history.push('/login')}>
                                        Ir al login
                                    </button>
                                    : ''
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default Register;