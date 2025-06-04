import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import FilterSection from "./components/FilterSection";
import Product from "./components/Product";
import Loader from "../../components/Loader/Loader";

import { getProducts, getProductsByPage, setCurrentPage, updateSort } from "../../app/productSlice";
import { BRANDS, CATEGORIES, PRICES, TAGS } from "../../utils/helpers";
import "./Shop.scss";

function Shop() {
	const { products, pagesTotal, currentPage, filters, loading } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	let isProductsExist = !!products?.length;
	let isProductsLoading = loading;

	useEffect(() => {
		dispatch(getProducts());
	}, [filters, dispatch]);

	useEffect(() => {
		dispatch(getProductsByPage());
		if (Number(id) !== currentPage) navigate(`/shop/${currentPage}`);
	}, [dispatch, navigate, currentPage, id]);

	const setCurrentPageHandler = (i) => dispatch(setCurrentPage(i));

	function createPageSelector() {
		let startPage, endPage;

		if (pagesTotal <= 3) {
			startPage = 1;
			endPage = pagesTotal;
		} else {
			startPage = Math.max(1, currentPage - 1);
			endPage = Math.min(pagesTotal, currentPage + 1);

			if (currentPage === 1) {
				endPage = 3;
			} else if (currentPage === pagesTotal) {
				startPage = pagesTotal - 2;
			}
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages.map((i) => (
			<div
				key={i}
				className={`products-section__pages-page ${i === currentPage ? "active" : ""}`}
				onClick={() => setCurrentPageHandler(i)}
			>
				{i}
			</div>
		));
	}

	function renderProductsList() {
		if (isProductsLoading) return <Loader />;
		if (!isProductsExist) return <div>No products for you</div>;
		return products?.map((product) => <Product key={product.id} product={product} />);
	}

	return (
		<div className="shop">
			<div className="filters-section">
				<div className="filters-section__title">Filters</div>
				<FilterSection name="Brands" tags={BRANDS} category="brand" />
				<FilterSection name="Category" tags={CATEGORIES} category="category" specialStyles="columnned" />
				<FilterSection name="Tags" tags={TAGS} category="category" />
				<FilterSection name="Prices" tags={PRICES} category="price" specialStyles="columnned" />
			</div>
			<div className="products-section">
				<div className="products-section__title" onClick={() => dispatch(updateSort())}>
					Products
				</div>
				<div className={`products-section__container ${isProductsLoading || !isProductsExist ? "centered" : null}`}>
					{renderProductsList()}
				</div>
				<div className="products-section__pages">{pagesTotal >= 0 ? createPageSelector() : null}</div>
			</div>
		</div>
	);
}

export default Shop;
