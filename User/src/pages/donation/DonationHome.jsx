import React, { useState } from 'react';
import MakeReq from './MakeReq';
import Requests from './Requests';
import Navbar from '../../components/Navbar';
import Chatbot from '../Chatbot';

const DonationHome = () => {
  const [activeTab, setActiveTab] = useState('makeRequest');

  return (
    <div>

   <Navbar/>
   <Chatbot/>
    <div className="flex  min-h-screen">
  
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-8">Donations</h2>
        <nav className="space-y-10">
          <button
            onClick={() => setActiveTab('makeRequest')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'makeRequest' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            }`}
          >
            Make Request
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`block mt-12 w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'requests' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            }`}
          >
            Requests
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'makeRequest' && <MakeReq/>}
        {activeTab === 'requests' && <Requests/>}
      </main>
    </div>
    </div>
  );
};

export default DonationHome;
