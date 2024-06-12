import { Router} from  'express' 
import {getallcourses,createcourse,updatecourse , deletecourse , createLecturesThroughId} from  '../controller/course.controller.js';
import { get } from 'mongoose';
import upload  from '../middleware/multer.middleware.js';
import { authmiddleware , currentroles } from '../middleware/auth.middleware.js';


const courserouter =  Router();


courserouter.route('/')
            .get(authmiddleware , getallcourses)
            .post(authmiddleware ,currentroles,  upload.single('thumbnail')  , createcourse)
            
                
courserouter.route('/:id')
            .get(getallcourses)
            .post(authmiddleware , currentroles , updatecourse)
            .post(authmiddleware , currentroles ,  deletecourse)
          

            courserouter.route('/:id/lectures')
                        .post(authmiddleware, upload.single('vieddolecturepath') , createLecturesThroughId)
            



export default courserouter ; 