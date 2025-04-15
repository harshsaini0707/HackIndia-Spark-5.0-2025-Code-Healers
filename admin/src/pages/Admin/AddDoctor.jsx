import React from 'react'
import { useState } from 'react';
const AddDoctor = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState(1);
    const [fees, setFees] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [education, setEducation] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(false);

  return (
    <form className='p-5 w-full'>
      <p className='mb-4 text-2xl font-semibold text-gray-700'>Add Doctor</p>
      <div className='bg-white px-6 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-sm'>

        
        <div className='flex items-center gap-4 mb-8 text-gray-600'>
          <label htmlFor="doc-img">
            <img className='w-16 h-16 bg-gray-100 rounded-full object-cover cursor-pointer' src="" alt="Upload" />
          </label>
          <input type="file" id="doc-img" hidden />
          <p className='text-sm'>Upload doctor <br /> picture</p>
        </div>

  
        <div className='flex flex-col lg:flex-row gap-8 text-gray-700'>

         
          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div>
              <p className='mb-1'>Doctor Name</p>
              <input className='border rounded px-3 py-2 w-full' type="text" required placeholder='Name' />
            </div>

            <div>
              <p className='mb-1'>Doctor Email</p>
              <input className='border rounded px-3 py-2 w-full' type="email" required placeholder='Email' />
            </div>

            <div>
              <p className='mb-1'>Doctor Password</p>
              <input className='border rounded px-3 py-2 w-full' type="password" required placeholder='Password' />
            </div>

            <div>
              <p className='mb-1'>Experience (in years)</p>
              <input className='border rounded px-3 py-2 w-full' type="number" required placeholder='Experience' />
            </div>

            <div>
              <p className='mb-1'>Fees</p>
              <input className='border rounded px-3 py-2 w-full' type="number" required placeholder='Fees' />
            </div>
          </div>

      
          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div>
              <p className='mb-1'>Speciality</p>
              <select className='border rounded px-3 py-2 w-full' required>
                <option value="">Select Speciality</option>
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
              <input className='border rounded px-3 py-2 w-full' type="text" required placeholder='Education' />
            </div>

            <div>
              <p className='mb-1'>Address</p>
              <input className='border rounded px-3 py-2 w-full' type="text" required placeholder='Address' />
            </div>

            <div>
              <p className='mb-1'>About Doctor</p>
              <textarea className='border rounded px-3 py-2 w-full' rows={4} required placeholder='Write about doctor...' />
            </div>

            <button type="submit" className='bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-full mt-2'>
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
