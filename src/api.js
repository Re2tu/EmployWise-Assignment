import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials) => {
    const res = await api.post('/login', credentials);
    return res.data;
};

export const getUsers = async (page = 1) => {
    const res = await api.get(`/users?page=${page}`);
    return res.data;
};

export const updateUser = async (id, userData) => {
    const res = await api.put(`/users/${id}`, userData);
    return res.data;
};

export const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
};
