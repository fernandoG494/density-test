import React, { useMemo, useState } from 'react';
import { Alert, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnection } from '../../api/apiConnection';

const formData = {
    email: '',
    password: '',
    displayName: ''
};

const formValidators = {
    email: [(value) => {
        return value.includes('@') && value.includes('.');
    }, 'El correo no cumple con el formato establecido'],
    password: [(value) => {
        return value.length >= 6;
    }, 'La contraseña debe tener al menos seis caracteres'],
    displayName: [(value) => {
        return value.length >= 2;
    }, 'El nombre debe tener al menos dos caracteres'],
};

const RegisterPage = () => {
    const [formSubmited, setFormSubmited] = useState(false);
    const { status, message } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
    const [responseStatus, setResponseStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm(formData, formValidators);

    const onSubmit = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        setFormSubmited(true);
        if ( !isFormValid ) return;

        const {displayName, email, password} = formState;
        apiConnection.post('/users/', {displayName, email, password})
            .then(response => {
                setResponseStatus(response);
                setIsLoading(false);
            }).catch(error => {
                setResponseStatus(error.response);
                setIsLoading(false);
            });
    };

    return (
        <form onSubmit={onSubmit} >
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField
                        label="Nombre completo" 
                        type="text" 
                        placeholder='Nombre completo' 
                        fullWidth
                        name="displayName"
                        value={ displayName }
                        onChange={ onInputChange }
                        error={ !!displayNameValid && formSubmited }
                        helperText={ displayNameValid }
                    />
                </Grid>
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
                        helperText={ emailValid }
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
                        helperText={ passwordValid }
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
                    {responseStatus.status === 400
                        &&  <Alert severity="error" sx={{ width: '100%', ml: 2 }}>
                                El usuario ya existe
                            </Alert>
                    }
                    {responseStatus.status === 201
                        &&  <Alert severity="success" sx={{ width: '100%', ml: 2 }}>
                                El usuario se creo correctamente
                            </Alert>
                    }
                    <Grid item xs={ 12 }>
                        <Button
                            disabled={ !!isCheckingAuthentication }
                            type="submit"
                            variant='contained' 
                            fullWidth
                        >
                            Crear cuenta
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default RegisterPage;