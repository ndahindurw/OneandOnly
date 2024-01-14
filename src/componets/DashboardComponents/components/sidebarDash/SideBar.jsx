import React from 'react';
import Dashboard from '@mui/icons-material/Dashboard';
import './SideBar.scss';
import { FaCircleUser } from 'react-icons/fa6';
import { MdMeetingRoom } from 'react-icons/md';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { FaHands } from 'react-icons/fa';
import { TbPower } from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SideBar({onSignupClick}) {
  return (
    <div className="sidebar">
      
      <strong className="logos">
                        <span className="first">Rwanda</span>
                        <span className="second"> Revenue</span>{" "}
                        <span className="teritiary">Authority</span>
                    </strong>
     
   
      <div className="center">
        <ul>
          <p>MAIN</p>
          <li>
            <Link to="/Dashboard">
              <Dashboard className="icon" />
              <span className="Dashbord">Home</span>
            </Link>
          </li>
        </ul>
        <ul>
          <p className="title">List</p>
          <li>
        <a onClick={() => onSignupClick()}>
            <FaCircleUser className="icon" />
            <span className="Dashbord">Signup</span>
        </a>
    </li>
        </ul>
        <ul>
          <li>
            <Link to="/Rooms/new-rooms">
              <MdMeetingRoom className="icon" />
              <span className="Dashbord">Rooms</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/Bookings/new-bookings">
              <VscGitPullRequestNewChanges className="icon" />
              <span className="Dashbord">Book Request</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/stats">
              <FaChartLine className="icon" />
              <span className="Dashbord">Stats</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/settings">
              <CiSettings className="icon" />
              <span className="Dashbord">Settings</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/help">
              <FaHands className="icon" />
              <span className="Dashbord">Help</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/Login">
              <TbPower className="icon" />{localStorage.clear()}
              <span className="Dashbord">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
