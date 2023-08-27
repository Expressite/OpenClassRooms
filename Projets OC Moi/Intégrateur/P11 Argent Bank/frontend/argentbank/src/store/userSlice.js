import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Retournez la valeur du token dans le reducer
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUser, updateUserName } = userSlice.actions;
export default userSlice.reducer;
