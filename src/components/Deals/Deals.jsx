import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";

import Button from "../Button/Button";
import blank from "../../assets/images/blank.png";
import "./Deals.scss";

function Deals() {
	const navigate = useNavigate();

	const [date, setDate] = useState({
		days: null,
		hours: null,
		mins: null,
		secs: null,
	});

	const toShopHandler = () => navigate("/shop/1");

	function calculateDate() {
		const now = moment();
		const endOfWeek = now.clone().endOf("week");
		const diff = moment.duration(endOfWeek.diff(now));
		setDate({
			days: diff.days(),
			hours: diff.hours(),
			mins: diff.minutes(),
			secs: diff.seconds(),
		});
	}

	useEffect(() => {
		let timeCalculator = setInterval(calculateDate, 1000);
		return () => {
			clearInterval(timeCalculator);
		};
	}, []);

	return (
		<div className="deals">
			<div className="deals-section columned">
				<div className="deals-section__header">Deals Of The Month</div>
				<div className="deals-section__info">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin.
				</div>
				<Button text="Buy Now" specialStyles="black tight" onClick={toShopHandler}></Button>
				<div className="deals-section__notice">Hurry, Before It's To Late!</div>
				<div className="deals-section__timer">
					<div className="wrapper">
						<div className="block">{date.days}</div>
						<div className="title">Days</div>
					</div>
					<div className="wrapper">
						<div className="block">{date.hours}</div>
						<div className="title">Hr</div>
					</div>
					<div className="wrapper">
						<div className="block">{date.mins}</div>
						<div className="title">Mins</div>
					</div>
					<div className="wrapper">
						<div className="block">{date.secs}</div>
						<div className="title">Sec</div>
					</div>
				</div>
			</div>
			<div className="deals-section">
				<div className="deals-section__card">
					<img src={blank} className="deals-section__card-img" alt="deals" />
				</div>
				<div className="deals-section__card">
					<img src={blank} className="deals-section__card-img" alt="deals" />
				</div>
				<div className="deals-section__card">
					<img src={blank} className="deals-section__card-img" alt="deals" />
				</div>
				;
			</div>
		</div>
	);
}

export default Deals;
