import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: null,
	selectedFile: null,
	selectedFileLabel: false,
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

		setSelectedFileLabel: (state, action) => {
			state.selectedFileLabel = action.payload;
		},
	},
});

export const { setFiles, setSelectedFile, setSelectedFileLabel } =
	filesSlice.actions;
export default filesSlice.reducer;
