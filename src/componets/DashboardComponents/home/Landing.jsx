import React from 'react';
import "./Landing.scss"
import SideBar from '../components/sidebarDash/SideBar';
import NavbarDash from '../components/navbarDash/NavbarDash';
import Widget from '../components/widget/WidgetApp';
import Table from '../components/table/Table';
import Booking from '../components/bookingtable/Booking';
import Role from '../components/authority/Role';
import AddAuthority from '../components/authority/AddAuthority';
import Signup from '../../signupFiles/signup';


function Landing({role}) {
    
    return (
        <div className='Landing'>
          
                <SideBar/>
                <div className="homeContent">
                    <NavbarDash />
                    <div className="widgets">
                        <Widget type="User"/>
                        <Widget type="ARoom"/>
                        <Widget type="BRoom"/>                       
                    </div>
                    <div className="listContainer">
                        
                        <div className='auths'>
                        
                        <AddAuthority/>
                        <Role/>
                        </div>
                    
                    </div>
                </div>

        </div>
    );
}

export default Landing;