import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlices = createSlice({
  name: "mobileMenu",
  initialState: {
    data: {
        show: false,
    },
  },
  reducers: {
    setMobileMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMobileMenu } = mobileMenuSlices.actions;
export default mobileMenuSlices.reducer;