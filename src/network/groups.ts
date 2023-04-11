import { AxiosPromise } from "axios";
import { IGroup, IPost } from "../models";
import { IGroupExternal, IGroupWithPosts } from "../models/Group";
import axiosInstance from "./axios-instance";
import { getGroupSources } from "./sources";
import { getPostsBySourceId } from "./posts";
import { ISourceWithPosts } from "../models/Source";
import { IGroupSourceCreate } from "../models/GroupSource";

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

export async function getGroupPosts(
    group_id: number
): AxiosPromise<IGroupWithPosts[]> {
    return axiosInstance.get(`/groups/posts/${group_id}`);
}

export async function getAllGroupsPosts(): AxiosPromise<IGroupWithPosts[]> {
    return axiosInstance.get(`/groups/posts/all`);
}

export async function attachSourcesToGroup(groupSources: IGroupSourceCreate[]) {
    return axiosInstance.post(`/groups/sources`, groupSources);
}

export async function detachSourceFromGroup(
    group_id: number,
    source_id: number
) {
    return axiosInstance.delete(`/groups/${group_id}/sources/${source_id}`);
}

export async function removeGroup(group_id: number): AxiosPromise<any> {
    return axiosInstance.delete(`/groups/${group_id}`);
}
