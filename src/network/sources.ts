import { AxiosPromise } from "axios";
import { Source } from "../models";
import axiosInstance from "./axios-instance";

export async function getSources(): AxiosPromise<Source[]> {
    return axiosInstance.get("/sources");
}
