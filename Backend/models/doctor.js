const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      default: "Best Doctor Among The World!!",
    },
    available: {
      type: Boolean,
      default: true,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
      default: 300,
    },
    address: {
      type: Object,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    image: {
      type: String,
      required: true,
      default: " https://imgs.search.brave.com/O-MGwjr8gqKlSxBw7rYt7oXByLveLK-_BjfCRnRHUKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucm9ja2V0cmVh/Y2guY28vaW1hZ2Vz/L3Byb2ZpbGVfcGlj/cy92Mi4xL2RwcG03/LnBuZw"
    },
  },
  { timestamps: true }
);

doctorSchema.methods.validatePassword =  async function(inputPassword){
  const doctor =  this;
  const hashPassword = doctor.password;
  const validate =  await bcrypt.compare(inputPassword,hashPassword);
  return validate;
      

}

doctorSchema.methods.getJWT =  async function(){
  const doctor = this;
  const id =  doctor._id;
  const token = await jwt.sign({id},process.env.JWT_SECRET_KEY , {expiresIn: "1d"});
  if(!token) return res.status(400).json({message : "Token not created!!"});
  return token;
}

const DoctorModel = new mongoose.model("Doctor", doctorSchema);

module.exports = { DoctorModel };
