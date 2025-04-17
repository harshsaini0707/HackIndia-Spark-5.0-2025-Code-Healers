import React, { useState } from 'react';
import { FaHandHoldingHeart, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import axios from "axios"

const MakeReq = () => {
  const [requiredDonation, setRequiredDonation] = useState('');
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');


  const submitData = async()=>{
    try {
        const response = await axios.post(import.meta.env.VITE_URL+"/madeRequest",{
            Required_donation:requiredDonation,
            location,
            mobile
        },{withCredentials:true})
        console.log(response);

        setRequiredDonation("");
        setLocation("");
        setMobile("")
        
    } catch (error) {
        console.log(error);
        
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      requiredDonation,
      location,
      mobile,
    };

    console.log('Donation Request Submitted:', requestData);
    // TODO: Send `requestData` to backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl border border-blue-100 transition-all duration-300 hover:shadow-blue-200">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FaHandHoldingHeart className="text-pink-500" />
          Request a Donation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Required Donation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Required Donation</label>
            <div className="flex items-center gap-2 border px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
              <FaHandHoldingHeart className="text-blue-400" />
              <input
                type="text"
                placeholder="e.g. Blood, Food, Clothes"
                value={requiredDonation}
                onChange={(e) => setRequiredDonation(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Location</label>
            <div className="flex items-center gap-2 border px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
              <FaMapMarkerAlt className="text-blue-400" />
              <input
                type="text"
                placeholder="Your city or address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mobile Number</label>
            <div className="flex items-center gap-2 border px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
              <FaPhoneAlt className="text-blue-400" />
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={submitData}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-[1.02] transition-transform"
          >
            🚀 Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeReq;
