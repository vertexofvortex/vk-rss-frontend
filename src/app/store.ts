import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import postsCartReducer from "../features/postsCart/postsCartSlice";
import { loadState } from "./store-persist";

const reducers = combineReducers({
  postsCart: postsCartReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: reducers,
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
