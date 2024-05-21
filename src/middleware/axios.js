import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend1k-36eab103aeb1.herokuapp.com/',
});
//
//
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
