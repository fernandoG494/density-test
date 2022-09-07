import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'non-authenticated',
        authPage: null,
        uid: null,
        email: null,
        displayName: null,
        errorMessage: ''
    },
    reducers: {
        login: () => {},
        logout: () => {},
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
