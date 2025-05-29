import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "./components/Product";
import { getProducts, getProductsByPage, getProductsTotal, setCurrentPage } from "../../app/productSlice";
import "./Shop.scss";
import { BRANDS, CATEGORIES, TAGS } from "../../utils/helpers";
import FilterSection from "./components/FIlterSection";

function Shop() {
	const { products, pagesTotal, currentPage } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductsTotal());
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getProductsByPage());
	}, [dispatch, currentPage]);

	function setCurrentPageHandler(i) {
		dispatch(setCurrentPage(i));
	}

	function createPageSelector() {
		let startPage = Math.max(1, currentPage - 1);
		let endPage = Math.min(pagesTotal - 1, currentPage + 1);

		if (currentPage === 1) {
			endPage = Math.min(2, pagesTotal - 1);
		} else if (currentPage === pagesTotal - 1) {
			startPage = Math.max(pagesTotal - 3, 1);
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages.map((i) => {
			return (
				<div
					key={i}
					className={`goods__pages-page ${i === currentPage ? "active" : ""}`}
					onClick={() => setCurrentPageHandler(i)}
				>
					{i}
				</div>
			);
		});
	}

	return (
		<div className="shop">
			<div className="filters-section">
				<div className="title">Filters</div>
				<FilterSection name="Brands" tags={BRANDS} />
				<FilterSection name="Category" tags={CATEGORIES} specialStyles="columnned" />
				<FilterSection name="Tags" tags={TAGS} />
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
