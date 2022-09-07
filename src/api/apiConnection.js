import axios from 'axios';

export const apiConnection = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`
});