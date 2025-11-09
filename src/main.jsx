import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './Components/Login/Login.jsx';
import AddReview from './Components/AddReview/AddReview.jsx';
import PrivateRoute from './Routs/PrivateRoute.jsx';
import AllReviews from './Components/AllReviews/AllReviews.jsx';
import MyReviews from './Components/MyReviews/MyReviews.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:App,
    children:[
      {
        path:"/",
        Component:Home
      },
      {
        path:'register',
        Component:Register
      },
      {
        path:'login',
        Component:Login
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path:'All-Reviews',
        Component:AllReviews

      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
