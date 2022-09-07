import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<AuthLayout /> } />
            <Route path='/*' element={ <Navigate to='/auth/' /> }/>
        </Routes>
    );
};

export default AuthRoutes;
