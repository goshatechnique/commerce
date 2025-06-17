import "./Button.scss";

interface Props {
	text: string;
	disabled?: boolean;
	icon?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	specialStyles?: string;
}

function Button({ text = "", disabled = false, icon, onClick, specialStyles = "" }: Props) {
	return (
		<button onClick={onClick} className={`button ${specialStyles} ${disabled ? "disabled" : ""}`} disabled={disabled}>
			{icon ? <img src={icon} alt="#" className="button-icon" /> : null}
			{text}
		</button>
	);
}

export default Button;
