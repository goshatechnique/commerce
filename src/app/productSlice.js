import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PAGE_LENGTH } from "../utils/helpers";

const initialState = {
	allProducts: [],
	products: [],
	newArrivals: [],
	loading: false,
	error: null,
	pagesTotal: null,
	currentPage: 1,
};

export const getProductsTotal = createAsyncThunk("products/getProductsTotal", async (_, { rejectWithValue }) => {
	try {
		const result = await axios.get("https://dummyjson.com/products?limit=1");
		return Math.ceil(result.data.total / PAGE_LENGTH);
	} catch (error) {
		return rejectWithValue(error.message || "Products total getting failed");
	}
});

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
	try {
		const result = await axios.get(`https://dummyjson.com/products?limit=194`);
		return result.data.products;
	} catch (error) {
		return rejectWithValue(error.message || "Products getting failed");
	}
});

export const getNewArrivals = createAsyncThunk("products/getNewArrivals", async (_, { rejectWithValue }) => {
	try {
		const [min, max] = [1, 188];
		let newArrivals = Math.floor(Math.random() * (max - min + 1) + min);
		const result = await axios.get(`https://dummyjson.com/products?limit=6&skip=${newArrivals}`);
		return result.data.products;
	} catch (error) {
		return rejectWithValue(error.message || "New arrivals getting failed");
	}
});

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		getProductsByPage: (state) => {
			const slicedPart = state.allProducts.slice(
				PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
				PAGE_LENGTH * state.currentPage
			);
			state.products = slicedPart;
		},
	},
	extraReducers: (builder) => {
		const handlePending = (state) => {
			state.loading = true;
			state.error = null;
		};

		const handleRejected = (state, action) => {
			state.loading = false;
			state.error = action.payload;
		};

		builder
			.addCase(getProductsTotal.pending, handlePending)
			.addCase(getProductsTotal.fulfilled, (state, action) => {
				state.pagesTotal = action.payload;
			})
			.addCase(getProductsTotal.rejected, handleRejected)

			.addCase(getProducts.pending, handlePending)
			.addCase(getProducts.fulfilled, (state, action) => {
				state.allProducts = action.payload;
				state.products = state.allProducts.slice(
					PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
					PAGE_LENGTH * state.currentPage
				);
			})
			.addCase(getProducts.rejected, handleRejected)

			.addCase(getNewArrivals.pending, handlePending)
			.addCase(getNewArrivals.fulfilled, (state, action) => {
				state.newArrivals = action.payload;
			})
			.addCase(getNewArrivals.rejected, handleRejected);
	},
});

export const { setCurrentPage, getProductsByPage, getBrands } = productSlice.actions;
export default productSlice.reducer;
