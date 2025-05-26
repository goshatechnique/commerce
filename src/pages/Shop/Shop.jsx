import { useEffect, useState } from "react";
import axios from "axios";

import Product from "./components/Product";
import "./Shop.scss";

function Shop() {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesTotal, setPagesTotal] = useState(0);

	function createPageSelector() {
		const result = [];
		for (let i = 1; i < pagesTotal + 1; i++) {
			result.push(
				<div
					key={i}
					className={`goods__pages-page ${i === currentPage ? "active" : ""}`}
					onClick={() => setCurrentPage(i)}
				>
					{i}
				</div>
			);
		}
		return result;
	}

	useEffect(() => {
		axios.get("https://fakestoreapi.com/products").then((res) => {
			setProducts(res.data.slice(currentPage * 6 - 6, currentPage * 6));
			setPagesTotal(Math.ceil(res.data.length / 6));
		});
	}, [currentPage]);

	return (
		<div className="shop">
			<div className="filters">
				<h1>filters</h1>
				<h2>prices</h2>
				<h2>brands</h2>
			</div>
			<div className="goods">
				<h1>goods</h1>
				<div className="goods-container">
					{products?.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</div>
				<div className="goods__pages">{pagesTotal > 0 ? createPageSelector() : null}</div>
			</div>
		</div>
	);
}

export default Shop;
