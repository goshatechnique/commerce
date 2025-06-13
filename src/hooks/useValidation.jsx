const patterns = {
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	postalCode: /^\d{5,6}$/,
	cardNumber: /^[0-9]{13,19}$/,
	cvc: /^[0-9]{3,4}$/,
	cardHolder: /^[A-Za-z\s\-']+$/,
};

export function useValidation() {
	const validate = (value, type, isRequired = true) => {
		if (!value?.trim()) {
			return isRequired ? "* This field is required." : null;
		}

		switch (type) {
			case "email":
				return patterns.email.test(value) ? null : "* Invalid email.";
			case "postalCode":
				return patterns.postalCode.test(value) ? null : "* Invalid postal code.";
			case "cardNumber":
				return patterns.cardNumber.test(value) ? null : "* Invalid card number.";
			case "cvc":
				return patterns.cvc.test(value) ? null : "* Invalid CVC.";
			case "cardHolder":
				return patterns.cardHolder.test(value) ? null : "* Invalid name.";
			default:
				return null;
		}
	};

	return { validate };
}
