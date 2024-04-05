import cookieParser from "cookie-parser";
import cors from 'cors'
import express from "express";
import { config } from "dotenv";
import userrouter from "./routes/user.routes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import courserouter from "./routes/course.routes.js";





dotenv.config() 

const app = express()



app.use(bodyParser.json());

// app.use(express.json({extended : true})) 

app.use(cors({
    origin: "*" ,
    credentials:true
}))
app.use(cookieParser())

app.use('/api/vi/user' , userrouter)
app.use('/api/vi/course' ,  courserouter)


app.use('*' ,(req,resp)=>{
    resp.send("Opps || something went wrong")
})


export  { app } ; 
 