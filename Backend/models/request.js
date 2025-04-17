const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  RequestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  Required_donation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "fulfilled"],
      message: "Status must be either 'pending' or 'fulfilled'"
    },
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  fulfilledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel"
  },
  locationOf: { 
    type: String
  },
  mobile: {
    type: Number
  }
}, { timestamps: true });

const RequestModel = mongoose.model("RequestModel", requestSchema);
module.exports = { RequestModel };
