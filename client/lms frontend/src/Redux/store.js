import { configureStore } from "@reduxjs/toolkit";
import authslice from "./slice/authslice";
import courseslice from "./slice/courseslice";



const store =  configureStore({
    reducer : {
        auth : authslice  ,
       course : courseslice
    },
    
    devTools : true,
    

})





export default  store ; 