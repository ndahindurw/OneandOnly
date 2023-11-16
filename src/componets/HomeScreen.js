import React from 'react';
import RRALogo from '../assets/RRAImage.jpg'

function HomeScreen(props) {
    return (
        <div>
           <div className="logo">
            <img src={RRALogo} alt="Primary -Logo"/>
            </div> 
            
        </div>
    );
}

export default HomeScreen;