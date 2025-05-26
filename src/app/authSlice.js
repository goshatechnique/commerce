import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

export const subscribeToAuthChanges = () => (dispatch) => {
	return new Promise((resolve) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser(filterUser(user)));
			} else {
				dispatch(clearUser());
			}
			resolve();
		});
	});
};

export const registerWithEmailAndPassword = createAsyncThunk(
	"auth/registerWithEmailAndPassword",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			return filterUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const loginWithEmailAndPassword = createAsyncThunk(
	"auth/loginWithEmailAndPassword",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return filterUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error.message);
		} finally {
		}
	}
);

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider);
		return filterUser(userCredential.user);
	} catch (error) {
		return rejectWithValue(error.message);
	} finally {
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	try {
		await signOut(auth);
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const filterUser = (user) => {
	if (!user) return null;

	return {
		uid: user.uid,
		email: user.email,
		emailVerified: user.emailVerified,
		displayName: user.displayName,
		photoURL: user.photoURL,
	};
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: false,
		error: null,
		isAuthChecked: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.error = null;
		},
		clearUser: (state) => {
			state.user = null;
			state.error = null;
		},
		setAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithEmailAndPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginWithEmailAndPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(registerWithEmailAndPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(registerWithEmailAndPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setUser, clearUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
