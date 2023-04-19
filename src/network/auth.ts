import { AxiosPromise } from "axios";
import axiosInstance from "./axios-instance";

export async function login(fd: FormData): AxiosPromise<any> {
  return axiosInstance.post("/auth/login", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
