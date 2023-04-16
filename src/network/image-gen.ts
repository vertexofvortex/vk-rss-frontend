import { AxiosPromise } from "axios";
import axiosInstance from "./axios-instance";

export async function generateImage(
    title: string,
    description: string,
    source: string,
    image: File,
    logo: File
): AxiosPromise<Blob> {
    const fd = new FormData();

    fd.append("title", title);
    fd.append("description", description);
    fd.append("source", source);
    fd.append("image", image);
    fd.append("logo", logo);

    return axiosInstance.post("/check_image_gen", fd, {
        responseType: "blob",
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
