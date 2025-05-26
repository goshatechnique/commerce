import Button from "../Button/Button";
import "./Deals.scss";

function Deals() {
	return (
		<div className="deals">
			<div className="deals__content">
				<span className="deals__content-title">Deals of the Month!</span>
				<span className="deals__content-info">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin
				</span>
				<Button text={"Buy now!"} specialStyles="black" />
				<div className="deals__content-timer">
					<span>Hurry Up, Before It's To Late</span>
					<h1>02:16:23:30</h1>
				</div>
			</div>
			<div className="deals__gallery">
				<div className="deals__gallery__card" />
				<div className="deals__gallery__card" />
				<div className="deals__gallery__card" />
			</div>
		</div>
	);
}

export default Deals;
