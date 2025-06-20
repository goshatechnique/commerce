import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../utils/helpers";
import { Product } from "../types/global";

interface Checkout {
	email: string;
	country: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	postalCode: string;
	cardType: string;
	cardNumber: string;
	expirationDate: string;
	cvc: string;
	cardHolderName: string;
}

interface CartState {
	isOpen: boolean;
	items: Array<Product>;
	checkout: Checkout;
}

const initialState: CartState = {
	isOpen: false,
	items: [],
	checkout: {
		email: "",
		country: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		postalCode: "",
		cardType: "",
		cardNumber: "",
		expirationDate: "",
		cvc: "",
		cardHolderName: "",
	},
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		openCart: (state: CartState) => {
			state.isOpen = true;
		},
		hideCart: (state: CartState) => {
			state.isOpen = false;
		},
		addItem(state: CartState, action: PayloadAction<Product>) {
			const product = action.payload;
			if (!product) return;
			const existingProduct = state.items.find((i) => i.id === product.id);
			if (existingProduct) {
				const newCount = existingProduct.quantity + product.quantity;
				if (newCount <= existingProduct.stock) {
					existingProduct.quantity = newCount;
				} else {
					//* rework with popup in future
					alert("Sorry, not enough goods in stock");
				}
			} else {
				state.items.push(product);
			}
			saveCartToLocalStorage(state.items);
		},
		getCartFromLocalStorage(state: CartState) {
			state.items = loadCartFromLocalStorage();
		},
		removeItem(state: CartState, action: PayloadAction<number>) {
			const id = action.payload;
			state.items = state.items.filter((i) => i.id !== id);
			saveCartToLocalStorage(state.items);
		},
		updateQuantity(state: CartState, action: PayloadAction<{ id: number; quantity: number }>) {
			const { id, quantity } = action.payload;
			const item = state.items.find((i) => i.id === id);
			if (item) {
				item.quantity = quantity;
			}
			saveCartToLocalStorage(state.items);
		},
		clearCart(state: CartState) {
			state.items = [];
			saveCartToLocalStorage(state.items);
		},
		updateCheckout(state: CartState, action: PayloadAction<{ field: string; data: string }>) {
			state.checkout = { ...state.checkout, [action.payload.field]: action.payload.data };
		},
	},
});

export const {
	openCart,
	hideCart,
	addItem,
	getCartFromLocalStorage,
	removeItem,
	updateQuantity,
	clearCart,
	updateCheckout,
} = cartSlice.actions;
export default cartSlice.reducer;
