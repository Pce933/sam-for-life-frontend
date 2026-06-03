import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sam_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const getCmsAll = () => api.get("/cms/all").then((r) => r.data);

export const submitContact = (data) => api.post("/forms/contact", data).then((r) => r.data);
export const submitVolunteer = (data) => api.post("/forms/volunteer", data).then((r) => r.data);
export const submitPartnership = (data) => api.post("/forms/partnership", data).then((r) => r.data);
export const submitNewsletter = (email) => api.post("/forms/newsletter", { email }).then((r) => r.data);
export const submitFundraiseIdea = (data) => api.post("/forms/fundraise-idea", data).then((r) => r.data);

export const createCheckoutSession = (data) =>
  api.post("/payments/checkout/session", data).then((r) => r.data);
export const getCheckoutStatus = (sessionId) =>
  api.get(`/payments/checkout/status/${sessionId}`).then((r) => r.data);

// Auth
export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);
export const adminMe = () => api.get("/auth/me").then((r) => r.data);

// Admin: Forms
export const adminAllForms = () => api.get("/forms/admin/all").then((r) => r.data);
export const adminDeleteForm = (col, id) => api.delete(`/forms/admin/${col}/${id}`).then((r) => r.data);
export const adminUpdateFormStatus = (col, id, status) =>
  api.patch(`/forms/admin/${col}/${id}/status`, { status }).then((r) => r.data);

// Admin: Payments
export const adminTransactions = () => api.get("/payments/admin/transactions").then((r) => r.data);

// Admin: CMS settings
export const adminGetSettings = () => api.get("/cms/admin/settings").then((r) => r.data);
export const adminUpdateSettings = (data) => api.put("/cms/admin/settings", data).then((r) => r.data);

// Admin: CMS list CRUD generic
export const adminList = (col) => api.get(`/cms/admin/${col}`).then((r) => r.data);
export const adminCreate = (col, data) => api.post(`/cms/admin/${col}`, data).then((r) => r.data);
export const adminUpdate = (col, id, data) => api.put(`/cms/admin/${col}/${id}`, data).then((r) => r.data);
export const adminDelete = (col, id) => api.delete(`/cms/admin/${col}/${id}`).then((r) => r.data);
