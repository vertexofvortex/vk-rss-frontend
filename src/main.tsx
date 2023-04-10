import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { saveState } from "./app/store-persist";

store.subscribe(() => saveState(store.getState()));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Notifications />
                <RouterProvider router={router} />
            </MantineProvider>
        </Provider>
    </React.StrictMode>
);
