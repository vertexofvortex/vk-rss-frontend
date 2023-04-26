import { AxiosResponse } from "axios";
import { IPost } from "../../models";
import { IGroupWithPosts } from "../../models/Group";
import { getAllGroupsPosts } from "../../network/groups";
import { getPosts, getPostsBlacklist } from "../../network/posts";

export const loadPosts = async (): Promise<AxiosResponse<IPost[]>> => {
  return await getPosts();
};

export const loadGroupsPosts = async (): Promise<
  AxiosResponse<IGroupWithPosts[]>
> => {
  return await getAllGroupsPosts();
};

export const loadBlacklist = async (): Promise<AxiosResponse<IPost[]>> => {
  return await getPostsBlacklist();
};
