import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import Product from "./components/Product";
import Loader from "../../components/Loader/Loader";

import { changeSorting, getProducts, getProductsByPage, setCurrentPage } from "../../app/productSlice";
import { BRANDS, CATEGORIES, PRICES, SORT_OPTIONS, TAGS } from "../../utils/helpers";
import "./Shop.scss";
import FiltersSection from "./components/FiltersSection";
import { AppDispatch, RootState } from "../../app/store";

function Shop() {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [sortingType, setSortingType] = useState<string | null>(null);
	const { productsVisible, pagesTotal, currentPage, filters, sorting, loading } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { id } = useParams();

	const isProductsExist = !!productsVisible?.length;
	const isProductsLoading = loading;

	useEffect(() => {
		dispatch(getProducts());
	}, [filters, sorting, dispatch]);

	useEffect(() => {
		dispatch(getProductsByPage());
		if (Number(id) !== currentPage) navigate(`/shop/${currentPage}`);
	}, [dispatch, navigate, currentPage, id]);

	const changeSortingHandler = ({
		type = null,
		field = null,
	}: {
		type: string | null;
		field: string | null;
	}): void => {
		dispatch(changeSorting({ type, field }));
	};

	const setCurrentPageHandler = (i: number): void => {
		dispatch(setCurrentPage(i));
	};

	function createPageSelector() {
		let startPage, endPage;
		if (!pagesTotal) return;
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
		return productsVisible?.map((product) => <Product key={product.id} product={product} />);
	}

	return (
		<div className="shop">
			<div className="filters-section">
				<div className="filters-section__title">Filters</div>
				<FiltersSection name="Brands" tags={BRANDS} category="brand" />
				<FiltersSection name="Category" tags={CATEGORIES} category="category" specialStyles="columnned" />
				<FiltersSection name="Tags" tags={TAGS} category="category" />
				<FiltersSection name="Prices" tags={PRICES} category="price" specialStyles="columnned" />
			</div>
			<div className="products-section">
				<div className="products-section__sorting" onClick={() => setIsVisible(!isVisible)}>
					{`Sort by ${sortingType ?? "..."}`}
					{isVisible ? (
						<div className="container">
							{SORT_OPTIONS.map((option) => (
								<div
									className="container__option"
									key={option.id}
									onClick={() => {
										changeSortingHandler(option.value);
										setIsVisible(!isVisible);
										setSortingType(option.label);
									}}
								>
									{option.label}
								</div>
							))}
						</div>
					) : null}
				</div>
				<div
					className={`products-section__container ${isProductsLoading || !isProductsExist ? "centered" : ""}`}
				>
					{renderProductsList()}
				</div>
				<div className="products-section__pages">
					{pagesTotal && pagesTotal >= 0 ? createPageSelector() : null}
				</div>
			</div>
		</div>
	);
}

export default Shop;
