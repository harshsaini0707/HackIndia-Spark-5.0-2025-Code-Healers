import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10'>
    <div className=' flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white '>
            <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
           
        </div>
        <button onClick={()=>navigate("/login") } className=' bg-white text-sm  sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create Account</button>
    </div>


    <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={"https://imgs.search.brave.com/eCysvja9DCAXnZIa4QU9rQAN00ce798RbV45h--6l-A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzMwL1Bf/bWVkaWNpbmEuc3Zn/LzI1MHB4LVBfbWVk/aWNpbmEuc3ZnLnBu/Zw"} alt="" />
    </div>
    </div>
  )
}
