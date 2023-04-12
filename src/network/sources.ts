import { AxiosPromise } from "axios";
import { ISource } from "../models";
import axiosInstance from "./axios-instance";
import { ISourceCheckResult } from "../models/Source";

export async function getSources(): AxiosPromise<ISource[]> {
    return axiosInstance.get("/sources");
}

export async function getGroupSources(
    group_id: number
): AxiosPromise<ISource[]> {
    return axiosInstance.get(`/groups/sources/${group_id}`);
}

export async function checkSourceURL(
    source_url: string
): AxiosPromise<ISourceCheckResult> {
    return axiosInstance.get(`/sources/check?url=${source_url}`);
}

export async function createSource(
    title: string,
    description: string,
    rss_url: string
) {
    return axiosInstance.post(`/sources`, {
        title: title,
        description: description,
        rss_url: rss_url,
    });
}

export async function deleteSource(source_id: number): AxiosPromise<any> {
    return axiosInstance.delete(`/sources/${source_id}`);
}

export async function editSource(
    title: string,
    description: string,
    rss_url: string
) {
    return axiosInstance.put(`/sources`, {
        title: title,
        description: description,
        rss_url: rss_url,
    });
}
