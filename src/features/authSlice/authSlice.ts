import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuth {
  token: string | null;
}

const initialState: IAuth = {
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    clear: (state) => {
      return {
        ...state,
        token: null,
      };
    },
  },
});

export const { set, clear } = authSlice.actions;
export default authSlice.reducer;
