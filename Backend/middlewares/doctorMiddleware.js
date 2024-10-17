const jwt = require("jsonwebtoken");
const { DoctorModel } = require("../models/doctor");

const doctorAuthMiddleware =  async(req,res,next)=>{
    try {
    const cookie =  req.cookies;
    const token =  cookie?.doctorToken;
    if(!token) return res.status(400).json({message : "Invalid Token!!"})
    
    const verify =  await jwt.verify(token ,process.env.JWT_SECRET_KEY)
    if(!verify) return res.status(400).json({message : "Token not valid!!"});

    const {id} = verify._id;
    const doctor =  await DoctorModel.findById(id);
    req.doctor  =  doctor;
    next();

        
    } catch (error) {
        return res.send("ERROR :"+error.message)

    }
}
module.exports = {doctorAuthMiddleware}