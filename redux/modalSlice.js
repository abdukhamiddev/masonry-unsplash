import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAddOpen: false,
	isDeleteOpen: [false],
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
	},
});

export const { setIsAddOpen, setIsDeleteOpen } = modalSlice.actions;
export default modalSlice.reducer;
