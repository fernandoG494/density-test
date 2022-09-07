import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'authenticated', // non-authenticated, authenticated, checking
        authPage: null,
        uid: null,
        email: null,
        displayName: null,
        isAdmin: false,
        errorMessage: '',
    },
    reducers: {
        login: () => {},
        logout: (state, {payload}) => {
            state.status = payload.status
        },
        checkingCredentials: () => {},
        setAuthPage: (state, {payload}) => {
            state.authPage = payload.page;
        }
    }
});

export const {
    login,
    logout,
    checkingCredentials,
    setAuthPage
} = authSlice.actions;
