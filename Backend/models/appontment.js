const {mongoose} = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    docId:{
        type:String,
        required: true, 
    },
    slotDate:{
        type:String,
        required: true,
    },
    slotTime:{
        type:String,
        required: true,
    },
    userData:{
        type:Object,
        
    },
    docData:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type : Number,
        required:true
    },
    cancelled:{
        type:Boolean,
        default:false
    },
    payment:{
        type:Boolean,
        default:false  
    },
    isCompleted:{
        type:Boolean,
        default:false  
    }
})

const appointmentModel = new mongoose.model("Appointment",appointmentSchema);

module.exports = {appointmentModel}