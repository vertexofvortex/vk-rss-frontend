import { createBrowserRouter } from "react-router-dom";
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
            },
            {
                path: "/feeds",
                element: <FeedsAll />,
            },
            {
                path: "/feeds/all",
                element: <FeedsAll />,
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
