import { configureStore } from "@reduxjs/toolkit";
import postsCartReducer from "../features/postsCart/postsCartSlice";

export const store = configureStore({
    reducer: {
        postsCart: postsCartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
