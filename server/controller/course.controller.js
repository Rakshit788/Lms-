import ApiError from "../utils/Api.error.js";
import ApiResponse from "../utils/Api.response.js";
import asynchandler from "../utils/asynchandler.js";
import { Course } from "../models/course.model.js";
import e from "express";
import upload from "../middleware/multer.middleware.js";
import uploadOnLocalFilePath from "../utils/cloudinary.js";





const getallcourses =  asynchandler(async (req, resp ,next) =>{

    try {
        const course  = await Course.find({}).select("-lectures")
        resp.status(200)
        .json(new ApiResponse("true" ,  course))
    
    } catch (error) {
        throw new ApiError("opps Something went wrong while fetching the courses")
    }

  
  
  
  

    
} )



const getlecturesThroughId =  asynchandler(async(req, resp , next) =>{
  try {
      const { id } =  req.params 
  
      const lectures  =  await Course.findById(id).select("lectures") 
  
      if(!lectures){
          throw new ApiError(400 ,  "OPPS Something went wrong ,  Unable to fetch the lectures through ID")
      }
  
  } catch (error) {
    throw  error
  }


  resp.status(200)
  .json(new ApiResponse(true,  " Able to fetch lectures through id" ) )
    


})


const createcourse =  asynchandler(async(req, resp,next)=>{
    try {
              const {Instructorname , category , description , title }  = req.body
              console.log(Instructorname,category , description ,title);
    
    if(!Instructorname )  {
        throw new ApiError(400 , "Instructor name is required")
    }        
    
    if(!( category || description || title)){
    throw  new ApiError(400, 'Something went wrong with details of course ')
    
   
    
    }
    
    
    const thumbnail   =   req.file.path 
    console.log(thumbnail);
    
    if(!thumbnail){
        throw new ApiError(400 ,  "unable the find the thumnail")
    }
    
    const  thumbnailurl = await uploadOnLocalFilePath(thumbnail)
    console.log(thumbnailurl);
    
    if(!thumbnailurl){
        throw  new ApiError(400 ,  "unable the save  the thumnail")
    }
    
    const course = await Course.create({
        title : title , 
        description: description , 
        createdperson: Instructorname , 
        category : category , 
        thumbnail : thumbnailurl
    
    })
    
    if(!course){
        throw  new ApiError("unable to create a course")
    }
    resp.status(200).json(
        new ApiResponse(200 , course , "sucess creation" ,true)
    )

 
  
    } catch (error) {
       throw error
    }

  }) 
  
  
  
  const updatecourse =  asynchandler(async(req,resp,next) =>{
  try {
       const {id} =  req.params
       const course = await Course.findByIdAndUpdate(id , {
          $set : req.body   }, 
          
          {
              runValidators : false
          }
          )
  
       if(!course){
          throw  new ApiError("something went wrong while updating the course")
       }
  
  resp.status(200)
      .json(new ApiResponse(true , 'Course updated sucessfully '))
  } catch (error) {
      throw error 
  }
  
  
  })


const deletecourse = asynchandler(async(req, resp , next)=>{

    const { id} =  req.params 

    const course = await Course.findByIdAndDelete(id)

    if(!course){
        throw new ApiError(400 , 'Unable to delete the course'  )
    }




})
 


const createLecturesThroughId =  asynchandler(async(req,resp ,next) =>{
 const {id} =  req.params
 const {title ,  description} =  req.body


 if(!(title && description)){
    throw  new  ApiError(400 ,  "title and viedo  description  is required")
 }

 const vieddolecturepath = req.file.path 

 const viedolectureUrl = await uploadOnLocalFilePath(vieddolecturepath) 
 
 
 if(!viedolectureUrl){
    throw  new ApiError(400 , 'Unable to save  the lecturres viedos  ')

 }
 console.log(viedolectureUrl);
 
 const course =  await Course.findById(id)

 

 

 course.lectures.push({
    title :  title,
    description: description ,
    url : viedolectureUrl
 }) 
 


 if(course.lectures.some( field => !field.title ||!field.description || !field.url ))
{
    throw new  ApiError(400 ,  "lectures are not  added in data base  ")
}

await  course.save()


resp.send(200)


}) 
 



export  {getallcourses,getlecturesThroughId ,  updatecourse , createcourse,deletecourse, createLecturesThroughId}




