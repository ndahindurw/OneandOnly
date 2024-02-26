import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../Axios/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import RoomEditPopup from './RoomEditPopup';
import { Dialog, DialogContent } from '@mui/material';


function RenderRoom({ title }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axiosInstance.get(process.env.REACT_APP_FETCH_ROOMS);
                setRoomData(response.data);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRoomData();
    }, []);

    const scrollToBookingForm = () => {
        // Define your scroll functionality here
    };

    const handleFormLoad = () => {
        setEditPopupVisible(!editPopupVisible);
        if (!editPopupVisible) {
            scrollToBookingForm();
        }
    };

    const handleEditPopupUpdate = () => {
        // Define your update functionality here
    };

    const HandleSumitionForm = () => {
        // Define your form submission functionality here
    };

    const HandleChanges = () => {
        // Define your changes handling functionality here
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setRoomId(item.roomID);
        setEditPopupVisible(true);
    };

    const handleDelete = (item) => {
        // Handle delete functionality here
        console.log('Delete item:', item);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <h2>Room Data</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Room Location</th>
                                    <th>Description</th>
                                    <th>Capacity</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomData.map(room => (
                                    <tr key={room.roomID}>
                                        <td>{room.roomLocation}</td>
                                        <td>{room.roomDescription}</td>
                                        <td>{room.capacity}</td>
                                        <td><img src={room.imagePath} alt="Room" className="img-fluid" style={{ maxWidth: '100px' }} /></td>
                                        <td>{room.status === 1 ? "Active" : "Inactive"}</td>
                                        <td className="button-cell">
                                            <button type="button" className="btn btn-success mr-2" onClick={() => handleEdit(room)}>
                                                <FontAwesomeIcon icon={faEdit} className="s-icons" />
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(room)}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="s-icons" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editPopupVisible && (
                            <Dialog open={editPopupVisible} onClose={handleFormLoad} maxWidth="l" fullWidth>
                                <DialogContent>
                                  
                                    <form onSubmit={HandleSumitionForm}>
                                        <div title={title}>
                                        
                                                <RoomEditPopup title="Edit Room" roomId={roomId} onUpdate={handleEditPopupUpdate} />
                                            
                                         
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderRoom;
