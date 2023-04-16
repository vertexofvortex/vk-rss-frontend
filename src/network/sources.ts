import { AxiosPromise } from "axios";
import { ISource } from "../models";
import { ISourceCheckResult } from "../models/Source";
import axiosInstance from "./axios-instance";

export async function getSources(): AxiosPromise<ISource[]> {
    return axiosInstance.get("/sources");
}

export async function getGroupSources(group_id: number): AxiosPromise<ISource[]> {
    return axiosInstance.get(`/groups/sources/${group_id}`);
}

export async function checkSourceURL(source_url: string): AxiosPromise<ISourceCheckResult> {
    return axiosInstance.get(`/sources/check?url=${source_url}`);
}

export async function createSource(title: string, description: string, rss_url: string, logo?: File) {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("rss_url", rss_url);
    logo && fd.append("logo", logo);

    return axiosInstance.post(`/sources`, fd, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function createSourceWithForm(formdata: FormData) {
    console.log("logo from method:", formdata.get("logo"));

    return axiosInstance.post(`/sources`, formdata, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function deleteSource(source_id: number): AxiosPromise<any> {
    return axiosInstance.delete(`/sources/${source_id}`);
}

export async function editSource(title: string, description: string, rss_url: string) {
    return axiosInstance.put(`/sources`, {
        title: title,
        description: description,
        rss_url: rss_url,
    });
}
