import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../../../Axios/axios';
import useFetch from '../../../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import authService from '../../../Services/authService';
import { faEdit, faPrint, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import UserEditPopup from './UserEditPopup';
import './Table.scss'
import { jwtDecode as jwt_decode } from 'jwt-decode';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function RenderUsers({ title }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [url, setUrl] = useState('');
  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [allusers, setAllusers] = useState([]);
  const [clickedUser, setClickedUser] = useState([])
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState([]);
  const [nonPaginateUSer, setNonPaginateUSer] = useState([])

  const navigate = useNavigate();

  const HandleList = (array) => {
    const list = [];
    const chunkSize = 10;
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      list.push(chunk);
    }
    return list;
  };
  const fetchData = useFetch({
    url: process.env.REACT_APP_FETCH_USER_DATA_URL,
  });

  useEffect(() => {
    if (fetchData.data) {
      setNonPaginateUSer(fetchData.data);
      const chunks = HandleList(fetchData.data);
      setAllusers(chunks);
    }
  }, [fetchData.data]);

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

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, allusers.length));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSort = () => {
    const sortedData = [...allusers[page - 1]];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setAllusers((prev) => {
      const newAllusers = [...prev];
      newAllusers[page - 1] = sortedData;
      return newAllusers;
    });
  };

  const printList = () => {
    window.print();
  };

  const handleFormLoad = () => {
    setEditPopupVisible(!editPopupVisible);
  };

  const handleEdit = (item) => {
    console.log("user Item", item)
    setClickedUser(item);
    setEditPopupVisible(true)
  };

  const openDeleteDialog = (user) => {
    console.log("consoledUnitxcvbv", user)
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = async (userToDelete) => {
    try {
      const deleteUrl = `${process.env.REACT_APP_DELETE_USER}/?staffID=${userToDelete.staffID}`;
      const response = await axiosInstance.delete(deleteUrl);
      if (response.status === 200) {
        setSuccessMessage('User deleted successfully.');
        const updatedUsers = nonPaginateUSer.filter((u) => u.staffID !== userToDelete.staffID);
        console.log(updatedUsers, "sdfas", userToDelete)
        setAllusers(HandleList(updatedUsers));
        setNonPaginateUSer(updatedUsers)
      } else {
        setError('An error occurred while trying to delete the user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message || 'An error occurred while trying to delete the user.');
    }
  };

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


  console.log("all user", allusers)

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>{title}</h1>
      <div className='headingTable'>
        <div style={{ display: 'flex', alignItems: 'center', }}>
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
            <CSVLink data={allusers} filename={'users.csv'} id="test-table-xls-button" table="excelTable" className="sort-btn">
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
        <input
          type="search"
          name="Search"
          value={userData}
          onChange={(e) => setUserData(e.target.value)}
          placeholder="Type to search..."
          className="form-control form-control-sm mb-2"
          style={{ width: '500px', marginLeft: '20px', padding: 10, borderRadius: 20, marginTop: 10 }}
        />
      </div>
      <div className="card">
        <div className="table-responsive">
          <table id="excelTable" className="table table-striped table-bordered custom-table">
            <thead className="thead-dark">
              <tr>
                <th>StaffID</th>
                <th>Full Name</th>
                <th>EmpNo</th>
                <th>Tel</th>
                <th>Email</th>
                <th>Status</th>
                <th>Unit</th>
                <th>Department</th>
                <th>FailCount</th>
                <th>Position</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allusers[page - 1] &&
                allusers[page - 1]
                  .filter((item) => !item.isDeleted)
                  .filter((item) =>
                    userData.trim() === ''
                      ? true
                      : Object.values(item).some(
                        (value) =>
                          typeof value === 'string' &&
                          value.toLowerCase().includes(userData.toLowerCase())
                      )
                  )
                  .map((item) => (
                    <tr key={item.staffID}>
                      <td>{item.staffID}</td>
                      <td>{item.fullnames}</td>
                      <td>{item.empNo}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.email}</td>
                      <td>{item.userStatus}</td>
                      <td>{item.units && item.units.unitName}</td>
                      <td>{item.position}</td>
                      <td>{item.loginFailCount}</td>
                      <td>{item.position}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td>{item.username}</td>
                      <td className="button-cell">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEdit(item)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="s-icons" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => openDeleteDialog(item)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="s-icons" />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {allusers.length}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page === allusers.length}
          >
            Next
          </button>
        </div>

        {editPopupVisible && (
          <Dialog open={editPopupVisible} onClose={handleFormLoad} maxWidth="80%">
            <DialogContent>
              <div title={title}>
                <UserEditPopup title="Edit Room" clickedUser={clickedUser} />
              </div>
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogContent>
            <div>Are you sure you want to delete this user?</div>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(userToDelete);
                  closeDeleteDialog();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={closeDeleteDialog}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </div>


  );
}

export default RenderUsers;
