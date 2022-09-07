import React from 'react';
import { Navigate, Routes } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AppPage />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AppRoutes;