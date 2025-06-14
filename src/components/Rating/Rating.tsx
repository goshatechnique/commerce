import "./Rating.scss";

interface Props {
	rate: number;
}

function Rating({ rate = 0 }: Props) {
	return (
		<div className="rating-container" title={String(rate)}>
			<div className="background">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
			<div className="rating" style={{ width: 17.5 * rate + "px" }}>
				&#9733;&#9733;&#9733;&#9733;&#9733;
			</div>
		</div>
	);
}

export default Rating;
