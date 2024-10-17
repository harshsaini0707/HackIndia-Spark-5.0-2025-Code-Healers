const cloudinary = require('cloudinary').v2;


const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_API_KEY,
    api_key: process.env.CLOUDNIARY_NAME,
    api_secret: process.env.CLOUDNIARY_SECRET_KEY,
  });
};
module.exports = {connectCloudinary}; 