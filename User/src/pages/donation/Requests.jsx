import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');

  const donate = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_URL}/fulfillRequest/${id}`, {
        address: location,
        mobile: mobile
      }, { withCredentials: true });

      console.log("Donation submitted:", response.data);

      // Clear modal & reload feed
      setSelectedReq(null);
      setLocation('');
      setMobile('');
      ReqFeed();

    } catch (error) {
      console.log("Donation error:", error);
    }
  };

  const ReqFeed = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/reqFeed`, {
        withCredentials: true,
      });
      setRequests(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    ReqFeed();
  }, []);

  const handleConfirmClick = (req) => {
    setSelectedReq(req);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Donation Requests</h1>
      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div key={req._id} className="p-4 border rounded shadow">
              <h2 className="font-semibold text-lg">{req.Required_donation}</h2>
              <p><strong>Requested By:</strong> {req.RequestedBy.firstName} {req.RequestedBy.lastName}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Mobile:</strong> {req.mobile}</p>
              <button
                onClick={() => handleConfirmClick(req)}
                className="mt-2 px-4 py-1 bg-green-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {selectedReq && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Confirm Fulfillment</h3>
            <p className="text-sm text-gray-600 mb-4">
              You're fulfilling request for <strong>{selectedReq.Required_donation}</strong>.
            </p>
            <input
              type="text"
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Your Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => donate(selectedReq._id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setSelectedReq(null)}
                className="text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
