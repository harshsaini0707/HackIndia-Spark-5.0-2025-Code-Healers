  const validator = require("validator");

 const validateDoctorAddData = (req) => {
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
 
   const errors = [];
 
   if (!firstName) errors.push("First name is required.");
   if (!speciality) errors.push("Speciality is required.");
   if (!experience) errors.push("Experience is required.");
   if (available === undefined) errors.push("Availability is required.");
   if (!fees) errors.push("Fees are required.");
 
   if (!validator.isEmail(email)) errors.push("Invalid email format.");
   if (!password || password.length < 4)
     errors.push("Password must be at least 4 characters long.");
 
   return errors.length > 0 ? errors : null;
 };
 

 const validateUserdata = async(req) =>{
    const{firstName , lastName , email , password } = req.body;
    if(!firstName) throw new Error("Name required!!");

    if(!validator.isEmail(email))  return res.status(404).json({message: "Invalid Email type"}) 
    if(password.length< 3) return  res.status(404).json({message: "make Strong Password"})
 
    }

const validEditData = async(req) =>{
    

    const validEditData =  [ "firstName" , "lastName" ,"image","address" ,"gender","phone" ];

    const isEditValid = Object.keys(req.body).every((k) =>{
     return validEditData.includes(k);
    })
    return isEditValid;
}

const validDocData = async(req)=>{
    
    const validEditData =  [ "firstName" , "lastName" ,"image","address" ,"gender","phone" , "speciality"  , "experience" , "about" , "address" , "available"];

    const isEditValid = Object.keys(req.body).every((k) =>{
     return validEditData.includes(k);
    })
    return isEditValid;
}


    module.exports= {validateDoctorAddData , validateUserdata , validEditData , validDocData}