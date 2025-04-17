import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Info, 
  User, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertTriangle,
  Award,
  Stethoscope 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Chatbot from './Chatbot';

const DoctorInfo = () => {
  const { Id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [slotDates, setSlotDates] = useState('');
  const [timeSlots, setTimeSlots] = useState('');
  const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);


  const ButtonFunctinality = async () => {
    if (!selectedTimeSlot || !doctor || !slotDates[selectedSlot]) return;
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user/bookAppointment`,
        {
          docId: doctor._id,
          slotDate: `${slotDates[selectedSlot].fullDate.toISOString().split('T')[0]}`,
          slotTime: selectedTimeSlot
        },
        {
          withCredentials: true
        }
      );
  
      if (response.data?.success) {
        alert('Appointment booked successfully!');
      } else {
        alert(response.data?.message || 'Booking failed.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while booking the appointment.');
    }
  };
  

  const docInfo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/user/doctor/${Id}`, {
        withCredentials: true,
      });
      setDoctor(response?.data?.doctorProfile || null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Generate available dates for the next 7 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dateNum = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      dates.push({
        day,
        date: dateNum,
        month,
        fullDate: date,
        isToday: i === 0
      });
    }
    
    setSlotDates(dates);
  };

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    if (slotDates.length === 0) return;
    
    const selectedDate = slotDates[selectedSlot].fullDate;
    const currentDate = new Date();
    const timeSlots = [];
    
    let startHour = 10; // Default start at 10 AM
    let startMinute = 0;
    
    // If today, start from current hour + 1
    if (selectedDate.getDate() === currentDate.getDate() && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear()) {
      startHour = currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10;
      startMinute = currentDate.getMinutes() > 30 ? 0 : 30;
      
      // If after 8 PM, no slots available today
      if (startHour >= 20) {
        setTimeSlots([]);
        return;
      }
    }
    
    // Set start time
    const startTime = new Date(selectedDate);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    // Set end time to 9 PM
    const endTime = new Date(selectedDate);
    endTime.setHours(21, 0, 0, 0);
    
    // Generate 30-minute slots
    let currentSlot = new Date(startTime);
    while (currentSlot < endTime) {
      const formattedTime = currentSlot.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      timeSlots.push({
        datetime: new Date(currentSlot),
        time: formattedTime
      });
      
      // Add 30 minutes
      currentSlot = new Date(currentSlot.getTime() + 30 * 60000);
    }
    
    setTimeSlots(timeSlots);
  };

  useEffect(() => {
    docInfo();
    generateAvailableDates();
  }, []);

  useEffect(() => {
    generateTimeSlots();
  }, [selectedSlot, slotDates]);

  if (loading) {
    return (
        <div>
            <Navbar/>
            <Chatbot/>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <p className="text-gray-600 font-medium">Loading doctor details...</p>
        </div>
      </div>
      </div>
    );
  }

  if (!doctor) {
    return (
        <div>
            <Navbar/>
            <Chatbot/>
      <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the doctor you're looking for or something went wrong.
          </p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
      </div>
    );
  }

  return (
   <div>
    <Navbar/>
    <Chatbot/>
    <div className="min-h-screen  w-full bg-gray-50 py-8 px-4 md:px-12">
      <div className="max-w-7xl m-auto ">
        {/* Main Info Section */}
        <div className="bg-white w-full *:  rounded-2xl pl-80 shadow-md overflow-hidden">
          <div className="flex w-full flex-col items-center justify-center md:flex-row">
            {/* Doctor Image */}
            <div className="md:w-1/3  lg:w-1/4 flex items-center justify-center p-8">
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <img
                  src={doctor.image || '/api/placeholder/400/400'}
                  alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  className="w-full h-full object-cover"
                />
                {doctor.available && (
                  <div className="absolute bottom-2 right-2 bg-green-500 p-1 rounded-full border-2 border-white">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Details */}
            <div className="md:w-2/3 lg:w-3/4 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <span>Dr. {doctor.firstName} {doctor.lastName}</span>
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                  </h2>
                  
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center text-gray-600">
                      <Stethoscope className="h-4 w-4 mr-1 text-indigo-500" />
                      <span>{doctor.speciality}</span>
                    </div>
                    
                    {doctor.qualification && (
                      <div className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-1 text-indigo-500" />
                        <span>{doctor.qualification}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {doctor.experience} Year{doctor.experience > 1 ? 's' : ''} Experience
                    </span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">Appointment Fee</p>
                  <p className="text-2xl font-bold text-gray-800">₹{doctor.fees}</p>
                </div>
              </div>

              {doctor.about && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Info className="h-4 w-4 text-indigo-600" />
                    About Doctor
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {doctor.about}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            Select Appointment Date & Time
          </h3>

          {/* Date Selection */}
          <div className="mb-8">
            <h4 className="text-gray-700 font-medium mb-4">Select Date</h4>
            <div className="relative">
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {slotDates.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSlot(index)}
                    className={`flex flex-col items-center justify-center min-w-[80px] py-3 px-2 rounded-xl cursor-pointer transition-all ${
                      selectedSlot === index
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-200'
                    }`}
                  >
                    <span className="text-xs font-medium mb-1">{slot.day}</span>
                    <span className="text-lg font-bold">{slot.date}</span>
                    <span className="text-xs">{slot.month}</span>
                    {slot.isToday && (
                      <span className={`text-xs mt-1 ${selectedSlot === index ? 'text-indigo-100' : 'text-indigo-500'}`}>
                        Today
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h4 className="text-gray-700 font-medium mb-4">Select Time</h4>
            {timeSlots.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {(showAllTimeSlots ? timeSlots : timeSlots.slice(0, 12)).map((slot, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer transition-all ${
                        selectedTimeSlot === slot.time
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-indigo-200'
                      }`}
                    >
                      <span className="font-medium">{slot.time}</span>
                    </div>
                  ))}
                </div>
                
                {timeSlots.length > 12 && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setShowAllTimeSlots(!showAllTimeSlots)}
                      className="text-indigo-600 font-medium flex items-center"
                    >
                      {showAllTimeSlots ? (
                        <>Show Less <ChevronLeft className="h-4 w-4 ml-1" /></>
                      ) : (
                        <>Show More <ChevronRight className="h-4 w-4 ml-1" /></>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-100 text-amber-800 p-4 rounded-lg">
                <p className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  No available slots for this date. Please select another date.
                </p>
              </div>
            )}
          </div>

          {/* Book Button */}
          <div className="ml-32 flex ">
            <button
            onClick={ButtonFunctinality}
              disabled={!selectedTimeSlot}
              className={`  h-12  w-44  sm:w-auto px-8 py-3 rounded-lg font-medium shadow-sm pt-3 flex items-center justify-center transition-all ${
                selectedTimeSlot
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
              {selectedTimeSlot && (
                <span className="ml-2 bg-indigo-500 px-2 py-0.5 rounded text-xs">
                  {slotDates[selectedSlot].day} {slotDates[selectedSlot].date}, {selectedTimeSlot}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DoctorInfo;