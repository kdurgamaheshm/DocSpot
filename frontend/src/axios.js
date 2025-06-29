// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // your backend base path
    withCredentials: true, // if using cookies for auth
});

export default instance;
