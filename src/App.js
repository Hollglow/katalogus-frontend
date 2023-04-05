import { AuthPage } from './pages/AuthPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DataPage } from './pages/DataPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Navbar/>}>
      <Route index element = {<AuthPage/>}/>
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
