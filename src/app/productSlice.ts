import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { filterProducts, PAGE_LENGTH, sortProducts } from "../utils/helpers";
import { Product } from "../types/global";

interface PriceRange {
	min: number;
	max: number;
}

interface Filters {
	brand: string[];
	category: string[];
	price: PriceRange;
}

interface Sorting {
	type: string | null;
	field: string | null;
}

interface ProductsState {
	productsAll: Product[];
	productsVisible: Product[];
	newArrivals: Product[];
	loading: boolean;
	error: string | null;
	pagesTotal: number | null;
	currentPage: number;
	filters: Filters;
	sorting: Sorting;
}

const initialState: ProductsState = {
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

export const getProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
	"products/getProducts",
	async (_, { rejectWithValue }) => {
		try {
			const result = await axios.get<{ products: Product[] }>("https://dummyjson.com/products?limit=194");
			return result.data.products;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Products getting failed");
		}
	}
);

export const getNewArrivals = createAsyncThunk<Product[], string | null, { rejectValue: string }>(
	"products/getNewArrivals",
	async (category, { rejectWithValue }) => {
		try {
			const result = await axios.get<{ products: Product[] }>(
				`https://dummyjson.com/products?limit=${category ? 194 : 6}`
			);

			if (category) {
				return result.data.products.filter((product) => product.category === category).slice(0, 6);
			}

			return result.data.products.slice(0, 6);
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "New arrivals getting failed");
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setCurrentPage: (state: ProductsState, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		getProductsByPage: (state: ProductsState) => {
			const slicedPart = state.productsAll.slice(
				PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
				PAGE_LENGTH * state.currentPage
			);
			state.productsVisible = slicedPart;
		},
		changeFilters: (state: ProductsState, action: PayloadAction<{ category: "brand" | "category"; tag: string }>) => {
			const { category, tag } = action.payload;
			const updatedCategory = [...state.filters[category]];
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
		changeFilterPrice: (state: ProductsState, action: PayloadAction<PriceRange>) => {
			if (state.filters.price.min === action.payload.min && state.filters.price.max === action.payload.max) {
				state.filters.price = {
					min: 0,
					max: Infinity,
				};
			} else {
				state.filters.price = action.payload;
			}
			state.currentPage = 1;
		},
		changeSorting: (state: ProductsState, action: PayloadAction<Sorting>) => {
			state.sorting = action.payload;
			state.currentPage = 1;
		},
		resetFilters: (state: ProductsState) => {
			state.filters = {
				brand: [],
				category: [],
				price: { min: 0, max: Infinity },
			};
		},
	},
	extraReducers: (builder) => {
		const handlePending = (state: ProductsState) => {
			state.loading = true;
			state.error = null;
		};

		const handleRejected = (state: ProductsState, action: PayloadAction<string | undefined>) => {
			state.loading = false;
			state.error = action.payload || "Unknown error occurred";
		};

		builder
			.addCase(getProducts.pending, handlePending)
			.addCase(getProducts.fulfilled, (state: ProductsState, action: PayloadAction<Product[]>) => {
				let requestedProducts = filterProducts(action.payload, state.filters);
				requestedProducts = sortProducts(requestedProducts, state.sorting.type, state.sorting.field);

				state.productsAll = requestedProducts;
				state.pagesTotal = Math.ceil(requestedProducts.length / PAGE_LENGTH);
				state.productsVisible = requestedProducts.slice(
					PAGE_LENGTH * state.currentPage - PAGE_LENGTH,
					PAGE_LENGTH * state.currentPage
				);
				state.loading = false;
			})
			.addCase(getProducts.rejected, handleRejected)
			.addCase(getNewArrivals.pending, handlePending)
			.addCase(getNewArrivals.fulfilled, (state: ProductsState, action: PayloadAction<Product[]>) => {
				state.newArrivals = action.payload;
				state.loading = false;
			})
			.addCase(getNewArrivals.rejected, handleRejected);
	},
});

export const { setCurrentPage, getProductsByPage, changeFilters, changeSorting, changeFilterPrice, resetFilters } =
	productSlice.actions;

export default productSlice.reducer;
