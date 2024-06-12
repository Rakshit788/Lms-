import {  useNavigate} from "react-router-dom";
import Homelayout from "../Homelayout";
import { useEffect } from "react";
import { Card  , Popover  } from "antd";





function CourseCard({data}){

  const content = (
    <div className='w-[200px] h-[250px]'>
 <p className=" text-black font-bold hover:text-purple-600"> {data?.title}</p>
 
  <p>{data?.description}</p>
  <p></p>

  <p className="px-2">-Understand what  the  project is</p>
  <p className="px-2">-Undestand the key project roles</p>
  <p className="px-2">-Understand the key project roles</p>
  <button className=" bg-purple-700 text-white w-[90px] h-[40px] ml-[50px] mt-[20px]">Buy course</button>
    </div>
  );

    const navigate =  useNavigate( )
 
  

    const handleclick =  () =>{
    navigate("/description" , {state : data}, )
    console.log(data);
   useEffect(()=>{
    console.log(data);
   })

    
    }
    return (
      <>
 
<Popover content= {content}>
<div className="w-[200px]  bg-white h-[220px] rounded-lg flex  flex-col  mx-[20px]" >
        <img src={data?.thumbnail} className="h-[100px] rounded-lg" alt="" />
        <p className=" text-black  font-semibold"> {data?.title} </p>
        <p className=" text-gray-500 hover:shadow-slate-700">{data?.description}</p>
        <p className=" text-black font-bold">{data?.createdperson}</p>
        <button className=" mt-[10px] bg-orange-400 hover:bg-orange-500 text-white w-[80px] rounded-[10px] mx-auto" onClick={handleclick}>Continue </button>
      
    </div>
</Popover>
  
      
      </>
    )


}



export  default  CourseCard ; 