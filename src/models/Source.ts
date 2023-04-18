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

export interface ISourceCheckResult {
  total_posts: number;
  titles: number;
  descriptions: number;
  image_urls: number;
  post_urls: number;
  categories: number;
  publish_dates: number;
}
