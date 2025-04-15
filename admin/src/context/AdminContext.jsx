import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) =>{
    const[aToken , setAToken ] = useState(localStorage.getItem("aToken") ?localStorage.getItem("aToken") : "");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const value ={
        aToken,setAToken,
        BASE_URL
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;