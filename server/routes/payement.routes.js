import { Router  } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { checkoutPayment , verifypayment } from "../controller/payement.controller.js";


const payementrouter =   Router() 


payementrouter.post("/checkout" , authmiddleware ,checkoutPayment )
payementrouter.post("/verify" , authmiddleware , verifypayment)




               export default payementrouter
