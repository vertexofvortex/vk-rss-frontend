import axios from "axios";
import { redirect } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use((config) => {
  const savedStoreString = localStorage.getItem("redux");

  if (!savedStoreString) return config;

  const savedStore = JSON.parse(savedStoreString);

  if (!("auth" in savedStore)) return config;

  const token = savedStore.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    if (error.response.status === 401) {
      return logout();
    } else {
      throw error;
    }
  }
);

export function logout() {
  localStorage.removeItem("redux");
  console.log("sdfsdafsdafaa");

  return redirect("/login");
}

export default axiosInstance;
