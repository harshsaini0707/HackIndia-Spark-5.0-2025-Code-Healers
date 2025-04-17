import React, { useContext, useState, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';

const DoctorList = () => {
 

  const [doctor, setDoctor] = useState([]);

  

  // const changeAvailabilty = async (docId) =>{
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_URL}/admin/changeAvailability/${docId}`,{

  //     },{withCredentials:true})
  //     console.log(response);
      
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

  const getData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_URL+"/admin/allDoctors",{
        withCredentials:true
      });
     console.log(response?.data?.doctor)
     setDoctor(response?.data?.doctor);

        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  

// const doctors =["he"];

  return (
    <div className="p-6 mt-6  rounded-lg ">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor List</h2>

    {doctor.length === 0 ? (
      <p className="text-lg text-gray-500">No doctors added yet.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctor.map((ele) => (
          <div
            key={ele._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            <img src={ele?.image} className='h-52 w-52 rounded-lg' />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Dr. {ele?.firstName} {ele?.lastName}
            </h3>
          <p>{ele?.speciality}</p>
        <div className='flex gap-2 mt-2'>
        <input  type="checkbox" /><span>Availabe</span>
        </div>
          </div>
        ))}
      </div>
    )}
  </div>
   
  );
};

export default DoctorList;
