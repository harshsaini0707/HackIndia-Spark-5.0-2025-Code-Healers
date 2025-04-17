import React from 'react'
import {Routes,  Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Chatbot from './pages/Chatbot'
import Doctors from './pages/Doctors'
import DoctorInfo from './pages/DoctorInfo'
import Profile from './pages/user/Profile'
import Appointment from './pages/user/Appointment'
import DonationHome from './pages/donation/DonationHome'
import About from './pages/About'
import SignUp from './pages/SignUp'

const App = () => {
  return (

  <div className='mx-4 sm:mx-[10%]'>
    
    
{/* <Navbar/> */}
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/doctors' element={<Doctors/>} />
    {/* <Route path='/doctors/:speciality' element={<Doctors/>}/> */}
    <Route path='/login' element={<Login/>}/>
    <Route path="/docInfo/:Id" element={<DoctorInfo/>} />
    <Route path='/about' element={<About/>}/>
    {/* <Route path='/contact' element={<Contact/>}/> */}
    <Route path='/my-profile' element={<Profile/>} />
    <Route path='/my-appointment' element={<Appointment/>} />
    {/* <Route path='/appointment/:docId' element={<Appointment/>} /> */}
    <Route path='/donation' element={<DonationHome/>} />
    <Route path='/signup' element={<SignUp/>} />



  </Routes>
  {/* <Footer/> */}
 {/* <Chatbot/> */}
  </div>

  )
}

export default App