import React from 'react';
import './Error.css'
import Navbar from '../navigationBar/navbar';

function NotFound() {
    return (
        <div>
            <Navbar/>
            <div className='Not-Found'>
            
            <h1 className='error-title'>
             Page was Not Found
             </h1> 
             <p className='error-description'>
                 😒Oops! We Are Not Able To Find That Page 
             </p>
         </div>
        </div>
    );
}

export default NotFound;