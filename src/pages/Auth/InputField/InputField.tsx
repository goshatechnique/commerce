import "./InputField.scss";

interface Props {
	type: string;
	placeholder: string;
	specialStyles: string | null;
	value: string;
	onChange: any;
}

function InputField({ type = "text", placeholder = "", specialStyles = "", value = "", onChange }: Props) {
	function validateInput() {
		//* need to add check is passwords are equal
		const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let validateMsg;
		if (placeholder === "Phone number" && !phoneNumberPattern.test(value)) validateMsg = `* ${placeholder} not valid.`;
		if (placeholder === "Email" && !emailPattern.test(value)) validateMsg = `* ${placeholder} not valid.`;
		if (value.length === 0) validateMsg = `* ${placeholder} is required.`;
		return <span className="input-error">{validateMsg}</span>;
	}

	return (
		<>
			{validateInput()}
			<input
				className={`input ${specialStyles}`}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e, placeholder)}
			/>
		</>
	);
}

export default InputField;
