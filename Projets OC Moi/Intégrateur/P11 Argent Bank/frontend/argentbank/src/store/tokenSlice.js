import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: "", // Mettez l'état initial comme une chaîne vide
  reducers: {
    setToken: (state, action) => {
      return action.payload; // Retournez la valeur du token dans le reducer
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
