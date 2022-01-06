import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: null,
};

export const filesSlice = createSlice({
	name: "files",
	initialState,
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload;
		},
		addFile: (state, action) => {
			state.files.unshift(action.payload);
		},

		removeFile: (state, action) => {
			state.files = state.files.map((currentFile) => {
				return currentFile.metadata.name !== action.payload.metadata.name;
			});
		},
	},
});

export const { setFiles, addFile, removeFile } = filesSlice.actions;
export default filesSlice.reducer;
