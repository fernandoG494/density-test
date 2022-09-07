import { Alert, Button, Grid, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

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

const LoginPage = () => {
    const dispatch = useDispatch();
    const [formSubmited, setFormSubmited] = useState(false);
    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm(formData, formValidators);

    const onSubmit = ( event ) => {
        event.preventDefault();
        console.log(formState);
    };

    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField
                        autoComplete='off'
                        label="Email" 
                        type="email" 
                        placeholder='Email' 
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmited }
                    />
                </Grid>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField
                        autoComplete='off'
                        label="Contraseña" 
                        type="password" 
                        placeholder='Contraseña' 
                        fullWidth
                        name="password"
                        value={ password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmited }
                    />
                </Grid>
                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid
                        item 
                        xs={ 12 }
                        display={ !!errorMessage ? '': 'none' }
                    >
                        <Alert severity='error'>{ errorMessage }</Alert>
                    </Grid>
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

export default LoginPage;