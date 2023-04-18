import { IPost } from "./Post";

export type IGroup = {
  vk_id: number;
  token_id: number;
  id: number;
  name: string;
  photo_url: string;
};

export type IGroupExternal = {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_admin: number;
  admin_level: number;
  is_member: number;
  is_advertiser: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
};

export interface IGroupWithPosts extends IGroup {
  posts: IPost[];
}
