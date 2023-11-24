import "./App.css";

import Home from "../componets/home/Home";
 import Login from "../componets/signupFiles/Login";
// import Signup from "../componets/signupFiles/signup";
import { Routes, Route } from "react-router-dom";
import Signup from "../componets/signupFiles/signup";
import Card from "../componets/cards/Card";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Contacts" element={<Home/>}/>
        <Route path="/Bookings" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/availableRoom" element={<Card/>}/>
      </Routes>
    </div>
  );
}

export default App;
