import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "./app/store";

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
