import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ClassPage } from './pages/ClassPage';
import { WelcomePage } from './pages/WelcomePage';
import { classLoader } from './pages/ClassPage';
import { StudentPage, studentLoader } from './pages/StudentPage';
import { AllStudentPage, allStudentLoader } from './pages/AllStudentPage';
import { UploadPage } from './pages/UploadPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Navbar/>}>
      <Route index element = {<WelcomePage/>}/>
      <Route path="/sign-in" element = {<SignInPage/>}/>
      <Route path="/sign-up" element = {<SignUpPage/>}/>
      <Route path="/classes" element = {<ClassPage/>} loader={classLoader}/>
      <Route path="/classes/:classId" element = {<ClassPage/>} loader={({params}) => classLoader(params)}/>
      <Route path="/students/:studentId" element = {<StudentPage/>} loader={({params}) => studentLoader(params)}/>
      <Route path="/students" element = {<AllStudentPage/>} loader={allStudentLoader}/>
      <Route path="/upload" element = {<UploadPage/>} />

    </Route>
  )
)

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
