import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "light" },
  reducers: {
    toggleTheme: (state, action) => {
      state.value = action.payload;
      const body = document.querySelector("body");
      body.classList.remove("theme-light", "theme-dark");
      body.classList.add(`theme-${state.value}`);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
