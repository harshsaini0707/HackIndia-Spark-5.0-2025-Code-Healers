const express = require("express");
const jwt = require("jsonwebtoken")


const adminMiddlewareRouter = async(req, res , next) =>{
try {
    const cookie = req.cookies;
    
    
    const token  = cookie?.adminToken;
    if(!token) return res.status(400).json({message : "Request Denied!! Token is Invalid!!"})
    
    const decoded =  await jwt.verify(token , process.env.JWT_SECRET_KEY );
    if(!decoded)  return res.status(400).json({message : "Something wrong in token verification!!"})
    const email = decoded.email;
    if(email != process.env.ADMIN_EMAIL)return res.status(400).json({message : "Something wrong in token verification!!"})
    next();
    
} catch (error) {
    return res.status(400).json({message : error.message})
}
}

module.exports = {adminMiddlewareRouter}