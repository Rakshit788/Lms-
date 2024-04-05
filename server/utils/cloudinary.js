import { v2 as cloudinary} from "cloudinary"
import fs from "fs" ;


          

          
cloudinary.config({ 
  cloud_name: 'dfnk01haz', 
  api_key: '876296867286645', 
  api_secret: 'OCgeLS7S4Xrq2Q6XWyU9tVdwaDU' 
});


const uploadOnLocalFilePath = async (localfilepath) => {
  try {
    if (!localfilepath) return null;

    const response = await cloudinary.uploader.upload(localfilepath , {folder : "temp" , 
   resource_type : "auto" 
  });
  

    console.log("The file path is uploaded: ", response.url);
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null; // Return null in case of error
  }
};







export default uploadOnLocalFilePath ; 
