const express =  require("express");
const doctorRouter =  express.Router();
const { DoctorModel } = require("../../models/doctor");
const validator =  require("validator");
const { doctorAuthMiddleware } = require("../../middlewares/doctorMiddleware");
const {appointmentModel} = require("../../models/appontment");
const {validDocData} = require("../../utils/validation")  


doctorRouter.get("/doctor/allDoctors" , async(req,res) =>{
    try {
   const doctor =  await DoctorModel.find({}).select("-password  -image -email");
   if(!doctor) return res.status(400).json({message : "No Doctor Available !!"})
    return res.status(200).json({message:"List All Doctors" , doctor})
        
    } catch (error) {
        return res.status(400).json({ERROR: error.message})
    }
})

doctorRouter.post("/doctor/changeAvailability/:docId" ,  async(req,res) =>{
    try {
     const docId =  req.params.docId;
     const doctor =  await DoctorModel.findById(docId);
     if(!doctor) return res.status(404).json({message : "Doctor with this is not available in DB!!"})
     doctor.available = !doctor.available;
     await doctor.save();
     return res.status(200).json({message : "Doctor Availability Is Changed Now!!" , status : doctor.available })
     
    } catch (error) {
     return res.status(400).json({message : error.message})
    }
})

doctorRouter.post("/doctor/login" ,async(req,res)=>{
    try {
        
        const {email , password} = req.body;
        if(!validator.isEmail(email))  return res.status(400).json({message : "Invalid Email Type"});
        const doctor = await DoctorModel.findOne({email:email});
        if(!doctor) return res.status(404).json({message : "Invalid Credential !!"})
        
        const validPassword = await doctor.validatePassword(password);
        if(!validPassword)  return res.status(404).json({message : "Invalid Credential !!"})
        
        const token = await doctor.getJWT();
        if(!token) return res.json({message : "Something Wrong In Token While Creating Token!!"})
        res.cookie("doctorToken" ,  token);
        return res.json({message :" Login Sucessfull"})

    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})

doctorRouter.get("/doctor/appointments",doctorAuthMiddleware , async (req , res)=>{

    try {
        
        const doctor =  req.doctor;
        const id = doctor._id;
        const appointments =  await appointmentModel.findById(id);
        if(!appointments) return res.json({message: "Till Now No Appointments Booked For You!!"})
        return res.json({message : "Your Appointments" ,  appointments})

    } catch (error) {
        return res.status(400).json({Error : error.message}) 
    }

}
)

doctorRouter.post("/doctor/appointmentDone" ,  doctorAuthMiddleware ,  async(req, res)=>{
    try {
        const docId = req.doctor._id;
        const appointmentId =  req.body;
        const appointment =  await appointmentModel.findById(appointmentId);
        if(appointment && appointment.docId === docId){
            appointment.isCompleted =  true;
            await appointment.save();
        } else{
            return res.json({message : "Invalid Appointment"})
        }
        return res.json({message : "Appointment Done!!"})

        
    } catch (error) {
        return res.status(400).json({Error : error.message}) 
    }
})

doctorRouter.post("/doctor/appointmentCancel" , doctorAuthMiddleware ,  async (req, res)=>{
    try {
        const docId = req.doctor._id;
        const appointmentId =  req.body;
        const appointment =  await appointmentModel.findById(appointmentId);
        if(appointment && appointment.docId === docId){
            appointment.cancelled =  true;
            await appointment.save();
        } else{
            return res.json({message : "Invalid Appointment"})
        }
        return res.json({message : "Appointment Cancelled !!"})
        
    } catch (error) {
        return res.json({ERROR : error.message})
    }
})

doctorRouter.get("/doctor/dashBoard" , doctorAuthMiddleware ,  async(req, res) =>{
    try {
        const docId = req.doctor._id;
        const appointment =  await appointmentModel.findById(docId);
        let earnings = 0;

        appointment.map((item) =>{
            if(item.isCompleted || item.payment){
             earnings +=item.amount;
            }
        })
        let patient = [];
        appointment.map((item)=>{
            if(!patient.includes(item._id)){
                patient.push(item._id)
            }
        })
        const dashData ={
            earnings,
            appointment : appointment.length,
            patient : patient.length,
            latestAppointments : appointment.reverse().slice(0,5)

        }
        return res.json({dashData});

    } catch (error) {
        return res.json({ERROR : error.message})
   
    }
})

doctorRouter.get("/doctor/profile" ,  doctorAuthMiddleware , async(req ,res)=>{
    try {
        
        const doctor =  req.doctor;
        const id =  doctor._id;
        const doctorProfile =  await DoctorModel.findById(id).select("-password");
        
        return res.json({doctorProfile})

    } catch (error) {
        return res.json({ERROR : error.message})

    }
})

doctorRouter.patch("/doctor/editProfile", doctorAuthMiddleware ,  async(req, res)=>{
    
    try {
        const isEditable =  validDocData(req);
        if(!isEditable) return res.json({message : "Edit Not Successfull!!"});

        const doctorProfile =  req.doctor;
        
        Object.keys(req.body).forEach((key)=>{
            doctorProfile[key] = req.body[key];
        })
        await doctorProfile.save();

        return res.status(200).json({message : "Profile Edited Sucessfull !!"})
        
    } catch (error) {
        return res.json({ERROR : error.message})
    }
})


module.exports = {doctorRouter}