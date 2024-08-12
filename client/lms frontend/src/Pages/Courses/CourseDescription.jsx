import { useLocation } from "react-router-dom";
import Homelayout from "../Homelayout";

function CourseDetails ( ){
    const location  =  useLocation()
 

    const data =  location.state
    console.log(data);
    console.log(data.avatar);
    console.log(data.price);
    
    



    return (
     <Homelayout>
   <div className=" flex flex-col">
       <div className=" flex  flex-row  bg-gray-800  h-[400px]  w-full ">
        <div className=" w-[70%]  flex flex-col gap-[30px]">
         <h1 className=" text-[50px] text-white ml-[180px] mt-[50px]">{data.title}</h1>
         <p className=" text-[35px] text-white ml-[180px]  ">{data.description}</p>
      <div className=" flex flex-row gap-[10px] ">
      <p className=" bg-yellow-300 text-white w-[90px] h-[35px] ml-[170px]  text-center">Best seller</p>
      <p>4.7</p>
        </div>
        <p className=" mt-[3px] ml-[170px] text-gray-500 ">Cretaed by <span className=" text-purple-500 underline">{data.createdperson }</span></p>
        </div>
        <div className=" w-[30%] ">
     <div className="mt-[20px]  w-[300px] h-[500px] bg-white flex flex-col shadow-lg ">
       <div className=" border-b-gray-500 border-[1px] h-[130px]">
       <img src={data.thumbnail} className=" h-[100px] w-[300px]" alt="" />
       </div>
       <p className=" px-6 py-2 text-black mt-[6px] font-bold">
         Suscribe to E Guru top courses 
       </p>
       <p className=" mt-[3px] text-gray-500 px-6">
       Get this course, plus 11,000+ of our top-rated courses, with Personal Plan
       </p>
       <button className="mt-[9px] mx-auto h-[50px] w-[200px] bg-purple-500 text-white"> Start Subscription </button>
       <p className=" mt-[15px] font-bold text-black text-[20px] ">$ {data.price}</p>
        <button className=" text-black hover:bg-gray-500 bg-transparent mt-[9px] mx-auto h-[50px] w-[200px] border-[1px] "> Add to chart   </button>
     </div>
       </div>
     
       </div >
          
       <div className="  flex  flex-row border-[1px]  border-gray-500 mt-[40px]  ml-[30px]  w-[600px]  h-[270px] ">
        <div className=" flex flex-col w-[50%] ">
          <h1 className=" text-black text-[22px]  mt-[4px] ml-[3px] font-bold">What u will learn</h1>
          <div className=" flex flex-col gap-2 mt-[5px]">
            <li className=" text-[15px] text-gray-700 px-1 ">Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</li>
            <li className=" text-[15px] text-gray-700 px-1 " > After the course you will be able to build ANY website you want.</li>
            <li className=" text-[15px] text-gray-700 px-1 "> Work as a freelance web developer</li>
            <li className=" text-[15px] text-gray-700 px-1  "> Master backend development with Node</li>
          </div>
        </div>

        <div className=" flex flex-col w-[50%] ">
       
          <div className=" flex flex-col gap-2 mt-[30px]">
            <li className=" text-[15px] text-gray-700 px-1 ">Learn the latest technologies, including Javascript, React, Node and even Web3 development.</li>
            <li className=" text-[15px] text-gray-700 px-1 " >Build fully-fledged websites and web apps for your startup or business.</li>
            <li className=" text-[15px] text-gray-700 px-1 ">Master frontend development with React</li>
            <li className=" text-[15px] text-gray-700 px-1  "> Learn professional developer best practices.</li>
          </div>
        </div>

   
        


       </div>

       <div>
    <h1 className=" text-black font-bold text-[20px]">
    This course includes 
    </h1>
      <div className=" flex  flex-row  ">
            <div className=" flex flex-col gap-[3px]">
       <h1 >- Hours of content </h1>
       <p></p>
       <p>10 download resources </p>
            </div>
      </div>
    </div>


   </div>
     </Homelayout>
    )
}


export  default  CourseDetails