import { useState } from "react";
import{Route,Routes} from 'react-router-dom'

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

import Support from "./pages/Support/Support.jsx";
import Home from "./pages/HomePage/Home.jsx";
import Booking from "./pages/BookingPage/Booking.jsx";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard.jsx";

import Dashboard from "./pages/AdminDashboard/Dashboard.jsx";
import Fleet from "./pages/Fleet Display/Fleet.jsx";
import Driver from "./pages/Drivers/Driver.jsx"



function App() {
  const [count, setCount] = useState(0)
  return (
    
      
        <>
       <div>
                
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="booking" element={<Booking/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="driverDashboard" element={<DriverDashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="support" element={<Support/>}/>
            <Route path="fleet" element={<Fleet/>}/>
            <Route path="drivers" element={<Driver/>}/>
            
          </Routes>
          
         
          </div>
          </>
        
     
    
  );
}

export default App;
