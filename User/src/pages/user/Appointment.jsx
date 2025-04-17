import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Chatbot from '../Chatbot';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(null); 
  const [error, setError] = useState(null); 

  const cancelAppoint = async (appointmentId) => {
    try {
      setIsCancelling(appointmentId); 
      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/user/cancelAppointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      console.log(response); 
      fetchAppointments(); 
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); 
      setError('Cancelled');
    } finally {
      setIsCancelling(null);
    }
  };
  

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/user/appointment`,
        {
          withCredentials: true,
        }
      );
      setAppointments(response.data.appointments); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  // Fetch appointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to format the appointment date and time
  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
        <Chatbot/>
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">My Appointments</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}
      {appointments?.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        appointments.map((appt) => {
          const doc = appt.docData || {}; // Safely access doctor data
          return (
            <div
              key={appt._id}
              className="flex items-center gap-20 bg-white rounded-xl shadow p-4 mb-6 space-x-6"
            >
              <img
                src={doc.image || 'https://via.placeholder.com/150'}
                alt="Doctor"
                className="w-36 h-36 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold">
                  Dr. {doc.firstName} {doc.lastName}
                </h3>
                <p className="text-gray-600">{doc.speciality || 'Speciality not provided'}</p>
                <p className="text-sm">
                  <span className="font-medium">Address:</span> {doc.address?.place}, {doc.address?.city}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Date & Time:</span> {formatDateTime(appt.date)}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                
                <button
                  onClick={() => cancelAppoint(appt._id)}
                  className={`px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-red-500 ${isCancelling === appt._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isCancelling === appt._id} // Disable button while cancelling
                >
                  {isCancelling === appt._id ? 'Cancelling...' : 'Cancel Appointment'}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
  );
};

export default Appointment;
