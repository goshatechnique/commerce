import { createSlice } from "@reduxjs/toolkit";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../utils/helpers";

const initialState = {
	isOpen: false,
	items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		openCart: (state) => {
			state.isOpen = true;
		},
		hideCart: (state) => {
			state.isOpen = false;
		},
		addItem(state, action) {
			const item = action.payload;
			const existingItem = state.items.find((i) => i.id === item.id);
			if (existingItem) {
				const newCount = existingItem.quantity + item.quantity;
				if (newCount <= existingItem.stock) {
					existingItem.quantity = newCount;
				} else {
					//* rework with popup in future
					alert("Sorry, not enough goods in stock");
				}
			} else {
				state.items.push(item);
			}
			saveCartToLocalStorage(state.items);
		},
		removeItem(state, action) {
			const id = action.payload;
			state.items = state.items.filter((i) => i.id !== id);
			saveCartToLocalStorage(state.items);
		},
		updateQuantity(state, action) {
			const { id, quantity } = action.payload;
			const item = state.items.find((i) => i.id === id);
			if (item) {
				item.quantity = quantity;
			}
			saveCartToLocalStorage(state.items);
		},
		clearCart(state) {
			state.items = [];
			saveCartToLocalStorage(state.items);
		},
	},
});

export const { openCart, hideCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
