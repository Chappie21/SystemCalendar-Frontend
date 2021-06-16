import React, { createContext, useState } from 'react';

const Statecontext = (props) =>{


    const [globalState, setGlobalState] = useState({
        Login: false,
        Calendarios: []
    });

    return(
        <div>
            <AppContext.Provider value = {[globalState, setGlobalState]}>
                {props.children}
            </AppContext.Provider>
        </div>
    );

};

export default Statecontext;
export const AppContext = createContext();