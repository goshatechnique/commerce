import "./Button.scss";

function Button({
	name = "sample",
	onClick = () => {
		console.log("### default button event");
	},
}) {
	return (
		<button className="button" onClick={onClick}>
			{name}
		</button>
	);
}

export default Button;
