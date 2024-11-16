import axios from 'axios';

const api = axios.create({
    baseURL: 'https://notes-backend-gray.vercel.app/',
});

export default api;