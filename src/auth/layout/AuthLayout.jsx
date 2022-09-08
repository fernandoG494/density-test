import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthPage } from '../../store/auth/authSlice';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AuthLayout = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState('login');
    const { authPage } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(setAuthPage({page}));
    }, [page]);

    const handleLogin = () => {
        setPage('login');
    };

    const handleRegister = () => {
        setPage('register');
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main' ,padding: 4 }}
        >
            <Grid
                item
                className='box-shadow'
                xs={ 3 }
                sx={{ 
                    width: 300,
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 
                }}
            >
                <Grid
                    container
                    justifyContent='center'
                    direction='row'
                >
                    <Grid item>
                        <Button
                            disabled={authPage==='login'}
                            variant='outlined'
                            xs={{ rm: 12, md: 6 }}
                            sx={{ mr: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            // disabled={authPage==='register'}
                            disabled={true}
                            variant='outlined'
                            xs={{ rm: 12, md: 6 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
                <hr />
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Typography>{page.toUpperCase()}</Typography>
                    </Grid>
                </Grid>
                <hr />
                {authPage === 'login'
                    ? <LoginPage />
                    : <RegisterPage />
                }
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
