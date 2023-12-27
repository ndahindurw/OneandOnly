import React from 'react';
import SideBar from '../components/sidebarDash/SideBar';
import NavbarDash from '../components/navbarDash/NavbarDash';
import { image4 } from '../../images';
import './Single.scss'
import Booking from '../components/bookingtable/Booking';


function Single(props) {
    return (
        <div className='single'>
            <SideBar/>
            <div className='singlecontainer'>
                <NavbarDash/>
                <div className="bottom-booking">
                <Booking/>
                </div>
            </div>
        </div>
    );
}

export default Single;