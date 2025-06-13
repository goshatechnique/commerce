import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useValidation } from "../../../hooks/useValidation";
import { updateCheckout } from "../../../app/cartSlice";
import "./Input.scss";

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

	const value = useSelector((state) => state.cart.checkout[type]);

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

export default Input;
