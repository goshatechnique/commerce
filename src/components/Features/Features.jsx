import iconQuality from "../../assets/images/icon_quality.svg";
import iconWarranty from "../../assets/images/icon_warranty.svg";
import iconShipping from "../../assets/images/icon_shipping.svg";
import iconSupport from "../../assets/images/icon_support.svg";
import "./Features.scss";

const features = [
	{
		id: "quality",
		icon: iconQuality,
		title: "High Quality",
		text: "Crafted from top materials",
	},
	{
		id: "warranty",
		icon: iconWarranty,
		title: "Warranty Protection",
		text: "Over 2 years",
	},
	{
		id: "shipping",
		icon: iconShipping,
		title: "Free Shipping",
		text: "Order over 75$",
	},
	{
		id: "support",
		icon: iconSupport,
		title: "24/7 Support",
		text: "Dedicated support",
	},
];

function Features() {
	return (
		<div className="features">
			{features.map((feature) => {
				return (
					<div key={feature.id} className="features__content">
						<img src={feature.icon} alt="#" className="features__content-icon" />
						<div className="features__content__info">
							<div className="features__content__info-title">{feature.title}</div>
							<div className="features__content__info-text">{feature.text}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Features;
