import "./Follow.scss";
import inst from "../../assets/images/instlist.png";

function Follow() {
	return (
		<div className="follow">
			<div className="follow__content">
				<span className="follow__content-title">Follow Us On Instagram</span>
				<span className="follow__content-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
					Scelerisque duis ultrices sollicitudin
				</span>
			</div>
			<img alt="#" src={inst} className="follow__content-img" />
		</div>
	);
}

export default Follow;
