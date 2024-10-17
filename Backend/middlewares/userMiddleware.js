const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

const userAuthMiddlware = async(req,res, next) =>{
  try {
     
    const cookie =  req.cookies;
    const token  = cookie?.userToken;
    if(!token) return res.status(400).json({message : "Invalid Token!!"})

    const verify = await jwt.verify(token , process.env.JWT_SECRET_KEY);
    if(!verify) return res.status(400).json({message : "Token not valid!!"});

    const id = verify._id;
    const user = await UserModel.findOne(id);
    if(!user) return res.json({message : "User not find!!"})
    req.user = user;
    next();
    
  } catch (error) {
    return res.send("ERROR :"+error.message)
  }

}

module.exports = {userAuthMiddlware}