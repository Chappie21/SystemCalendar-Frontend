import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom'

import './css/PrincipalComponents.css'

const Cardnav = (props) => {

    const { history } = props;

    return (
        <Fragment>
            <div>
                <div className="cardContainer">
                    <div className="textHeader">
                        <header className="Title">
                            <h1>{props.Title}</h1>
                        </header>
                        <div>
                            <p>
                                {props.Text}
                            </p>
                        </div>
                    </div>

                    <div className="button-container">
                        <button name="login" className="button-menu"
                            onClick={() => history.push('/login')}>Iniciar Sesion</button>
                        <button name="register" className="button-menu"
                            onClick={() => history.push('/register')}>Registrarse</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default withRouter(Cardnav);