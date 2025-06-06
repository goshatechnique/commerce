import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import Button from "../../components/Button/Button";

import "./Basket.scss";
import { calculateTotal, formatPrice } from "../../utils/helpers";
import { removeItem, updateQuantity } from "../../app/cartSlice";
import { useNavigate } from "react-router";

function Basket() {
	const { items } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function updateQuantityHandler(id, quantity, stock) {
		if (quantity < 0 || quantity > stock) return;
		if (quantity === 0) {
			dispatch(removeItem(id));
			return;
		}
		dispatch(updateQuantity({ id, quantity }));
	}

	const toHomeHandler = () => navigate("/");

	const total = calculateTotal(items);

	return (
		<div className="basket">
			{!items.length ? (
				<div className="basket__empty">
					<span className="basket__empty-message">The basket is currently empty</span>
					<Button text="Back to Home" specialStyles="black" onClick={toHomeHandler} />
				</div>
			) : (
				<div className="table">
					<div className="table-header">
						<div className="table-cell">Product</div>
						<div className="table-cell centered">Price</div>
						<div className="table-cell centered">Quantity</div>
						<div className="table-cell centered">Total</div>
					</div>

					{items.map((item) => (
						<div className="table-product" key={item.id}>
							<div className="table-product-info">
								<div className="table-product-image">
									<img src={item.images[0]} alt={item.title} />
								</div>
								<div className="table-product-title">{item.title}</div>
								<div className="table-product-btn">
									<span onClick={() => updateQuantityHandler(item.id, 0, item.stock)}>Remove</span>
								</div>
							</div>

							<div className="table-price">${item.price}</div>

							<div className="table-quantity">
								<QuantitySelector
									quantity={item.quantity}
									addQuantity={() => updateQuantityHandler(item.id, item.quantity + 1, item.stock)}
									subQuantity={() => updateQuantityHandler(item.id, item.quantity - 1, item.stock)}
								/>
							</div>

							<div className="table-total">${formatPrice(item.price * item.quantity)}</div>
						</div>
					))}

					<div className="table-footer">
						<div className="table-footer__checkout">
							<div className="table-footer__checkout-shipping">
								{total.totalPrice > 75 ? (
									<span>Shipping will be free for this order</span>
								) : (
									<>
										<span>Shipping:</span>
										<span>$10</span>
									</>
								)}
							</div>
							<div className="table-footer__checkout-subtotal">
								<span>Subtotal:</span>
								<span>${formatPrice(total.subtotal)}</span>
							</div>
							<Button text="Checkout" specialStyles="fullfill black" disabled={!items?.length}></Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Basket;
