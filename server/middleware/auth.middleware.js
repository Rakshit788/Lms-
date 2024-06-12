import ApiError from '../utils/Api.error.js';
import asynchandler  from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";





const authmiddleware =  asynchandler(async(req,resp, next) =>{
try {
        const acesstoken =  req?.cookies?.uid
      
        if(!acesstoken){
            throw new ApiError(400 , "unable to find acess tokken")
        }
    
       const decodedtoken =  jwt.verify(acesstoken , process.env.REFRESH_SECRET) 
    
       if(!decodedtoken){
     throw new  ApiError(400 , "unable to use acesstoken")
       }
    
    
       const user  = await  User.findById(decodedtoken._id).select("-password -refreshtoken")
    
       req.user  =  user
        
       next()
    }
 catch (error) {
    throw new ApiError(400 , `Authentication Eroor ${error}`)
}} )



const currentroles =   async(req, resp ,next)=>{
  try {
    const currentrole =  req.user.role 

    if(!currentrole){
      throw  new ApiError(400 , "something went wrong  will Admin role")
    }
  
    if(currentrole != 'Admin'){
      throw  new ApiError(400 ,  "Only Admin are allowed to create a course ")
    }
    next()
  } catch (error) {
    throw new  ApiError("Authentication error " ,error)
  }
}

export {authmiddleware , currentroles}
