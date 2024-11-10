// src/utils/axiosInstance.js
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const useAxios = () => {
    const { token } = useAuth();

    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default useAxios;
