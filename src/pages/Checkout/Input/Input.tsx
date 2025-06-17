import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useValidation } from "../../../hooks/useValidation";
import { updateCheckout } from "../../../app/cartSlice";
import "./Input.scss";
import { AppDispatch, RootState } from "../../../app/store";

interface Props {
	type: string;
	placeholder: string;
	specialstyles?: string;
	isRequired?: boolean;
	isValidationEnabled?: boolean;
}

function Input({
	type = "text",
	placeholder = "",
	specialstyles = "",
	isRequired = false,
	isValidationEnabled = true,
}: Props) {
	const [isTouched, setIsTouched] = useState(false);

	const { validate } = useValidation();

	const dispatch = useDispatch<AppDispatch>();

	const value = useSelector((state: RootState) => {
		const checkout = state.cart.checkout;
		if (type in checkout) {
			return checkout[type as keyof typeof checkout];
		}
		return undefined;
	});

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
