import "./Button.scss";

function Button({ text = "", disabled = false, icon = null, onClick = () => {}, specialStyles = "" }) {
	return (
		<button onClick={onClick} className={`button ${specialStyles} ${disabled ? "disabled" : ""}`} disabled={disabled}>
			{icon ? <img src={icon} alt="#" className="button-icon" /> : null}
			{text}
		</button>
	);
}

export default Button;
