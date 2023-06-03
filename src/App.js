import { SignInPage } from './pages/SignInPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ClassPage } from './pages/ClassPage';
import { WelcomePage } from './pages/WelcomePage';
import { classLoader } from './pages/ClassPage';
import { StudentPage, studentLoader } from './pages/StudentPage';
import { AllStudentPage, allStudentLoader } from './pages/AllStudentPage';
import { UploadPage } from './pages/UploadPage';
import PermissionProvider from './components/PermissionProvider';
import { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import { TestPage } from './pages/TestPage';
import { ErrorPage } from './pages/ErrorPage';
import { ClassesPage, classesLoader } from './pages/ClassesPage';
import { GuardedRoute } from './components/GuardedRoute';
import { updateProfile } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(async () => {
    const user = auth.currentUser;
    if(user){
      const token = await user.getIdTokenResult();
      await updateProfile(user, {
        photoURL: "https://picsum.photos/200"
      });
      return token;
    } else {
      return user;
    }
  });
  
  useEffect(() => {
    auth.onAuthStateChanged( async (firebaseUser) => {
      if(firebaseUser){
        const claims = await firebaseUser.getIdTokenResult();
        setUser(claims);
      } else {
        setUser(null);
      }
    });
  }, []);
  console.log("user", user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" element = {<Navbar/>}>
        <Route index element = {<WelcomePage/>}/>
        <Route path="/test" element = {<TestPage/>}/>
        <Route path="/sign-in" element = {<SignInPage/>}/>
        <Route element={<GuardedRoute AccessibleTo={["tanar", "admin"]} redirectRoute='/error'/>}>
          <Route path="/classes" element = {<ClassesPage/>} loader={classesLoader}/>
        </Route>
        <Route element={<GuardedRoute AccessibleTo={["tanar", "admin"]} redirectRoute='/error'/>}>
          <Route path="/classes/:classId" element = {<ClassPage/>} loader={({params}) => classLoader(params)}/>
        </Route>
        <Route element={<GuardedRoute AccessibleTo={["diak", "tanar", "admin"]} redirectRoute='/error'/>}>
          <Route path="/students/:studentId" element = {<StudentPage/>} loader={({params}) => studentLoader(params, user.claims)}/>
        </Route>
        <Route element={<GuardedRoute AccessibleTo={["tanar", "admin"]} redirectRoute='/error'/>}>
          <Route path="/students" element = {<AllStudentPage/>} loader={() => allStudentLoader(user.claims)}/>
        </Route>
        <Route element={<GuardedRoute AccessibleTo={["admin"]} redirectRoute='/error'/>}>
          <Route path="/upload" element = {<UploadPage/>} />
        </Route>
        <Route path="/error" element = {<ErrorPage/>} />
  
      </Route>
    )
  )
  return (
    <PermissionProvider permissions={user ? user.claims : {loggedOut: true}}>
      <RouterProvider router={router}/>
    </PermissionProvider>
  );
  
}

export default App;
