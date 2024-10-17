const mongoose =  require("mongoose")
require('dotenv').config();

const ConnectMongoDB = () => {
    return mongoose.connect(`${process.env.MONGO_URI}` )
};

module.exports = {ConnectMongoDB}