interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	image?: string | null;
	quantity: number;
	shippingInformation: string;
}

export { Product };
