import "./Rating.scss";

function Rating({ rate = 0 }) {
	return (
		<div className="rating-container" title={rate}>
			<div className="background">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
			<div className="rating" style={{ width: 17.5 * rate + "px" }}>
				&#9733;&#9733;&#9733;&#9733;&#9733;
			</div>
		</div>
	);
}

export default Rating;
