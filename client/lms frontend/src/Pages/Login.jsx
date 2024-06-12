import { useState ,use } from "react";
import Homelayout from "./Homelayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from  "react-redux"
import { useNavigate } from 'react-router-dom';
import {toast} from  "react-hot-toast"
import { createAccount , loginaccount } from "../Redux/slice/authslice";



function LoginPage(){
    const dispatch =  useDispatch()
    const navigate =  useNavigate()



   
    const [logindata , setlogindata] =  useState({
        username: ""  ,
        email : "",
        password : "" , 
       

    })

    function setvalue(e){
       
        const  {name ,  value} = e.target 
        setlogindata({...logindata , [name] : value})
       
        
        
    } 


  


 async function createuseraccount(event){
    event.preventDefault()
    console.log();
    if(!logindata.email && !logindata.password && !logindata.username){
        toast.error("please fill all details")

    }
    





  const jsondata = { 
    username : logindata.username ,
    password : logindata.password , 
    email  : logindata.email

  }
  const jsonstring = JSON.stringify(jsondata)
  console.log(jsonstring);
  console.log(jsondata);

const response = await dispatch(loginaccount(jsondata)) 

console.log(response?.payload.success);
 

 if(response?.payload.success == true){
 
    
navigate('/')
   
    
 }
   


setlogindata({
    email : '' ,
    password : "" ,
    username : "" 
})




}






    return (
       <Homelayout>
        <div className="flex  w-full  flex-row">
            <div className=" w-[400px] h-[412px] shadow-lg flex flex-col mx-auto my-auto" >
                <h1 className=" text-white font-bold text-[30px]  text-center ">LOGIN</h1>
             

             <label htmlFor="username" className=" text-white ml-[2px]">Name</label>
             <input 
             type="text"
             placeholder="Enter Your name" 
             name="username"
             id="username"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2"
             onChange={setvalue}
             value={logindata.username}
              />
               <label htmlFor="email" className=" text-white mt-[10px] ml-[2px]">Email</label>
             <input 
             type="text"
             placeholder="Enter Your Email" 
             name="email"
             id="email"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2 rounded-sm"
             onChange={setvalue}
             value={logindata.email}
              />

<label htmlFor="password" className=" text-white mt-[10px] ml-[2px]">password</label>
             <input 
             type="password"
             placeholder="Enter Your password" 
             name="password"
             id="password"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2 rounded-sm"
             onChange={setvalue}
             value={logindata.password}
              />

              <button onClick={createuseraccount} className="mx-auto bg-yellow-300 rounded-[26px]  hover:font-bold mt-[15px] px-[8px] py-[8px] text-white  w-[180px]" type="submit">Login</button>
              <p className=" mt-[7px] text-center">Do Not have an Account ? <span>{<Link className=" text-green-800" to="/signup">SignUp</Link>}</span></p>


            </div>
            
        </div>
       </Homelayout>
    )
}
export  default LoginPage