import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: null,
	selectedFile: null,
};

export const filesSlice = createSlice({
	name: "files",
	initialState,
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload;
		},
		setSelectedFile: (state, action) => {
			state.selectedFile = action.payload;
		},
	},
});

export const { setFiles, setSelectedFile } = filesSlice.actions;
export default filesSlice.reducer;
