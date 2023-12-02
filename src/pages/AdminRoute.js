import React from 'react';
import authService from '../componets/Services/authService';
import { Navigate } from 'react-router';

function AdminRoute({children}) {
    return (
        authService.getUserRole()==='admin' ? children  : <Navigate to ="/"/>
    );
}

export default AdminRoute;