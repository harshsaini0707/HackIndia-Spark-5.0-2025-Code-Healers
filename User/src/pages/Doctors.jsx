// Keep the same imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  Filter,
  User,
  Stethoscope,
  
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from './Chatbot';


const Doctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/user/allDoctors`, {
        withCredentials: true,
      });
      setAllDoctors(response?.data?.doctor || []);
      console.log(response?.data?.doctor);
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };


  useEffect(() => {
    fetchDoctors();
  }, []);

  const specialties = [
    'All',
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Neurologist',
    'Pediatricians',
    'Gastroenterologist',
  ];

  const filteredDoctors = allDoctors.filter(
    (doc) =>
      (selectedSpecialty === 'All' || doc.speciality === selectedSpecialty) &&
      (searchTerm === '' ||
        `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
        <Navbar/>
        <Chatbot/>
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-10  px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl  mb-10 ">
        <div className="flex mt-40 flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="text-indigo-600" size={32} />
              Find Doctors
            </h1>
            <p className="text-gray-500 mt-1">Connect with specialized healthcare professionals</p>
          </div>

          <div className="relative w-full md:w-80 mt-4 md:mt-0">
            
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 shadow-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-indigo-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
              <Filter size={18} />
              Specialties
            </h2>
          </div>
          <ul className="p-4 space-y-2">
            {specialties.map((specialty, index) => (
              <li
                key={index}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-200 ${
                  selectedSpecialty === specialty
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {specialty}
              </li>
            ))}
          </ul>
        </aside>

        {/* Doctor Cards */}
        <main className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc._id}
                  onClick={()=>navigate(`/docInfo/${doc?._id}`)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={doc.image || '/api/placeholder/300x200'}
                      className="w-full pt-20 pb-10 h-48 object-cover"
                      alt={`Dr. ${doc.firstName} ${doc.lastName}`}
                    />
                    <span
                      className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${
                        doc.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {doc.available ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {doc.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                      <User className="text-indigo-500" size={18} />
                      Dr. {doc.firstName} {doc.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Stethoscope size={14} className="text-indigo-400" />
                      {doc.speciality}
                    </p>
                    {doc.experience && (
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-indigo-400" />
                        {doc.experience} years experience
                      </p>
                    )}
                   
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No doctors found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn’t find any doctors matching your criteria. Try adjusting your filters or search keywords.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

export default Doctors;
