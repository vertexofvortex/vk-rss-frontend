import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IKeyInStore } from "../../models/Key";

interface IKeys {
  keys: {
    [id: number]: IKeyInStore;
  };
}

const initialState: IKeys = {
  keys: {},
};

export const keysSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {
    rememberKey: (state, action: PayloadAction<IKeyInStore>) => {
      return {
        ...state,
        keys: {
          ...state.keys,
          [action.payload.id]: action.payload,
        },
      };
    },
    forgetKey: (state, action: PayloadAction<number>) => {
      let newKeys = { ...state.keys };
      delete newKeys[action.payload];

      return {
        ...state,
        keys: newKeys,
      };
    },
  },
});

export const { rememberKey, forgetKey } = keysSlice.actions;
export default keysSlice.reducer;
