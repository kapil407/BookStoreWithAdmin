import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import {config} from 'dotenv'
config();
const uploadCloudinary= async (filepath)=>{
        cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.COUDINARY_api_SECRET
});
try {
    const uploadtResult=await cloudinary.uploader.upload(filepath.path);
    fs.unlinkSync(filepath.path); // dlete file from local disk 
    return uploadtResult.secure_url; // cloudinary return secure file link

} catch (error) {
    fs.unlinkSync(filepath.path);
   throw new Error("cloudinary error");
   
}

}

export default uploadCloudinary ;