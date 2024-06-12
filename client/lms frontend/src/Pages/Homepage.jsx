import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Homelayout from './Homelayout';
import { fetchcourses } from '../Redux/slice/courseslice';
import CourseCard from './Courses/CourseCards';

function Homepage() {
  const dispatch = useDispatch();
  const courselist = useSelector((state) => state.course.courselist);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchcourses());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log(courselist);
    if (courselist.length > 0) {
      setCurrentCourses(courselist.slice(currentIndex, currentIndex + 5));
    }
  }, [courselist, currentIndex]);

  const nextFive = () => {
    if (currentIndex + 5 < courselist.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const prevFive = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  return (
    <Homelayout>
      <div className='h-screen bg-white'>
        <Carousel autoplay speed={500}>
          <div className='mt-[10px] w-full h-[80px]'>
            <img
              className='h-[350px] w-[900px] mx-auto'
              src='https://img-c.udemycdn.com/notices/web_carousel_slide/image/2c7e2024-64a4-498e-ab41-096b9c5dc216.png'
              alt='carousel slide'
            />
          </div>
          <div>
            <img
              className='h-[350px] w-[1000px] mx-auto'
              src='https://img-c.udemycdn.com/notices/web_carousel_slide/image/4d948535-f1b7-41a3-bd95-344bd107aa69.jpg'
              alt='carousel slide'
            />
          </div>
        </Carousel>

        <div className='bg-gray-800 mx-auto mt-[10px] flex flex-row justify-between w-[1000px] h-[50px] p-2'>
          <h1 className='text-white'>
            Training 2 or more people? Get Your team access to 2500+ Courses
          </h1>
          <div className='flex flex-row gap-[3px]'>
            <button className='bg-white text-black'>Get Business</button>
            <button className='ml-[8px] bg-white text-black'>Dismiss</button>
          </div>
        </div>

        <div className='flex flex-col bg-white'>
          <h1 className='text-black text-[20px] font-bold mt-[12px]'>What to Learn Next</h1>
          <div className='flex gap-3 flex-wrap w-[100%] mt-[10px]'>
            {currentCourses.map((element) => (
              <CourseCard key={element._id} data={element} />
            ))}
          </div>
          <div className='flex justify-between mt-[10px]'>
            <button
              onClick={prevFive}
              disabled={currentIndex === 0}
              className='bg-gray-300 text-black py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500'
            >
              Previous
            </button>
            <button
              onClick={nextFive}
              disabled={currentIndex + 5 >= courselist.length}
              className='bg-gray-300 text-black py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      
      <div className=' w-full h-[350px]  bg-slate-900 flex flex-col  '> 

      <div className='flex flex-row w-[100%] h-[80px] justify-between border-[1px] border-b-gray-600'>
       <div className=' text-white flex flex-col'>
 <h1 className='text-[30px] ' >Teach the world online</h1>
 <p>Create an online video course, reach students across the globe, and earn money</p>
       </div>
       <button className=' bg-slate-700 text-white w-[150px] mr-5 mt-[15px] hover:bg-slate-600 rounded-[25px] h-[50px]'>Teach on Eguru</button>
      </div>
      <div className=' flex flex-row w-[100%] h-[60px] justify-between border-[1px] border-b-gray-600'>
    
      <div className=' text-white flex flex-col p-4'>

 <h1 className='text-[20px] ' >Top commpanies Choose <span className=' text-purple-400 hover:underline'>E Guru</span> to build in demand carrier</h1>

       </div>
        
      </div>
      <div className=' flex flex-row h-[200px] mt-[10px] gap-5'>

        <div className=' flex-col flex gap-2 w-[200px] ml-[30px] '>
          <p className=" text-gray-500 hover:underline px-3 text-center">E Guru Bussiness</p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Teach on Udemy </p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Get the App</p>
          <p className=" text-gray-500 hover:underline px-3 text-center">About us </p>
          <p className=" text-gray-500 hover:underline px-3 text-center">contact</p>
        </div>

        
        <div className=' flex-col flex gap-2 w-[200px] '>
          <p className=" text-gray-500 hover:underline px-3 text-center">Carrer</p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Blog  </p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Hepl And Support</p>
          <p className=" text-gray-500 hover:underline px-3 text-center"> Afillate </p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Investors</p>
        </div>


        <div className=' flex-col flex gap-2 w-[200px] '>
          <p className=" text-gray-500 hover:underline px-3 text-center">Terms</p>
          <p className=" text-gray-500 hover:underline px-3 text-center"> Privacy policy  </p>
          <p className=" text-gray-500 hover:underline px-3 text-center">Cookie settings</p>
          <p className=" text-gray-500 hover:underline px-3 text-center"> Site Map </p>
          <p className=" text-gray-500 hover:underline px-3 text-center"> Acessability Staement </p>
        </div>
     
     
      </div>

      </div>

      
    </Homelayout>
  );
}

export default Homepage;
