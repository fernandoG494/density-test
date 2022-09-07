import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from '../app/routes/AppRoutes';
import AuthRoutes from '../auth/routes/AuthRoutes';

const AppRouter = () => {
    const { status } = useSelector(state => state.auth);
    console.log(status);

    if(status === 'checking'){
        return <div>Checker</div>
    }

    return (
        <Routes>
            {(status) === 'authenticated'
                ? <Route path='/*' element={ <AppRoutes /> } />
                : <Route path='/auth/*' element={<AuthRoutes />} />
            }
            <Route path='/*' element={<Navigate to='/auth/'/>} />
        </Routes>
    );
};

export default AppRouter;
