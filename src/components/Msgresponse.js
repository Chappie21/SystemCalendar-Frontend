import React, { Fragment } from 'react';

const Msgresponse = (props) => {

    const ComprobarStatus = () => {

        let style = {
            backgroundColor: '',
            color: '',
            fontSize: '15px',
            border: '',
            borderRadius: '5px',
            padding: '8px'
        }

        if((props.status >= 200 && props.status <= 207) || (props.color === 'green')){  
            style['backgroundColor'] = 'rgb(154, 205, 50)';
            style['color'] = 'green';
            style['border'] = 'solid green 3px';
        }else if((props.status >= 400 && props.status <= 413) || (props.color === 'yellow')){
            style['backgroundColor'] = 'rgb(250, 250, 210)';
            style['color'] = 'rgb(255, 215, 0)';
            style['border'] = 'solid rgb(255, 215, 0) 3px';
        }else if((props.status >= 500 && props.status <= 503) || (props.color === 'red')){
            style['backgroundColor'] = 'rgb(240, 128, 128)';
            style['color'] = 'rgb(178, 34, 34)';
            style['border'] = 'solid rgb(178, 34, 34) 3px';
        }

        return (
            <div style = {style}>
                <p><b>{props.msg}</b></p>
            </div>
        );

    }

    return (
        <Fragment>
                {
                   ComprobarStatus()
                }
        </Fragment>
    )

};


export default Msgresponse;