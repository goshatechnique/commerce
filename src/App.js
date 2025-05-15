import { BrowserRouter, Routes, Route } from "react-router";

import "./assets/App.scss";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";

function Product() {
	return <p>Product</p>;
}

function Shop() {
	return <p>Shop</p>;
}

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/product" element={<Product />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
