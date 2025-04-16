const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    RequestedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    location:{
        type:String,
        required:true
    },
    Required_donation:{
        type:String
    },
    status:{
        type:String,
        enum:{
            values:["pending","fullfilled"],
            message: "Status must be either 'pending' or 'fulfilled'"
        },
        default:"pending"
    }

},{timestamps:true});


const RequestModel = new  mongoose.model("RequestModel" , requestSchema);

module.exports = {RequestModel};