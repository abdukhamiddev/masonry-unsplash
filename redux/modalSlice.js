import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAddOpen: false,
	isDeleteOpen: false,
	deleteFileName: null,
	removeFunction: null,
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
	},
});

export const {
	setIsAddOpen,
	setIsDeleteOpen,
	setRemoveFunction,
	setDeleteFileName,
} = modalSlice.actions;
export default modalSlice.reducer;
