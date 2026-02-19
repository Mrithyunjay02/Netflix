import axios from './api';

const login = (email, password) => {
    return axios.post('/auth/login', { email, password });
};

const register = (username, email, password) => {
    return axios.post('/auth/register', { username, email, password });
};

export default {
    login,
    register
};
