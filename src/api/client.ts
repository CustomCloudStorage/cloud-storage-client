import axios from 'axios';
import { clearToken, getToken } from '../utils/authStorage';

const client = axios.create({ baseURL: '' });

client.interceptors.request.use(config => {
    const token = getToken();
    if (token && config.headers) {
        config.headers['Token'] = token;
    }
    return config
});

client.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            clearToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default client;