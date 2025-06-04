import { useNavigate } from "react-router";
import { formatPrice, getUndiscountedPrice } from "../../utils/helpers";
import "./ProductCard.scss";
import Rating from "../Rating/Rating";

function ProductCard({ product }) {
	const navigate = useNavigate();
	const toProduct = () => navigate(`/product/${id}`);

	const { id, title, brand, price, rating, discountPercentage, image, images } = product;
	const originalPrice = formatPrice(price);
	const discountedPrice = formatPrice(getUndiscountedPrice(price, discountPercentage));
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
