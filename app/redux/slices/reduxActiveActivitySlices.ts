import { createSlice } from "@reduxjs/toolkit";

const ActiveActivitySlices = createSlice({
  name: "activeActivity",
  initialState: {
    data: {
        show: "Health",
    },
  },
  reducers: {
    setActive: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setActive } = ActiveActivitySlices.actions;
export default ActiveActivitySlices.reducer;