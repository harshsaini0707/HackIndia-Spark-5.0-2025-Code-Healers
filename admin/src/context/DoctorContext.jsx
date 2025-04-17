import React, { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);  

 
  const addDoctor = (doctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, doctor]);
  };

  const value = {
    doctors, 
    addDoctor,  
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
