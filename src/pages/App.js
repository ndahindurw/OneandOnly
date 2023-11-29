import "./App.css";

import Home from "../componets/home/Home";

// import Signup from "../componets/signupFiles/signup";
import { Routes, Route } from "react-router-dom";
import Signup from "../componets/signupFiles/signup";
import Card from "../componets/cards/Card";
import NotFound from "../componets/ErrorPages/NotFound";
import Signin from "../componets/signupFiles/Signin";
import SideBar from "../componets/Dashbords/dashbComponents/SideBar";
import RoomContainer from "../componets/cards/RoomAvailable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Bookings" element={<SideBar/>}/>
        <Route path="/Contacts" element={<Home/>}/>
        <Route path="/Login"  element={<Signin/>}/>
        <Route path="/signupPage" element={<Signup/>}/>
        <Route path="/availableRoom" element={<RoomContainer/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
