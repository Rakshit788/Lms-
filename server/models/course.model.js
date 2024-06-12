import mongoose , {Schema} from "mongoose";

const courseschema = new Schema({
    title :{type : String}  , 
    description : {
        type : String
    } , 
    category : {
        type : String
    } , 

    thumbnail :  {
        type : String
    } , 

    price :{
     type : Number 
    } ,

    
    
    
    
    lectures : [{

        title : { type : String }, 
        description :{  type : String} , 
       
        url : {
            type : String
        }  }]

     , 
    numberoflectures : {
        type : Number
    } , 
    createdperson : {
        type : String , 
        
    }

    

}, {
    timestamps : true
})



export  const Course = mongoose.model("Course" , courseschema) 