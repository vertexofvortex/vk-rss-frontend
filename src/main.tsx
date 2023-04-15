import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { saveState } from "./app/store-persist";
import "./main.css";

store.subscribe(() => saveState(store.getState()));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <Notifications />
                <RouterProvider router={router} />
            </MantineProvider>
        </Provider>
    </React.StrictMode>
);
