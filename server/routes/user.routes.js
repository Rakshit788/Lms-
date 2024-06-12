import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";

import { registeruser, loginuser , logoutuser , changepassword , changeprofile} from "../controller/user.controller.js";
import upload from "../middleware/multer.middleware.js";

      

const userrouter =  Router() ; 
userrouter.post('/changeprofile' ,authmiddleware,  upload.single("avatar1") , changeprofile  )
userrouter.post('/register' , upload.single("avatar") ,  registeruser ) 
userrouter.post('/login' , loginuser) 
userrouter.post('/logout' ,authmiddleware ,   logoutuser)
userrouter.post('/changepassword' ,authmiddleware,   changepassword)

 





export default  userrouter ; 

