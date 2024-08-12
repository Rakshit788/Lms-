import mongoose from "mongoose";

const  payementschema  = new mongoose.Schema({

orderId : {
    type : String ,
    required : true ,
    unique : true  
} ,

payementId : {
    type : String ,
    unique : true  
} ,
signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['created', 'successful', 'failed'],
    default: 'created',
  },
  createdAt : {
    type : Date ,
    default : Date.now()
  }


})

const Payment = mongoose.model('Payment', payementschema);


export default Payment