import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import DriverContent from "./DriverContent";
import CarContent from "./CarContent";
import BookingContent from "./BookingContent";

const AdminRoutes = () => {
  return (
    <div >
        <Routes>

         <Route path='/' element={<AdminLayout/>} >
         <Route index element={<AdminDashboard/>} />
         <Route path='dashboard' element={<AdminDashboard/>} />
         <Route path='driverContent' element={<DriverContent/>}/>
         <Route path='carContent' element={<CarContent/>}/>
         <Route path='bookingContent' element={<BookingContent/>}/>
        
         </Route>

        </Routes>

    </div>
  );
}

export default AdminRoutes;