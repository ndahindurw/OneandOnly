
import React from 'react';
import '../Dashboard.css';

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <div className="cardContent">
        <div className="card-body">
          <h5 className="card-title">Account Numbers</h5>
          <p className="card-text">12345</p>
        </div>
      </div>

      <div className="cardContent">
        <div className="card-body">
          <h5 className="card-title">Total Rooms</h5>
          <p className="card-text">50</p>
        </div>
      </div>

      <div className="cardContent">
        <div className="card-body">
          <h5 className="card-title">Available Rooms</h5>
          <p className="card-text">30</p>
        </div>
      </div>

      <div className="cardContent">
        <div className="card-body">
          <h5 className="card-title">Booked Rooms</h5>
          <p className="card-text">20</p>
        </div>
      </div>
    </div>

  );
}

export default DashboardHome;
