import subscribeFirst from "../../assets/images/subscribe_first.png";
import subscribeSecond from "../../assets/images/subscribe_second.png";
import Button from "../Button/Button";
import "./Subscribe.scss";

function Subscribe() {
	return (
		<div className="subscribe">
			<div className="subscribe__image">
				<img src={subscribeFirst} alt="#" className="subscribe__image-img" />
			</div>
			<div className="subscribe__content">
				<span className="subscribe__content-title">Subscribe To Our Newsletter</span>
				<span className="subscribe__content-info">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin
				</span>
				<input type="text" placeholder="michael@ymail.com" className="subscribe__content-input" />
				<Button name="Subscribe Now" />
			</div>
			<div className="subscribe__image">
				<img src={subscribeSecond} alt="#" className="subscribe__image-img" />
			</div>
		</div>
	);
}

export default Subscribe;
