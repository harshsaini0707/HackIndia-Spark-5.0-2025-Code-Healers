import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
// {useNavigate} from "react-router-dom"

const Navbar = () => {
   // const navigate = useNavigate();
    const {aToken , setAToken} = useContext(AdminContext);
    

    const logOut = ()=>{
if(aToken) {
   // navigate("/")
    setAToken("");
    localStorage.removeItem('aToken')
}
    }
  return (
    <div className='flex  justify-between items-center px-4  sm:px-10 border-b bg-white'>
        <div className='my-2'>
            <p className='border-gray-500 border px-2.5 py-0.5 rounded-full  text-gray-600 '>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logOut} className='bg-blue-500 text-white text-sm px-10  py-2 rounded-full'>Logout</button>
        
    </div>
  )
}

export default Navbar