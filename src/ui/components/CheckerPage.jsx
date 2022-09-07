import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const CheckerPage = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress style={{ 'color': 'black' }} />
        </Backdrop>
    );
};

export default CheckerPage;
