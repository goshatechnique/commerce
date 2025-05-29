export function transformPrice(number) {
	return Number(number).toFixed(2);
}

export function calculatePriceBeforeDiscount(price, discountPercentage) {
	return price - (price / 100) * discountPercentage;
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

export const PAGE_LENGTH = 6;

export const loadCartFromLocalStorage = () => {
	try {
		const userId = JSON.parse(localStorage.getItem("uid")) || "";
		const serializedCart = localStorage.getItem(`cart_${userId}`);
		if (serializedCart === null) {
			return [];
		}
		return JSON.parse(serializedCart);
	} catch (error) {
		console.error(error.message || "Error while getting cart");
		return [];
	}
};

export const saveCartToLocalStorage = (cart) => {
	try {
		const userId = JSON.parse(localStorage.getItem("uid")) || "";
		const serializedCart = JSON.stringify(cart);
		localStorage.setItem(`cart_${userId}`, serializedCart);
	} catch (error) {
		console.error(error.message || "Error on cart update");
	}
};

export function formatTag(tag) {
	let formatted = String(tag);
	formatted = formatted.replace("-", " ");
	return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export const CATEGORIES = [
	"mens-shirts",
	"mens-shoes",
	"mens-watches",
	"sunglasses",
	"tops",
	"womens-bags",
	"womens-dresses",
	"womens-jewellery",
	"womens-shoes",
	"womens-watches",
];

export const BRANDS = [
	"Dolce & Gabbana",
	"Dior",
	"Chanel",
	"Gucci",
	"Rolex",
	"Prada",
	"Calvin Klein",
	"Nike",
	"Puma",
	"Off White",
];

export const TAGS = [
	"beauty",
	"fragrances",
	"furniture",
	"groceries",
	"home-decoration",
	"kitchen-accessories",
	"laptops",
	"mobile-accessories",
	"motorcycle",
	"skin-care",
	"smartphones",
	"sports-accessories",
	"tablets",
	"vehicle",
];
