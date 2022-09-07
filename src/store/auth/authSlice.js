import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'non-authenticated', // non-authenticated, authenticated, checking
        authPage: null,
        uid: null,
        email: null,
        displayName: null,
        isAdmin: false,
        errorMessage: '',
    },
    reducers: {
        login: (state, {payload}) => {
            const { displayName, email, _id, isAdmin } = payload.data.user;
            state.status = 'authenticated';
            state.authPage = '';
            state.uid = _id;
            state.email = email;
            state.displayName = displayName;
            state.isAdmin = isAdmin;
            state.errorMessage = '';
        },
        logout: (state, {payload}) => {
            state.status = 'non-authenticated';
            state.authPage = null;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.isAdmin = null;
            state.errorMessage = '';
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
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
