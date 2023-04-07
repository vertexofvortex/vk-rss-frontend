import { AxiosPromise } from "axios";
import { IGroup } from "../models";
import axiosInstance from "./axios-instance";

export async function getGroups(): AxiosPromise<IGroup[]> {
    return axiosInstance.get("/groups");
}

export async function getVKGroups(
    usertoken_id: number,
    passphrase: string
): AxiosPromise<IGroup[]> {
    return axiosInstance.get(
        `/vk_api/groups?usertoken_id=${usertoken_id}&passphrase=${passphrase}`
    );
}
