// DashboardContainter.js
import React from 'react';
import SideBar from '../componets/Dashbords/Components/SideBar';
import { Route, Routes } from 'react-router';
import DashboardHome from '../componets/Dashbords/Components/DashboardHome';
import BookForm from '../componets/Bookings/BookForm';

function DashboardContainter({DashboardHome}) {
  return (
    <div>
        <SideBar/>
        <div className="dashboard-container">
      <div className="content">
        <Routes> 
          <Route path="/Dashboard/Home" element={<DashboardHome />} />
          <Route path="/Dashboard/Form" element={<BookForm />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default DashboardContainter;
