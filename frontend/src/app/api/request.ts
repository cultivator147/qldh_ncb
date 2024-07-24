import axios, { CreateAxiosDefaults } from 'axios';
const request = axios.create({
    baseURL: "http://localhost:8805",
    timeout: 20000,
    headers: {'Content-Type': 'application/json'},
});

export default request;