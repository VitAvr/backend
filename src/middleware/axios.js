import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://git.heroku.com/frontend1k.git',
});
//
//
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
