import axios from 'axios';

export const userAxios = axios.create({
    baseURL: 'http://localhost:4000/api/user',
    withCredentials: true
});

export const resumeAxios = axios.create({
    baseURL: 'http://localhost:4000/api/resume',
    withCredentials: true
})