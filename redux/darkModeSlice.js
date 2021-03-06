import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("darkMode")) || false
			: false,
};

export const darkModeSlice = createSlice({
	name: "darkMode",
	initialState,
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
	},
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
