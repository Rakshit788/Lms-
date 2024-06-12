import mongoose ,  { Schema}  from "mongoose";
import   jwt   from 'jsonwebtoken'
import bcrypt from  'bcryptjs'
import ApiError from "../utils/Api.error.js";
import argon2 from "argon2";

const Userschema =  new Schema({
username :{
    type : String ,
    
    lowercase : true ,
    trim : true ,
  
} , 
password :{
    type : String ,
    
    lowercase : true ,
    trim : true ,
  
     
} ,

email:{
    type : String ,
    
    lowercase : true ,
    trim : true ,
  
} , 

avatar: {
    type : String ,
    trim : true  ,  
    required : true
    
} , 


refreshtoken: {
    type : String,
    unique : [ true , " tokens should be unique"]
   
}
,

role : {
    type : String , 
    enum : ['User' , 'Admin' ] , 
    default : "User"
}




} ,{
    timestamps: true
})




// Userschema.pre("save" , async function (next){
    
//   try {
//       if(this.isNew || this.isModified('password')){
       
      
//        this.password = await bcrypt.hash(this.password , 10) ;
       
       
//        next()
//       }
//       else{
//        return next()
//       }
//   } catch (error) {
//     throw  error
//   }
//  }) 
//  Userschema.methods.isPasswordCorrect = async function (plainPassword) {
  
  
//     try {
    
//         if(!plainPassword.startsWith('$')){
//             plainPassword =  "$" +  plainPassword
//             plainPassword =  plainPassword.toString()
          
//         }

//         console.log( plainPassword , this.password);

        

//         const result = await argon2.verify(plainPassword, this.password);
//         console.log(result);
//         return result;
//     } catch (error) {
//         // Handle any errors that may occur during password comparison
//         console.error("Error comparing passwords:", error);
//         throw error; // Rethrow the error to be handled elsewhere
//     }
// }





Userschema.methods.generaterefreshtoken = function() {
    const expirationTime = Math.floor(Date.now() / 1000) + (15 * 24 * 60 * 60); // 15 days in seconds
    const secretKey = process.env.REFRESH_SECRET; // Assuming you have an environment variable for the refresh secret key
    if (!secretKey) {
        throw new Error("Refresh secret key is missing");
    }

    return jwt.sign({
        _id: this._id , 
        username : this.username , 
        role  : this.role 
    }, secretKey, {
        expiresIn: expirationTime
    });
};




// Userschema.methods.generateRefreshtoken =  function() {
//     return jwt.sign({ _id: this.id }, process.env.REFRESH_SECRET, {
//       expiresIn: process.env.REFRESH_EXPIRY,
//     });
//   }



export const User = mongoose.model('User' , Userschema)