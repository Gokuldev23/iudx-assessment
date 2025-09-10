// src/services/api.js
import axios from "axios";
import { getToken, updateToken } from "./keycloak";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await updateToken();
        const token = getToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed", refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const getProfile = () => apiClient.get("/profile");

export const getMarkers = () => apiClient.get("/markers");

export const createMarker = (markerData) =>
  apiClient.post("/markers", markerData);

export const updateMarker = (id, markerData) =>
  apiClient.put(`/markers/${id}`, markerData);

export const deleteMarker = (id) => apiClient.delete(`/markers/${id}`);

export default apiClient;
