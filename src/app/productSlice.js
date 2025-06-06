import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterProducts, PAGE_LENGTH, sortProducts } from "../utils/helpers";

const initialState = {
	productsAll: [],
	productsVisible: [],
	newArrivals: [],
	loading: false,
	error: null,
	pagesTotal: null,
	currentPage: 1,
	filters: {
		brand: [],
		category: [],
		price: { min: 0, max: Infinity },
	},
	sorting: {
		type: null,
		field: null,
	},
};

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
	try {
		const result = await axios.get(`https://dummyjson.com/products?limit=194`);
		return result.data.products;
	} catch (error) {
		return rejectWithValue(error.message || "Products getting failed");
	}
});

export const getNewArrivals = createAsyncThunk(
	"products/getNewArrivals",
	async (category = null, { rejectWithValue }) => {
		try {
			let result = await axios.get(`https://dummyjson.com/products?limit=${category ? 194 : 6}`);
			if (category) {
				return result.data.products.filter((product) => product.category === category).slice(0, 6);
			}

			return result.data.products.slice(0, 6);
		} catch (error) {
			return rejectWithValue(error.message || "New arrivals getting failed");
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		getProductsByPage: (state) => {
			const slicedPart = state.productsAll.slice(
				PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
				PAGE_LENGTH * state.currentPage
			);
			state.productsVisible = slicedPart;
		},
		changeFilters: (state, action) => {
			let { category, tag } = action.payload;
			let updatedCategory = [...state.filters[category]];
			const tagIndex = updatedCategory.indexOf(tag);
			if (tagIndex === -1) {
				updatedCategory.push(tag);
			} else {
				updatedCategory.splice(tagIndex, 1);
			}
			state.filters = {
				...state.filters,
				[category]: updatedCategory,
			};
			state.currentPage = 1;
		},
		changeFilterPrice: (state, action) => {
			if (state.filters.price.min === action.payload.min && state.filters.price.max === action.payload.max) {
				state.filters.price = {
					min: 0,
					max: Infinity,
				};
			} else {
				state.filters.price = { min: action.payload.min, max: action.payload.max };
			}
			state.currentPage = 1;
		},
		changeSorting: (state, action) => {
			state.sorting = {
				type: action.payload.type,
				field: action.payload.field,
			};
			state.currentPage = 1;
		},
		resetFilters: (state) => {
			state.filters = {
				brand: [],
				category: [],
				price: { min: 0, max: Infinity },
			};
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
			.addCase(getProducts.pending, handlePending)
			.addCase(getProducts.fulfilled, (state, action) => {
				let requestedProducts = filterProducts(action.payload, state.filters); // filter products
				requestedProducts = sortProducts(requestedProducts, state.sorting.type, state.sorting.field); // sort products
				state.productsAll = requestedProducts;
				state.pagesTotal = Math.ceil(requestedProducts.length / 6);
				state.productsVisible = state.productsAll.slice(
					PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
					PAGE_LENGTH * state.currentPage
				);
				state.loading = false;
			})
			.addCase(getProducts.rejected, handleRejected)

			.addCase(getNewArrivals.pending, handlePending)
			.addCase(getNewArrivals.fulfilled, (state, action) => {
				state.newArrivals = action.payload;
			})
			.addCase(getNewArrivals.rejected, handleRejected);
	},
});

export const {
	setCurrentPage,
	getProductsByPage,
	getBrands,
	changeFilters,
	changeSorting,
	changeFilterPrice,
	resetFilters,
} = productSlice.actions;
export default productSlice.reducer;
