import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) =>{
    const value ={
 h :"h"
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;