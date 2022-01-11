import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAddOpen: false,
	isDeleteOpen: false,
	deleteFileName: null,
	removeFunction: null,
	loading: "false",
	progress: false,
	loaded: false,
};
export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setIsAddOpen: (state, action) => {
			state.isAddOpen = action.payload;
		},
		setIsDeleteOpen: (state, action) => {
			state.isDeleteOpen = action.payload;
		},

		setDeleteFileName: (state, action) => {
			state.deleteFileName = action.payload;
		},

		setRemoveFunction: (state, action) => {
			state.removeFunction = action.payload;
		},

		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProgress: (state, action) => {
			state.progress = action.payload;
		},
	},
});

export const {
	setIsAddOpen,
	setIsDeleteOpen,
	setRemoveFunction,
	setDeleteFileName,
	setLoading,
	setProgress,
} = modalSlice.actions;
export default modalSlice.reducer;
