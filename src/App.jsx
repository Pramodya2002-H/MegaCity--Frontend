import { useState } from "react";
import{Route,Routes} from 'react-router-dom'

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

import Support from "./pages/Support/Support.jsx";
import Home from "./pages/HomePage/Home.jsx";
import Booking from "./pages/BookingPage/Booking.jsx";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard.jsx";
import Fleet from "./pages/Fleet Display/Fleet.jsx";
import Driver from "./pages/Drivers/Driver.jsx";

import AdminRoutes from "./Admin Panel/AdminRoutes.jsx";
import AdminSidebar from "./Admin Panel/AdminSidebar.jsx";

function App() {
  const [count, setCount] = useState(0)
  return (
    
      
        <>
       <div>
                
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/driverDashboard" element={<DriverDashboard/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/fleet" element={<Fleet/>}/>
            <Route path="/drivers" element={<Driver/>}/>
            <Route path="/admin/*" element={<AdminRoutes/>}/>
            <Route path="/adminSidebar" element={<AdminSidebar/>}/>
          </Routes>
          
         
          </div>
          </>
        
     
    
  );
}

export default App;
