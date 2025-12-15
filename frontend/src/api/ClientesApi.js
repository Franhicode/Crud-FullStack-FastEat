import api from "./apiClient";

export const getClientes = () => api.get(`/clientes`); 
export const getCliente = (id) => api.get(`/clientes/${id}`);
export const createCliente = (payload) => api.post(`/clientes`, payload);
export const updateCliente = (id, payload) => api.put(`/clientes/${id}`, payload);
export const deleteCliente = (id) => api.delete(`/clientes/${id}`);