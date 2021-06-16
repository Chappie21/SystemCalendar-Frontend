import React, { Fragment, useContext,} from 'react';
import { Redirect } from 'react-router';
import { AppContext } from '../context/Statecontext';
/*
    Este componente se encarga de verificar siempre que el
    usuario este logueado, de no estarlo lo va a redirigir
    a el login
*/
const Loginverif = () => {

    const [globalState, setGlobalState] = useContext(AppContext);

    return (
        <Fragment>
            {
                globalState.Login 
                ? ''
                : <Redirect to = '/login'/>
            }
        </Fragment>
    );
};

export default Loginverif;