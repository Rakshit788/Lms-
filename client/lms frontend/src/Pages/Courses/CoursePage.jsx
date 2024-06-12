import { useDispatch, useSelector } from "react-redux";
import { fetchcourses } from "../../Redux/slice/courseslice";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCards";

function CoursePage() {
  const dispatch = useDispatch();
  const courselist = useSelector((state) => state.course.courselist);
  const [visibleCourses, setVisibleCourses] = useState(5);
  console.log('hi');

  function nextFive() {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 5);
  }

  useEffect(() => {
    dispatch(fetchcourses());
  }, [dispatch]);

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col">
        <div>
          <h1 className="text-white font-bold text-center text-[40px]">
            Industry Level
            <span className="text-orange-500"> Courses</span>
          </h1>
        </div>

        <div className="flex gap-3 flex-wrap w-[100%] mt-[10px]">
          {courselist &&
            courselist.slice(0, visibleCourses).map((element) => (
              <CourseCard key={element._id} data={element} />
            ))}
          {visibleCourses < courselist.length && (
            <button onClick={nextFive}>Show More</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
