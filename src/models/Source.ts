import { IPost } from "./Post";

export type ISource = {
    id: number;
    title: string;
    rss_url: string;
    description: string;
};

export interface ISourceWithPosts extends ISource {
    posts: IPost[];
}
