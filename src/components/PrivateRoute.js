import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UpdatesPage from './UpdatesPage/UpdatesPage';

const PrivateRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <UpdatesPage /> : <Navigate to="/error-unauthenticated" />;
};

export default PrivateRoute;