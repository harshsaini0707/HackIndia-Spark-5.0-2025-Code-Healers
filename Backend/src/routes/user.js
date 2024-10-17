const express = require("express");
const userRouter = express.Router();
const {validateUserdata} = require("../../utils/validation")
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/user");
const validator = require("validator");
const{userAuthMiddlware} = require("../../middlewares/userMiddleware");
const{validEditData} = require("../../utils/validation");
const { DoctorModel } = require("../../models/doctor");
const {appointmentModel} = require("../../models/appontment")


userRouter.post("/user/signup",async (req,res) =>{

  try {
    const {email , password , firstName , lastName , gender} = req.body;
    const isDataValid = validateUserdata(req);
    if(!isDataValid) return res.status(404).json({ERROR : "Invalid Data!!"})

    const hashPass = await bcrypt.hash(password , 10);

    const user = new UserModel({
        email , password:hashPass , firstName , lastName , gender
    })
    await user.save();
    console.log(user);
    
    return res.status(200).json({sucess:true , user})
    
  } catch (error) {
    return res.status(400).json({Error : error.message})
  }

})

userRouter.post("/user/login" , async(req,res) =>{
    try {
        
        const{email , password} = req.body;
        
        if(!validator.isEmail(email))  return res.status(404).json({message: "Invalid Email type"}) 
        if(password.length< 3) return  res.status(404).json({message: "make Strong Password"})

        const user = await UserModel.findOne({email : email})
        if(!user)  return res.status(404).json({ERROR : "Invalid Credential!!"})
        
        const validate = await user.validatePassword(password);
        if(!validate)   return res.status(404).json({ERROR : "Invalid Credential!!"})
        
        else{
            const token = await user.getJWT();
            if(!token ) return res.status(400).json({Error : "Something Wrong in token!!"})
            
            res.cookie("userToken",token);
            return res.status(200).json({message : "Login Sucessful !!"})

        }

    } catch (error) {
        return res.status(400).json({Error : error.message}) 
    }
} )

userRouter.post("/user/logout" , userAuthMiddlware , async (req,res) =>{
    try {
        res.cookie("userToken" , null , {expires : new Date(Date.now())})
        return res.status(200).json({message : "Logout Sucessfull!!"})
    } catch (error) {
        return res.status(400).json({Error : error.message}) 
    }
})

userRouter.patch("/user/editProfile" , userAuthMiddlware , async (req,res)=>{
    try {
       if(!validEditData(req)) return res.status(404).json({message : "Editing not allowed for that some field!!"}) 
        
      const loggedInUser = req.user;
      

      Object.keys(req.body).forEach((key)=>{
        loggedInUser[key] = req.body[key];
      })
      await loggedInUser.save();
      return res.status(200).json({message : "Profile Edited Sucessfull !!"})
      
    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})
userRouter.get("/user/viewProfile", userAuthMiddlware ,  async (req , res) =>{

    try {
        const loggedInUser = req.user.toObject();
        delete loggedInUser.password;
        return res.status(200).json(loggedInUser);
        
    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})
userRouter.patch("/user/editPassword" , userAuthMiddlware , async (req, res)=>{
    try {
        const user = req.user;
        const { oldPass , newPass } = req.body;

        const isValid =  await user.validatePassword(oldPass);

        if(!isValid) return res.status(404).json({message : "Invalid old Password!!"});
        else{
        const hashPassword  =  await bcrypt.hash(newPass , 10);
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({message : "Password edited Sucessfull !!"})
        }
    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})

//ADD in PostMan
userRouter.post("/user/bookAppointment", userAuthMiddlware,async (req,res)=>{
  try {
    const loggedInUser = req.user;
    const Id = loggedInUser._id;
    const{docId , slotDate , slotTime} = req.body;
    
    const docData = await DoctorModel.findById(docId).select("-password");
    if(!docData.available){
     return res.json({message : "Doctor Not Available!!"})
    }else{
     let slots_booked = docData.slots_booked;
 
     //check if slot is available or not
     if(slots_booked[slotDate]){

          if(slots_booked[slotDate].include(slotTime)){
             return res.json({message : "Slot Not Available!!"})  
         }else{
             slots_booked[slotDate].push(slotTime)
         }

     }else{
         slots_booked[slotDate] = [];
         slots_booked[slotDate].push(slotTime);
      }
    }
    const user = await UserModel.findById(Id).select("-password");
    //delete slotbook data in doctor
    //we donot want the slot book of doctor data

    delete docData.slots_booked;
    const appointmentData = {
        Id, docId , user , docData , amount :docData.fees , date : Date.now() , slotDate , slotTime  
    }

    const newAppointment  = new appointmentModel(appointmentData);
    await appointmentData.save();

    //save new slots data in docData
    await DoctorModel.findById(docId , {slots_booked})
    return res.json({sucess :true , message : "Appontment booked" , newAppointment})

  } catch (error) {
    return res.status(400).json({Error : error.message})
  }
})

userRouter.get("/user/appointment", userAuthMiddlware,  async (req,res) =>{
    try {
        
        const user = req.user;
        const id = user._id;
        const loggedInUser =  await appointmentModel.findById(id);
        if(!loggedInUser) return res.status(404).json({message :"User Don't have any Appointment!!"})
        
        return res.status(200).json({message :"Appointment of"+loggedInUser.firstName  , loggedInUser})
    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})

userRouter.patch("/user/cancelAppointment/:appointmentId" ,userAuthMiddlware, async(req,res) =>{
    try {
        const loggedInUser =  req.user;
        const id = loggedInUser._id;
        const appointmentId =  req.params.appointmentId;
        const appointmentData =  await appointmentModel.findById(appointmentId);

        //verify appointment user
        if(appointmentData.userId != id){
            return res.status(404).json({message :"User Don't have any Appointment!!"}) 
        }else{
       await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})
    
       
       // release the doctor slot
       const {docId , slotDate , slotTime} = appointmentData;
       const docData = await DoctorModel.findById(docId);
       let slots_booked = docData.slots_booked;
       slots_booked[slotDate] = slots_booked[slotDate].filter( e => e !== slotTime )

       await DoctorModel.findByIdAndUpdate(docId , {slots_booked})

       return res.json({message : "Appontment Cancelled!!"})
        }


        
    } catch (error) {
        return res.status(400).json({Error : error.message})
    }
})

//Payment  : 11:40:00


module.exports = {userRouter};