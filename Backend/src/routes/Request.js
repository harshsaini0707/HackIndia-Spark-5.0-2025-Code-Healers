const express = require("express");
const { userAuthMiddlware } = require("../../middlewares/userMiddleware");
const { RequestModel } = require("../../models/request");
const RequestRouter = express.Router();


RequestRouter.post("/madeRequest", userAuthMiddlware, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }
  
      const { Required_donation, location } = req.body;
  
      if (!Required_donation || !location) {
        return res.status(400).json({ message: "Required_donation and location are mandatory." });
      }
  
      const newRequest = new RequestModel({
        RequestedBy: req.user._id, 
        Required_donation,
        location
      });
  
      await newRequest.save();
  
      return res.status(200).json({ message: "Success", data: newRequest });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

  RequestRouter.get("/reqFeed", userAuthMiddlware, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }

  
      const allData = await RequestModel.find({
        RequestedBy: { $ne: req.user._id }
      }).populate("RequestedBy", "firstName lastName email"); 
  
      return res.status(200).json({ message: "Success", data: allData });
  
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  

  RequestRouter.put("/fulfillRequest/:id", userAuthMiddlware, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized. Please login!" });
      }
  
      const requestId = req.params.id;
  
     
      const request = await RequestModel.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      if (request.status === "fullfilled") {
        return res.status(400).json({ message: "Request already fulfilled" });
      }
  
     
      if (request.RequestedBy.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "You cannot fulfill your own request" });
      }
  
      
      request.status = "fullfilled";
      request.fulfilledBy = req.user._id;
  
      await request.save();
  
      return res.status(200).json({
        message: "Request fulfilled successfully",
        data: request
      });
  
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
  

module.exports = {RequestRouter};