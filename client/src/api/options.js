import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });

export const fetchOptions = () => api.get("/options").then((r) => r.data);

export const addOption = (payload) => api.post("/options", payload).then((r) => r.data);

export const removeOption = (id) => api.delete(`/options/${id}`).then((r) => r.data);

export default api;