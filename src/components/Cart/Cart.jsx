import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import "./Cart.scss";

import { calculateTotal, formatPrice } from "../../utils/helpers";
import { removeItem, updateQuantity } from "../../app/cartSlice";
import { useNavigate } from "react-router";

const Cart = ({ isOpen, onClose }) => {
	const portalElement = document.getElementById("cart-portal");
	const { items } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const total = calculateTotal(items);

	function updateQuantityHandler(id, quantity, stock) {
		if (quantity < 0 || quantity > stock) return;
		if (quantity === 0) {
			dispatch(removeItem(id));
			return;
		}
		dispatch(updateQuantity({ id, quantity }));
	}

	const toBasketHandler = () => {
		navigate("/basket");
		onClose();
	};

	const toCheckoutHandler = () => {
		navigate("/checkout");
		onClose();
	};

	function ShippingInfo() {
		return total.totalPrice > 75 ? (
			<div className="shipping">Shipping will be free for this order</div>
		) : (
			<div className="shipping">
				Buy <b>${formatPrice(75 - total.totalPrice)}</b> more and get <b>free shipping</b>
			</div>
		);
	}

	function CartItem({ item }) {
		return (
			<div key={item.id} className="cart-section__product">
				<div className="cart-section__product-image">
					<img src={item.images[0]} alt="#" className="cart-section__product-image-img" />
				</div>
				<div className="cart-section__product-content">
					<div className="cart-section__product-content__title">
						{item.brand} - {item.title}
					</div>
					<div className="cart-section__product-content__price">${formatPrice(item.price)}</div>
					<div className="quantity__content">
						<QuantitySelector
							quantity={item.quantity}
							addQuantity={() => updateQuantityHandler(item.id, item.quantity + 1, item.stock)}
							subQuantity={() => updateQuantityHandler(item.id, item.quantity - 1, item.stock)}
						/>
					</div>
				</div>
			</div>
		);
	}

	if (!isOpen || !portalElement) return null;

	return createPortal(
		<div className="overlay">
			<div className="cart-background" onClick={onClose} />
			<div className="cart-container">
				<div className="cart-container__btn-close" onClick={onClose}>
					&times;
				</div>
				<div className="cart">
					<div className="cart-header">
						<div className="title">Shopping Cart</div>
						{ShippingInfo()}
						<div className="divider" />
					</div>
					<div className="cart-section">
						{items.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
					<div className="cart-footer">
						<div className="divider" />
						<div className="subtotal">
							<div>Subtotal</div>
							<div>${formatPrice(total.subtotal)}</div>
						</div>
						<Button text="Checkout" specialStyles="black fullfill" onClick={toCheckoutHandler} />
						<Button text="View Cart" specialStyles="fullfill" onClick={toBasketHandler} />
					</div>
				</div>
			</div>
		</div>,
		portalElement
	);
};

export default Cart;
