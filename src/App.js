import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import "./assets/styles/App.scss";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import Features from "./components/Features/Features.jsx";
import Follow from "./components/Follow/Follow.jsx";
import Subscribe from "./components/Subscribe/Subsribe.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Product from "./pages/Product/Product.jsx";
import { useEffect } from "react";
import { setAuthChecked, subscribeToAuthChanges } from "./app/authSlice.js";
import Auth from "./pages/Auth/Auth.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Cart from "./components/Cart/Cart.jsx";
import { hideCart } from "./app/cartSlice.js";
import Basket from "./pages/Basket/Basket.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";

function LayoutWithHeader() {
	return (
		<>
			<Header />
			<Outlet />
			<Reviews />
			<Features />
			<Follow />
			<Subscribe />
			<Footer />
		</>
	);
}

function LayoutWithoutHeader() {
	return <Outlet />;
}

function App() {
	const dispatch = useDispatch();
	const { isAuthChecked } = useSelector((state) => state.auth);
	const { isOpen } = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(subscribeToAuthChanges()).then(() => {
			dispatch(setAuthChecked(true));
		});
	}, [dispatch]);

	return (
		<BrowserRouter>
			<div className="App">
				{!isAuthChecked ? (
					<Loader />
				) : (
					<Routes>
						<Route element={<LayoutWithHeader />}>
							<Route path="/" element={<Home />} />
							<Route path="/shop/:id" element={<Shop />} />
							<Route path="/product/:id" element={<Product />} />
							<Route path="/basket" element={<Basket />} />
							<Route path="/checkout" element={<Checkout />} />
						</Route>

						<Route element={<LayoutWithoutHeader />}>
							<Route path="/auth" element={<Auth />} />
						</Route>
					</Routes>
				)}
				<Cart isOpen={isOpen} onClose={() => dispatch(hideCart())} />
			</div>
		</BrowserRouter>
	);
}

export default App;
