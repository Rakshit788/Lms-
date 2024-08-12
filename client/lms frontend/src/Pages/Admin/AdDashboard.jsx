import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { fetchDashboardData } from "../../Redux/slice/courseslice";

function  Dasboard (){

    const data  =  useSelector((state) => state.auth.data)
             const coursesarray  =  data.courses 
             console.log(coursesarray);
             
    const dispatch  =  useDispatch() ;

    useEffect(() => {
        const fetchData = async () => {
            if (Array.isArray(coursesarray) && coursesarray.length > 0) {
                const res = await dispatch(fetchDashboardData(coursesarray));
                console.log(res);
            } else {
                console.error("coursesarray is not a valid array or is empty", coursesarray);
            }
        };
        fetchData();
    }, [dispatch, coursesarray]);
    

    return  (<>
    hh
    </>)
}



export  default  Dasboard  ;