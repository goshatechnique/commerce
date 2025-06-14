import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import { formatPrice } from "../../utils/helpers";
import { addItem } from "../../app/cartSlice";
import iconShare from "../../assets/images/icon_share.svg";
import iconQuestion from "../../assets/images/icon_question.svg";
import iconDelivery from "../../assets/images/icon_delivery.svg";
import iconShipping from "../../assets/images/icon_shipping.svg";
import "./Product.scss";
import { AppDispatch } from "../../app/store";
import { Product as ProductType } from "../../types/global";

function Product() {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const [product, setProduct] = useState<ProductType>();
	const [galleryIndex, setGalleryIndex] = useState<number>(0);
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
			setProduct(res.data);
		});
	}, [id]);

	const addQuantity = (): void => {
		if (product) {
			setQuantity((prevCount) => {
				const newCount = prevCount + 1;
				return newCount <= product.stock ? newCount : prevCount;
			});
		}
	};
	const subQuantity = (): void =>
		setQuantity((prevCount) => {
			const newCount = prevCount - 1;
			return newCount <= 0 ? prevCount : newCount;
		});

	const onClickImageHandler = (id: number): void => setGalleryIndex(id);

	const addToBasketHandler = () => dispatch(addItem({ ...product, quantity }));

	return (
		<div className="product2">
			{!product ? (
				<Loader />
			) : (
				<>
					<div className="product2-gallery">
						<div className="product2-gallery__thumbnails">
							{product.images.map((item, idx) => (
								<div key={idx} className="product2-gallery__thumbnails-item" onClick={() => onClickImageHandler(idx)}>
									<img src={item} alt="#" className="product2-gallery__thumbnails-item-img" />
								</div>
							))}
						</div>
						<img className="product2-gallery__preview" src={product?.image ?? product?.images[galleryIndex]} alt="#" />
					</div>

					<div className="product2-details">
						<div className="logo">FASCO</div>
						<div className="title">{product?.title}</div>
						<div className="price">${formatPrice(product?.price)}</div>
						<div className="sales">4 people are viewing this right now</div>
						<div className="description">{product?.description}</div>
						<div className="left">
							Only <b>{product?.stock}</b> item(s) left in stock!
						</div>
						{/* <div className="size">
							<span className="size-title">Size</span>
							<div className="size__selector">
								<div className="size__selector-btn">S</div>
								<div className="size__selector-btn">M</div>
							</div>
						</div>
						<div className="color">
							<span className="color-title">Color</span>
							<div className="color__selector">
								<h1>Red</h1>
								<h1>Green</h1>
								<h1>Blue</h1>
							</div>
						</div> */}
						<div className="quantity">
							<span className="quantity-title">Quantity</span>
							<div className="quantity__content">
								<QuantitySelector quantity={quantity} addQuantity={addQuantity} subQuantity={subQuantity} />
								<Button text="Add to cart" specialStyles="black" onClick={addToBasketHandler} />
							</div>
						</div>

						<div className="tools">
							<div className="tools__content">
								<img src={iconQuestion} alt="Ask a question" className="tools__content-icon" />
								<div className="tools__content-title">Ask a question</div>
							</div>
							<div className="tools__content">
								<img src={iconShare} alt="Share" className="tools__content-icon" />
								<div className="tools__content-title">Share</div>
							</div>
						</div>

						<div className="delivery">
							<div className="delivery__content">
								<img src={iconDelivery} alt="Delivery" className="tools__content-icon" />
								<div>Estimated Delivery: {product?.shippingInformation}</div>
							</div>
							<div className="delivery__content">
								<img src={iconShipping} alt="Shipping" className="tools__content-icon" />
								<div>Free Shipping & Returns: On All Orders Over $75</div>
							</div>
						</div>
						<div className="payment">Guarantee safe & secure checkout</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Product;
