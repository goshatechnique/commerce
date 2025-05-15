import "./Reviews.scss";
import userAvatar from "../../assets/images/user_avatar.png";

function Reviews() {
	return (
		<div className="reviews">
			<span className="reviews-header">This Is What Our Customers Say</span>
			<span className="reviews-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis</span>

			<div className="customer-card">
				<div className="customer-card__avatar">
					<img src={userAvatar} alt="#" className="customer-card__avatar-img" />
					<div className="customer-card__avatar-img-shadow" />
				</div>
				<div className="customer-card__info">
					<div className="customer-card__info-review">
						"You won't regret it. I would like to personally thank you for your outstanding product. Absolutely
						wonderful!"
					</div>
					<div className="customer-card__info-rate">*****</div>
					<div className="customer-card__info-devider" />
					<div className="customer-card__info-fullname">James K.</div>
					<div className="customer-card__info-job">Traveler</div>
				</div>
			</div>
		</div>
	);
}

export default Reviews;
