import { useLocation } from "react-router-dom";
import Homelayout from "../Homelayout";

function CourseDetails ( ){
    const location  =  useLocation()
 

    const data =  location.state
    



    return (
     <Homelayout>
          <div className="  flex justify-center my-auto mt-20">
     <div className=" flex fle-row gap-2">
        <img src= {data?.thumbnail} alt="" className=" w-[400px]" />
     <div className=" flex  flex-col">
        <h1 className="  text-white  font-semibold text-[22px]"> Title :<span className="  text-orange-500">{data?.title}</span>  </h1>
        <h1 className="  text-white  font-semibold  text-[22px]"> Description :<span className="  text-orange-500">{data?.description}</span>  </h1>
        <h1 className="  text-white font-semibold text-[22px]"> Mentor :<span className="  text-orange-500">{data?.createdperson}</span>  </h1>
        <button className=" rounded-[26px] text-white  bg-orange-500 mt-[10px] w-[120px] h-[40px] mx-auto" > Suscribe</button>


     </div>

      </div>
     </div>
     </Homelayout>
    )
}


export  default  CourseDetails