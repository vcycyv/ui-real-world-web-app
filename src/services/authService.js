import axios from 'axios';
import { history } from '../helpers';

const authService = {
    login,
    logout,
    getAuthHeader,
}

export default authService;

function login(username, password) {
    return axios.post('/auth', { username, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = getAuthHeader();
            } else {
                throw new Error("login error");
            }
            return;
        })
}

function logout() {
    localStorage.removeItem('token');
    history.push('/login');
}

function getAuthHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem('token');

    if (token) {
        return 'Bearer ' + token ;
    } else {
        return {};
    }
}
