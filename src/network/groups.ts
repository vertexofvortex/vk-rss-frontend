import { AxiosPromise } from "axios";
import { IGroup, IPost } from "../models";
import { IGroupExternal, IGroupWithPosts } from "../models/Group";
import axiosInstance from "./axios-instance";
import { getGroupSources } from "./sources";
import { getPostsBySourceId } from "./posts";
import { ISourceWithPosts } from "../models/Source";

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

// export async function getGroupsPosts(): Promise<IGroupWithPosts[]> {
//     return new Promise((resolve, reject) => {
//         let groupsWithPosts: IGroupWithPosts[] = [];

//         getGroups().then((groupsData) => {
//             groupsData.data.map(async (group) => {
//                 let groupWithPosts: IGroupWithPosts = {
//                     ...group,
//                     sources: await getGroupSources(group.id).then(
//                         async (sourcesRes) => {
//                             let sourcesWithPosts: ISourceWithPosts[] = [];

//                             sourcesRes.data.map(async (source) => {
//                                 let sourceWithPosts: ISourceWithPosts = {
//                                     ...source,
//                                     posts: await getPostsBySourceId(
//                                         source.id
//                                     ).then((postsRes) => postsRes.data),
//                                 };

//                                 sourcesWithPosts.push(sourceWithPosts);
//                             });

//                             return sourcesWithPosts;
//                         }
//                     ),
//                 };

//                 groupsWithPosts.push(groupWithPosts);
//                 console.log("pushed a new group");
//             });

//             resolve(groupsWithPosts);
//             console.log("promise resolved");
//         });
//     });
// }
