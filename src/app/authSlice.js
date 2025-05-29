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
				dispatch(setUser(normalizeUser(user)));
				const serializedUserId = JSON.stringify(user.uid);
				localStorage.setItem("uid", serializedUserId);
			} else {
				dispatch(clearUser());
				localStorage.clear("uid");
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
			return normalizeUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error.message || "Registration failed");
		}
	}
);

export const loginWithEmailAndPassword = createAsyncThunk(
	"auth/loginWithEmailAndPassword",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return normalizeUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error.message || "Login failed");
		}
	}
);

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider);
		return normalizeUser(userCredential.user);
	} catch (error) {
		return rejectWithValue(error.message || "Google login failed");
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	try {
		await signOut(auth);
	} catch (error) {
		return rejectWithValue(error.message || "Logout failed");
	}
});

const normalizeUser = (user) => {
	if (!user) return null;

	return {
		uid: user.uid,
		email: user.email,
		emailVerified: user.emailVerified,
		displayName: user.displayName,
		photoURL: user.photoURL,
	};
};

const initialState = {
	user: null,
	loading: false,
	error: null,
	isAuthChecked: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
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
		const handlePending = (state) => {
			state.loading = true;
			state.error = null;
		};

		const handleFulfilled = (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthChecked = true;
		};

		const handleRejected = (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthChecked = true;
		};

		builder
			.addCase(loginWithEmailAndPassword.pending, handlePending)
			.addCase(loginWithEmailAndPassword.fulfilled, handleFulfilled)
			.addCase(loginWithEmailAndPassword.rejected, handleRejected)

			.addCase(registerWithEmailAndPassword.pending, handlePending)
			.addCase(registerWithEmailAndPassword.fulfilled, handleFulfilled)
			.addCase(registerWithEmailAndPassword.rejected, handleRejected)

			.addCase(loginWithGoogle.pending, handlePending)
			.addCase(loginWithGoogle.fulfilled, handleFulfilled)
			.addCase(loginWithGoogle.rejected, handleRejected)

			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logout.rejected, handleRejected);
	},
});

export const { setUser, clearUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
