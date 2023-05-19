import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsCartReducer from "../features/postsCart/postsCartSlice";
import keysReducer from "../features/keys/keysSlice";
import { loadState } from "./store-persist";

const reducers = combineReducers({
  postsCart: postsCartReducer,
  auth: authReducer,
  keys: keysReducer,
});

export const store = configureStore({
  reducer: reducers,
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
