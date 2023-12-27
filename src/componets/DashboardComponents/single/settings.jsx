import React from 'react';
import { image4 } from '../../images';
import './Single.scss'

function Setting(props) {
    return (
        <div>
            <div className='top'>
                    <div className="left">
                        <div className="editbutton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img 
                            src={image4}
                            alt="" 
                            className="room" />
                            <div className="details">
                                <h1 className="itemtitle">Tresor Xavier</h1>
                                <div className="detailitem">
                                    <span className="itemkey">Email:</span>
                                    <span className="itemvalue">tresorxavier16@gmail.com</span>
                                </div>
                                <div className="detailitem">
                                    <span className="itemkey">Phone:</span>
                                    <span className="itemvalue">07871234</span>
                                </div>
                                <div className="detailitem">
                                    <span className="itemkey">Adress:</span>
                                    <span className="itemvalue">Kigali</span>
                                </div>
                                <div className="detailitem">
                                    <span className="itemkey">Department:</span>
                                    <span className="itemvalue">Software Engineer </span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="right"></div>
                </div>
        </div>
    );
}

export default Setting;