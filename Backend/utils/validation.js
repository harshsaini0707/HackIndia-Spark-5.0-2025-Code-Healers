 const validator = require("validator");

 const vlaidateDoctorAddData = (req) =>{
    const{firstName ,lastName,email,password , image,speciality ,degree,experience,about,available,fees,address,slots_booked} = req.body;

    if(!firstName || !speciality || !experience   || !available ||!fees  ) throw new Error("Validation Of Doctor Failed!!");

    if(!validator.isEmail(email)){
        return res.status(404).json({message: "Invalid Email type"})
    }
    
    if(password.length< 4) return  res.status(404).json({message: "make Strong Password"})
        
 }

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


    module.exports= {vlaidateDoctorAddData , validateUserdata , validEditData , validDocData}