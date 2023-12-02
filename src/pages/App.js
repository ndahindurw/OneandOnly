import "./App.css";

import Home from "../componets/home/Home";

// import Signup from "../componets/signupFiles/signup";
import { Routes, Route, Outlet } from "react-router-dom";
import Signup from "../componets/signupFiles/signup";
import Card from "../componets/cards/Card";
import NotFound from "../componets/ErrorPages/NotFound";
import Signin from "../componets/signupFiles/Signin";
import SideBar from "../componets/Dashbords/Components/SideBar.js";
import RoomContainer from "../componets/cards/RoomAvailable";
import AdminRoute from "./AdminRoute";
import UserRoutes from "./UserRoutes.js";
import BookForm from "../componets/Bookings/BookForm.js";
import ClientDash from "../componets/Dashbords/ClientsPages/Clients.js";
import DashboardHome from "../componets/Dashbords/Components/DashboardHome.js";
import DashboardContainter from "./DashboardContainter.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={
        <Home/>
        }/>
      <Route path="/Dashboard/*" element={<DashboardContainter />} />

        
       
        <Route path="/"  element={<Signin/>}/>
        <Route path="/BookForm"  element={<BookForm/>}/>
        <Route path="/signupPage" element={<Signup/>}/>
        <Route path="/availableRoom" element={
            <RoomContainer/>   
        }/>
        

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
