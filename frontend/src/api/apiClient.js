import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false // Ajustar según tus necesidades de CORS y cookies
});

// interceptor de errores / token
api.interceptors.response.use(
    response => response,
    error => {
        // Manejo global de errores - redirect a login
        return Promise.reject(error);
    }
);

export default api;