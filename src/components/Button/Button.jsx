import "./Button.scss";

function Button({ text = "", icon = null, onClick = () => {}, specialStyles = "" }) {
	return (
		<div onClick={onClick} className={`button ${specialStyles}`}>
			{icon ? <img src={icon} alt="#" className="button-icon" /> : null}
			{text}
		</div>
	);
}

export default Button;
