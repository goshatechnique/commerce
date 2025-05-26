export function transformPrice(number) {
	return Number(number).toFixed(2);
}

export const AUTH_TYPES = {
	SIGN_IN: "signin",
	SIGN_UP: "signup",
};

export const FIELDS_TYPES = {
	firstName: "First name",
	lastName: "Last name",
	email: "Email",
	phoneNumber: "Phone number",
	password: "Password",
	confirmPassword: "Confirm password",
};
