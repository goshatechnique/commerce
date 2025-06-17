import { useNavigate } from "react-router";
import { getDiscountedPrice, formatPrice } from "../../../utils/helpers";
import Rating from "../../../components/Rating/Rating";
import { Product as ProductType } from "../../../types/global";

interface Props {
	product: ProductType;
}

function Product({ product }: Props) {
	const navigate = useNavigate();

	const { id, title, brand, price, rating, discountPercentage, image, images } = product;

	const toProduct = () => navigate(`/product/${id}`);
	const originalPrice = formatPrice(price);
	const discountedPrice = formatPrice(getDiscountedPrice(price, discountPercentage));
	const hasDiscount = discountPercentage > 0;

	return (
		<div className="product" onClick={toProduct} title={title}>
			<div className="product__image">
				<img className="product__image-img" src={image ?? images?.[0]} alt="Product" loading="lazy" />
			</div>
			<div className="product__info">
				<div className="product__info-title">{title}</div>
				<Rating rate={rating} />
				<div className="product__info-brand">{brand}</div>
				<div className="product__info-discounted">{hasDiscount ? "$" + discountedPrice : null}</div>
				<div className="product__info-price">${originalPrice}</div>
			</div>
		</div>
	);
}

export default Product;
