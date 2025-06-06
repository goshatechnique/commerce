import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Basket from "./pages/Basket/Basket.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Product from "./pages/Product/Product.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import Features from "./components/Features/Features.jsx";
import Follow from "./components/Follow/Follow.jsx";
import Subscribe from "./components/Subscribe/Subsribe.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Cart from "./components/Cart/Cart.jsx";

import { setAuthChecked, subscribeToAuthChanges } from "./app/authSlice.js";
import { hideCart } from "./app/cartSlice.js";
import "./assets/styles/App.scss";
import NotFound from "./pages/NotFound/NotFound.jsx";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

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
	//* rework 404 page with handle redirect to product with nonexisting id
	return (
		<BrowserRouter>
			<div className="App">
				{!isAuthChecked ? (
					<Loader />
				) : (
					<>
						<ScrollToTop />
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
								<Route path="/*" element={<NotFound />} />
							</Route>
						</Routes>
					</>
				)}
				<Cart isOpen={isOpen} onClose={() => dispatch(hideCart())} />
			</div>
		</BrowserRouter>
	);
}

export default App;
