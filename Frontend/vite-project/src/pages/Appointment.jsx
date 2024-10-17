import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets/assets';

function Appointment() {
  const { docId } = useParams();
  const { doctors ,currenySymbol} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const[docSlot,setDocSlot] = useState([]);
  const[slotIndex,setDocSlotIndex] = useState(0);
  const[slottime , setSlotTime] = useState("");


  const fetchDocInfo = () => {
    const doctor = doctors.find(doc => doc._id === docId); 
   
    
    setDocInfo(doctor);
  };

  const getAvailableSlot = async()=>{
    setDocSlot([])
    //getting current date 
    let today =  new Date();
    for(let i = 0 ; i<7 ;i++){
      currenDate.setDate(today.getDate()+i);
    // time 
    let endtime = new Date();
    endTime.setDate(today.getDate()+i);
    endTime.setHours(21,0,0,0);
    //hours
    if(today.getDate() === currenDate.getDate()){
      currenDate.setHours(currenDate.getHours() > 10 ? currenDate.getHours()+1 : 10);
      currenDate.setMinutes(currenDate.getMinutes()>30 ?  30 : 0);
    }else{
      currenDate.setHours(10);
      currenDate.setMinutes(0);

    }

    let timeSlots =[];
    while(currenDate < endTime ){
      let formattedTime = currenDate.toLocalTimeString([],{hours: '2-digit ',minute:'2-digits'})
      // add slot to array 
      timeSlots.push({
        datetime:new Date(currenDate),
        time:formattedTime
      })
      // increase time +30
      currenDate.setMinutes(currenDate.getMinutes()+30);

    }
    setDocSlot(prev =>([...prev,timeSlots]))

    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=>{
    getAvailableSlot();
  },[docInfo])

  useEffect(()=>{
    console.log(docSlot);
    
  },[docSlot])

  return docInfo ? (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
        <img  className='bg-primary w-full sm:max-w-72 rounded lg' src={docInfo.image}  />
      </div>

      <div className=' flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px]  sm:mt-0'>
        <p className=' flex items-center gap-2 text-2xl font-medium text-gray-900'> {docInfo.name}
          <img  className="w-5" src={assets.verified_icon} />
        </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full  '>{docInfo.experince}</button>
        </div>
        <div>
          <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About <img src={assets.info_icon} /></p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4 '>
          Appointment fee: <span className='text-gray-600'>{currenySymbol}{docInfo.fees}</span></p>
      </div>
    </div>
    </div>
  ) : (
    <p>Loading doctor information...</p>
  );
}

export default Appointment;
