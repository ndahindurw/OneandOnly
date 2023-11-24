import React from 'react';
import Navbar from '../navigationBar/navbar';

function RoomAvailable({image0}) {
    return (
        <div className='container'>
            <Navbar image0={image0}/>
            <div className="card-content">
                <div className="image-container">
                    <img src="../../assets/extendRoom3.jpg" alt="" />
                    <div className="descriptions">
                        <div>Wifi</div>
                        <div>Projector</div>
                        <label htmlFor="available">Status</label>
                        <span className='available'>Available</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomAvailable;