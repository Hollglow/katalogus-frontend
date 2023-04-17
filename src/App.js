import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DataPage } from './pages/DataPage';
import { WelcomePage } from './pages/WelcomePage';
import { classLoader } from './pages/DataPage';
import { StudentPage, studentLoader } from './pages/StudentPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Navbar/>}>
      <Route index element = {<WelcomePage/>}/>
      <Route path="/sign-in" element = {<SignInPage/>}/>
      <Route path="/sign-up" element = {<SignUpPage/>}/>
      <Route path="/data" element = {<DataPage/>} loader={classLoader}/>
      <Route path="/students/:studentId" element = {<StudentPage/>} loader={({params}) => studentLoader(params)}/>

    </Route>
  )
)

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
