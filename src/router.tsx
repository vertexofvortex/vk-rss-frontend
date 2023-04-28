import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  blockPostAction,
  unblockPostAction,
} from "./routes/feeds/feeds.action";
import {
  loadBlacklist,
  loadGroupsPosts,
  loadPosts,
} from "./routes/feeds/feeds.loader";
import {
  createGroupAction,
  deleteGroupAction,
} from "./routes/groups/groups.action";
import { loadGroups } from "./routes/groups/groups.loader";
import { createKeyAction, deleteKeyAction } from "./routes/keys/keys.action";
import { loadKeys } from "./routes/keys/keys.loader";
import { loginAction } from "./routes/login/login.action";
import {
  createSourceAction,
  deleteSourceAction,
  editSourceAction,
} from "./routes/sources/sources.action";
import { sourcesLoader } from "./routes/sources/sources.loader";

const FeedsAll = lazy(() => import("./routes/feeds/feeds-all"));
const FeedsGroups = lazy(() => import("./routes/feeds/feeds-groups"));
const FeedsBlacklist = lazy(() => import("./routes/feeds/feeds-blacklist"));
const Groups = lazy(() => import("./routes/groups/groups"));
const Keys = lazy(() => import("./routes/keys/keys"));
const Login = lazy(() => import("./routes/login/login"));
const Publish = lazy(() => import("./routes/publish/publish"));
const Root = lazy(() => import("./routes/root/root"));
const Sources = lazy(() => import("./routes/sources/sources"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Root />
      </Suspense>
    ),
    errorElement: (
      <Suspense>
        <Root isError />
      </Suspense>
    ),
    children: [
      {
        path: "",
        index: true,
        element: <Navigate to="/sources" />,
      },
      {
        path: "login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
        action: loginAction,
      },
      {
        path: "sources",
        element: (
          <Suspense>
            <Sources />
          </Suspense>
        ),
        loader: sourcesLoader,
        children: [
          {
            path: "create",
            action: createSourceAction,
          },
          {
            path: ":id/edit",
            action: editSourceAction,
          },
          {
            path: ":id/delete",
            action: deleteSourceAction,
          },
        ],
      },
      {
        path: "feeds",
        children: [
          {
            path: "",
            index: true,
            element: <Navigate to={"/feeds/all"} />,
          },
          {
            path: "all",
            element: (
              <Suspense>
                <FeedsAll />
              </Suspense>
            ),
            loader: loadPosts,
            children: [
              {
                path: ":id/block",
                action: blockPostAction,
              },
            ],
          },
          {
            path: "groups",
            element: (
              <Suspense>
                <FeedsGroups />
              </Suspense>
            ),
            loader: loadGroupsPosts,
            children: [
              {
                path: ":id/block",
                action: blockPostAction,
              },
            ],
          },
          {
            path: "blacklist",
            element: (
              <Suspense>
                <FeedsBlacklist />
              </Suspense>
            ),
            loader: loadBlacklist,
            children: [
              {
                path: ":id/unblock",
                action: unblockPostAction,
              },
            ],
          },
        ],
      },
      {
        path: "groups",
        element: (
          <Suspense>
            <Groups />
          </Suspense>
        ),
        loader: loadGroups,
        children: [
          {
            path: "create",
            action: createGroupAction,
          },
          {
            path: ":id/delete",
            action: deleteGroupAction,
          },
        ],
      },
      {
        path: "publish",
        element: (
          <Suspense>
            <Publish />
          </Suspense>
        ),
        loader: loadGroups,
      },
      {
        path: "keys",
        element: (
          <Suspense>
            <Keys />
          </Suspense>
        ),
        loader: loadKeys,
        children: [
          {
            path: "create",
            action: createKeyAction,
          },
          {
            path: ":id/delete",
            action: deleteKeyAction,
          },
        ],
      },
    ],
  },
]);

export default router;
