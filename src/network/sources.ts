import { AxiosPromise } from "axios";
import { ISource } from "../models";
import axiosInstance from "./axios-instance";

export async function getSources(): AxiosPromise<ISource[]> {
    return axiosInstance.get("/sources");
}

export async function getGroupSources(
    group_id: number
): AxiosPromise<ISource[]> {
    return axiosInstance.get(`/groups/sources/${group_id}`);
}
