import { useNavigate } from "react-router";
import { calculatePriceBeforeDiscount, transformPrice } from "../../../utils/helpers";

function Product({ product }) {
	const navigate = useNavigate();

	function toProduct(id) {
		navigate(`/product/${id}`);
	}

	return (
		<div className="product" onClick={() => toProduct(product.id)}>
			<div className="product__image">
				<img src={product?.image ?? product.images[0]} alt="#" className="product__image-img" />
			</div>
			<div className="product__info">
				<span className="product__info-name">{product.title}</span>
				<div className="product__info-price">
					<span>${transformPrice(calculatePriceBeforeDiscount(product.price, product.discountPercentage))}</span>
					{product.discountPercentage ? (
						<span className="product__info-price-depricated">${transformPrice(product.price)}</span>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Product;
