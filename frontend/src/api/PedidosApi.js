import api from "./apiClient";

export const getPedidos = () => api.get('/pedidos');
export const getPedido = (id) => api.get(`/pedidos/${id}`);
export const createPedido = (payload) => api.post('/pedidos', payload); 
export const updatePedido = (id, payload) => api.put(`/pedidos/${id}`, payload);
export const deletePedido = (id) => api.delete(`/pedidos/${id}`); 
