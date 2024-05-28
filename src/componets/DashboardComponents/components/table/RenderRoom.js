import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../Axios/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import RoomEditPopup from './RoomEditPopup';
import { Dialog, DialogContent } from '@mui/material';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { CSVLink } from 'react-csv';
import authService from '../../../Services/authService';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import useFetch from '../../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../sidebarDash/SideBar';
import html2canvas from 'html2canvas';



function RenderRoom({ title }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [clickedRoom, setClickedRoom] = useState([]);
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [bookings, setBookings] = useState([])

  const [showSignup, setShowSignup] = useState(false);
  const [showRoom, setShowRoom] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowRoom(false);
  };

  const handleRoomClick = () => {
    setShowRoom(!showRoom);
    setShowSignup(false);
  };


  const handleReport = () => {
    setShowSignup(false);
    setShowRoom(false);
  };


  const navigate = useNavigate();


  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, roomData.length));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_ROOMS);
        setRoomData(response.data);
        console.log("Rooms dataa", response.data)
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, []);

  const openDeleteDialog = (room) => {
    setRoomToDelete(room);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setRoomToDelete(null);
  };


  const handleFormLoad = () => {
    setEditPopupVisible(!editPopupVisible);

  };

  const handleEditPopupUpdate = () => {

  };

  const HandleSumitionForm = () => {


  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_FETCH_EVENTS)
      .then((response) => setBookings(response.data))
      .catch((error) => setError(error.message));
  }, []);

  const exportPDF = () => {
    const input = document.getElementById('excelTable');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.setFontSize(12);
        pdf.text("RWANDA REVENUE AUTHORITY", 10, 10);
        pdf.text("Address: KG 1 Roundabout,SONATUBE Kigali", 10, 20);

        pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('users.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element with id "excelTable" not found');
    }
  };


  const HandleReturn = () => {
    try {
      const storedToken = authService.getToken();

      if (!storedToken) {
        console.error('Token is null or undefined');
        return;
      }

      const payLoad = jwt_decode(storedToken);

      if (payLoad) {
        payLoad?.authorities === 'admin' ? navigate('/Dashboard') : navigate('/RequestRom');
      } else {
        console.error('Token is null');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleSort = () => {
    const sortedData = [...roomData[page - 1]];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setRoomData((prev) => {
      const newroomData = [...prev];
      newroomData[page - 1] = sortedData;
      return newroomData;
    });
  };

  const printList = () => {
    window.print();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setClickedRoom(item)
    setRoomId(item.roomID);
    setEditPopupVisible(true);

  };

  const handleDelete = async (clickedRoom) => {
    console.log("tem ", clickedRoom)
    // setSelectedItem(item);
    //   setClickedRoom(item)
    //   setRoomId(item.roomID);
    const deleteUrl = `${process.env.REACT_APP_DELETE_ROOM}/?roomID=${clickedRoom.roomId}`;
    try {
      const response = await fetch(deleteUrl, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
      });

      if (response.status === 200) {
        setSuccessMessage('User deleted successfully.');
      } else {
        setError('An error occurred while trying to delete the user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message || 'An error occurred while trying to delete the user.');
    }
  };
  console.log(bookings, "Boookings")

  return (
    <div className=" containerroom mt-4 ">

      <SideBar className='sidebar'
        onSignupClick={handleSignupClick}
        onRoomClick={handleRoomClick}
        handleReport={handleReport} />
      <div className='containerlg'>
        <h2 className='titleRoom'>Room Data</h2>
        <div className='roombook'>

          <button type="button" className="sort-btn" onClick={handleSort}>
            Sort by Date
          </button>
          <button type="button" className="sort-btn" onClick={HandleReturn}>
            Return Home
          </button>
          <button type="button" className="sort-btn" onClick={printList}>
            <FontAwesomeIcon icon={faPrint} className="s-icons" /> Print
          </button>
          <button type="button" className="sort-btn" onClick={exportPDF}>
            Export to PDF
          </button>
          {/* <button>
            <CSVLink data={roomData} filename={'users.csv'} className="sort-btn">
              Export to CSV
            </CSVLink>
          </button> */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button sort-btn"
            table="excelTable"
            filename="excelFile"
            sheet="tablexls"
            buttonText="Export to Excel"
          />
        </div>


        <div className="col">

          <div className="table-responsive">
            <table className="table table-bordered table-striped" id="excelTable">
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
                    <td>{bookings.find((b) => b.roomId === room.roomID) ? 'Booked' : 'Not Booked'}</td>
                    <td className="button-cell">
                      {/* <button type="button" className="btn btn-success mr-2" onClick={() => handleEdit(room)}>
                        <FontAwesomeIcon icon={faEdit} className="s-icons" />
                      </button> */}
                      <button type="button" className="btn btn-danger" onClick={() => openDeleteDialog(room)}>

                        <FontAwesomeIcon icon={faTrashAlt} className="s-icons" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editPopupVisible && (
              <Dialog open={editPopupVisible} onClose={handleFormLoad} maxWidth="60%" >
                <DialogContent>

                  <form onSubmit={HandleSumitionForm} onLoad={(e) => e.target}>
                    <div title={title}>
                      {console.log("Room ID", roomId)}
                      <RoomEditPopup title="Edit Room" roomId={roomId} onUpdate={handleEditPopupUpdate} clickedRoom={clickedRoom} />

                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          {/* <span style={{ marginTop:"20px"}}>Page {page} of {roomData.length}</span> */}
          <button onClick={handleNextPage} disabled={page === roomData.length}>
            Next
          </button>
        </div>

      </div>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogContent>
          <div>Are you sure you want to delete this Room?</div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => {
              handleDelete(clickedRoom);
              closeDeleteDialog();
            }}>Delete</button>
            <button onClick={closeDeleteDialog} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>

    </div >
  );
}

export default RenderRoom;
