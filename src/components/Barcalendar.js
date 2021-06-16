import React, { Fragment } from 'react';

import './css/Barcalendar.css'
import List from './List'

const Barcalendar = (props) => {

    return (
        <Fragment>
            <div className = 'bar-container'>
                <div className='bar-calendar'>
                    <List title={'Calendarios'} calendar={props.calendar} type='prop' history = {props.history}/>
                    <List title={'Calendarios invitados'} calendar={props.calendar} type='inv'/>
                    <button onClick = {() => props.history.push('/createcalendar')}>
                        Crear calendario
                    </button>
                </div>
            </div>
        </Fragment>
    )
}


export default Barcalendar;