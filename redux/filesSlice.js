import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: [],
	searchTerm: "",
};

export const filesSlice = createSlice({
	name: "files",
	initialState,
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload;
		},
		addFiles: (state, action) => {
			state.files.push(...action.payload);
		},
		addFile: (state, action) => {
			state.files.unshift(action.payload);
		},

		removeFile: (state, action) => {
			state.files = state.files.filter((currentFile) => {
				return currentFile.name !== action.payload.name;
			});
		},

		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { setFiles, addFiles, removeFile, addFile, setSearchTerm } =
	filesSlice.actions;
export default filesSlice.reducer;
