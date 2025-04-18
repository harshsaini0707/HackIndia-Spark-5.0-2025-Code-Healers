import React, { useContext } from "react"
import Login from "./pages/Login"
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./pages/Navbar";
import SideBAr from "./components/SideBAr";
import {Routes , Route} from 'react-router-dom'
import AddDoctor from "./pages/Admin/AddDoctor";
import DocList from "./pages/Admin/DocList";


function App() {
  const {aToken } = useContext(AdminContext);
  
  return aToken ? (
    <div className="bg-[#F9F8FD] ">
    <ToastContainer/>
    <Navbar/>
    <div className="flex items-start">
      <SideBAr/>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/add-doctor" element={<AddDoctor/>} />
        <Route path="/doctor-list" element={<DocList />} />
      </Routes>
    </div>
   </div>
  ) :(
   <div>
    <Login/>
    <ToastContainer/>
   </div>
  )
}

export default App
