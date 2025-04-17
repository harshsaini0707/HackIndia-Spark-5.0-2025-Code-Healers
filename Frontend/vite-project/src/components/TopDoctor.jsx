import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User, Stethoscope, Clock, Info, IndianRupee } from 'lucide-react';

const DoctorInfo = () => {
  const { Id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    docInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Doctor not found or something went wrong.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-20 px-6 md:px-12 lg:px-32">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row overflow-hidden">
        {/* Doctor Image */}
        <div className="md:w-1/2">
          <img
            src={doctor.image || '/api/placeholder/400x400'}
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="md:w-1/2 p-6 md:p-10 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-indigo-600" size={24} />
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>

          <p className="text-lg text-gray-600 flex items-center gap-2">
            <Stethoscope size={18} className="text-indigo-500" />
            {doctor.speciality}
          </p>

          {doctor.experience && (
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" />
              {doctor.experience} years experience
            </p>
          )}

          {doctor.about && (
            <p className="text-gray-700 flex items-start gap-2">
              <Info className="text-indigo-500 mt-1" size={18} />
              <span>
                <strong>About:</strong> {doctor.about}
              </span>
            </p>
          )}

          {doctor.fees && (
            <p className="text-lg text-gray-700 flex items-center gap-2">
              <IndianRupee size={18} className="text-green-600" />
              <strong>Fees:</strong> ₹{doctor.fees}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
