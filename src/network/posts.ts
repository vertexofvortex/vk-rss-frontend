import { AxiosPromise } from "axios";
import { IPost } from "../models/Post";
import axiosInstance from "./axios-instance";
import { getSources } from "./sources";

export async function getPosts(): AxiosPromise<IPost[]> {
    return axiosInstance.get("/posts");
}

export async function getPostsBySourceId(
    source_id: number
): AxiosPromise<IPost[]> {
    return axiosInstance.get(`/posts/by_source/${source_id}`);
}
