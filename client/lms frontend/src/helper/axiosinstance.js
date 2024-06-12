import  axios from  "axios" 

const Base_url  =  "http://localhost:8112/api/vi"


const axiosInstance =  axios.create({
    baseURL : Base_url , 
    timeout : 5000 , 
    withCredentials : true
}) 

export  default axiosInstance ; 