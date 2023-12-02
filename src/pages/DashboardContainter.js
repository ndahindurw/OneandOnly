// DashboardContainter.js
import React from 'react';
import SideBar from '../componets/Dashbords/Components/SideBar';
import { Route, Routes } from 'react-router';
import DashboardHome from '../componets/Dashbords/Components/DashboardHome';

function DashboardContainter({DashboardHome}) {
  return (
    <div>
        <SideBar/>
        <div className="dashboard-container">
      <div className="content">
        <Routes>
          {/* Add other Dashboard child routes */}
          <Route path="/Dashboard/Home" element={<DashboardHome />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default DashboardContainter;
