import { createSlice } from "@reduxjs/toolkit";

const OpenImageSlices = createSlice({
  name: "openImage",
  initialState: {
    data: {
        url: "",
        show: false,
    },
  },
  reducers: {
    setOpenImage: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setOpenImage } = OpenImageSlices.actions;
export default OpenImageSlices.reducer;