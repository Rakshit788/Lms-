import ApiError from "../utils/Api.error.js";
import ApiResponse from "../utils/Api.response.js";
import asynchandler from "../utils/asynchandler.js";
import { Course } from "../models/course.model.js";
import e from "express";
import upload from "../middleware/multer.middleware.js";
import uploadOnLocalFilePath from "../utils/cloudinary.js"; 
import { User } from "../models/user.model.js";





const getallcourses = asynchandler(async (req, res, next) => {
    const ids = req.body.ids;
    const coursesOfperson = [];

    // Check if ids is an array
    if (Array.isArray(ids)) {
        try {
            // Fetch courses by ID
            for (const id of ids) {
                const course = await Course.findById(id);
                if (course) {
                    coursesOfperson.push(course);
                } else {
                    // Optionally, handle cases where the course is not found
                    console.warn(`Course with ID ${id} not found.`);
                }
            }

            // Send response with fetched courses
            res.status(200).json(coursesOfperson);

        } catch (error) {
            // Handle errors during fetching
            console.error('Error fetching courses:', error);
            next(error); // Pass error to error-handling middleware
        }
    } else {
        // Handle case where ids is not an array
        const error = new ApiError(400, "Invalid input: 'ids' should be an array");
        next(error); // Pass error to error-handling middleware
    }
});




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
              const {title,person,category,des,price }  = req.body
              console.log( price);
    
    if(!person )  {
        throw new ApiError(400 , "Instructor name is required")
    }        
    
      // Check if Instructorname is provided
      if (!person) {
        throw new ApiError(400, "Instructor name is required");
    }

    // Check if category is provided
    if (!category) {
        throw new ApiError(400, "Category is required");
    }

    // Check if description is provided
    if (!des) {
        throw new ApiError(400, "Description is required");
    }

    // Check if title is provided
    // if (!title) {
    //     throw new ApiError(400, "Title is required");
    // }

    // Check if price is provided and is not an empty string
    if (price === "" || isNaN(price)) {
        throw new ApiError(400, "Valid price is required");
    }
    
    const thumbnail   =   req.file.path 
   
    
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
        description: des , 
        createdperson: person , 
        category : category , 
        thumbnail : thumbnailurl,
        price : Number(price) , 
    
    })
    
    if(!course){
        throw  new ApiError("unable to create a course")
    }  
     const id  = req.user._id ; 
       
     const user  =  await  User.findById(id) 
     console.log(user.username);  

     if(!user){
        throw  new ApiError('unable to find user to add course')
     }

 await user.courses.push(course.id) ; 

  console.log('user courses ' ,user.courses);

  await user.save() ;




     
    
    resp.status(200).json(
        new ApiResponse(200 , course , "sucess creation and addition" ,true)
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
 const {title ,  description  } =  req.body


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




