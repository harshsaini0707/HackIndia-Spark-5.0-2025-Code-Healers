const express = require("express");
const { userAuthMiddlware } = require("../../middlewares/userMiddleware");
const {RequestModel} = require("../../models/request")
// const { UserModel } = require("../../models/user");
const RequestRouter = express.Router();

const mongoose = require('mongoose');


RequestRouter.post("/madeRequest", userAuthMiddlware, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }
  
      const { Required_donation, location , mobile } = req.body;
  
      if (!Required_donation || !location) {
        return res.status(400).json({ message: "Required_donation and location are mandatory." });
      }
  
      const newRequest = new RequestModel({
        RequestedBy: req.user._id, 
        Required_donation,
        location,
        mobile
      });
  
      await newRequest.save();
  
      return res.status(200).json({ message: "Success", data: newRequest });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });



  RequestRouter.get("/reqFeed", userAuthMiddlware, async (req, res) => {
    try {
      // Enhanced authentication check
      if (!req.user?._id) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }
  
      console.log(`Fetching requests for user ${req.user._id}`);
  
      // Debug: Check total requests in database
      const totalRequests = await RequestModel.countDocuments();
      console.log(`Total requests in DB: ${totalRequests}`);
  
      // Debug: Check requests that should appear in feed
      const shouldAppear = await RequestModel.countDocuments({
        RequestedBy: { $ne: req.user._id },
        status: "pending"
      });
      console.log(`Requests that should appear in feed: ${shouldAppear}`);
  
      // Enhanced query with error handling
      const allData = await RequestModel.find({  
      })
      .populate({
        path: "RequestedBy",
        select: "firstName lastName  location mobile ",
        options: { lean: true } // Better performance
      })
      .sort({ createdAt: -1 })
      .lean(); // Convert to plain JS objects
  
      console.log(`Found ${allData.length} requests for feed`);
 const newlen =  allData.filter(data =>data.RequestedBy._id !== req.user._id)
 console.log(newlen.length)
      return res.status(200).json({ 
        message: "Success", 
        data: allData,
        meta: {
          totalRequests,
          eligibleRequests: shouldAppear,
          returnedRequests: allData.length
        }
      });
  
    } catch (error) {
      console.error("Request feed error:", error);
      return res.status(500).json({ 
        message: "Server Error", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
  
  
  
  
  

  
 
  RequestRouter.put("/fulfillRequest/:id", userAuthMiddlware, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }
  
      const requestId = req.params.id;
      const { address, mobile } = req.body;
  
      if (!address || !mobile) {
        return res.status(400).json({ message: "Address and mobile number are required to fulfill the request." });
      }
  
      const request = await RequestModel.findById(requestId).populate("fulfilledBy", "mobile firstName lastName email address");
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      if (request.status === "fulfilled") {
        return res.status(400).json({ message: "Request already fulfilled" });
      }
  
      request.status = "fulfilled";
      request.fulfilledBy = req.user._id;
      request.mobile = mobile;
      request.locationOf = address; 
      await request.save();
  
      return res.status(200).json({
        message: "Request fulfilled successfully",
        data: {
          ...request.toObject(),
          donorDetails: {
            name: req.user.firstName + " " + req.user.lastName,
            email: req.user.email,
            mobile,
            address
          }
        }
      });
  
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
  
  

module.exports = {RequestRouter};