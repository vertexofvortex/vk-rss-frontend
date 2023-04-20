import { AxiosPromise } from "axios";
import axiosInstance from "./axios-instance";

export async function generateImage(
  title: string,
  description: string,
  source: string,
  logo: File,
  image: File | null,
  image_url: string | null
): AxiosPromise<Blob> {
  const fd = new FormData();

  fd.append("title", title);
  fd.append("description", description);
  fd.append("source", source);
  image && fd.append("image", image);
  image_url && fd.append("image_url", image_url);
  fd.append("logo", logo);

  return axiosInstance.post("/generate_snippet", fd, {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
