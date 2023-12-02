
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Axios/axios';
import '../../Dashbords/Dashboard.css'; 

function ClientDash(props) {


    const [data,setData] =useState(null)
    const [loading,setLoading] = useState(true)

    const handleEdit =()=>{

    }
    const handleDelete=()=>{
        
    }
    useEffect (()=>{
            const  fetchData = async ()=>{
                try {
                    const response = await axiosInstance.get(process.env.REACT_APP_FETCH_DATA_URL,data)
                    setData(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            }
            fetchData();
    },[])
    return (
        <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="Content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FullNames</th>
              <th>Emp No</th>
              <th>User No</th>
              <th>mobileNo</th>
              <th>email</th>
              <th>loginFailCount</th>
              <th>Position</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th>userStatus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { data && data.map((data) => (
              <tr key={data.staffID}>
                <td>{data.fullnames}</td>
                <td>{data.empNo}</td>
                <td>{data.userNo}</td>
                <td>{data.mobileNo}</td>
                <td>{data.loginFailCount}</td>
                <td>{data.position}</td>
                <td>{data.createdAt}</td>
                <td>{data.updatedAt}</td>
                <td>{data.userStatus}</td>
                <td>
                  <button onClick={() => handleEdit(data.staffID)}>Edit</button>
                  <button onClick={() => handleDelete(data.staffID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    );
}

export default ClientDash;