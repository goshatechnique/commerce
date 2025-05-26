import "./Product.scss";
import { useParams } from "react-router";

function Product() {
	const { id } = useParams();
	return (
		<div className="product2">
			<div className="product2__image"></div>

			<div className="product2__info">
				<div className="logo">FASCO</div>
				<div className="title">Denim jacket</div>
				<div className="price">$24.25</div>
				<div className="sales">24 people are viewing this right now</div>
				<div className="left">
					Only <b>9</b> item(s) left in stock!
				</div>
				<div className="size">
					<span className="size-title">Size</span>
					<div className="size__selector">
						<div className="size__selector-btn">S</div>
						<div className="size__selector-btn">M</div>
					</div>
				</div>
				<div className="color">
					<span className="color-title">Color</span>
					<div className="color__selector">
						<h1>Red</h1>
						<h1>Green</h1>
						<h1>Blue</h1>
					</div>
				</div>
				<div className="quantity">
					<span className="quantity-title">Quantity</span>
					<div className="quantity__content">
						<div className="quantity__content__selector">
							<div className="quantity__content__selector-btn">-</div>
							<div className="quantity__content__selector-btn">1</div>
							<div className="quantity__content__selector-btn">+</div>
						</div>
						<div className="quantity__content-btn">Add to card</div>
					</div>
				</div>

				<div className="tools">
					<div className="tools__content">
						<div className="tools__content-icon">#</div>
						<div className="tools__content-title">Ask a question</div>
					</div>
					<div className="tools__content">
						<div className="tools__content-icon">#</div>
						<div className="tools__content-title">Share</div>
					</div>
				</div>

				<div className="delivery">
					<div className="delivery__content">
						<div className="delivery__content-icon">#</div>
						<div>Estimated Delivery: Jul 30 - Aug 05</div>
					</div>
					<div className="delivery__content">
						<div className="delivery__content-icon">#</div>
						<div>Free Shipping & Returns: On All Orders Over $75</div>
					</div>
				</div>
				<div className="payment">Guarantee safe & secure checkout</div>
			</div>
		</div>
	);
}

export default Product;
