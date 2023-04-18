import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPostInCart } from "../../models/Post";

interface IPostsCart {
  posts: {
    [id: number]: IPostInCart;
  };
}

const initialState: IPostsCart = {
  posts: {},
};

export const postsCartSlice = createSlice({
  name: "postsCart",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPostInCart>) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
      };
    },
    removePost: (state, action: PayloadAction<IPostInCart>) => {
      let newPostsCart = { ...state.posts };
      delete newPostsCart[action.payload.id];

      return {
        ...state,
        posts: newPostsCart,
      };
    },
  },
});

export const { addPost, removePost } = postsCartSlice.actions;
export default postsCartSlice.reducer;
