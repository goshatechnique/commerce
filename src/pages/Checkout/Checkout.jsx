import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import Input from "./Input.jsx/Input";
import { clearCart } from "../../app/cartSlice";
import "./Checkout.scss";

function FieldGroup({ title, children }) {
	return (
		<div className="fields-group">
			<span className="fields-group__header">{title}</span>
			<div className="fields-group__content">{children}</div>
		</div>
	);
}

function Checkout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onPaymentHandler = () => {
		alert("Your order is placed!");
		dispatch(clearCart());
		navigate("/");
	};

	return (
		<div className="checkout">
			<FieldGroup title="Contact">
				<div className="fields-group__content__row">
					<Input type="email" placeholder="Email Address" isRequired={true} />
				</div>
			</FieldGroup>
			<FieldGroup title="Delivery">
				<div className="fields-group__content__row">
					<Input type="country" placeholder="Country/Region" specialstyles="wide" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="firstName" placeholder="First name" specialstyles="narrow" isRequired={true} />
					<Input type="lastName" placeholder="Last name" specialstyles="narrow" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="address" placeholder="Address" specialstyles="wide" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="city" placeholder="City" specialstyles="narrow" isRequired={true} />
					<Input type="postalCode" placeholder="Postal code" specialstyles="narrow" isRequired={true} />
				</div>
			</FieldGroup>
			<FieldGroup title="Payment">
				<div className="fields-group__content__row">
					<Input type="cardType" placeholder="Card type" specialstyles="wide" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="cardNumber" placeholder="Card number" specialstyles="wide" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="expirationDate" placeholder="Expiration Date" specialstyles="narrow" isRequired={true} />
					<Input type="cvc" placeholder="Security Code" specialstyles="narrow" isRequired={true} />
				</div>
				<div className="fields-group__content__row">
					<Input type="cardHolderName" placeholder="Card Holder Name" specialstyles="wide" isRequired={true} />
				</div>
			</FieldGroup>
			<Button text="Pay Now" specialStyles="black fullfill" onClick={onPaymentHandler} />
		</div>
	);
}

export default Checkout;
