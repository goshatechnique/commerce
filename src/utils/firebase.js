import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBOhUejUjoviAar9lmKSUsA8Ev47zd-V1w",
	authDomain: "commerce-26944.firebaseapp.com",
	projectId: "commerce-26944",
	storageBucket: "commerce-26944.firebasestorage.app",
	messagingSenderId: "710075767615",
	appId: "1:710075767615:web:7fa7e0aa4d9d36d647118a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
