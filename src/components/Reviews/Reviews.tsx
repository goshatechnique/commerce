import { useState } from "react";

import Rating from "../Rating/Rating";
import arrow from "../../assets/images/arrow.svg";
import { REVIEWS } from "../../utils/helpers";
import "./Reviews.scss";

interface Review {
	photo: string;
	fullname: string;
	proffesion: string;
	rating: number;
	review: string;
}

interface Props {
	reviews: Array<Review>;
}

function Carousel({ reviews }: Props) {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

	const handleNext = () => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

	return (
		<div className="carousel-container">
			<div className="carousel">
				{reviews.map((item, index) => {
					let position = "right";
					if (index === activeIndex) position = "center";
					else if (index === activeIndex - 1 || (activeIndex === 0 && index === reviews.length - 1)) {
						position = "left";
					}

					return (
						<div key={index} className={`carousel-item ${position}`} onClick={() => setActiveIndex(index)}>
							<div className="customer-card">
								<div className="customer-card__avatar">
									<img src={item.photo} alt="User" className="customer-card__avatar-img" />
									<div className="customer-card__avatar-img-shadow" />
								</div>
								<div className="customer-card__info">
									<div className="customer-card__info-review">{item.review}</div>
									<div className="customer-card__info-rate">
										<Rating rate={item.rating} />
									</div>
									<div className="customer-card__info-devider" />
									<div className="customer-card__info-fullname">{item.fullname}</div>
									<div className="customer-card__info-job">{item.proffesion}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="carousel-navigator">
				<div className="carousel-navigator__btn left" onClick={handlePrev}>
					<img src={arrow} alt="arrow" className="carousel-navigator__btn-img" />
				</div>
				<div className="carousel-navigator__btn" onClick={handleNext}>
					<img src={arrow} alt="arrow" className="carousel-navigator__btn-img" />
				</div>
			</div>
		</div>
	);
}

function Reviews() {
	return (
		<div className="reviews">
			<span className="reviews-header">This Is What Our Customers Say</span>
			<span className="reviews-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis</span>

			<Carousel reviews={REVIEWS} />
		</div>
	);
}

export default Reviews;
