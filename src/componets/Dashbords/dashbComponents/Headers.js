import React from 'react';
import {BsFillBellFill, BsSearch, BsJustify, BsPersonCircle, BsFillEnvelopeFill} from 'react-icons/bs'
import '../Dashboard.css'

function Header(props) {
    
    return (
       <header className='headers'>
        <div className="menu-icon">
            <BsJustify className='icon'/>
        </div>
        <div className='header-left'>
            <BsSearch className='icon'/>
          
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
       </header>
    );
}

export default Header;
