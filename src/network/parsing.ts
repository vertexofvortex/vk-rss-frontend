import { AxiosPromise } from "axios";
import axiosInstance from "./axios-instance";

export async function forceParse(): AxiosPromise<number> {
  return axiosInstance.get("/parsing/force_parse");
}
