import "./App.css";

import Home from "../componets/home/Home";
 import Login from "../componets/signupFiles/Login";
// import Signup from "../componets/signupFiles/signup";
import { Routes, Route } from "react-router-dom";
import Signup from "../componets/signupFiles/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Contacts" element={<Home/>}/>
        <Route path="/Bookings" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
