import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Auth from "./pages/Auth/Auth";
import Basket from "./pages/Basket/Basket";
import Checkout from "./pages/Checkout/Checkout";
import Product from "./pages/Product/Product";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Reviews from "./components/Reviews/Reviews";
import Features from "./components/Features/Features";
import Follow from "./components/Follow/Follow";
import Subscribe from "./components/Subscribe/Subsribe";
import Loader from "./components/Loader/Loader";
import Cart from "./components/Cart/Cart";

import { setAuthChecked, subscribeToAuthChanges } from "./app/authSlice.ts";
import { hideCart } from "./app/cartSlice.ts";
import "./assets/styles/App.scss";

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
