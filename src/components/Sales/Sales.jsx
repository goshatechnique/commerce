import "./Sales.scss";
import blank from "../../assets/images/blank.png";
import blank2 from "../../assets/images/blank2.png";
import Button from "../Button/Button";

function Sales() {
	return (
		<div className="sales">
			<img src={blank} alt="#" className="sales-image" />
			<div className="sales__content">
				<div className="sales__content__wrapper">
					<img src={blank2} alt="#" className="sales__content__wrapper-img" />
				</div>
				<div className="sales__content__center">
					<p className="sales__content__center-h2">ultimate</p>
					<p className="sales__content__center-h1">sale</p>
					<p className="sales__content__center-h3">new collection</p>
					<Button name="Shop now" styles={"text-transform: uppercase;"} />
				</div>
				<div className="sales__content__wrapper">
					<img src={blank2} alt="#" className="sales__content__wrapper-img" />
				</div>
			</div>
			<img src={blank} alt="#" className="sales-image" />
		</div>
	);
}

export default Sales;
