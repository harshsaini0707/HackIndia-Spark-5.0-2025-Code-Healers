import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Save, X, User, Mail, Phone, Calendar, MapPin, Home } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Chatbot from '../Chatbot';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    DOB: '',
    address: {
      City: '',
      Palace: ''
    },
    image: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/user/viewProfile`, {
        withCredentials: true
      });
      setProfileData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch profile data');
      setLoading(false);
      console.error(err);
    }
  };

  const editProfile = async () => {
    try {
      const dataToSend = {
        ...profileData,
        image: tempImage || profileData.image
      };

      const response = await axios.put(`${import.meta.env.VITE_URL}/user/updateProfile`, dataToSend, {
        withCredentials: true
      });

      alert('Profile updated successfully');
      setIsEditing(false);
      fetchProfileData();
    } catch (error) {
      console.log(error);
     // alert('Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await editProfile();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
        <Chatbot/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-6 text-white flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profileData.image || tempImage ? (
                <img
                  src={tempImage || profileData.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center border-4 border-white shadow-lg">
                  <User size={48} className="text-white" />
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <Edit size={16} className="text-blue-500" />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="flex items-center text-sm">
                <Mail size={16} className="mr-1" />
                {profileData.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center space-x-1 hover:bg-gray-100 transition"
          >
            {isEditing ? (
              <>
                <X size={16} />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit size={16} />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>

        <div className="px-8 py-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'First Name', name: 'firstName', type: 'text' },
                { label: 'Last Name', name: 'lastName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email', disabled: true },
                { label: 'Phone', name: 'phone', type: 'tel' },
                { label: 'Gender', name: 'gender', type: 'select' },
                { label: 'Date of Birth', name: 'DOB', type: 'text' },
                { label: 'City', name: 'address.City', type: 'text' },
                { label: 'Address', name: 'address.Palace', type: 'text' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={
                        field.name.includes('.')
                          ? profileData.address?.[field.name.split('.')[1]] || ''
                          : profileData[field.name]
                      }
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                        field.disabled ? 'bg-gray-100' : ''
                      }`}
                      disabled={field.disabled}
                      required={!field.disabled}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {[
                { icon: User, label: 'Full Name', value: `${profileData.firstName} ${profileData.lastName}` },
                { icon: Mail, label: 'Email', value: profileData.email },
                { icon: Phone, label: 'Phone', value: profileData.phone || 'Not provided' },
                { icon: User, label: 'Gender', value: profileData.gender || 'Not specified' },
                { icon: Calendar, label: 'Date of Birth', value: profileData.DOB || 'Not specified' },
                { icon: Home, label: 'City', value: profileData.address?.City || 'Not provided' },
                { icon: MapPin, label: 'Address', value: profileData.address?.Palace || 'Not provided' }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <item.icon size={20} className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-gray-500 text-sm">{item.label}</h3>
                    <p className="text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
