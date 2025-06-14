import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		auth: authReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
