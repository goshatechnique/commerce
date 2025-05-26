import { useNavigate } from "react-router";
import { transformPrice } from "../../../utils/helpers";

function Product({ product }) {
	const navigate = useNavigate();

	function toProduct(id) {
		navigate(`/product/${id}`);
	}

	return (
		<div className="product" onClick={() => toProduct(product.id)}>
			<div className="product__image">
				<img src={product.image} alt="#" className="product__image-img" />
			</div>
			<div className="product__info">
				<span className="product__info-name">{product.title}</span>
				<span className="product__info-price">${transformPrice(product.price)}</span>
			</div>
		</div>
	);
}

export default Product;
