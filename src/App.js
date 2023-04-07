import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DataPage } from './pages/DataPage';
import { WelcomePage } from './pages/WelcomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Navbar/>}>
      <Route index element = {<WelcomePage/>}/>
      <Route path="/sign-in" element = {<SignInPage/>}/>
      <Route path="/sign-up" element = {<SignUpPage/>}/>
      <Route path="/data" element = {<DataPage/>}/>

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
