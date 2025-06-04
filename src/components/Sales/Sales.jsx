import { useNavigate } from "react-router";

import Button from "../Button/Button";
import blank from "../../assets/images/blank.png";
import blank2 from "../../assets/images/blank2.png";
import blank3 from "../../assets/images/blank3.png";
import blank4 from "../../assets/images/blank4.png";
import "./Sales.scss";

function Sales() {
	const navigate = useNavigate();

	const toProducts = () => navigate("/shop/1");

	return (
		<div className="sales">
			<img src={blank} alt="#" className="sales-image" />
			<div className="sales-content">
				<div className="sales-content__wrapper">
					<img src={blank2} alt="#" className="sales__content__wrapper-img" />
				</div>
				<div className="sales-content__center">
					<span className="sales-content__center-h2">ultimate</span>
					<span className="sales-content__center-h1">sale</span>
					<span className="sales-content__center-h3">new collection</span>
					<Button text="SHOP NOW" specialStyles="black" onClick={toProducts} />
				</div>
				<div className="sales__content__wrapper">
					<img src={blank3} alt="#" className="sales__content__wrapper-img" />
				</div>
			</div>
			<img src={blank4} alt="#" className="sales-image" />
		</div>
	);
}

export default Sales;
