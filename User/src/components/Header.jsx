import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-16 lg:py-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm">
          <img
            className="w-24 h-10 object-cover rounded"
            src="/api/placeholder/100/40"
            alt="Group Profiles"
          />
          <p className="mt-2 md:mt-0">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center justify-center gap-2 bg-white px-6 py-2 rounded-full text-gray-600 text-sm mt-4 hover:bg-gray-100 transition-all duration-300"
        >
          Book Appointment
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      {/* Right Side */}
      <div className="md:w-1/2 flex items-end justify-center">
        <img
          className="w-full h-auto rounded-lg md:mt-10 md:mb-0"
          src="/api/placeholder/500/300"
          alt="Doctor Illustration"
        />
      </div>
    </div>
  );
};

export default Header;