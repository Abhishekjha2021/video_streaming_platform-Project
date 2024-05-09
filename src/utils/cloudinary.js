//copied from official documentation of cloudinary-----------------------
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//below given code is also taken from cloudinary official documentation, but we have modified it little bit as per our requirement-----------
const uploadOnCloudinary = async (localFilePath) => {           //file hum localFilePath se le rhe hai-------
    try {
        if (!localFilePath) return null    //if the file isn't in the system ,then return null--------------------

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {          //this method is given by cloudinary ---------
            resource_type: "auto"
        })
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)        
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary }