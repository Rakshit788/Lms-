import {User} from "../models/user.model.js";
import ApiError from "../utils/Api.error.js";
import asynchandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/Api.response.js";
import uploadOnLocalFilePath from "../utils/cloudinary.js";
import bcrypt from 'bcryptjs';
import argon2 from "argon2";



// const generateacesstokenAndRefreshtokens = async (user_id) =>{
   
//         const user = await  User.findById(user_id)
//    const  acesstokrn  =     user.generateacesstoken()
//        const refreshtoken  =  user.generaterefreshtoken() 
//     //    console.log(acesstokrn ,  refreshtoken);
       
//        user.refreshtoken = refreshtoken 
//        await user.save({validateBeforeSave : false}) 
     
//        return {acesstokrn , refreshtoken}

// }


const registeruser =  asynchandler(async(req, resp , next) =>{
    const {username,  email  , password ,  role } = req.body

    if ([ username, email, password ,  role].some((field) => field?.trim() === "")) {
        throw new ApiError(404, "All the fields are required");
    }

   
    const userExist = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
    

    if(userExist){
         throw new ApiError(200 , "user already exist")
    }


    const avatarlocalpath =  req.file.path

    if(!avatarlocalpath){
        throw new ApiError(400 , "avatar image not found")
    }

    const avatar = await uploadOnLocalFilePath(avatarlocalpath)


    if(!avatar){
        throw new ApiError(400 , "not able to save the avatar ")
    }




    const newUser = await  User.create({
        username: username,
        email: email,
        password: password ,
        avatar: avatar ,
        role : role , 
      });
      

    const createduser = await  User.findById((await newUser)._id).select("-password -refreshtoken")


    if(!createduser){
        throw new ApiError(400  , "Unable to register new the user " )
    }


 
 



resp.status(200)
    .json(
      new ApiResponse(true ," user registered sucessfull" , createduser )
)

})



const loginuser =  asynchandler(async (req,resp,next)=>{

    let  {username ,  password , email} =  req.body 
  
    

    if(!(username || email)) {
        throw new ApiError(400 , 'username or email is required ')
    }


    if(!password){
        throw new ApiError("password is required ")
    }

 // Finding the user with the sent email
 const user = await User.findOne({
    $and : [
        {email} , 
        {username}
    ]
 })


 const respuser =  await User.findOne({
    $or : [
        {email} , 
        {username} 
    ]
 }).select("-password")



 if(!user){
    throw new ApiError(400 , 'user is not found')
 }
 


 if(password  != user.password){
    throw new ApiError(400 , "password is not same" )
 }
 


//    const {acesstokrn , refreshtoken}  = await generateacesstokenAndRefreshtokens(user._id)  
const authtoken =  await user.generaterefreshtoken(user._id) 

if(!authtoken){
    throw new ApiError(" token not created")
}

   const options =  {
    httpOnly : true ,
    secure : true 
}

   resp.status(200)
      .cookie("uid" , authtoken , { maxAge : 900000000, httpOnly: true }) 
    //   .cookie("refreshtoken" , refreshtoken , options) 
      .json(
      new ApiResponse(200 ,respuser , "Logged in sucess fully" , true)
      )


})


const logoutuser = asynchandler(async(req,resp , next) =>{
   try {
     const user_id  = req.user._id 
 
     const user = await User.findByIdAndUpdate(user_id , 
           
          {
             $set : {
                 refreshtoken: undefined
             }
          }
         
         ) 
 
         const options =  {
             httpOnly : true ,
             secure : true 
         }
 
   // Clear cookies in the response
   resp.clearCookie("acesstoken" , options);
   resp.clearCookie("refreshtoken" , options);

   resp.status(200).send("Logged out successfully"); // Send a response indicating successful logout
   } catch (error) {
    resp.status(400).send("something went wrong Logging out" , ); 
    throw(error)
   }
    

})   




const changepassword =  asynchandler(async (req, resp ,next) =>{

    const {newpassword ,  password}  =  req.body

    

    if (!(password && newpassword)) {
        throw new ApiError(400, "Both fields are required");
    }

 const user =  await  User.findById(req.user._id) 

 if(!user){
    throw new ApiError(400 , 'Something went wrong ')  ; 

 }

 

 const validatepassword =  user.isPasswordCorrect(password) 
 

 if(!validatepassword){
    throw new ApiError(400 ,  "Incorrect password")
 }

user.password =  newpassword 


// Invalidate existing tokens

user.refreshtoken = null;


await user.save();




// Generate new tokens
const accesstoken = user.generateacesstoken();
const refreshtoken = user.generaterefreshtoken();


resp.cookie('acesstoken', accesstoken, { httpOnly: true });
resp.cookie('refreshtoken', refreshtoken, { httpOnly: true });

// Save the new refresh token to the database
user.refreshtoken = refreshtoken;
await user.save({validateBeforeSave: false});




resp.status(200)
    .json(new ApiResponse(
        200 , 
        "password changed sucessfully" , 
    ))
 

}) 

const changeprofile  =  asynchandler( async (req , resp, next) =>{
const {updateuserame} =  req.body
console.log(" updateusername " ,  updateuserame);
const user  =  await  User.findById(req.user._id).select("-password") ;
if(!user){
    throw new ApiError(400 , "Unable to find  user to update the profile ")
}
if(updateuserame){
    

user.username =  updateuserame 


}
const   avatar1  =  req.file?.path


if(avatar1){
    
const avatar  = await uploadOnLocalFilePath(avatar1) 


 

if(!avatar ){
    throw new ApiError(404, "Failed to update the Image")
}
user.avatar =   avatar
await  user.save()
resp.json(
    new ApiResponse(200 , user  , "Both image and name changed sucessfully" )
)
}
else{
  await  user.save()
  resp.json(
    new ApiResponse(200 , user  , " name changed sucessfully" )
)
}



 })










export {loginuser , logoutuser , registeruser , changepassword ,  changeprofile}
