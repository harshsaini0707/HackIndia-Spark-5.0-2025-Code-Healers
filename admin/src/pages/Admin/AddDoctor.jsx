import React, { useState } from 'react';
import axios from 'axios';

const AddDoctor = () => {
  const [firstName, setfirstName] = useState('');
  const [secondName, setsecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState(0);
  const [speciality, setSpeciality] = useState('General physician');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/admin/add-doctor`, {
        firstName,
        lastName: secondName,
        email,
        password,
        image,
        available:true,
        speciality,
        degree: education,
        experience,
        about,
        fees,
        address,
      }, { withCredentials: true });

      console.log(response.data);


      setfirstName('');
      setsecondName('');
      setEmail('');
      setPassword('');
      setExperience('');
      setFees(0);
      setSpeciality('General physician');
      setEducation('');
      setAddress('');
      setAbout('');
      setImage('');

      alert("Doctor added successfully!");

    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-5 w-full'>
      <p className='mb-4 text-2xl font-semibold text-gray-700'>Add Doctor</p>
      <div className='bg-white px-6 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-sm'>
        <div className='flex items-center gap-4 mb-8 text-gray-600'>
          <label htmlFor="doc-img">
          {image ? (
  <img
    className='w-16 h-16 bg-gray-100 rounded-full object-cover cursor-pointer'
    src={image}
    alt="Doctor"
  />
) : (
  <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400'>
    ?
  </div>
)}

          </label>
          <input
            type="text"
            id="doc-img"
            className='outline-1'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <p className='text-sm'>Upload doctor <br /> picture URL</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8 text-gray-700'>
          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div>
              <p className='mb-1'>Doctor FirstName</p>
              <input
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="text"
                required
                placeholder='First Name'
              />
            </div>
            <div>
              <p className='mb-1'>Doctor LastName</p>
              <input
                value={secondName}
                onChange={(e) => setsecondName(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="text"
                required
                placeholder='Last Name'
              />
            </div>
            <div>
              <p className='mb-1'>Doctor Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="email"
                required
                placeholder='Email'
              />
            </div>
            <div>
              <p className='mb-1'>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="password"
                required
                placeholder='Password'
              />
            </div>
            <div>
              <p className='mb-1'>Experience (in years)</p>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="number"
                required
                placeholder='Experience'
              />
            </div>
            <div>
              <p className='mb-1'>Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="number"
                required
                placeholder='Fees'
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div>
              <p className='mb-1'>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                required
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className='mb-1'>Education</p>
              <input
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="text"
                required
                placeholder='Education'
              />
            </div>
            <div>
              <p className='mb-1'>Address</p>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                type="text"
                required
                placeholder='Address'
              />
            </div>
            <div>
              <p className='mb-1'>About Doctor</p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className='border rounded px-3 py-2 w-full'
                rows={4}
                required
                placeholder='Write about doctor...'
              />
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-full mt-2'>
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
