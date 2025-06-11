import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import { useValidation } from "../../hooks/useValidation";
import { updateCheckout } from "../../app/cartSlice";
import "./Checkout.scss";

function Input({
	type = "text",
	placeholder = "",
	isRequired = false,
	specialstyles = "",
	isValidationEnabled = true,
}) {
	const [isTouched, setIsTouched] = useState(false);
	const { validate } = useValidation();
	const dispatch = useDispatch();
	const { value } = useSelector((state) => state.cart.checkout[type]);
	const errorMessage = isValidationEnabled && isTouched ? validate(value, type, isRequired) : null;

	return (
		<div className={`input-wrapper ${specialstyles}`}>
			{errorMessage && <span className="custom-input__error">{errorMessage}</span>}
			<input
				className={`custom-input ${errorMessage ? "error" : ""}`}
				placeholder={placeholder}
				value={value}
				onChange={(e) => dispatch(updateCheckout({ field: type, data: e.target.value }))}
				onBlur={() => setIsTouched(true)}
			/>
		</div>
	);
}

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

	const onPaymentHandler = () => {
		alert("Your order is placed!");
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
