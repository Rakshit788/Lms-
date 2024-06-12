import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector ,  } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Err from "../../Pages/Notfound";

function  Authcheck(){
const navigate =  useNavigate()
    const {isLoggedin ,  role} =  useSelector((state) => state.auth)
    console.log(role);
    const [checkauth ,  setcheckauth] =  useState(false)
function check(){
  
  if (isLoggedin && role === "Admin") {
       setcheckauth(true)
    } else {
      if (isLoggedin) {
        navigate("/notfound");
        toast.error("User type cannot create the course");
      } else {
        toast.error("User is not logged in");
      }
    }
}
    useEffect(() => {
      check()
    
    } , [isLoggedin ,  role])
  
    return (
      <>
        {checkauth ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <Err />
          </>
        )}
      </>
    );
  }


    
     



export default Authcheck