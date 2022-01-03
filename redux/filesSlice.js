import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: null,
	selectedFile: null,
};

export const fileslice = createSlice({
	name: "files",
	initialState,
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload;
		},
		setSelectedFile: (state, action) => {
			stete.selectedFile = action.payload;
		},
	},
});

export const { setFiles, setSelectedFile } = fileslice.actions;
export default fileSlice.reducer;
