import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../Redux/slice/courseslice";
import { useNavigate } from "react-router-dom";

function CourseCreate(){
const Adminname  =  useSelector((state) => state.auth.username) 
console.log(Adminname);

  const handlethumbnailinput  =  function(){
      document.getElementById('thumbnailput').click();
  }
  const dispatch  =  useDispatch()
    const [thumbnailurl  , setthumbnail]  =  useState("")
    const [coursedetails ,  setcoursedetails] =  useState({
        Instructorname : "" , 
        description  : "" , 
        category : "" , 
        thumbnail : "" , 
       title : ""

    })

   

    const iscreated  =   useSelector((state) => state.course.iscreated)
    const navigate  =  useNavigate()


const setimageurl = function (){
 const file  =  document.querySelector("input[type=file]").files[0]
    const filedata  =  new FileReader()
   if(file){
    filedata.readAsDataURL(file)
    setcoursedetails({...coursedetails , thumbnail : file})
   }

    filedata.addEventListener("load" , () =>{
      setthumbnail(filedata.result) 
      console.log(filedata.result);
    })
}


   


  async function coursecreation (){
const data  =  new FormData() 

data.append("Instructorname" , coursedetails.Instructorname)
data.append(" category" ,  coursedetails.category) 
data.append("description" , coursedetails.description)
data.append("title" ,  coursedetails.title)
data.append("thumbnail" , coursedetails.thumbnail )

await dispatch(createCourse(data))


if(iscreated){
navigate('/courses')

dispatch({type: "" , payload : false })

}



  }  
 

    
   
    

    return(
        <>
        
        <h1 className=" font-bold  text-[40px] text-center">
        Create Your
        <span className=" text-orange-500">Course</span>
        </h1>

        <div   id="thumbnail"   className=" flex  flex-col w-[400px] h-[500px] shadow-lg mt-[50px] border-gray-400 gap-[30px]  my-auto" >
            <h1 className=" text-white font-bold   text-[30px] text-center">New Course</h1>
            <div className="w-full  bg-transparent h-[40px]" onClick={handlethumbnailinput}>

              {thumbnailurl ? (<img src={thumbnailurl} alt="error"></img>) : (<p  className=" cursor-pointer text-black font-bold bg-transparent text-center mx-[60px] h-[40px]">Add thumbnail</p>)}
              <label htmlFor="thumbnail"  ></label>
              
              <input type="file" name="thumbnail" id="thumbnailput" 
              onChange={setimageurl}
             
              className=" hidden"/>


            </div>
       <div className=" w-full">
       <label htmlFor="Instructorname ">Name</label>
       <br />
             <input type="text"
             name="Instructorname"
              placeholder="Enter Your name "
              className=" bg-transparent border text-white"
              onChange={(e) =>{ setcoursedetails( {
                ...coursedetails ,
               Instructorname : e.target.value
            
              } )   }}
              value={coursedetails.Instructorname} />
              

       </div>
       <div className=" w-full">
       <label htmlFor="category">Category</label>
       <br />
             <input type="text"
             name="category"
              placeholder="Enter Your name "
              className=" bg-transparent border text-white"
              onChange={(e) =>{ setcoursedetails( {
                ...coursedetails ,
               category : e.target.value
            
              } )   }} />
              

       </div>
           
       
       <div className=" w-full">
       <label htmlFor="description">Description</label>
       <br />
             <input type="text"
             name="description"
              placeholder="Enter Your name "
              className=" bg-transparent border text-white"
              onChange={(e) =>{ setcoursedetails( {
                ...coursedetails ,
              description  : e.target.value
            
              } )   }} />

       </div>
           
       
   


       <div className=" w-full">
       <label htmlFor="title">Title</label>
       <br />
             <input type="text"
             name="title"
              placeholder="Enter Your name "
              className=" bg-transparent border text-white"
              onChange={(e) =>{ setcoursedetails( {
                ...coursedetails ,
               title : e.target.value
            
              } )   }} />

       </div>
       <div>
        <button className="" type="submit" onClick={coursecreation}>Create course</button>
       </div>
           

            
        </div>
        </>
    )
}

export  default   CourseCreate ; 