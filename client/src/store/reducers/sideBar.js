import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  isOpenSideBar: false,
};
export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: theInitialState,
  reducers: {
    openSideBar(state, action) {
      state.isOpenSideBar = action.payload.isOpenSideBar;
    },
    closeSideBar(state, action) {
      state.isOpenSideBar = action.payload.isOpenSideBar;
    },
  },
});

export default sideBarSlice;
