import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNewArrivals } from "../../app/productSlice";
import "./Arrivals.scss";
import { transformPrice } from "../../utils/helpers";
import { useNavigate } from "react-router";

function Arrivals() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { newArrivals } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getNewArrivals());
	}, [dispatch]);

	return (
		<div className="arrivals">
			<div className="arrivals__header">
				<span className="arrivals__header-title">New Arrivals</span>
				<span className="arrivals__header-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin
				</span>
			</div>
			<div className="arrivals__content">
				{newArrivals.map((product) => (
					<div
						key={product.id}
						className="product"
						onClick={() => {
							navigate(`/product/${product.id}`);
						}}
					>
						<div className="product__photo">
							<img src={product?.images[0]} alt="#" className="product__photo-img" />
						</div>
						<div className="product__content">
							<div className="product__content-brandname">{product.title.split(" ")[0]}</div>
							<div className="product__content-title">{product.title}</div>
							<div className="product__content-price">${transformPrice(product.price)}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Arrivals;
