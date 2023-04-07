import { AxiosResponse, isAxiosError } from "axios";
import { createBrowserRouter, redirect } from "react-router-dom";
import { IGroup, IKey, IKeyCreate, ISource } from "./models";
import { IPost } from "./models/Post";
import { getGroups } from "./network/groups";
import { createKey, deleteKey, getKeys } from "./network/keys";
import { getPosts } from "./network/posts";
import { getSources } from "./network/sources";
import { FeedsAll } from "./routes/feeds/feeds-all";
import { FeedsGroups } from "./routes/feeds/feeds-groups";
import { Groups } from "./routes/groups/groups";
import { Keys } from "./routes/keys/keys";
import { Publish } from "./routes/publish/publish";
import { Root } from "./routes/root/root";
import { Sources } from "./routes/sources/sources";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Root isError />,
        children: [
            {
                path: "sources",
                element: <Sources />,
                loader: async (): Promise<AxiosResponse<ISource[]>> => {
                    return await getSources();
                },
            },
            {
                // FIXME: господи помилуй за эти два роута
                path: "feeds/all",
                element: <FeedsAll />,
                loader: async (): Promise<AxiosResponse<IPost[]>> => {
                    return await getPosts();
                },
            },
            {
                path: "feeds/groups",
                element: <FeedsGroups />,
                loader: async (): Promise<AxiosResponse<IGroup[]>> => {
                    return await getGroups();
                },
            },
            {
                path: "groups",
                element: <Groups />,
                loader: async (): Promise<AxiosResponse<IGroup[]>> => {
                    return await getGroups();
                },
            },
            {
                path: "publish",
                element: <Publish />,
            },
            {
                path: "keys",
                element: <Keys />,
                loader: async (): Promise<AxiosResponse<IKey[]>> => {
                    return await getKeys();
                },
                action: async ({ params, request }) => {
                    let formData = await request.formData();

                    console.log(formData.get("name"));
                    return {
                        error: "error",
                    };
                },
                children: [
                    {
                        path: "create",
                        action: async ({ params, request }) => {
                            try {
                                const data = Object.fromEntries(
                                    await request.formData()
                                );
                                const res = await createKey(data as IKeyCreate);

                                return redirect("/keys");
                            } catch (error) {
                                console.log("error", error);

                                if (isAxiosError(error)) {
                                    return error;
                                }
                            }
                        },
                    },
                    {
                        path: ":id/delete",
                        action: async ({ params, request }) => {
                            return deleteKey(Number(params.id)).then(() =>
                                redirect("/keys")
                            );
                        },
                    },
                ],
            },
        ],
    },
]);

export default router;
