import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import "./NotFound.scss";

function NotFound() {
	const navigate = useNavigate();

	const toHomeHandler = () => navigate("/");

	return (
		<div className="not-found">
			<span className="not-found__heading">404</span>
			<span className="not-found__warn">Ooops!</span>
			<span className="not-found__message">THAT PAGE DOESN'T EXIST OR UNAVAILABLE.</span>
			<Button text="Go Back to Home" specialStyles="black" onClick={toHomeHandler} />
		</div>
	);
}

export default NotFound;
