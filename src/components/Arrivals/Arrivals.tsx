import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import { getNewArrivals } from "../../app/productSlice";
import "./Arrivals.scss";
import { AppDispatch, RootState } from "../../app/store";

function Arrivals() {
	const dispatch = useDispatch<AppDispatch>();
	const { newArrivals } = useSelector((state: RootState) => state.products);
	const [arrivalsFilter, setArrivalsFilter] = useState<string | null>(null);

	useEffect(() => {
		dispatch(getNewArrivals(arrivalsFilter));
	}, [arrivalsFilter, dispatch]);

	return (
		<div className="arrivals">
			<div className="arrivals__header">
				<span className="arrivals__header-title">New Arrivals</span>
				<span className="arrivals__header-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin
				</span>
			</div>
			<div className="arrivals__navigator">
				<Button
					text={`Kitchen Accessoires`}
					specialStyles={`gray tight ${arrivalsFilter === "kitchen-accessories" ? "black" : null}`}
					onClick={() => setArrivalsFilter("kitchen-accessories")}
				/>
				<Button
					text={`Men's Watches`}
					specialStyles={`gray tight ${arrivalsFilter === "mens-watches" ? "black" : null}`}
					onClick={() => setArrivalsFilter("mens-watches")}
				/>
				<Button
					text="Mobile Accessories"
					specialStyles={`gray tight ${arrivalsFilter === "mobile-accessories" ? "black" : null}`}
					onClick={() => setArrivalsFilter("mobile-accessories")}
				/>
				<Button
					text="Women Watches"
					specialStyles={`gray tight ${arrivalsFilter === "womens-watches" ? "black" : null}`}
					onClick={() => setArrivalsFilter("womens-watches")}
				/>
				<Button
					text="Women Bags"
					specialStyles={`gray tight ${arrivalsFilter === "womens-bags" ? "black" : null}`}
					onClick={() => setArrivalsFilter("womens-bags")}
				/>
			</div>
			<div className="arrivals__content">
				{newArrivals.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default Arrivals;
