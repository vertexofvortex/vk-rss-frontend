import { AxiosPromise } from "axios";
import axiosInstance from "./axios-instance";

export async function createPost(
  title: string,
  description: string,
  source: string,
  source_url: string,
  image: File,
  usertoken_id: number,
  passphrase: string,
  group_id: number | string,
  publish_date: number | undefined | null
): AxiosPromise<any> {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", description);
  fd.append("source", source);
  fd.append("source_url", source_url);
  fd.append("image", image);
  fd.append("usertoken_id", `${usertoken_id}`);
  fd.append("passphrase", passphrase);
  fd.append("group_id", `${group_id}`);
  publish_date && fd.append("publish_date", `${publish_date}`);

  return axiosInstance.post("/vk_api/post", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
