import { Alert, Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { apiConnection } from '../../api/apiConnection';
import { login } from '../../store/auth/authSlice';

const formData = {
    email: '',
    password: ''
};

const formValidators = {
    email: [(value) => {
        return value.includes('@') && value.includes('.');
    }, 'El correo no cumple con el formato establecido'],
    password: [(value) => {
        return value.length >= 6;
    }, 'La contraseña debe tener al menos seis caracteres']
};

const LoginPage = () => {
    const dispatch = useDispatch();
    const [formSubmited, setFormSubmited] = useState(false);
    const { status, message } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
    const [responseStatus, setResponseStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { 
        formState, email, password, onInputChange,
        isFormValid, emailValid, passwordValid, 
    } = useForm(formData, formValidators);

    const onSubmit = ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        setFormSubmited(true);
        if ( !isFormValid ) return;

        const {email, password} = formState;

        apiConnection.post('/auth/', {email, password})
            .then(response => {
                setResponseStatus(response);
                dispatch(login(response));
                setIsLoading(false);
            })
            .catch(error => {
                setResponseStatus(error.response);
                setIsLoading(false);
            });
    };

    return (
        <form onSubmit={onSubmit} >
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Correo" 
                        type="email"
                        placeholder='correo@google.com' 
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                        error={ !!emailValid && formSubmited }
                    />
                </Grid>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Contraseña" 
                        type="password" 
                        placeholder='Contraseña' 
                        fullWidth
                        name="password"
                        value={ password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmited  }
                    />
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid
                        item 
                        xs={ 12 }
                        display={ !!message ? '': 'none' }
                    >
                        <Alert severity='error'>{ message }</Alert>
                    </Grid>
                    {isLoading && (
                        <Grid container justifyContent='center'>
                            <CircularProgress />
                        </Grid>
                    )}
                    {responseStatus.status === 404
                        &&  <Alert severity="error" sx={{ width: '100%', ml: 2 }}>
                                Error al iniciar sesión
                            </Alert>
                    }
                    <Grid item xs={ 12 }>
                        <Button
                            disabled={ !!isCheckingAuthentication }
                            type="submit"
                            variant='contained' 
                            fullWidth
                        >
                            Iniciar sesión
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default LoginPage;