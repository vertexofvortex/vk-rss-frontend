import { IPost } from "./models";

export function filterPosts(data: IPost[], activeCategory: string | undefined) {
  return data.filter((value) =>
    activeCategory ? value.categories == activeCategory : value
  );
}

export function paginatePosts(data: IPost[], activePage: number) {
  return data.slice((activePage - 1) * 36, activePage * 36);
}
