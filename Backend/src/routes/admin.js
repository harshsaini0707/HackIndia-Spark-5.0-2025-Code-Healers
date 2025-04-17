const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const { DoctorModel } = require("../../models/doctor");
const {vlaidateDoctorAddData} =  require("../../utils/validation")
const jwt = require("jsonwebtoken")
const {adminMiddlewareRouter} = require("../../middlewares/adminMiddleware")
const {appointmentModel} =  require("../../models/appontment")
const {UserModel} =  require("../../models/user")

//login thisia test
adminRouter.post("/admin/login"  , async (req, res) =>{
    try {
        const {email , password } =  req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

        const token =  jwt.sign({email} , process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
        if(!token) return res.status(400).json({message : "ERROR WHILE CREATING TOKEN!!"})
      
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        }); 

        return res.status(200).json({success: true , message : "Login Sucessfull!!" , token})

        }else{
            return res.json({message: "Invalid Credentials!!"})
        }
        
    } catch (error) {
        return res.status(400).json({ERROR : error.message})
    }
})

adminRouter.post("/admin/add-doctor",adminMiddlewareRouter, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      slots_booked,
    } = req.body;

    //validate data
    const validationErrors = vlaidateDoctorAddData(req);
    if (!validationErrors) {
    return res.status(400).json({ ERROR: validationErrors });
    }


    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const doctorData = new DoctorModel({
      firstName,
      lastName,
      email,
      password : hashPassword ,
      image,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: typeof address === 'string' ? JSON.parse(address) : address,
      slots_booked: typeof slots_booked === 'string' ? JSON.parse(slots_booked) : slots_booked,
    });

    await doctorData.save();
    return res.status(200).json({message :  "Doctor Added Successfully!!" , data : doctorData})
  } catch (error) {
    return res.status(500).json({ERROR: error.message})
  }
});

adminRouter.get("/admin/allDoctors" ,adminMiddlewareRouter, async(req,res) =>{
    try {
   const doctor =  await DoctorModel.find({}).select("-password  -image");
   if(!doctor) return res.status(400).json({message : "No Doctor Available !!"})
    return res.status(200).json({message:"List All Doctors" , doctor})
        
    } catch (error) {
        return res.status(400).json({ERROR: error.message})
    }
})

adminRouter.post("/admin/changeAvailability/:docId" ,adminMiddlewareRouter ,  async(req,res) =>{
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

adminRouter.patch("/admin/cancelAppointment/:appointmentId" ,adminMiddlewareRouter, async(req,res) =>{
  try {
      
      const appointmentId =  req.params.appointmentId;
      const appointmentData =  await appointmentModel.findById(appointmentId);

      await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})
  
     // release the doctor slot
     const {docId , slotDate , slotTime} = appointmentData;
     const docData = await DoctorModel.findById(docId);
     let slots_booked = docData.slots_booked;
     
     if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

     await DoctorModel.findByIdAndUpdate(docId , {slots_booked})

     return res.json({message : "Appontment Cancelled!!"})
      }



   catch (error) {
      return res.status(400).json({Error : error.message})
  }
})

//all appointment list
adminRouter.get("/admin/allAppointments" ,adminMiddlewareRouter ,  async(req, res)=>{

  try {
     const appointments =  await appointmentModel.find({})
     if(!appointments) return res.status(200).json({message : "No Appointments till now!!"})
     return res.status(200).json({appointments});

  } catch (error) {
     return res.status(400).json({Error : error.message})
  }

})

//dashboard data
adminRouter.get("/admin/dashData" , adminMiddlewareRouter ,async (req,res)=>{
  try {
    const doctors =  await DoctorModel.find({});
    const user = await UserModel.find({});
    const appointments =  await appointmentModel.find({});

    const dashData={
      doctors : doctors.length,
      appointments :  appointments.length,
      user :  user.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }


   return res.json({dashData}) 
  } catch (error) {
    return res.status(400).json({Error : error.message})
  
  }
})

module.exports = {adminRouter}