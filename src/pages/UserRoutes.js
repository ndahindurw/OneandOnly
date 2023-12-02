import React from 'react';
import { Navigate } from 'react-router';
import authService from '../componets/Services/authService';

function UserRoutes({children}) {
    return (
        authService.isLoggedIn() ? children : <Navigate to ="/"/>
    );
}

export default UserRoutes;