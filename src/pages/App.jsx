import BookForm from "../componets/Bookings/BookForm";
import {
  BookInputs,
  RoomInputs,
  UserInputs,
} from "../componets/DashboardComponents/components/FormSource";
import AddAuthority from "../componets/DashboardComponents/components/authority/AddAuthority";
import Role from "../componets/DashboardComponents/components/authority/Role";
import Landing from "../componets/DashboardComponents/home/Landing";
import AllList from "../componets/DashboardComponents/list/List";
import New from "../componets/DashboardComponents/new/New";
import NotFound from "../componets/ErrorPages/NotFound";
import Card from "../componets/cards/Card";
import RoomContainer from "../componets/cards/RoomAvailable";
import Home from "../componets/home/Home";
import Signin from "../componets/signupFiles/Signin";
import Signup from "../componets/signupFiles/signup";
import AdminRoute from "./AdminRoute";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import Setting from "../componets/DashboardComponents/single/settings";
import Table from "../componets/DashboardComponents/components/table/Table";
// ... (your imports)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="Login" element={<Signin />} />
          <Route path="RequestRom" element={<UserRoutes><RoomContainer /></UserRoutes>} />
          <Route path="signupPage" element={<Signup />} />
          <Route index path="Dashboard" element={<Landing />} />

          <Route path="Users/*">
            <Route  element={<Landing />} />
            <Route path="ListAllusers"  element={<Table title="ListAllusers" />} />
            <Route path=":userId" element={<Setting />} />
            <Route path="new-user" element={<Signup inputs={UserInputs} title="Add New user" />} />
          </Route>

          <Route path="Bookings/*">
            <Route  element={<Table title="ListBookings" />} />
            <Route path="new-bookings" element={<New inputs={BookInputs} title="Bookings Some Rooms" />} />
          </Route>

          <Route path="Rooms/*">
            <Route path="List-Availble-Rooms" element={<Table title="Available Some Rooms" />} />
            <Route path="List-Booked-Rooms" element={<Table title="Booked  Rooms" />} />

            <Route path="new-rooms" element={<New inputs={RoomInputs} title="Add Some Rooms Here" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
