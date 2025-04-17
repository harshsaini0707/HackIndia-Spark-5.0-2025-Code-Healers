import React, { createContext, useState } from "react";

// Create a context for doctors
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);  // State to store the list of doctors

  // Function to add a new doctor to the list
  const addDoctor = (doctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, doctor]); // Add doctor to the list
  };

  // The value provided to all child components of DoctorContext.Provider
  const value = {
    doctors,  // List of doctors
    addDoctor,  // Function to add a doctor
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
