import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAccount } from "../Redux/slice/authslice";

function Logout(){
   
    const navigate =  useNavigate()
    const dispatch  =  useDispatch()

    const  LogOutAccount =async ()=>{
        dispatch(logoutAccount())
     }
    
   

    useEffect(()=>{
          
    


        LogOutAccount()
        navigate("/") 
    } )
    return null
}



export default  Logout