import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../Redux/slice/courseslice";
import { useNavigate } from "react-router-dom";
import { updateUserCourse } from "../../Redux/slice/authslice";

function CourseCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const Adminname = useSelector((state) => state.auth.username);
  const courselist = useSelector((state) => state.course.courselist); // Selector for courselist
  const iscreated = useSelector((state) => state.course.iscreated);
  const data  =  useSelector((state) => state.auth.data)
  const id  =  data?._id 
  console.log(id, iscreated);


  const [thumbnailurl, setthumbnail] = useState("");
  const [coursedetails, setcoursedetails] = useState({
    Instructorname: Adminname,
    description: "",
    category: "",
    thumbnail: "",
    title: "",
    price: "",
  });

  const handlethumbnailinput = () => {
    document.getElementById("thumbnailput").click();
  };

  const setimageurl = () => {
    const file = document.querySelector("input[type=file]").files[0];
    const filedata = new FileReader();
    if (file) {
      filedata.readAsDataURL(file);
      setcoursedetails({ ...coursedetails, thumbnail: file });
    }

    filedata.addEventListener("load", () => {
      setthumbnail(filedata.result);
      console.log(filedata.result);
    });
  };

  const coursecreation = async () => {
    const data = new FormData();

    data.append("person", coursedetails.Instructorname);
    data.append("category", coursedetails.category);
    data.append("des", coursedetails.description);
    data.append("title", coursedetails.title);
    data.append("thumbnail", coursedetails.thumbnail);
    data.append("price", coursedetails.price);

    await dispatch(createCourse(data)); // Wait for the course to be created

    if(iscreated){
      console.log(`Navigating to /admin-${id}/dashboard`);
      navigate(`/admin-${id}/dashboard`);
    }
  };

  return (
    <>
      <h1 className="font-bold text-[40px] text-center">
        Create Your <span className="text-orange-500">Course</span>
      </h1>

      <div
        id="thumbnail"
        className="flex flex-col w-[400px] h-[550px] shadow-lg mt-[50px] border-gray-400 gap-[30px] my-auto"
      >
        <h1 className="text-white font-bold text-[30px] text-center">New Course</h1>
        <div className="w-full bg-transparent h-[40px]" onClick={handlethumbnailinput}>
          {thumbnailurl ? (
            <img src={thumbnailurl} alt="error" />
          ) : (
            <p className="cursor-pointer text-black font-bold bg-transparent text-center mx-[60px] h-[40px]">
              Add thumbnail
            </p>
          )}
          <label htmlFor="thumbnail"></label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnailput"
            onChange={setimageurl}
            className="hidden"
          />
        </div>
        <div className="w-full">
          <label htmlFor="Instructorname">Name</label>
          <br />
          <input
            type="text"
            name="Instructorname"
            className="bg-transparent border text-black"
            value={coursedetails.Instructorname}
            readOnly
          />
        </div>
        <div className="w-full">
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            name="category"
            placeholder="Enter Your name"
            className="bg-transparent border text-white"
            onChange={(e) =>
              setcoursedetails({
                ...coursedetails,
                category: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            name="description"
            placeholder="Enter Your name"
            className="bg-transparent border text-white"
            onChange={(e) =>
              setcoursedetails({
                ...coursedetails,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="Enter Your name"
            className="bg-transparent border text-black"
            onChange={(e) =>
              setcoursedetails({
                ...coursedetails,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label htmlFor="title">Price</label>
          <br />
          <input
            type="text"
            name="price"
            placeholder="Enter course price"
            className="bg-transparent border text-black"
            onChange={(e) =>
              setcoursedetails({
                ...coursedetails,
                price: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button type="submit" onClick={coursecreation}>
            Create course
          </button>
        </div>
      </div>
    </>
  );
}

export default CourseCreate;
