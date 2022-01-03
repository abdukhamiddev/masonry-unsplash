import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./filesSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
	reducer: { files: filesReducer, modal: modalReducer },
});
