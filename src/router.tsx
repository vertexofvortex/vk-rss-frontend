import { AxiosResponse } from "axios";
import { createBrowserRouter } from "react-router-dom";
import { ISource } from "./models";
import { IPost } from "./models/Post";
import { getPosts } from "./network/posts";
import { getSources } from "./network/sources";
import { FeedsAll } from "./routes/feeds/feeds-all";
import { FeedsGroups } from "./routes/feeds/feeds-groups";
import { Keys } from "./routes/keys/keys";
import { Publish } from "./routes/publish/publish";
import { Root } from "./routes/root/root";
import { Sources } from "./routes/sources/sources";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/sources",
                element: <Sources />,
                loader: async (): Promise<AxiosResponse<ISource[]>> => {
                    return await getSources();
                },
            },
            {
                path: "/feeds/all",
                element: <FeedsAll />,
                loader: async (): Promise<AxiosResponse<IPost[]>> => {
                    return await getPosts();
                },
            },
            {
                path: "/feeds/groups",
                element: <FeedsGroups />,
            },
            {
                path: "/publish",
                element: <Publish />,
            },
            {
                path: "/keys",
                element: <Keys />,
            },
        ],
    },
]);

export default router;
