const patterns = {
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	postalCode: /^\d{5,6}$/,
	cardNumber: /^[0-9]{13,19}$/,
	cvc: /^[0-9]{3,4}$/,
	cardHolder: /^[A-Za-z\s\-']+$/,
};

interface ValidationResult {
	validate: (value: string | undefined, type: string, isRequired?: boolean) => string | null;
}

export function useValidation(): ValidationResult {
	const validate = (value: string | undefined, type: string, isRequired = true): string | null => {
		const trimmedValue = value?.trim() ?? "";

		if (!trimmedValue) {
			return isRequired ? "* This field is required." : null;
		}

		switch (type) {
			case "email":
				return patterns.email.test(trimmedValue) ? null : "* Invalid email.";
			case "postalCode":
				return patterns.postalCode.test(trimmedValue) ? null : "* Invalid postal code.";
			case "cardNumber":
				return patterns.cardNumber.test(trimmedValue) ? null : "* Invalid card number.";
			case "cvc":
				return patterns.cvc.test(trimmedValue) ? null : "* Invalid CVC.";
			case "cardHolder":
				return patterns.cardHolder.test(trimmedValue) ? null : "* Invalid name.";
			default:
				return null;
		}
	};

	return { validate };
}
