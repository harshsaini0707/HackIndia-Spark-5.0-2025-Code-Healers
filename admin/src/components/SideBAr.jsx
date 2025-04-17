import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';

const SideBAr = () => {
    const{aToken}  =useContext(AdminContext);
  return (
    <div className='min-h-screen  bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-1'>
            

                <NavLink className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  focus:bg-blue-100 focus:border-r-4 focus:border-r-blue-700  "  to={"/add-doctor"}>
            <p>Add Doctor </p>
                </NavLink>

                <NavLink className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  focus:bg-blue-100 focus:border-r-4 focus:border-r-blue-700  "  to={"/doctor-list"}>
            <p>Doctor List</p>
                </NavLink>
            </ul>
        }

    </div>
  )
}

export default SideBAr