import React, { useContext, useState, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';

const DoctorList = () => {
  // const { doctors } = useContext(DoctorContext);

  // const [availability, setAvailability] = useState({});


  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8989"+"/admin/allDoctors",{
        withCredentials:true
      });
     console.log(response.data)
        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  

// const doctors =["he"];

  return (
    // <div
    //   style={{
    //     border: '2px solid #ccc',
    //     borderRadius: '12px',
    //     padding: '20px',
    //     backgroundColor: '#f4f4f4',
    //     marginTop: '20px',
    //   }}
    // >
    //   <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
    //     Doctor List
    //   </h2>
    //   {doctors.length === 0 ? (
    //     <p style={{ fontSize: '1.2rem', color: '#888' }}>No doctors added yet.</p>
    //   ) : (
    //     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
    //       {/* {do.map((doctor) => (
    //         <div
    //           key={doctor.id}
    //           style={{
    //             border: '1px solid #ddd',
    //             borderRadius: '12px',
    //             padding: '16px',
    //             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    //             backgroundColor: '#fff',
    //           }}
    //         >
    //           <p><strong>Name:</strong> {doctor.name}</p>
    //           <p><strong>Email:</strong> {doctor.email}</p>
    //           <p><strong>Experience:</strong> {doctor.experience} years</p>
    //           <p><strong>Fees:</strong> ₹{doctor.fees}</p>
    //           <div>
    //             <strong>Availability:</strong>
    //             <div>
    //               <label style={{ display: 'inline-flex', alignItems: 'center' }}>
    //                 <input
    //                   type="checkbox"
    //                   checked={availability[doctor.id] || false}
    //                   onChange={() => handleAvailabilityChange(doctor.id)}
    //                   style={{ marginRight: '8px' }}
    //                 />
    //                 Available
    //               </label>
    //             </div>
    //           </div>
    //         </div>
    //       ))} */}
    //     </div>
    //   )}
    // </div>
    <div></div>
  );
};

export default DoctorList;
