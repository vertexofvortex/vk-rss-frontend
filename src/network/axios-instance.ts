import axios from "axios";
import { redirect } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const savedStoreString = localStorage.getItem("redux");

  if (!savedStoreString) return config;

  const savedStore = JSON.parse(savedStoreString);

  if (!("auth" in savedStore)) return config;

  const token = savedStore.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.config.url != "/auth/login"
    )
      return logout();

    throw error;
  }
);

export function logout() {
  localStorage.removeItem("redux");

  return redirect("/login");
}

export default axiosInstance;
