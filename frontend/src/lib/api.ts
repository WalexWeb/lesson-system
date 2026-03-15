import axios from 'axios';

const apiBase =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

