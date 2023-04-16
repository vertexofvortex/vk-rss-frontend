import { notifications } from "@mantine/notifications";
import { AxiosPromise, AxiosResponse, isAxiosError } from "axios";
import { createBrowserRouter, redirect } from "react-router-dom";
import { IGroup, IKey, IKeyCreate, ISource } from "./models";
import { IGroupWithPosts } from "./models/Group";
import { IPost } from "./models/Post";
import { createGroup, getAllGroupsPosts, getGroups, removeGroup } from "./network/groups";
import { createKey, deleteKey, getKeys } from "./network/keys";
import { getPosts } from "./network/posts";
import { createSourceWithForm, deleteSource, editSource, getSources } from "./network/sources";
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
                children: [
                    {
                        path: "create",
                        action: async ({ params, request }) => {
                            try {
                                let fd = await request.formData();

                                return createSourceWithForm(fd);
                            } catch (error) {
                                if (isAxiosError(error)) {
                                    return error;
                                }
                            }
                        },
                    },
                    {
                        path: ":id/edit",
                        action: async ({ params, request }) => {
                            try {
                                let formData = await request.formData();

                                return editSource(
                                    formData.get("title") as string,
                                    formData.get("description") as string,
                                    formData.get("rss_url") as string
                                );
                            } catch (error) {}
                        },
                    },
                    {
                        path: ":id/delete",
                        action: async ({ params }) => {
                            try {
                                notifications.show({
                                    message: "Источник удалён",
                                });

                                return deleteSource(parseInt((params as { id: string }).id));
                            } catch (error) {
                                notifications.show({
                                    message: "Произошла ошибка",
                                    color: "red",
                                });

                                if (isAxiosError(error)) return error;
                            }
                        },
                    },
                ],
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
                loader: async (): Promise<AxiosResponse<IGroupWithPosts[]>> => {
                    return await getAllGroupsPosts();
                },
            },
            {
                path: "groups",
                element: <Groups />,
                loader: async (): Promise<AxiosResponse<IGroup[]>> => {
                    return await getGroups();
                },
                children: [
                    {
                        path: "create",
                        action: async ({ params, request }) => {
                            try {
                                let formData = await request.formData();

                                let groups_vk_ids = (formData.get("groups") as string).split(",");
                                let usertoken_id = formData.get("usertoken_id");
                                let passphrase = formData.get("passphrase");
                                let requestPromises: AxiosPromise<any>[] = [];

                                groups_vk_ids.map((group_vk_id) => {
                                    requestPromises.push(
                                        createGroup(
                                            parseInt(group_vk_id),
                                            parseInt(usertoken_id as string),
                                            passphrase as string
                                        )
                                    );
                                });

                                return Promise.all(requestPromises).then(() => {
                                    notifications.show({
                                        message: requestPromises.length == 1 ? "Группа добавлена" : "Группы добавлены",
                                    });

                                    return redirect("/groups");
                                });
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
                        action: async ({ params }) => {
                            try {
                                return removeGroup(parseInt((params as { id: string }).id)).then((res) => {
                                    notifications.show({
                                        message: "Группа удалена",
                                    });

                                    return redirect("/groups");
                                });
                            } catch (error) {
                                console.log(error);

                                if (isAxiosError(error)) return error;
                            }
                        },
                    },
                ],
            },
            {
                path: "publish",
                element: <Publish />,
                loader: async (): Promise<AxiosResponse<IGroup[]>> => {
                    return await getGroups();
                },
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
                                const data = Object.fromEntries(await request.formData());
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
                            return deleteKey(Number(params.id)).then(() => redirect("/keys"));
                        },
                    },
                ],
            },
        ],
    },
]);

export default router;
