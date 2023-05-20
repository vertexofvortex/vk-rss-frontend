import { AxiosPromise } from "axios";
import { ISource } from "../models";
import { IPost } from "../models/Post";
import axiosInstance from "./axios-instance";

export async function getPosts(): AxiosPromise<IPost[]> {
  return axiosInstance.get("/posts");
}

export async function getPostsBlacklist(): AxiosPromise<IPost[]> {
  return axiosInstance.get("/posts_blacklisted");
}

export async function getPostsBySourceId(
  source_id: number
): AxiosPromise<IPost[]> {
  return axiosInstance.get(`/posts/by_source/${source_id}`);
}

export async function blockPost(post_id: number) {
  return axiosInstance.put(`/posts/${post_id}/block`);
}

export async function unblockPost(post_id: number) {
  return axiosInstance.put(`/posts/${post_id}/unblock`);
}

export async function getSourceByPostId(
  post_id: number
): AxiosPromise<ISource> {
  return axiosInstance.get(`/posts/source/${post_id}`);
}
