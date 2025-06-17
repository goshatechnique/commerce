import { useNavigate } from "react-router";
import { formatPrice, getDiscountedPrice } from "../../utils/helpers";
import "./ProductCard.scss";
import Rating from "../Rating/Rating";

import { Product } from "../../types/global";

interface Props {
	product: Product;
}

function ProductCard({ product }: Props) {
	const navigate = useNavigate();
	const toProduct = () => navigate(`/product/${id}`);

	const { id, title, brand, price, rating, discountPercentage, image, images } = product;
	const originalPrice = formatPrice(price);
	const discountedPrice = formatPrice(getDiscountedPrice(price, discountPercentage));
	const hasDiscount = discountPercentage > 0;

	return (
		<div className="product-card" onClick={toProduct} title={title}>
			<div className="product-card__image">
				<img className="product-card__image-img" src={image ?? images?.[0]} alt="Product" loading="lazy" />
			</div>

			<div className="product-card__info">
				<div className="brand">{brand}</div>
				<Rating rate={rating} />
				<div className="title">{title}</div>
				<div className="price">${originalPrice}</div>
				<div className="discounted">{hasDiscount ? "$" + discountedPrice : null}</div>
			</div>
		</div>
	);
}

export default ProductCard;
