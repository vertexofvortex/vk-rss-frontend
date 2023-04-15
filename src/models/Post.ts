import { IGroup } from "./Group";

export type IPost = {
    id: number;
    source_id: number;
    title: string;
    description: string;
    image_url: string;
    post_url: string;
    categories: string;
    publish_date: string;
};

export interface IPostInCart extends IPost {
    for_group?: IGroup;
}
