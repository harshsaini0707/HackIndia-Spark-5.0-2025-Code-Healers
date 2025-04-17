import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {

  const[firstName,setfirstname] = useState('');
  const[lastName,setlastname] = useState('');
  const[gender,setGender] = useState('');
  const[email,setEmail]= useState("");
  const[password,setPassword] = useState(''); 
  const navigate = useNavigate();

  const Signup = async()=>{
   
    try {
        const response = await axios.post(import.meta.env.VITE_URL+"/user/signup",{
            firstName,
            lastName,
            gender,
            email,
            password
        },{withCredentials:true})
        console.log(response);
        

         navigate("/")
        
    } catch (error) {
        console.log(error);
        
    }
  }



  

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>

     
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>setfirstname(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>setlastname(e.target.value)}
            required
            style={inputStyle}
          />

          <select
            name="gender"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button
           onClick={Signup}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
          >
            Sign Up
          </button>
   
        <p style={{textAlign:'center', marginTop:'15px'}}>Already Signed In?{' '} <Link to="/login" style={{ color: '#007bff', textDecoration: 'underline'}}>Login</Link> </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

export default SignUp;