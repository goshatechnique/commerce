import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { getCartFromLocalStorage } from "./cartSlice";
import { AppDispatch } from "./store";

interface LoginData {
	email: string;
	password: string;
}

interface User {
	uid: string;
	email: string | null;
	emailVerified: boolean;
	displayName?: string | null;
	photoURL?: string | null;
}

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
	isAuthChecked: boolean;
}

const normalizeUser = (user: FirebaseUser): User => {
	return {
		uid: user.uid,
		email: user.email,
		emailVerified: user.emailVerified,
		displayName: user.displayName || null,
		photoURL: user.photoURL || null,
	};
};

export const subscribeToAuthChanges =
	() =>
	(dispatch: AppDispatch): Promise<void> => {
		return new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					dispatch(setUser(normalizeUser(user)));
					const serializedUserId = JSON.stringify(user.uid);
					localStorage.setItem("uid", serializedUserId);
				} else {
					dispatch(clearUser());
					localStorage.removeItem("uid");
				}
				dispatch(getCartFromLocalStorage());
				resolve();
			});
		});
	};

export const registerWithEmailAndPassword = createAsyncThunk<User, LoginData, { rejectValue: string }>(
	"auth/registerWithEmailAndPassword",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			return normalizeUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Registration failed");
		}
	}
);

export const loginWithEmailAndPassword = createAsyncThunk<User, LoginData, { rejectValue: string }>(
	"auth/loginWithEmailAndPassword",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return normalizeUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Login failed");
		}
	}
);

export const loginWithGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
	"auth/loginWithGoogle",
	async (_, { rejectWithValue }) => {
		try {
			const userCredential = await signInWithPopup(auth, googleProvider);
			return normalizeUser(userCredential.user);
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Google login failed");
		}
	}
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Logout failed");
		}
	}
);

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
	isAuthChecked: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state: AuthState, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.error = null;
		},
		clearUser: (state: AuthState) => {
			state.user = null;
			state.error = null;
		},
		setAuthChecked: (state: AuthState, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
	},
	extraReducers: (builder) => {
		const handlePending = (state: AuthState) => {
			state.loading = true;
			state.error = null;
		};

		const handleFulfilled = (state: AuthState, action: PayloadAction<User>) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthChecked = true;
		};

		const handleRejected = (state: AuthState, action: PayloadAction<string | undefined>) => {
			state.loading = false;
			state.error = action.payload || "Unknown error occurred";
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
			.addCase(logout.fulfilled, (state: AuthState) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logout.rejected, handleRejected);
	},
});

export const { setUser, clearUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
