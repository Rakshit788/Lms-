import { useState ,use } from "react";
import Homelayout from "./Homelayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import {useDispatch} from  "react-redux"
import { useNavigate } from 'react-router-dom';
import {toast} from  "react-hot-toast"
import { createAccount } from "../Redux/slice/authslice";




function Signup(){

    const dispatch =  useDispatch()
    const navigate =  useNavigate()

 
    const [avatarimage , setavatarimage] =  useState("")
    const [signupdata , setsignupdat] =  useState({
        username: ""  ,
        email : "",
        password : "" , 
        avatar : "" ,
        role : "User"

    })

    function setvalue(e){
       
        const  {name ,  value} = e.target 
        setsignupdat({...signupdata, [name] : value})
  
    } 


  function setimage(e){
        

        const file =  e.target.files[0] 
     
        setsignupdat({
            ...signupdata , 
            avatar :file
        })

        if(file){
            const filereader = new FileReader()
           filereader.readAsDataURL(file)
           filereader.addEventListener("load" , function(e){
         
           setavatarimage(this.result)
           })
            
           
        }
    }

    


 async function createuseraccount(event){
    event.preventDefault()
    if(!signupdata.email || !signupdata.password  || !signupdata.username){
        toast.error("please fill all details")
    }

if(!  signupdata.email.match("^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$")){
    toast.error('email is not valid')
}




    const formdata = new FormData()
    formdata.append("avatar" ,  signupdata.avatar)
    formdata.append("email" ,  signupdata.email)
    formdata.append("username" ,  signupdata.username)
    formdata.append("password" ,  signupdata.password)
    formdata.append("role" , signupdata.role )

const response = await dispatch(createAccount(formdata))  ; 

if(response){
    navigate("/")
}
   


setsignupdat({
    email : '' ,
    password : "" ,
    avatar : "" , 
    username : "" 
})


}






    return (
       <Homelayout>
        <div className="flex  w-full  flex-row">
            <div className=" w-[400px] mt-[70px] h-[502px] shadow-lg flex flex-col mx-auto " >
                <h1 className=" text-white font-bold text-[30px]  text-center ">Register Form</h1>
             <div className=" flex  items-center mt-[10px]">
             <label htmlFor="fileimage" className="w-[40px]  mx-auto ">
               {avatarimage ? (<img className="" src={avatarimage} ></img>) : (
                    <div style={{ height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BsPersonCircle style={{ height: '100%', width: 'auto' }} />
                    </div>
                )}
             </label>
             <input type="file" className="hidden" id="fileimage" onChange={setimage} />
            
             </div>

             <label htmlFor="username" className=" text-white ml-[2px]">Name</label>
             <input 
             type="text"
             placeholder="Enter Your name" 
             name="username"
             id="username"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2"
             onChange={setvalue}
             value={signupdata.username}
              />
               <label htmlFor="email" className=" text-white mt-[10px] ml-[2px]">Email</label>
             <input 
             type="text"
             placeholder="Enter Your Email" 
             name="email"
             id="email"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2 rounded-sm"
             onChange={setvalue}
             value={signupdata.email}
              />

<label htmlFor="password" className=" text-white mt-[10px] ml-[2px]">password</label>
             <input 
             type="password"
             placeholder="Enter Your password" 
             name="password"
             id="password"
             className="  bg-transparent text-black mt-[7px] border px-2 py-1 mx-2 rounded-sm"
             onChange={setvalue}
             value={signupdata.password}
              />

<label htmlFor="role" className=" text-black mt-[10px] ml-[2px]">
    USER TYPE : <br />
<input 
             type="radio"
             name="role"
             id="option1"
             className="  "
             value = "User"
             onChange={setvalue}
              /> User
</label>


<label htmlFor="role" className=" text-black mt-[10px] ml-[2px]">
<input 
             type="radio"
             name="role"
             id="password2"
             className="  "
             onChange={setvalue}
             value= "Admin"
              /> Admin
</label>




            

              <button onClick={createuseraccount} className="mx-auto bg-yellow-300 rounded-[26px]  hover:font-bold mt-[15px] px-[8px] py-[8px] text-white  w-[180px]" type="submit">Register</button>
              <p className=" mt-[7px] text-center">Already have an account ? <span>{<Link className=" text-green-800" to="/login">LogIn</Link>}</span></p>

        
            </div>
            
        </div>
       </Homelayout>
    )
}

export  default  Signup