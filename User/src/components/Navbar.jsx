import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between text-sm py-10 mb-5 h-16 border-b border-gray-400 px-4 md:px-10'>
      {/* Logo */}
      <h1
        className="text-xl font-bold text-primary cursor-pointer"
        onClick={() => navigate('/')}
      >
        SmartCare
      </h1>

      {/* Nav Links */}
      <ul className='hidden md:flex items-center gap-10 font-medium'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>
          <li className='py-2 hover:text-primary'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : ''}>
          <li className='py-2 hover:text-primary'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : ''}>
          <li className='py-2 hover:text-primary'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : ''}>
          <li className='py-2 hover:text-primary'>CONTACT</li>
        </NavLink>
      </ul>

      {/* Profile Section - Static */}
      <div className='relative cursor-pointer group hidden md:block'>
        <img
          className='w-10 h-10 rounded-full object-cover border'
          src='https://cdn-icons-png.flaticon.com/512/194/194938.png'
          alt='User'
        />

        {/* Dropdown */}
        <div className='absolute right-0 top-12 bg-white rounded shadow-md z-20 hidden group-hover:flex flex-col min-w-[180px] p-4 gap-3 text-gray-700 text-base font-medium'>
          <p onClick={() => navigate("/my-profile")} className='cursor-pointer hover:text-black'>
            My Profile
          </p>
          <p onClick={() => navigate("/my-appointments")} className='cursor-pointer hover:text-black'>
            My Appointments
          </p>
          <p onClick={() => navigate("/login")} className='cursor-pointer hover:text-black'>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
