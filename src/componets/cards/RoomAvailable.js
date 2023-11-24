import React from 'react';
import Navbar from '../navigationBar/navbar';


function RoomAvailable({images}) {

    const {image2 ,image4,image5} =images
    return (
        <div className='container'>
            <Navbar/>
            <Card
                title="Card 1"
                image={image2}
                description=""
                facilties={<AiOutlineWifi/>}
                address={<IoLocationSharp />}

            />
            <Card
                title="Card 2"
                image={image5}
                description=""
                facilties={<AiOutlineWifi/>}
                address={<IoLocationSharp />}
            />
            <Card
                title="Card 2"
                image={image4}
                description=""
                facilties={<AiOutlineWifi/>}
                address={<IoLocationSharp />}
            />
         
        </div>
    );
}

export default RoomAvailable;