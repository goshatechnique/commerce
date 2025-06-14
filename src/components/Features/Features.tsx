import { FEATURES } from "../../utils/helpers";
import "./Features.scss";

function Features() {
	return (
		<div className="features">
			{FEATURES.map((feature) => {
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
