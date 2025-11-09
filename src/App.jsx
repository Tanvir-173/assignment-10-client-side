// import React from 'react';
// import Navber from './Components/Navber/Navber';
// import { Outlet } from 'react-router';
// import Footer from './Components/Footer/Footer';
// import Register from './Components/Register/Register';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from './Components/Login/Login';

// const App = () => {
//   return (
//     <div>
//         <Navber></Navber>
//         <Outlet>
//           <Register></Register>
//           <Login></Login>
//         </Outlet>
//         <Footer></Footer>
//         <ToastContainer 
//         position="top-right" 
//         autoClose={3000} 
//         hideProgressBar={false} 
//         newestOnTop={false} 
//         closeOnClick 
//         rtl={false} 
//         pauseOnFocusLoss 
//         draggable 
//         pauseOnHover
//       />
      
//     </div>
//   );
// };

// export default App;
import React from "react";
import { Outlet } from "react-router";
import Navber from "./Components/Navber/Navber";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navber />

      {/* Page content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
