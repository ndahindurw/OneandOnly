import React, { useState } from 'react';
import "./Landing.scss";
import SideBar from '../components/sidebarDash/SideBar';
import Widget from '../components/widget/WidgetApp';
import Table from '../components/table/Table';
import AddAuthority from '../components/authority/AddAuthority';
import Role from '../components/authority/Role';
import Signup from '../../signupFiles/signup';

function Landing() {
    const [showSignup, setShowSignup] = useState(false);

    const handleSignupClick = () => {
        setShowSignup(true);
    };

    return (
        <div className='Landing'>
            <SideBar onSignupClick={handleSignupClick} />
            <div className="homeContent">
                <div className="widgets">
                    <Widget type="User"/>
                    <Widget type="ARoom"/>
                    <Widget type="BRoom"/>                       
                </div>
                <div className="listContainer">
                    <div className='auths'>
                        {showSignup ? (
                            <Signup />
                        ) : (
                            <>
                                <AddAuthority />
                                <Role />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
