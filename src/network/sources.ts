import { AxiosPromise } from "axios";
import { ISource } from "../models";
import axiosInstance from "./axios-instance";

export async function getSources(): AxiosPromise<ISource[]> {
    return axiosInstance.get("/sources");
}
