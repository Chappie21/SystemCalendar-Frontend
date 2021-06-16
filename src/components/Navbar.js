import React, { Fragment } from 'react';
import { Redirect } from 'react-router';

import './css/Navbar.css';

const Navbar = (props) => {


    return (
        <Fragment>
            <div>
                {
                    props.type === 1
                        ? (
                        <div id='Navbar'>
                            <div className = 'user'>
                                <img src={props.img} />
                                <label className='NameUser'>{props.UserName}</label>
                            </div>
                            <div className='items'>
                                <div className = 'mes'>
                                    <p>{'Jun - Julio 2021'}</p>
                                </div>
                                <div className = 'actividad'>
                                    <p>{'Siguiente tarea: '}</p>
                                </div>
                            </div>
                        </div>
                        )
                        : (
                        <div id='Navbar'>
                            <div className = 'user'>
                                <img src={props.img} />
                                <label className='NameUser'>{props.UserName}</label>
                            </div>
                            <div className='items'>
                               <button onClick = {() => props.history.push('/sesion')}>
                                   Volver
                                </button>
                            </div>
                        </div>
                        )
                }
            </div>
        </Fragment>
    )

}

export default Navbar;