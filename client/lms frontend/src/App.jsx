import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your components and pages
import Homelayout from './Pages/Homelayout';
import Homepage from './Pages/Homepage';
import Aboutus from './Pages/Aboutus';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import CoursePage from './Pages/Courses/CoursePage';
import Logout from './Pages/Logout';
import CourseDetails from './Pages/Courses/CourseDescription';
import Authcheck from './components/Auth/Auth';
import CourseCreate from './Pages/Courses/Createcourse';
import Err from './Pages/Notfound';
import Updateprofile from './Pages/UpdateuserProfile';
import ChangePassword from './Pages/Changepassword';
import { createTheme  ,  ThemeProvider} from '@mui/material/styles';
import { withTheme } from '@emotion/react';






function App() {
  return (
    <>
    
      <Routes>
        {/* Use Homelayout as the layout for your main routes */}
      
          <Route path='/' element={<Homepage />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/courses' element={<CoursePage />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/description' element={<CourseDetails />} />
          <Route path='/checkauth' element={<Authcheck />}>
            <Route path='course/create' element={<CourseCreate />} />
          </Route>
          <Route path='/notfound' element={<Err />} />
          <Route path='/updateProfile' element={<Updateprofile/>}></Route>
          <Route path='/changepassword' element = {<ChangePassword/>}></Route>
        
      </Routes>
    </>
  );
}

export default App;

