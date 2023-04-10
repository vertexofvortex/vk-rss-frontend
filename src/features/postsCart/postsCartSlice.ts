import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../models";

interface IPostsCart {
    posts: IPost[];
}

const initialState: IPostsCart = {
    posts: [],
};

export const postsCartSlice = createSlice({
    name: "postsCart",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IPost>) => {
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        },
        removePost: (state, action: PayloadAction<IPost>) => {
            return {
                ...state,
                posts: [
                    ...state.posts.filter(
                        (post) => post.id != action.payload.id
                    ),
                ],
            };
        },
    },
});

export const { addPost, removePost } = postsCartSlice.actions;
export default postsCartSlice.reducer;
