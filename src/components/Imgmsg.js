import React, { Fragment } from 'react';

const Imgmsg = (props) =>(

    <Fragment>
        <div style ={{
            backgroundImage:  `url(${props.img})`,
            backgroundSize: 'auto',
        }}>
            <header>
                <h3>{props.title}</h3>
            </header>
            <p>
                {props.message}
            </p>
        </div>
    </Fragment>

);


export default Imgmsg;