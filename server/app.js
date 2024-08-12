import cookieParser from "cookie-parser";
import cors from 'cors'
import express from "express";
import { config } from "dotenv";
import userrouter from "./routes/user.routes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import courserouter from "./routes/course.routes.js";
import Razorpay from 'razorpay'
import payementrouter from "./routes/payement.routes.js";






dotenv.config() 

const app = express()



app.use(bodyParser.json());

// app.use(express.json({extended : true})) 

app.use(cors({
    origin: "http://localhost:5173" ,
    credentials:true
}))
app.use(cookieParser())

const instance = new Razorpay({
    key_id: 'rzp_test_PIk9M15YBiNRH5',
    key_secret: 't5AB8R3tUoqVBgR3qzwuhAka',
});

// # const Razor =  new razorpay({
//     #    key_id: 'rzp_test_PIk9M15YBiNRH5',
//     #     key_secret: 't5AB8R3tUoqVBgR3qzwuhAka' ,
//     # })
    

app.use('/api/vi/user' , userrouter)
app.use('/api/vi/course' ,  courserouter)
app.use('/api/vi/payment' ,  payementrouter)


app.use('*' ,(req,resp)=>{
    resp.send("Opps || something went wrong")
})


export  { app , instance } ; 

 