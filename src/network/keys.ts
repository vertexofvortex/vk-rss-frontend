import { AxiosPromise } from "axios";
import { IKey, IKeyCreate } from "../models";
import axiosInstance from "./axios-instance";

export async function getKeys(): AxiosPromise<IKey[]> {
    return axiosInstance.get("/usertokens");
}

export async function getKeyById(key_id: number): AxiosPromise<IKey> {
    return axiosInstance.get(`/usertokens/${key_id}`);
}

export async function createKey(key: IKeyCreate) {
    return axiosInstance.post(`/usertokens/`, key);
}

export async function deleteKey(key_id: number) {
    return axiosInstance.delete(`/usertokens/${key_id}`);
}
