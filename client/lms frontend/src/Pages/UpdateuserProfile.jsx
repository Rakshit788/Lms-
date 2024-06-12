import { useDispatch, useSelector } from "react-redux"
import Homelayout from "./Homelayout";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from "../Redux/slice/authslice";







function Updateprofile(){
   const dispatch  =  useDispatch()
 const data  =  useSelector(state  => state.auth.data)
 const preusername  =  useSelector(state => state.auth.username)
 const navigate =  useNavigate()

const [image ,  setnewimage] =  useState("")

  const [form  ,  setform ] =  useState({

   username : preusername ,
   email :  data.email ,
   newimage  : data.avatar
  })

    function  previewfile(e){
      const file  =  e.target.files[0]
      const reader  =  new FileReader() 

      if(file){
         reader.readAsDataURL(file)
      }



      reader.addEventListener(
         "load",
          () =>{ 
            setform({
               ...form ,
               newimage : file
              })
              console.log(reader.result);
              setnewimage(reader.result)
         }

      )
 }


 const dataUpdate  =  async ()=>{
   console.log(form);
       if(form.newimage != DataTransfer.avatar){
          const d =  new FormData()
          d.append("updateuserame" , form.username)
          d.append("avatar1" ,  form.newimage)
          console.log(form.newimage);
          await dispatch(updateProfile(d))
          navigate("/")
       }else{
          const jsondata = {
            updateuserame  : form.username
          }
          await  dispatch(updateProfile(jsondata)) ;
          navigate("/")
          
       }
 }


return( <>
<Homelayout>
   
<div className=" flex shadow-lg shadow-current mx-auto my-auto w-[400px] h-[500px]">
    
<div  className=" bg-white h-full w-full flex flex-col ">
    <h1>Avatar Image</h1>

    <label htmlFor="fileimage" className="w-[40px]  mx-autoc justify-center ">
               {image? (<img className="" src={image} ></img>) : (
                    <div style={{ height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img src={data.avatar} alt="" />
                    </div>
                )}
             </label>
             <input type="file" id="fileimage" onChange={previewfile} className=" hidden" />
   <h1>Name</h1>
   <label htmlFor="name"></label>
   <input type="text" 
  
  onChange={(e) => setform({
   ...form ,
   username : e.target.value
  })}
   value={form.username}/>


   
<h1>Email</h1>
   <label htmlFor="email"></label>
   <input type="text" 
  
onChange={(e) => setform({
   ...form ,
   email : e.target.value
})}
   value={form.email}
   />

   <div>
<Link to = "/changepassword">Change password </Link>
   </div>

   <div className="  flex  h-[50px] w-full align-middle mt-[]  justify-center">
    <button onClick={dataUpdate} className=" px-2 bg-yellow-300  h-[50px] w-[90px] text-white   hover:ease-in-out hover:underline"> Uppdate Profile  </button>
   </div>
   </div>
</div>



</Homelayout>



</>)

}


export  default  Updateprofile ;