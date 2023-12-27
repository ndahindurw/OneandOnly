import React from 'react';
import './Navbar.scss';
import { FcSearch } from "react-icons/fc";
import { IoNotifications } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { image3 } from '../../../images';
function NavbarDash({}) {
    return (
        <div className='navbar'>
            <div className="wrapper-list"> 
            <div className="search">
                <input type="text"  placeholder='Search...'/>
        
            </div>
            <div className="items-list">
                
                <div className="item-li">
                  <IoChatbubbleEllipsesOutline className='icon' />  
                  <div className="counter">1</div> 
                </div>
                <div className="item-li">
                  <IoNotifications className='icon'/>   
                  <div className="counter">3</div> 
                </div>
                <div className="item-li">
                  <LuListTodo className='icon'/>   
                </div>
                <div className="item-li">
                  <img src={image3} alt="" className="avatar" />  
                </div>
            </div>
            </div>
        </div>
    );
}

export default NavbarDash;