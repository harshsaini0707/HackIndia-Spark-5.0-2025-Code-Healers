const express = require("express");
const { userAuthMiddlware } = require("../../middlewares/userMiddleware");
const RequestRouter = express.Router();


RequestRouter.post("/madeRequest",userAuthMiddlware, async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).json({message:"Unauthroized Please Login !!"})
        }
        const{name , organ , location } = req.body;
        
        
    } catch (error) {
       return res.status(500).send(error) 
    }
})

module.exports = {RequestRouter};