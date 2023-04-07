import { AxiosPromise } from "axios";
import { IGroup } from "../models";
import { IGroupExternal } from "../models/Group";
import axiosInstance from "./axios-instance";

export async function getGroups(): AxiosPromise<IGroup[]> {
    return axiosInstance.get("/groups");
}

export async function getVKGroups(
    usertoken_id: number,
    passphrase: string
): AxiosPromise<IGroupExternal[]> {
    return axiosInstance.get(
        `/vk_api/groups?usertoken_id=${usertoken_id}&passphrase=${passphrase}`
    );
}

export async function createVKGroup(
    group_vk_id: number,
    token_id: number,
    passphrase: string
): AxiosPromise<any> {
    return axiosInstance.post(`/groups`, {
        vk_id: group_vk_id,
        token_id: token_id,
        passphrase: passphrase,
    });
}
