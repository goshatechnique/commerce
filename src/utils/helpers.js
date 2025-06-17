import userAvatar1 from "../assets/images/user_avatar.png";
import userAvatar2 from "../assets/images/user_avatar2.png";
import userAvatar3 from "../assets/images/user_avatar3.png";

import logoPrada from "../assets/images/logo_Pr.png";
import logoChanel from "../assets/images/logo_Ch.png";
import logoCalvinKlein from "../assets/images/logo_CK.png";
import logoDenim from "../assets/images/logo_Denim.png";
import logoLouisVuitton from "../assets/images/logo_LV.png";

import iconQuality from "../assets/images/icon_quality.svg";
import iconWarranty from "../assets/images/icon_warranty.svg";
import iconShipping from "../assets/images/icon_shipping.svg";
import iconSupport from "../assets/images/icon_support.svg";

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

export const REVIEWS = [
	{
		photo: userAvatar1,
		fullname: "James K.",
		proffesion: "Traveler",
		rating: 4.86,
		review: `“You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!”`,
	},
	{
		photo: userAvatar2,
		fullname: "Suzan B.",
		proffesion: "Blogger",
		rating: 4.32,
		review: `“Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.”`,
	},
	{
		photo: userAvatar3,
		fullname: "Megen W.",
		proffesion: "U.I. designer",
		rating: 4.6,
		review: `“Items That I ordered were the best investment I ever made. I can't say enough about your quality service.”`,
	},
];

export const BRANDS_LOGO = [
	{
		brandname: "Chanel",
		logo: logoChanel,
	},
	{
		brandname: "Louis Vuitton",
		logo: logoLouisVuitton,
	},
	{
		brandname: "Prada",
		logo: logoPrada,
	},
	{
		brandname: "Calvin Klein",
		logo: logoCalvinKlein,
	},
	{
		brandname: "Denum",
		logo: logoDenim,
	},
];

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
	"Apple",
	"Dolce & Gabbana",
	"Dior",
	"Chanel",
	"Gucci",
	"Rolex",
	"Oppo",
	"Samsung",
	"Louis Vuitton",
	"Fashion Shades",
	"Prada",
	"Calvin Klein",
	"Nike",
	"Denim",
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

export const PRICES = [
	{ min: 0, max: 50 },
	{ min: 50, max: 100 },
	{ min: 100, max: 150 },
	{ min: 150, max: 200 },
	{ min: 200, max: 400 },
];

export const SORT_OPTIONS = [
	{ id: 1, value: { field: "stock", type: "lowest" }, label: "Best selling" },
	{ id: 2, value: { field: "price", type: "lowest" }, label: "Lowest price" },
	{ id: 3, value: { field: "price", type: "higher" }, label: "Higher price" },
	{ id: 4, value: { field: "rating", type: "higher" }, label: "Best rating" },
	{ id: 5, value: { field: "discountPercentage", type: "higher" }, label: "Higher discount" },
];

export const PAGE_LENGTH = 6;

export const FEATURES = [
	{
		id: "quality",
		icon: iconQuality,
		title: "High Quality",
		text: "Crafted from top materials",
	},
	{
		id: "warranty",
		icon: iconWarranty,
		title: "Warranty Protection",
		text: "Over 2 years",
	},
	{
		id: "shipping",
		icon: iconShipping,
		title: "Free Shipping",
		text: "Order over 75$",
	},
	{
		id: "support",
		icon: iconSupport,
		title: "24/7 Support",
		text: "Dedicated support",
	},
];

export const formatPrice = (number) => Number(number).toFixed(2);

export const getDiscountedPrice = (price, discountPercentage) => price - (price / 100) * discountPercentage;

export const calculateTotal = (items = []) => {
	const totalPrice = items.reduce((sum, item) => {
		const itemPrice = item.price * item.quantity;
		const discountAmount = itemPrice * (item.discountPercentage / 100);
		return sum + (itemPrice - discountAmount);
	}, 0);

	const shipping = items?.length > 0 ? (totalPrice > 75 ? 0 : 10) : 0;
	return {
		totalPrice,
		shipping,
		subtotal: totalPrice + shipping,
	};
};

export const loadCartFromLocalStorage = () => {
	try {
		const userId = JSON.parse(localStorage.getItem("uid")) || "unauthorized";
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
		const userId = JSON.parse(localStorage.getItem("uid")) || "unauthorized";
		const serializedCart = JSON.stringify(cart);
		localStorage.setItem(`cart_${userId}`, serializedCart);
	} catch (error) {
		console.error(error.message || "Error on cart update");
	}
};

export const formatTag = (tag) => {
	let formatted = String(tag);
	formatted = formatted.replace("-", " ");
	return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const filterProducts = (products, criteries) => {
	return products.filter((product) => {
		return Object.entries(criteries).every(([key, condition]) => {
			if (condition == null) return true;

			if (Array.isArray(condition)) {
				if (condition.length === 0) return true;

				return Array.isArray(product[key])
					? product[key].some((item) => condition.includes(item))
					: condition.includes(product[key]);
			}

			if (typeof condition === "object" && condition.min != null) {
				return product[key] >= condition.min && product[key] <= (condition.max ?? Infinity);
			}

			return product[key] === condition;
		});
	});
};

export function sortProducts(products, from, field) {
	if (from === "lowest") {
		return products.sort((firstItem, secondItem) => firstItem[field] - secondItem[field]);
	} else if (from === "higher") {
		return products.sort((firstItem, secondItem) => secondItem[field] - firstItem[field]);
	} else {
		return products;
	}
}
