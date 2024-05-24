import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import Login from './views/Login/Login'
import reportWebVitals from './reportWebVitals';
import Dashboard from './views/Dashboard/Dashboard';
import Admin from './views/Admin/Admin';
import SignUp from './views/SignUp/SignUp'
import Home from './views/Home/Home'
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  [
 
  {
    path: '/login',
    element: <Login />
  },
 

  {
    path: '/dashboard',
    element: <Dashboard />
  },
 
 
  {
    path:"/admin",
    element:<Admin/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/",
    element:<Home/>
  }
])

root.render(<RouterProvider router={router}/>)
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();