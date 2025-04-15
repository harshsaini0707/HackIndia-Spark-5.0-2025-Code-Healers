require('dotenv').config();
const PORT = process.env.PORT || 1234
const express = require("express");
const app = express();
const{ConnectMongoDB} = require("./config/database");
const {connectCloudinary} =   require("./config/cloudnary")
const{adminRouter}  =  require("./routes/admin");
const cookieParser =  require("cookie-parser");
const { doctorRouter } = require('./routes/doctor');
const {userRouter} = require("../src/routes/user")
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5188" , "http://localhost:5173"]
}))

connectCloudinary().catch(error => {
    console.error(`Cloudinary connection error: ${error}`);
});



app.use("/",adminRouter);
app.use("/" , doctorRouter);
app.use("/",userRouter);




ConnectMongoDB().then(()=>{
    console.log(`DB Connected Sucessfully!!`);
    app.listen(PORT,()=>console.log(`Server Started!!`)
    ) 
}).catch((error) =>{
    console.log(`Something Wrong In MongoDB Connection : ${error}`); 
})



