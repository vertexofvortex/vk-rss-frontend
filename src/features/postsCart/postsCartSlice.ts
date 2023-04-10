import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../models";

interface IPostsCart {
    posts: {
        [id: number]: IPost;
    };
}

const initialState: IPostsCart = {
    posts: {},
};

export const postsCartSlice = createSlice({
    name: "postsCart",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IPost>) => {
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.id]: action.payload,
                },
            };
        },
        removePost: (state, action: PayloadAction<IPost>) => {
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
