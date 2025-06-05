import { useState } from "react";
import Button from "../../components/Button/Button";
import "./Checkout.scss";

function Input({ placeholder = "", specialstyles = "", value, onChange }) {
	return (
		<input className={`custom_input ${specialstyles}`} placeholder={placeholder} value={value} onChange={onChange} />
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
	const [paymentInfo, setPaymentInfo] = useState({
		email: "",
		country: "",
		firstname: "",
		lastname: "",
		address: "",
		city: "",
		postalCode: "",
		cardType: "",
		cardNumber: "",
		expirationDate: "",
		securityCode: "",
		cardHolderName: "",
	});

	const onChangeHandler = (e, fieldName) => setPaymentInfo({ ...paymentInfo, [fieldName]: e.target.value });

	return (
		<div className="checkout">
			<FieldGroup title="Contact">
				{
					<div className="fields-group__content__row">
						<Input
							placeholder="Email Address"
							specialstyles="fullfill"
							value={paymentInfo.email}
							onChange={(e) => onChangeHandler(e, "email")}
						/>
					</div>
				}
			</FieldGroup>
			<FieldGroup title="Delivery">
				{
					<>
						<div className="fields-group__content__row">
							<Input
								placeholder="Country/Region"
								specialstyles="fullfill"
								value={paymentInfo.country}
								onChange={(e) => onChangeHandler(e, "country")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="First name"
								specialstyles={"narrow"}
								value={paymentInfo.firstname}
								onChange={(e) => onChangeHandler(e, "firstname")}
							/>
							<Input
								placeholder="Last name"
								specialstyles={"narrow"}
								value={paymentInfo.lastname}
								onChange={(e) => onChangeHandler(e, "lastname")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="Address"
								specialstyles="fullfill"
								value={paymentInfo.address}
								onChange={(e) => onChangeHandler(e, "address")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="City"
								specialstyles={"narrow"}
								value={paymentInfo.city}
								onChange={(e) => onChangeHandler(e, "city")}
							/>
							<Input
								placeholder="Postal Code"
								specialstyles={"narrow"}
								value={paymentInfo.postalCode}
								onChange={(e) => onChangeHandler(e, "postalCode")}
							/>
						</div>
					</>
				}
			</FieldGroup>
			<FieldGroup title="Payment">
				{
					<>
						<div className="fields-group__content__row">
							<Input
								placeholder="Credit Card"
								specialstyles="fullfill"
								value={paymentInfo.cardType}
								onChange={(e) => onChangeHandler(e, "cardType")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="Card Number"
								specialstyles="fullfill"
								value={paymentInfo.cardNumber}
								onChange={(e) => onChangeHandler(e, "cardNumber")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="Expiration Date"
								specialstyles={"narrow"}
								value={paymentInfo.expirationDate}
								onChange={(e) => onChangeHandler(e, "expirationDate")}
							/>
							<Input
								placeholder="Security Code"
								specialstyles={"narrow"}
								value={paymentInfo.securityCode}
								onChange={(e) => onChangeHandler(e, "securityCode")}
							/>
						</div>
						<div className="fields-group__content__row">
							<Input
								placeholder="Card Holder Name"
								specialstyles="fullfill"
								value={paymentInfo.cardHolderName}
								onChange={(e) => onChangeHandler(e, "cardHolderName")}
							/>
						</div>
					</>
				}
			</FieldGroup>
			<Button text="Pay Now" specialStyles="black fullfill" onClick={() => console.log(paymentInfo)} />
		</div>
	);
}

export default Checkout;
